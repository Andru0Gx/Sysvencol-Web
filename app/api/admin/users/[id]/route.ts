import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@libsql/client";
import { verifySession } from "@/lib/auth";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const turso = createClient({
    url: process.env.TURSO_DB_URL!,
    authToken: process.env.TURSO_DB_AUTH_TOKEN!,
});

const scrypt = promisify(_scrypt) as (
    password: string | Buffer,
    salt: string | Buffer,
    keylen: number
) => Promise<Buffer>;

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

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const token = req.cookies.get("session")?.value;
    const session = verifySession(token);
    if (!session || session.role !== "superadmin") return deny();

    const id = Number(params.id);
    if (!Number.isFinite(id)) return bad("ID inválido");

    const body = await req.json().catch(() => ({} as any));
    const name: string | undefined = body?.name?.trim();
    const email: string | undefined = body?.email?.trim()?.toLowerCase();
    const role: string | undefined = body?.role?.trim();
    const is_active: boolean | undefined =
        typeof body?.is_active === "boolean" ? body.is_active : undefined;
    const password: string | undefined = body?.password?.trim();

    if (
        name === undefined &&
        email === undefined &&
        role === undefined &&
        is_active === undefined &&
        password === undefined
    )
        return bad("No hay cambios");

    const fields: string[] = [];
    const args: any[] = [];
    if (name !== undefined) {
        fields.push("name = ?");
        args.push(name);
    }
    if (email !== undefined) {
        // Permissive email check: allows + and long TLDs
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(email)) return bad("Correo inválido", { email: "Correo inválido" });
        fields.push("email = ?");
        args.push(email);
    }
    if (role !== undefined) {
        fields.push("role = ?");
        args.push(role);
    }
    if (is_active !== undefined) {
        fields.push("is_active = ?");
        args.push(is_active ? 1 : 0);
    }
    if (password !== undefined) {
        if (!password || password.length < 6)
            return bad("La contraseña debe tener al menos 6 caracteres", { password: "Muy corta" });
        const salt = randomBytes(16);
        const derived = await scrypt(password, salt, 64);
        const password_hash = Buffer.from(derived).toString("base64");
        const password_salt = salt.toString("base64");
        fields.push("password_hash = ?");
        args.push(password_hash);
        fields.push("password_salt = ?");
        args.push(password_salt);
    }
    args.push(id);

    try {
        const res = await turso.execute({
            sql: `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
            args,
        });
        if ((res as any).rowsAffected === 0) return bad("No se encontró el usuario");
        return NextResponse.json({ success: true });
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

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const token = req.cookies.get("session")?.value;
    const session = verifySession(token);
    if (!session || session.role !== "superadmin") return deny();

    const id = Number(params.id);
    if (!Number.isFinite(id)) return bad("ID inválido");

    const res = await turso.execute({ sql: `DELETE FROM users WHERE id = ?`, args: [id] });
    if ((res as any).rowsAffected === 0) return bad("No se encontró el usuario");
    return NextResponse.json({ success: true });
}
