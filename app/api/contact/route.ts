import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@libsql/client";

// Configuración TursoDB
const TURSO_DB_URL = process.env.TURSO_DB_URL!;
const TURSO_DB_AUTH_TOKEN = process.env.TURSO_DB_AUTH_TOKEN!;

const turso = createClient({
    url: TURSO_DB_URL,
    authToken: TURSO_DB_AUTH_TOKEN,
});

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validación de campos obligatorios
    if (!name?.trim() || !email?.trim() || !phone?.trim() || !subject?.trim() || !message?.trim()) {
        return NextResponse.json({
            success: false,
            title: "Campos incompletos",
            message: "Por favor, complete todos los campos antes de enviar.",
        }, { status: 400 });
    }

    // Validación de formato de email
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
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
        await turso.execute({
            sql: `INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)`,
            args: [name, email, phone, subject, message],
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