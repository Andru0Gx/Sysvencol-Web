import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@libsql/client";
import { verifySession } from "@/lib/auth";

export const runtime = "nodejs";

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

export async function GET(req: NextRequest) {
    // Auth: require an authenticated admin/superadmin
    const token = req.cookies.get("session")?.value;
    const session = verifySession(token);
    if (!session || !session.role) return deny();

    const { searchParams } = new URL(req.url);
    const q = (searchParams.get("q") || "").trim().toLowerCase();
    const limit = Math.min(Number(searchParams.get("limit") || 50), 100);
    const offset = Math.max(Number(searchParams.get("offset") || 0), 0);

    const args: any[] = [];
    let where = "";
    if (q) {
        where =
            "WHERE lower(name) LIKE ? OR lower(email) LIKE ? OR lower(phone) LIKE ? OR lower(subject) LIKE ? OR lower(message) LIKE ?";
        args.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
    }

    const list = await turso.execute({
        sql: `SELECT id, name, email, phone, subject, message, status, history FROM contact_messages ${where} ORDER BY id DESC LIMIT ? OFFSET ?`,
        args: [...args, limit, offset],
    });

    const count = await turso.execute({
        sql: `SELECT count(*) as c FROM contact_messages ${where}`,
        args,
    });

    const rows = (list as any).rows || [];
    const total = Number((count as any).rows?.[0]?.c || 0);
    return NextResponse.json({ success: true, data: rows, total, limit, offset });
}

export async function PATCH(req: NextRequest) {
    // Auth: require authenticated admin/superadmin
    const token = req.cookies.get("session")?.value;
    const session = verifySession(token);
    if (!session || !session.role) return deny();

    const body = await req.json();
    const { id, status } = body as { id?: number; status?: string };
    if (!id || !Number.isFinite(Number(id))) {
        return NextResponse.json({ success: false, message: "ID inválido" }, { status: 400 });
    }
    const normalized = String(status || "").toLowerCase().replace(/\s+/g, "_");
    const allowed = new Set(["en_espera", "en_proceso", "completado"]);
    if (!allowed.has(normalized)) {
        return NextResponse.json({ success: false, message: "Estado inválido" }, { status: 400 });
    }

    // Fetch current history
    const current = await turso.execute({ sql: `SELECT history FROM contact_messages WHERE id = ?`, args: [Number(id)] });
    const row = (current as any).rows?.[0];
    if (!row) return NextResponse.json({ success: false, message: "No encontrado" }, { status: 404 });
    let history: any[] = [];
    try {
        history = row.history ? JSON.parse(row.history as string) : [];
    } catch {
        history = [];
    }
    const now = new Date().toISOString();
    history.push({ estado: normalized, fecha: now, usuario: { id: session.id, email: session.email, name: session.name } });
    const historyStr = JSON.stringify(history);

    const res = await turso.execute({ sql: `UPDATE contact_messages SET status = ?, history = ? WHERE id = ?`, args: [normalized, historyStr, Number(id)] });
    if ((res as any).rowsAffected === 0) return NextResponse.json({ success: false, message: "No encontrado" }, { status: 404 });
    return NextResponse.json({ success: true });
}
