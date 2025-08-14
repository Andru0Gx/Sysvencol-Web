import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/scroll-to-top";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/navbar";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/auth";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Sysvencol - Servicios y Herramientas para la Industria Petrolera",
    description:
        "Empresa especializada en servicios y herramientas para la industria petrolera y petroquímica.",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    const session = verifySession(token);
    const userName = session?.name;
    return (
        <html lang="es" className="scroll-smooth">
            <head>
                <link rel="icon" href="/favicon.ico" />
                <script
                    src="https://kit.fontawesome.com/1e900e1766.js"
                    crossOrigin="anonymous"
                ></script>
            </head>
            <body className={inter.className}>
                <Navbar userName={userName} />
                {children}
                <ScrollToTop />
                <Toaster />
                <Analytics />
                <SpeedInsights />
                <Footer />
            </body>
        </html>
    );
}
