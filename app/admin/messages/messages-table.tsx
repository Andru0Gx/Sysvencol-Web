"use client";

import { useEffect, useMemo, useState } from "react";
import useSWR from "swr";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { toast } from "sonner";
import {
    Eye,
    Trash,
    MoreVertical,
    Clock,
    CheckCheck,
    Undo2,
    AlertTriangle,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
} from "lucide-react";

export type Message = {
    id: number;
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status?: "en_espera" | "en_proceso" | "completado";
    history?: any[] | string | null;
    importance?: "alta" | "media" | "baja" | "normal";
    is_read?: number | boolean;
};

function parseHistory(h: any): any[] {
    if (!h) return [];
    if (Array.isArray(h)) return h;
    if (typeof h === "string") {
        try {
            const p = JSON.parse(h);
            return Array.isArray(p) ? p : [];
        } catch {
            return [];
        }
    }
    return [];
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

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function MessagesTable() {
    const [query, setQuery] = useState("");
    const [view, setView] = useState<Message | null>(null);
    // Sorting
    const [sortKey, setSortKey] = useState<
        "name" | "email" | "phone" | "subject" | "importance" | "status" | null
    >(null);
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
    // Top filters
    const [topImportance, setTopImportance] = useState<string>("all");
    const [topRead, setTopRead] = useState<string>("all");

    const { data, isValidating, mutate } = useSWR(
        `/api/admin/messages?q=${encodeURIComponent(query)}`,
        fetcher,
        { refreshInterval: 4000, revalidateOnFocus: true }
    );
    const list: Message[] = useMemo(() => {
        const rows: Message[] = (data?.data || []).map((r: any) => ({
            ...r,
            history: parseHistory(r.history),
        }));
        return rows;
    }, [data]);
    const total = Number(data?.total || 0);
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return list.filter((m) => {
            const isRead = !!m.is_read;
            const imp = (m.importance || "normal").toLowerCase();
            const st = (m.status || "").toLowerCase();

            // Global search
            const matchesQ = !q
                || m.name.toLowerCase().includes(q)
                || m.email.toLowerCase().includes(q)
                || m.phone.toLowerCase().includes(q)
                || m.subject.toLowerCase().includes(q)
                || m.message.toLowerCase().includes(q);

            // Top filters
            const matchesTopImp = topImportance === "all" || imp === topImportance;
            const matchesTopRead = topRead === "all" || (topRead === "read" ? isRead : !isRead);

            return matchesQ && matchesTopImp && matchesTopRead;
        });
    }, [list, query, topImportance, topRead]);

    const displayed = useMemo(() => {
        if (!sortKey) return filtered;
        const impW: Record<string, number> = { baja: 0, normal: 1, media: 2, alta: 3 };
        const stW: Record<string, number> = { en_espera: 0, en_proceso: 1, completado: 2 };
        const arr = [...filtered];
        arr.sort((a, b) => {
            let av: any;
            let bv: any;
            switch (sortKey) {
                case "importance":
                    av = impW[String(a.importance || "normal").toLowerCase()] ?? 1;
                    bv = impW[String(b.importance || "normal").toLowerCase()] ?? 1;
                    break;
                case "status":
                    av = stW[String(a.status || "en_espera").toLowerCase()] ?? 0;
                    bv = stW[String(b.status || "en_espera").toLowerCase()] ?? 0;
                    break;
                case "name":
                    av = String(a.name || "").toLowerCase();
                    bv = String(b.name || "").toLowerCase();
                    break;
                case "email":
                    av = String(a.email || "").toLowerCase();
                    bv = String(b.email || "").toLowerCase();
                    break;
                case "phone":
                    av = String(a.phone || "").toLowerCase();
                    bv = String(b.phone || "").toLowerCase();
                    break;
                case "subject":
                    av = String(a.subject || "").toLowerCase();
                    bv = String(b.subject || "").toLowerCase();
                    break;
                default:
                    av = 0;
                    bv = 0;
            }
            let cmp = 0;
            if (typeof av === "number" && typeof bv === "number") cmp = av - bv;
            else cmp = String(av).localeCompare(String(bv));
            return sortDir === "asc" ? cmp : -cmp;
        });
        return arr;
    }, [filtered, sortKey, sortDir]);

    function toggleSort(key: NonNullable<typeof sortKey>) {
        if (sortKey === key) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDir("asc");
        }
    }

    function SortIcon({ k }: { k: NonNullable<typeof sortKey> }) {
        if (sortKey !== k) return <ArrowUpDown className="ml-1 h-3.5 w-3.5 opacity-60" />;
        return sortDir === "asc" ? (
            <ArrowUp className="ml-1 h-3.5 w-3.5" />
        ) : (
            <ArrowDown className="ml-1 h-3.5 w-3.5" />
        );
    }

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
            mutate();
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
            mutate();
        } catch (e: any) {
            toast.error(e.message || "No se pudo actualizar el estado");
        }
    }

    async function setImportance(id: number, imp: string) {
        try {
            const res = await fetch(`/api/admin/messages`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, importance: imp }),
            });
            const data = await res.json();
            if (!res.ok || !data.success)
                throw new Error(data.message || "Error");
            toast.success("Importancia actualizada");
            mutate();
        } catch (e: any) {
            toast.error(e.message || "No se pudo actualizar la importancia");
        }
    }

    async function markRead(id: number, read: boolean) {
        try {
            const res = await fetch(`/api/admin/messages`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, is_read: read }),
            });
            const data = await res.json();
            if (!res.ok || !data.success)
                throw new Error(data.message || "Error");
            mutate();
        } catch (e: any) {
            toast.error(e.message || "No se pudo actualizar");
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

    function copyToClipboard(value: string, label: string) {
        if (!value) return;
        navigator.clipboard
            .writeText(value)
            .then(() => toast.success(`${label} copiado`))
            .catch(() =>
                toast.error(`No se pudo copiar ${label.toLowerCase()}`)
            );
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full gap-2">
                    <Input
                        placeholder="Buscar por nombre, correo, teléfono, asunto o contenido"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full sm:max-w-md"
                    />
                    <Select value={topImportance} onValueChange={setTopImportance}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Importancia" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas</SelectItem>
                            <SelectItem value="alta">Alta</SelectItem>
                            <SelectItem value="media">Media</SelectItem>
                            <SelectItem value="baja">Baja</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={topRead} onValueChange={setTopRead}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Leídos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            <SelectItem value="unread">No leídos</SelectItem>
                            <SelectItem value="read">Leídos</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Card>
                <CardContent className="p-4">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-muted-foreground">
                                    <button
                                        type="button"
                                        className="inline-flex items-center"
                                        onClick={() => toggleSort("name")}
                                    >
                                        Nombre <SortIcon k="name" />
                                    </button>
                                </TableHead>
                                <TableHead className="text-muted-foreground">
                                    <button
                                        type="button"
                                        className="inline-flex items-center"
                                        onClick={() => toggleSort("email")}
                                    >
                                        Correo <SortIcon k="email" />
                                    </button>
                                </TableHead>
                                <TableHead className="text-muted-foreground">
                                    <button
                                        type="button"
                                        className="inline-flex items-center"
                                        onClick={() => toggleSort("phone")}
                                    >
                                        Teléfono <SortIcon k="phone" />
                                    </button>
                                </TableHead>
                                <TableHead className="text-muted-foreground">
                                    <button
                                        type="button"
                                        className="inline-flex items-center"
                                        onClick={() => toggleSort("subject")}
                                    >
                                        Asunto <SortIcon k="subject" />
                                    </button>
                                </TableHead>
                                <TableHead className="text-muted-foreground">
                                    <button
                                        type="button"
                                        className="inline-flex items-center"
                                        onClick={() => toggleSort("importance")}
                                    >
                                        Importancia <SortIcon k="importance" />
                                    </button>
                                </TableHead>
                                <TableHead className="text-muted-foreground">
                                    <button
                                        type="button"
                                        className="inline-flex items-center"
                                        onClick={() => toggleSort("status")}
                                    >
                                        Estado <SortIcon k="status" />
                                    </button>
                                </TableHead>
                                <TableHead className="text-right text-muted-foreground">
                                    Acciones
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {displayed.map((m) => (
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
                                        <Badge
                                            variant={
                                                m.importance === "alta"
                                                    ? "destructive"
                                                    : m.importance === "media"
                                                    ? "secondary"
                                                    : "outline"
                                            }
                                            className={
                                                m.importance === "alta"
                                                    ? "bg-red-600 text-white"
                                                    : m.importance === "media"
                                                    ? "bg-amber-200 text-amber-900"
                                                    : m.importance === "baja"
                                                    ? "bg-slate-200 text-slate-800"
                                                    : ""
                                            }
                                        >
                                            {m.importance || "normal"}
                                        </Badge>
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
                                                    onClick={() => {
                                                        setView(m);
                                                        if (!m.is_read)
                                                            markRead(
                                                                m.id,
                                                                true
                                                            );
                                                    }}
                                                >
                                                    <Eye className="h-4 w-4 mr-2" />{" "}
                                                    Ver
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        markRead(m.id, true)
                                                    }
                                                >
                                                    <CheckCheck className="h-4 w-4 mr-2" />{" "}
                                                    Marcar como leído
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        markRead(m.id, false)
                                                    }
                                                >
                                                    <Undo2 className="h-4 w-4 mr-2" />{" "}
                                                    Marcar como no leído
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
                                                <DropdownMenuItem asChild>
                                                    <div className="flex w-full items-center gap-2">
                                                        <AlertTriangle className="h-4 w-4 opacity-70" />
                                                        <Select
                                                            onValueChange={(
                                                                v
                                                            ) =>
                                                                setImportance(
                                                                    m.id,
                                                                    v
                                                                )
                                                            }
                                                            defaultValue={
                                                                m.importance ||
                                                                "normal"
                                                            }
                                                        >
                                                            <SelectTrigger className="h-8 w-[160px]">
                                                                <SelectValue placeholder="Importancia" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="alta">
                                                                    Alta
                                                                </SelectItem>
                                                                <SelectItem value="media">
                                                                    Media
                                                                </SelectItem>
                                                                <SelectItem value="baja">
                                                                    Baja
                                                                </SelectItem>
                                                                <SelectItem value="normal">
                                                                    Normal
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
                                        colSpan={7}
                                        className="text-center text-sm text-muted-foreground"
                                    >
                                        {isValidating
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
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Detalle del mensaje</DialogTitle>
                    </DialogHeader>
                    {view && (
                        <div className="space-y-4">
                            {/* Header info */}
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <div className="text-base font-semibold">
                                        {view.name}
                                    </div>
                                    <div className="text-sm text-muted-foreground break-all">
                                        <span
                                            className="cursor-pointer hover:underline"
                                            onClick={() =>
                                                copyToClipboard(
                                                    view.email,
                                                    "Correo"
                                                )
                                            }
                                            title="Copiar correo"
                                        >
                                            {view.email}
                                        </span>
                                        <span className="mx-2">•</span>
                                        <span
                                            className="cursor-pointer hover:underline"
                                            onClick={() =>
                                                copyToClipboard(
                                                    view.phone,
                                                    "Teléfono"
                                                )
                                            }
                                            title="Copiar teléfono"
                                        >
                                            {view.phone}
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-2 sm:mt-0 flex items-center gap-2">
                                    {statusBadge(view.status)}
                                    <Badge
                                        variant="secondary"
                                        className="text-xs"
                                    >
                                        Cambios:{" "}
                                        {Array.isArray(view.history)
                                            ? view.history.length
                                            : 0}
                                    </Badge>
                                </div>
                            </div>

                            {/* Subject */}
                            <div>
                                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                                    Asunto
                                </div>
                                <div className="text-sm font-medium break-words">
                                    {view.subject}
                                </div>
                            </div>

                            <Separator />

                            {/* Message body */}
                            <div>
                                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                                    Mensaje
                                </div>
                                <ScrollArea className="mt-2 max-h-60 rounded border p-3">
                                    <div className="whitespace-pre-wrap text-sm leading-6">
                                        {view.message}
                                    </div>
                                </ScrollArea>
                            </div>

                            {/* History */}
                            <div>
                                <div className="text-xs uppercase tracking-wide text-muted-foreground">
                                    Historial
                                </div>
                                <ScrollArea className="mt-2 max-h-40 pr-2">
                                    <div className="space-y-2">
                                        {Array.isArray(view.history) &&
                                        view.history.length > 0 ? (
                                            view.history.map(
                                                (h: any, i: number) => (
                                                    <div
                                                        key={i}
                                                        className="flex items-center justify-between gap-2 text-xs"
                                                    >
                                                        <div className="flex items-center gap-2">
                                                            {statusBadge(
                                                                h.estado
                                                            )}
                                                            <span className="text-muted-foreground">
                                                                {h.usuario
                                                                    ?.email ||
                                                                    "-"}
                                                            </span>
                                                        </div>
                                                        <span className="tabular-nums text-muted-foreground">
                                                            {fmtDate(h.fecha)}
                                                        </span>
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <div className="text-muted-foreground text-sm">
                                                Sin historial
                                            </div>
                                        )}
                                    </div>
                                </ScrollArea>
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
