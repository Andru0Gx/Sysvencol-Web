import { NextRequest, NextResponse } from "next/server";

export async function POST(_req: NextRequest) {
    const res = NextResponse.json({ success: true });
    res.cookies.set({
        name: "session",
        value: "",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 0,
    });
    return res;
}
