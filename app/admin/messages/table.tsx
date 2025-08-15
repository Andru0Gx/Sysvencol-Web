"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Eye, Trash, MoreVertical, Clock } from "lucide-react";
import { format } from "date-fns";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export type Message = {
    id: number;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status?: "en_espera" | "en_proceso" | "completado";
    history?: any;
    importance?: "alta" | "media" | "baja" | "normal";
    is_read?: number | boolean;
};

export default function MessagesTable() {
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState("");
    const [list, setList] = useState<Message[]>([]);
    const [total, setTotal] = useState(0);
    const [view, setView] = useState<Message | null>(null);

    const filtered = useMemo(() => list, [list]);

    async function loadMessages() {
        setLoading(true);
        try {
            const url = `/api/admin/messages?q=${encodeURIComponent(query)}`;
            const res = await fetch(url);
            const data = await res.json();
            if (!res.ok || !data.success)
                throw new Error(data.message || "Error");
            setList(data.data || []);
            setTotal(data.total || 0);
        } catch (e: any) {
            toast.error(e.message || "Error cargando mensajes");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadMessages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const t = setTimeout(() => loadMessages(), 350);
        return () => clearTimeout(t);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    async function removeMessage(m: Message) {
        if (!confirm(`¿Eliminar el mensaje de ${m.name}?`)) return;
        try {
            const res = await fetch(`/api/admin/messages/${m.id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (!res.ok || !data.success)
                throw new Error(data.message || "Error");
            toast.success("Mensaje eliminado");
            loadMessages();
        } catch (e: any) {
            toast.error(e.message || "Error eliminando");
        }
    }

    async function changeStatus(id: number, next: string) {
        try {
            const res = await fetch(`/api/admin/messages`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status: next }),
            });
            const data = await res.json();
            if (!res.ok || !data.success)
                throw new Error(data.message || "Error");
            toast.success("Estado actualizado");
            loadMessages();
        } catch (e: any) {
            toast.error(e.message || "No se pudo actualizar el estado");
        }
    }

    function statusBadge(s?: string) {
        const map: Record<string, string> = {
            en_espera: "bg-amber-100 text-amber-800",
            en_proceso: "bg-blue-100 text-blue-800",
            completado: "bg-green-100 text-green-800",
        };
        const cls = map[s || "en_espera"] || map.en_espera;
        const label = (s || "en_espera").replace(/_/g, " ");
        return (
            <span
                className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${cls}`}
            >
                {label}
            </span>
        );
    }

    function fmtDate(input: any) {
        try {
            const d = new Date(input);
            if (isNaN(d.getTime())) return String(input ?? "");
            return format(d, "dd/MM/yyyy - HH:mm:ss");
        } catch {
            return String(input ?? "");
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <Input
                    placeholder="Buscar por nombre, correo, teléfono, asunto o contenido"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full sm:max-w-md"
                />
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
                                    Teléfono
                                </TableHead>
                                <TableHead className="text-muted-foreground">
                                    Asunto
                                </TableHead>
                                <TableHead className="text-muted-foreground">
                                    Importancia
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
                            {filtered.map((m) => (
                                <TableRow
                                    key={m.id}
                                    className={!m.is_read ? "bg-red-50/40" : ""}
                                >
                                    <TableCell
                                        className={
                                            !m.is_read ? "font-semibold" : ""
                                        }
                                    >
                                        {m.name}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {m.email}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {m.phone}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">
                                        {m.subject}
                                    </TableCell>
                                    <TableCell>
                                        <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium border">
                                            {m.importance || "normal"}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {statusBadge(m.status)}
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
                                                    onClick={() => setView(m)}
                                                >
                                                    <Eye className="h-4 w-4 mr-2" />{" "}
                                                    Ver
                                                </DropdownMenuItem>
                                                <DropdownMenuItem asChild>
                                                    <div className="flex w-full items-center gap-2">
                                                        <Clock className="h-4 w-4 opacity-70" />
                                                        <Select
                                                            onValueChange={(
                                                                v
                                                            ) =>
                                                                changeStatus(
                                                                    m.id,
                                                                    v
                                                                )
                                                            }
                                                            defaultValue={
                                                                m.status ||
                                                                "en_espera"
                                                            }
                                                        >
                                                            <SelectTrigger className="h-8 w-[160px]">
                                                                <SelectValue placeholder="Estado" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="en_espera">
                                                                    En espera
                                                                </SelectItem>
                                                                <SelectItem value="en_proceso">
                                                                    En proceso
                                                                </SelectItem>
                                                                <SelectItem value="completado">
                                                                    Completado
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-destructive focus:text-destructive"
                                                    onClick={() =>
                                                        removeMessage(m)
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

            <Dialog open={!!view} onOpenChange={(o) => !o && setView(null)}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Detalle del mensaje</DialogTitle>
                    </DialogHeader>
                    {view && (
                        <div className="space-y-3">
                            <div className="text-sm text-muted-foreground">
                                De
                            </div>
                            <div className="text-sm">
                                <span className="font-medium">{view.name}</span>{" "}
                                — {view.email} — {view.phone}
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Asunto
                            </div>
                            <div className="text-sm">{view.subject}</div>
                            <div className="text-sm text-muted-foreground">
                                Mensaje
                            </div>
                            <div className="whitespace-pre-wrap text-sm leading-6">
                                {view.message}
                            </div>
                            <div className="pt-2">
                                <div className="text-sm font-medium">
                                    Historial
                                </div>
                                <div className="mt-1 space-y-1 text-xs text-muted-foreground">
                                    {Array.isArray(view.history) ? (
                                        view.history.map(
                                            (h: any, i: number) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center justify-between gap-2"
                                                >
                                                    <span>
                                                        {(
                                                            h.estado || ""
                                                        ).replace(/_/g, " ")}
                                                    </span>
                                                    <span>
                                                        {fmtDate(h.fecha)}
                                                    </span>
                                                    <span className="truncate">
                                                        {h.usuario?.email ||
                                                            "-"}
                                                    </span>
                                                </div>
                                            )
                                        )
                                    ) : (
                                        <div className="text-muted-foreground">
                                            Sin historial
                                        </div>
                                    )}
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="outline"
                                    onClick={() => setView(null)}
                                >
                                    Cerrar
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        if (view) removeMessage(view);
                                    }}
                                >
                                    Eliminar
                                </Button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
