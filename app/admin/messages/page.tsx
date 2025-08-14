import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import PageHeader from "@/components/page-header";
import MessagesTable from "./messages-table";

export default async function MessagesAdminPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    const session = verifySession(token);
    if (!session) return null;

    return (
        <div>
            <PageHeader
                title="Mensajes"
                description="Listado y detalles de mensajes recibidos"
            />
            <div className="mt-6">
                <MessagesTable />
            </div>
        </div>
    );
}
