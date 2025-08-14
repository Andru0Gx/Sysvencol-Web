import { createHmac } from "crypto";

const SECRET = process.env.APP_SECRET || "dev-secret-change-me";

function base64url(input: Buffer | string) {
    const b = Buffer.isBuffer(input) ? input : Buffer.from(input);
    return b
        .toString("base64")
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
}

function sign(content: string) {
    return base64url(createHmac("sha256", SECRET).update(content).digest());
}

export type SessionPayload = {
    id: number;
    email: string;
    name: string;
    role: "admin" | "superadmin" | string;
    exp: number; // epoch seconds
};

export function signSession(payload: Omit<SessionPayload, "exp">, ttlSeconds = 60 * 60 * 8) {
    const header = { alg: "HS256", typ: "JWT" } as const;
    const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
    const body: SessionPayload = { ...payload, exp } as SessionPayload;
    const h = base64url(JSON.stringify(header));
    const p = base64url(JSON.stringify(body));
    const s = sign(`${h}.${p}`);
    return `${h}.${p}.${s}`;
}

export function verifySession(token?: string): SessionPayload | null {
    if (!token) return null;
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [h, p, s] = parts;
    const expected = sign(`${h}.${p}`);
    if (expected !== s) return null;
    try {
        const payload = JSON.parse(Buffer.from(p.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString()) as SessionPayload;
        if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) return null;
        return payload;
    } catch {
        return null;
    }
}
