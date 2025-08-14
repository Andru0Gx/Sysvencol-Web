import { NextResponse, NextRequest } from "next/server";
import { createClient } from "@libsql/client";
import { promisify } from "util";
import { scrypt as _scrypt, timingSafeEqual } from "crypto";
import { signSession } from "@/lib/auth";

export const runtime = "nodejs"; // Necesario para usar crypto.scrypt

const scrypt = promisify(_scrypt) as (
    password: string | Buffer,
    salt: string | Buffer,
    keylen: number
) => Promise<Buffer>;

// Cliente TursoDB (mismo patrón que /api/contact)
const TURSO_DB_URL = process.env.TURSO_DB_URL!;
const TURSO_DB_AUTH_TOKEN = process.env.TURSO_DB_AUTH_TOKEN!;

const turso = createClient({
    url: TURSO_DB_URL,
    authToken: TURSO_DB_AUTH_TOKEN,
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({} as any));
        const rawEmail: string = body?.email ?? "";
        const email: string = rawEmail.trim().toLowerCase();
        const password: string = (body?.password ?? "").trim();

        // Validación de campos obligatorios
        if (!email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    title: "Campos incompletos",
                    message: "Por favor, complete correo y contraseña.",
                    errors: {
                        ...(email ? {} : { email: "El correo es obligatorio" }),
                        ...(password ? {} : { password: "La contraseña es obligatoria" }),
                    },
                },
                { status: 400 }
            );
        }

        // Validación de formato de email (mismo estilo que /api/contact)
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                {
                    success: false,
                    title: "Correo inválido",
                    message: "Por favor, ingrese un correo electrónico válido.",
                    errors: { email: "Correo inválido" },
                },
                { status: 400 }
            );
        }

        // Buscar usuario permitido
        const result = await turso.execute({
            sql: `SELECT id, name, email, password_hash, password_salt, role, is_active
                        FROM users
                        WHERE email = ?
                        LIMIT 1`,
            args: [email],
        });

        const row = (result as any).rows?.[0] as
            | {
                id: number;
                name: string;
                email: string;
                password_hash: string;
                password_salt: string;
                role: "admin" | "superadmin" | string;
                is_active: number | 0 | 1;
            }
            | undefined;

        // No revelar si existe o no: mensaje genérico
        if (!row || Number(row.is_active) !== 1) {
            return NextResponse.json(
                {
                    success: false,
                    title: "Credenciales inválidas",
                    message: "El correo o la contraseña no son correctos.",
                },
                { status: 400 }
            );
        }

        // Verificar contraseña con scrypt (hash base64 + salt base64 almacenados)
        const salt = Buffer.from(row.password_salt, "base64");
        const derived = await scrypt(password, salt, 64);
        const stored = Buffer.from(row.password_hash, "base64");

        if (
            stored.length !== derived.length ||
            !timingSafeEqual(stored, derived)
        ) {
            return NextResponse.json(
                {
                    success: false,
                    title: "Credenciales inválidas",
                    message: "El correo o la contraseña no son correctos.",
                },
                { status: 400 }
            );
        }

        // Crear sesión y setear cookie httpOnly
        const token = signSession({
            id: row.id,
            email: row.email,
            name: row.name,
            role: row.role,
        });

        const res = NextResponse.json({ success: true });
        res.cookies.set({
            name: "session",
            value: token,
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 8,
        });
        return res;
    } catch (e) {
        return NextResponse.json(
            {
                success: false,
                title: "Error al iniciar sesión",
                message: "Hubo un error al procesar la solicitud. Intente nuevamente.",
                error: String(e),
            },
            { status: 500 }
        );
    }
}
