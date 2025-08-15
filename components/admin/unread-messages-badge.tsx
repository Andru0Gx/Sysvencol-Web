"use client";

import useSWR from "swr";
import { SidebarMenuBadge } from "@/components/ui/sidebar";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function UnreadMessagesBadge() {
    const { data } = useSWR<{ success: boolean; total: number }>(
        "/api/admin/messages?mode=count_unread",
        fetcher,
        { refreshInterval: 5000, revalidateOnFocus: true }
    );
    const count = Number(data?.total || 0);
    if (!count) return null;
    return (
        <SidebarMenuBadge className="bg-red-600 text-white">
            {count > 99 ? "99+" : count}
        </SidebarMenuBadge>
    );
}
