import type { Metadata } from "next";
import type React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";
import Link from "next/link";
import {
    SidebarProvider,
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarInset,
} from "@/components/ui/sidebar";
import { LayoutDashboard, Mail, Users } from "lucide-react";
import LogoutButton from "@/components/admin/logout-button";

export const metadata: Metadata = {
    title: "Admin | Sysvencol",
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    const session = verifySession(token);
    if (!session) redirect("/login");

    async function logoutAction() {
        "use server";
        const ck = await cookies();
        // Clear session cookie and redirect to home
        ck.set("session", "", { path: "/", maxAge: 0 });
        redirect("/");
    }

    return (
        <SidebarProvider>
            <Sidebar collapsible="none">
                <SidebarHeader>
                    <div className="px-2 text-sm font-semibold text-sidebar-foreground/80">
                        Menu de Administración
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild isActive={false}>
                                        <Link href="/admin">
                                            <LayoutDashboard />
                                            <span>Dashboard</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Link href="/admin/messages">
                                            <Mail />
                                            <span>Mensajes</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                {session.role === "superadmin" && (
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href="/admin/users">
                                                <Users />
                                                <span>Usuarios</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                {/* Sidebar footer with logout */}
                <div className="mt-auto p-2">
                    <LogoutButton />
                </div>
                {/* Rail not needed when collapsible is 'none' */}
            </Sidebar>

            <SidebarInset>
                <div className="p-4 md:p-6">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
