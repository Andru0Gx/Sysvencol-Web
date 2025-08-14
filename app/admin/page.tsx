import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default async function AdminDashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    const session = verifySession(token);

    if (!session) return null;

    const now = new Date();
    const monthName = now.toLocaleString("es-ES", { month: "long" });

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
                        <div className="mt-2 text-3xl font-bold">—</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm text-muted-foreground">
                            Nuevos contactos
                        </div>
                        <div className="mt-2 text-3xl font-bold">—</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <div className="text-sm text-muted-foreground">
                            Usuarios activos
                        </div>
                        <div className="mt-2 text-3xl font-bold">—</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardContent className="p-6">
                    <div className="text-lg font-semibold text-[#243f60]">
                        Mensajes recientes
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                        Aquí listaremos los mensajes del mes desde Turso
                        (pendiente de conexión).
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
