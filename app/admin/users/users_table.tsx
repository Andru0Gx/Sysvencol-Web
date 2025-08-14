"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
    Plus,
    MoreVertical,
    Trash,
    Ban,
    CheckCircle,
    Pencil,
    KeyRound,
} from "lucide-react";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
    is_active: 0 | 1;
};

export default function UsersTable() {
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [list, setList] = useState<User[]>([]);
    const [total, setTotal] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("admin");
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState<null | User>(null);
    const [pwdOpen, setPwdOpen] = useState<null | User>(null);
    const [editName, setEditName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editRole, setEditRole] = useState("admin");
    const [newPassword, setNewPassword] = useState("");

    // Simple email regex (matches server)
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const canCreate =
        name.trim().length > 0 &&
        EMAIL_RE.test(email.trim()) &&
        password.trim().length >= 6;

    const filtered = useMemo(() => list, [list]);

    async function loadUsers() {
        setLoading(true);
        try {
            const url = `/api/admin/users?q=${encodeURIComponent(query)}`;
            const res = await fetch(url);
            const data = await res.json();
            if (!res.ok || !data.success)
                throw new Error(data.message || "Error");
            setList(data.data || []);
            setTotal(data.total || 0);
        } catch (e: any) {
            toast.error(e.message || "Error cargando usuarios");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Debounced search on query change
    useEffect(() => {
        const t = setTimeout(() => {
            loadUsers();
        }, 350);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    async function createUser(e: React.FormEvent) {
        e.preventDefault();
        try {
            if (!canCreate) {
                toast.error(
                    "Completa nombre, correo válido y contraseña (≥ 6)"
                );
                return;
            }
            const res = await fetch("/api/admin/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    password,
                    role,
                    is_active: true,
                }),
            });
            const data = await res.json();
            if (!res.ok || !data.success)
                throw new Error(data.message || "Error");
            toast.success("Usuario creado");
            setName("");
            setEmail("");
            setPassword("");
            setRole("admin");
            loadUsers();
            setOpen(false);
        } catch (e: any) {
            toast.error(e.message || "Error creando usuario");
        }
    }

    async function toggleActive(u: User) {
        try {
            const res = await fetch(`/api/admin/users/${u.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ is_active: u.is_active ? false : true }),
            });
            const data = await res.json();
            if (!res.ok || !data.success)
                throw new Error(data.message || "Error");
            toast.success("Estado actualizado");
            loadUsers();
        } catch (e: any) {
            toast.error(e.message || "Error actualizando estado");
        }
    }

    async function removeUser(u: User) {
        if (!confirm(`¿Eliminar a ${u.name}?`)) return;
        try {
            const res = await fetch(`/api/admin/users/${u.id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok || !data.success)
                throw new Error(data.message || "Error");
            toast.success("Usuario eliminado");
            loadUsers();
        } catch (e: any) {
            toast.error(e.message || "Error eliminando usuario");
        }
    }

    function openEdit(u: User) {
        setEditName(u.name);
        setEditEmail(u.email);
        setEditRole(u.role);
        setEditOpen(u);
    }

    async function submitEdit(e: React.FormEvent) {
        e.preventDefault();
        if (!editOpen) return;
        try {
            const res = await fetch(`/api/admin/users/${editOpen.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: editName,
                    email: editEmail,
                    role: editRole,
                }),
            });
            const data = await res.json();
            if (!res.ok || !data.success)
                throw new Error(data.message || "Error");
            toast.success("Usuario actualizado");
            setEditOpen(null);
            loadUsers();
        } catch (e: any) {
            toast.error(e.message || "Error actualizando usuario");
        }
    }

    function openPwd(u: User) {
        setNewPassword("");
        setPwdOpen(u);
    }

    async function submitPwd(e: React.FormEvent) {
        e.preventDefault();
        if (!pwdOpen) return;
        try {
            const res = await fetch(`/api/admin/users/${pwdOpen.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: newPassword }),
            });
            const data = await res.json();
            if (!res.ok || !data.success)
                throw new Error(data.message || "Error");
            toast.success("Contraseña actualizada");
            setPwdOpen(null);
        } catch (e: any) {
            toast.error(e.message || "Error actualizando contraseña");
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 w-full">
                    <Input
                        placeholder="Buscar por nombre o correo"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1"
                    />
                </div>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            className="self-start sm:self-auto"
                            onClick={() => setOpen(true)}
                        >
                            <Plus className="h-4 w-4 mr-2" /> Agregar Usuario
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Agregar Usuario</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={createUser} className="space-y-3">
                            <Input
                                placeholder="Nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Input
                                type="email"
                                placeholder="Correo"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="flex items-center gap-2">
                                <label className="text-sm text-muted-foreground">
                                    Rol
                                </label>
                                <select
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="border rounded px-2 py-1 text-sm"
                                >
                                    <option value="admin">admin</option>
                                    <option value="superadmin">
                                        superadmin
                                    </option>
                                </select>
                            </div>
                            <DialogFooter>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit" disabled={!canCreate}>
                                    Guardar
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardContent className="p-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-muted-foreground">
                                    Nombre
                                </TableHead>
                                <TableHead className="text-muted-foreground">
                                    Correo
                                </TableHead>
                                <TableHead className="text-muted-foreground">
                                    Rol
                                </TableHead>
                                <TableHead className="text-muted-foreground">
                                    Estado
                                </TableHead>
                                <TableHead className="text-right text-muted-foreground">
                                    Acciones
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((u) => (
                                <TableRow key={u.id}>
                                    <TableCell>{u.name}</TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {u.email}
                                    </TableCell>
                                    <TableCell className="capitalize">
                                        {u.role}
                                    </TableCell>
                                    <TableCell>
                                        {u.is_active ? "Activo" : "Inactivo"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                    <span className="sr-only">
                                                        Acciones
                                                    </span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() => openEdit(u)}
                                                >
                                                    <Pencil className="h-4 w-4 mr-2" />{" "}
                                                    Editar
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => openPwd(u)}
                                                >
                                                    <KeyRound className="h-4 w-4 mr-2" />{" "}
                                                    Cambiar contraseña
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        toggleActive(u)
                                                    }
                                                >
                                                    {u.is_active ? (
                                                        <Ban className="h-4 w-4 mr-2" />
                                                    ) : (
                                                        <CheckCircle className="h-4 w-4 mr-2" />
                                                    )}
                                                    {u.is_active
                                                        ? "Desactivar"
                                                        : "Activar"}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive focus:text-destructive"
                                                    onClick={() =>
                                                        removeUser(u)
                                                    }
                                                >
                                                    <Trash className="h-4 w-4 mr-2" />{" "}
                                                    Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filtered.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center text-sm text-muted-foreground"
                                    >
                                        {loading
                                            ? "Cargando..."
                                            : "Sin resultados"}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Edit dialog */}
            <Dialog
                open={!!editOpen}
                onOpenChange={(o) => !o && setEditOpen(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar usuario</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitEdit} className="space-y-3">
                        <Input
                            placeholder="Nombre"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                        />
                        <Input
                            type="email"
                            placeholder="Correo"
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                        />
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-muted-foreground">
                                Rol
                            </label>
                            <select
                                value={editRole}
                                onChange={(e) => setEditRole(e.target.value)}
                                className="border rounded px-2 py-1 text-sm"
                            >
                                <option value="admin">admin</option>
                                <option value="superadmin">superadmin</option>
                            </select>
                        </div>
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setEditOpen(null)}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit">Guardar</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Change password dialog */}
            <Dialog
                open={!!pwdOpen}
                onOpenChange={(o) => !o && setPwdOpen(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Cambiar contraseña</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submitPwd} className="space-y-3">
                        <Input
                            type="password"
                            placeholder="Nueva contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setPwdOpen(null)}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit">Guardar</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
