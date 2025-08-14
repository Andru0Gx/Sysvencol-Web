import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import PageHeader from "@/components/page-header";
import { Suspense } from "react";
import UsersTable from "./users_table";

export default async function UsersAdminPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    const session = verifySession(token);
    if (!session) return null;
    if (session.role !== "superadmin") return <div>No autorizado</div>;

    return (
        <div>
            <PageHeader
                title="Usuarios"
                description="Gestión de cuentas (solo superadministradores)"
            />
            <div className="mt-6">
                <Suspense fallback={<div>Cargando usuarios…</div>}>
                    <UsersTable />
                </Suspense>
            </div>
        </div>
    );
}
