import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    const session = verifySession(token);
    const headers = { "Cache-Control": "no-store" } as const;
    if (!session) {
        return Response.json({ authenticated: false }, { headers });
    }
    const { id, email, name, role, exp } = session;
    return Response.json(
        { authenticated: true, id, email, name, role, exp },
        { headers }
    );
}
