import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@libsql/client";

// Configuración TursoDB
const TURSO_DB_URL = process.env.TURSO_DB_URL!;
const TURSO_DB_AUTH_TOKEN = process.env.TURSO_DB_AUTH_TOKEN!;

const turso = createClient({
    url: TURSO_DB_URL,
    authToken: TURSO_DB_AUTH_TOKEN,
});

async function ensureContactSchema() {
    // Try selecting the columns; if they don't exist, add them.
    try {
        await turso.execute({ sql: `SELECT status, history FROM contact_messages LIMIT 1`, args: [] });
        return; // Both columns exist
    } catch {
        // Add status column if missing
        try {
            await turso.execute({ sql: `ALTER TABLE contact_messages ADD COLUMN status TEXT NOT NULL DEFAULT 'en_espera'`, args: [] });
        } catch { }
        // Add history column if missing
        try {
            await turso.execute({ sql: `ALTER TABLE contact_messages ADD COLUMN history TEXT`, args: [] });
        } catch { }
    }
}

type Estado = "en_espera" | "en_proceso" | "completado";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;
    const rawStatus: string | undefined = (body.status || body.estado || body.state);
    const status = ((rawStatus || "en_espera") as string)
        .toLowerCase()
        .replace(/\s+/g, "_") as Estado;

    // Validación de campos obligatorios
    if (!name?.trim() || !email?.trim() || !phone?.trim() || !subject?.trim() || !message?.trim()) {
        return NextResponse.json({
            success: false,
            title: "Campos incompletos",
            message: "Por favor, complete todos los campos antes de enviar.",
        }, { status: 400 });
    }

    // Validación de formato de email (permite + y TLDs largos)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
        return NextResponse.json({
            success: false,
            title: "Correo inválido",
            message: "Por favor, ingrese un correo electrónico válido.",
        }, { status: 400 });
    }

    // Validación de formato de teléfono
    const phoneRegex = /^(\+\d{1,3}[- ]?)?(\(?\d{2,4}\)?[- ]?)?\d{3,4}[- ]?\d{3,4}$/;
    if (!phoneRegex.test(phone)) {
        return NextResponse.json({
            success: false,
            title: "Teléfono inválido",
            message: "Por favor, ingrese un número de teléfono válido.",
        }, { status: 400 });
    }

    try {
        await ensureContactSchema();
        // Historial inicial: solo estado y fecha/hora; sin usuario al crear desde público
        const now = new Date().toISOString();
        const history = JSON.stringify([
            { estado: status, fecha: now, usuario: null },
        ]);

        await turso.execute({
            sql: `INSERT INTO contact_messages (name, email, phone, subject, message, status, history) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            args: [name, email, phone, subject, message, status, history],
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({
            success: false,
            title: "Error al enviar",
            message: "Hubo un error al guardar el mensaje. Intente nuevamente.",
            error: String(error),
        }, { status: 500 });
    }
}