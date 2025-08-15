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

async function ensureContactSchema() {
    try {
        const res = await turso.execute({ sql: `PRAGMA table_info(contact_messages)`, args: [] });
        const cols = new Set((res as any).rows?.map((r: any) => String(r.name)) || []);
        if (!cols.has("status")) {
            await turso.execute({ sql: `ALTER TABLE contact_messages ADD COLUMN status TEXT NOT NULL DEFAULT 'en_espera'`, args: [] });
        }
        if (!cols.has("history")) {
            await turso.execute({ sql: `ALTER TABLE contact_messages ADD COLUMN history TEXT`, args: [] });
        }
        if (!cols.has("importance")) {
            await turso.execute({ sql: `ALTER TABLE contact_messages ADD COLUMN importance TEXT NOT NULL DEFAULT 'normal'`, args: [] });
        }
        if (!cols.has("is_read")) {
            await turso.execute({ sql: `ALTER TABLE contact_messages ADD COLUMN is_read INTEGER NOT NULL DEFAULT 0`, args: [] });
        }
    } catch {
        // ignore
    }
}

export async function GET(req: NextRequest) {
    // Auth: require an authenticated admin/superadmin
    const token = req.cookies.get("session")?.value;
    const session = verifySession(token);
    if (!session || !session.role) return deny();

    await ensureContactSchema();

    const { searchParams } = new URL(req.url);
    // Optional: count only unread
    const mode = searchParams.get("mode");
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
    if (mode === "count_unread") {
        const c = await turso.execute({ sql: `SELECT COUNT(*) as c FROM contact_messages WHERE is_read = 0`, args: [] });
        const total = Number((c as any).rows?.[0]?.c || 0);
        return NextResponse.json({ success: true, total });
    }

    const list = await turso.execute({
        sql: `SELECT id, name, email, phone, subject, message, status, history, importance, is_read FROM contact_messages ${where} ORDER BY id DESC LIMIT ? OFFSET ?`,
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

    await ensureContactSchema();

    const body = await req.json();
    const { id, status, importance, is_read } = body as { id?: number; status?: string; importance?: string; is_read?: boolean };
    if (!id || !Number.isFinite(Number(id))) {
        return NextResponse.json({ success: false, message: "ID inválido" }, { status: 400 });
    }
    const normalized = status ? String(status || "").toLowerCase().replace(/\s+/g, "_") : undefined;
    const allowed = new Set(["en_espera", "en_proceso", "completado"]);
    if (status && !allowed.has(normalized!)) {
        return NextResponse.json({ success: false, message: "Estado inválido" }, { status: 400 });
    }
    const allowedImp = new Set(["alta", "media", "baja", "normal"]);
    const normImp = importance ? String(importance).toLowerCase() : undefined;
    if (importance && !allowedImp.has(normImp!)) {
        return NextResponse.json({ success: false, message: "Importancia inválida" }, { status: 400 });
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
    if (normalized) {
        history.push({ estado: normalized, fecha: now, usuario: { id: session.id, email: session.email, name: session.name } });
    }
    const historyStr = JSON.stringify(history);

    // Build dynamic update
    const sets: string[] = [];
    const argsU: any[] = [];
    if (normalized) { sets.push("status = ?"); argsU.push(normalized); }
    if (normImp) { sets.push("importance = ?"); argsU.push(normImp); }
    if (typeof is_read === "boolean") { sets.push("is_read = ?"); argsU.push(is_read ? 1 : 0); }
    // Always update history
    sets.push("history = ?"); argsU.push(historyStr);
    argsU.push(Number(id));

    const res = await turso.execute({ sql: `UPDATE contact_messages SET ${sets.join(", ")} WHERE id = ?`, args: argsU });
    if ((res as any).rowsAffected === 0) return NextResponse.json({ success: false, message: "No encontrado" }, { status: 404 });
    return NextResponse.json({ success: true });
}
