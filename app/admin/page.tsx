import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@libsql/client";
import Link from "next/link";

type StatusKey = "en_espera" | "en_proceso" | "completado" | string;

const turso = createClient({
    url: process.env.TURSO_DB_URL!,
    authToken: process.env.TURSO_DB_AUTH_TOKEN!,
});

export default async function AdminDashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    const session = verifySession(token);

    if (!session) return null;

    const now = new Date();
    const monthName = now.toLocaleString("es-ES", { month: "long" });

    // Detect if contact_messages has created_at to compute month metrics
    let hasCreatedAt = false;
    try {
        const info = await turso.execute({
            sql: `PRAGMA table_info(contact_messages)`,
            args: [],
        });
        const rows = (info as any).rows as Array<{ name: string }>;
        hasCreatedAt =
            Array.isArray(rows) &&
            rows.some(
                (r) => String((r as any).name).toLowerCase() === "created_at"
            );
    } catch {}

    const start = new Date(now.getFullYear(), now.getMonth(), 1);
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const startIso = start.toISOString();
    const endIso = end.toISOString();

    // Queries
    const qTotalMessages = turso.execute({
        sql: `SELECT count(*) as c FROM contact_messages`,
        args: [],
    });
    const qMessagesThisMonth = hasCreatedAt
        ? turso.execute({
              sql: `SELECT count(*) as c FROM contact_messages WHERE datetime(created_at) >= ? AND datetime(created_at) < ?`,
              args: [startIso, endIso],
          })
        : turso.execute({
              sql: `SELECT count(*) as c FROM contact_messages`,
              args: [],
          });
    const qByStatus = turso.execute({
        sql: `SELECT status, count(*) as c FROM contact_messages GROUP BY status`,
        args: [],
    });
    const qUsersActive = turso.execute({
        sql: `SELECT count(*) as c FROM users WHERE is_active = 1`,
        args: [],
    });
    const qUsersTotal = turso.execute({
        sql: `SELECT count(*) as c FROM users`,
        args: [],
    });
    const qDistinctContacts = hasCreatedAt
        ? turso.execute({
              sql: `SELECT count(DISTINCT email) as c FROM contact_messages WHERE datetime(created_at) >= ? AND datetime(created_at) < ?`,
              args: [startIso, endIso],
          })
        : turso.execute({
              sql: `SELECT count(DISTINCT email) as c FROM contact_messages`,
              args: [],
          });
    const qRecent = turso.execute({
        sql: `SELECT id, name, email, subject, status FROM contact_messages ORDER BY id DESC LIMIT 5`,
        args: [],
    });

    const [
        totalMsgRes,
        monthMsgRes,
        byStatusRes,
        activeUsersRes,
        totalUsersRes,
        distinctContactsRes,
        recentRes,
    ] = await Promise.all([
        qTotalMessages,
        qMessagesThisMonth,
        qByStatus,
        qUsersActive,
        qUsersTotal,
        qDistinctContacts,
        qRecent,
    ]);

    const totalMessages = Number((totalMsgRes as any).rows?.[0]?.c || 0);
    const messagesThisMonth = Number((monthMsgRes as any).rows?.[0]?.c || 0);
    const byStatusRows = ((byStatusRes as any).rows || []) as Array<{
        status: StatusKey;
        c: number;
    }>;
    const byStatus: Record<StatusKey, number> = byStatusRows.reduce(
        (acc, r: any) => {
            const key = (r.status || "en_espera") as StatusKey;
            acc[key] = Number(r.c || 0);
            return acc;
        },
        {} as Record<StatusKey, number>
    );
    const usersActive = Number((activeUsersRes as any).rows?.[0]?.c || 0);
    const usersTotal = Number((totalUsersRes as any).rows?.[0]?.c || 0);
    const newContacts = Number((distinctContactsRes as any).rows?.[0]?.c || 0);
    const recent = (((recentRes as any).rows || []) as any[]).map((r) => ({
        id: r.id as number,
        name: String(r.name || ""),
        email: String(r.email || ""),
        subject: String(r.subject || ""),
        status: String(r.status || "en_espera"),
    }));

    function statusLabel(s?: string) {
        return String(s || "en_espera").replace(/_/g, " ");
    }

    return (
        <div className="space-y-8">
            <PageHeader
                title="Dashboard"
                description={`Resumen del mes de ${monthName}`}
            />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm text-muted-foreground">
                            Mensajes recibidos (mes actual)
                        </div>
                        <div className="mt-2 text-3xl font-bold">
                            {messagesThisMonth}
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                            Total: {totalMessages} · En espera:{" "}
                            {byStatus["en_espera"] ?? 0} · En proceso:{" "}
                            {byStatus["en_proceso"] ?? 0} · Completado:{" "}
                            {byStatus["completado"] ?? 0}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm text-muted-foreground">
                            Nuevos contactos
                        </div>
                        <div className="mt-2 text-3xl font-bold">
                            {newContacts}
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                            Correos únicos {hasCreatedAt ? "(mes)" : "(total)"}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm text-muted-foreground">
                            Usuarios activos
                        </div>
                        <div className="mt-2 text-3xl font-bold">
                            {usersActive}
                        </div>
                        <div className="mt-2 text-xs text-muted-foreground">
                            de {usersTotal} usuarios
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardContent className="p-6">
                    <div className="text-lg font-semibold text-[#243f60]">
                        Mensajes recientes
                    </div>
                    {recent.length === 0 ? (
                        <div className="mt-2 text-sm text-gray-600">
                            Sin mensajes aún.
                        </div>
                    ) : (
                        <ul className="mt-4 divide-y rounded-md border">
                            {recent.map((m) => (
                                <li
                                    key={m.id}
                                    className="flex items-center justify-between gap-4 p-3 text-sm"
                                >
                                    <div className="min-w-0">
                                        <div className="truncate font-medium">
                                            {m.subject}
                                        </div>
                                        <div className="truncate text-muted-foreground">
                                            {m.name} · {m.email}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="rounded bg-gray-100 px-2 py-0.5 text-xs capitalize text-gray-700">
                                            {statusLabel(m.status)}
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                    <div className="mt-4 text-right">
                        <Link
                            href="/admin/messages"
                            className="text-sm text-[#243f60] underline-offset-4 hover:underline"
                        >
                            Ver todos los mensajes
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
