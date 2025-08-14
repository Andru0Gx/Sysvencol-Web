"use client";

import { useState } from "react";

export default function LogoutButton() {
    const [loading, setLoading] = useState(false);
    const onClick = async () => {
        if (loading) return;
        setLoading(true);
        try {
            await fetch("/api/logout", { method: "POST", cache: "no-store" });
        } catch {}
        // Hard reload so root layout reads cleared cookie
        window.location.href = "/";
    };
    return (
        <button
            onClick={onClick}
            className="w-full rounded bg-destructive px-3 py-2 text-xs font-medium text-destructive-foreground hover:opacity-90 disabled:opacity-60"
            disabled={loading}
        >
            {loading ? "Cerrando…" : "Cerrar sesión"}
        </button>
    );
}
