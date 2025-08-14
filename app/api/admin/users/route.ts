import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@libsql/client";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { verifySession } from "@/lib/auth";

export const runtime = "nodejs";

const scrypt = promisify(_scrypt) as (
    password: string | Buffer,
    salt: string | Buffer,
    keylen: number
) => Promise<Buffer>;

const turso = createClient({
    url: process.env.TURSO_DB_URL!,
    authToken: process.env.TURSO_DB_AUTH_TOKEN!,
});

function deny(msg = "No autorizado") {
    return NextResponse.json(
        { success: false, title: "No autorizado", message: msg },
        { status: 401 }
    );
}

function bad(msg: string, errors?: Record<string, string>) {
    return NextResponse.json(
        { success: false, title: "Solicitud inválida", message: msg, errors },
        { status: 400 }
    );
}

export async function GET(req: NextRequest) {
    // Auth: only superadmin can list users
    const token = req.cookies.get("session")?.value;
    const session = verifySession(token);
    if (!session || session.role !== "superadmin") return deny();

    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim().toLowerCase();
    const limit = Math.min(Number(searchParams.get("limit") || 50), 100);
    const offset = Math.max(Number(searchParams.get("offset") || 0), 0);

    const args: any[] = [];
    let where = "";
    if (q) {
        where = "WHERE lower(name) LIKE ? OR lower(email) LIKE ?";
        args.push(`%${q}%`, `%${q}%`);
    }

    const list = await turso.execute({
        sql: `SELECT id, name, email, role, is_active FROM users ${where} ORDER BY id DESC LIMIT ? OFFSET ?`,
        args: [...args, limit, offset],
    });

    const count = await turso.execute({
        sql: `SELECT count(*) as c FROM users ${where}`,
        args,
    });

    const rows = (list as any).rows || [];
    const total = Number((count as any).rows?.[0]?.c || 0);
    return NextResponse.json({ success: true, data: rows, total, limit, offset });
}

export async function POST(req: NextRequest) {
    // Auth: only superadmin can create users
    const token = req.cookies.get("session")?.value;
    const session = verifySession(token);
    if (!session || session.role !== "superadmin") return deny();

    const body = await req.json().catch(() => ({} as any));
    const name: string = (body?.name || "").trim();
    const email: string = (body?.email || "").trim().toLowerCase();
    const role: string = (body?.role || "admin").trim();
    const is_active: boolean = Boolean(body?.is_active ?? true);
    const password: string = (body?.password || "").trim();

    if (!name) return bad("El nombre es obligatorio", { name: "Requerido" });
    // Permissive email check: allows + and long TLDs
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || !emailRegex.test(email))
        return bad("Correo inválido", { email: "Correo inválido" });
    if (!password || password.length < 6)
        return bad("La contraseña debe tener al menos 6 caracteres", {
            password: "Muy corta",
        });
    if (!role) return bad("El rol es obligatorio", { role: "Requerido" });

    // Hash password
    const salt = randomBytes(16);
    const derived = await scrypt(password, salt, 64);
    const password_hash = Buffer.from(derived).toString("base64");
    const password_salt = salt.toString("base64");

    try {
        const ins = await turso.execute({
            sql: `INSERT INTO users (name, email, role, is_active, password_hash, password_salt)
            VALUES (?, ?, ?, ?, ?, ?)`,
            args: [name, email, role, is_active ? 1 : 0, password_hash, password_salt],
        });
        const rawId = (ins as any).lastInsertRowid ?? (ins as any).lastInsertRowId;
        const id = typeof rawId === "bigint" ? Number(rawId) : Number(rawId ?? 0);
        return NextResponse.json({
            success: true,
            data: { id, name, email, role, is_active: is_active ? 1 : 0 },
        });
    } catch (e: any) {
        const msg = String(e?.message || e);
        if (msg.includes("UNIQUE") && msg.toLowerCase().includes("email")) {
            return bad("El correo ya está registrado", { email: "Duplicado" });
        }
        return NextResponse.json(
            { success: false, title: "Error", message: msg },
            { status: 500 }
        );
    }
}
