import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@libsql/client";
import { verifySession } from "@/lib/auth";

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

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    const token = req.cookies.get("session")?.value;
    const session = verifySession(token);
    if (!session || !session.role) return deny();

    const id = Number(params.id);
    if (!Number.isFinite(id))
        return NextResponse.json({ success: false, message: "ID inválido" }, { status: 400 });

    const res = await turso.execute({
        sql: `SELECT id, name, email, phone, subject, message, status, history FROM contact_messages WHERE id = ?`,
        args: [id],
    });
    const row = (res as any).rows?.[0];
    if (!row) return NextResponse.json({ success: false, message: "No encontrado" }, { status: 404 });
    return NextResponse.json({ success: true, data: row });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const token = req.cookies.get("session")?.value;
    const session = verifySession(token);
    if (!session || !session.role) return deny();

    const id = Number(params.id);
    if (!Number.isFinite(id))
        return NextResponse.json({ success: false, message: "ID inválido" }, { status: 400 });

    const res = await turso.execute({ sql: `DELETE FROM contact_messages WHERE id = ?`, args: [id] });
    if ((res as any).rowsAffected === 0)
        return NextResponse.json({ success: false, message: "No encontrado" }, { status: 404 });
    return NextResponse.json({ success: true });
}
