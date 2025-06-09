import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/scroll-to-top";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Sysvencol - Servicios y Herramientas para la Industria Petrolera",
    description:
        "Empresa especializada en servicios y herramientas para la industria petrolera y petroquímica.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="scroll-smooth">
            <head>
                <link rel="icon" href="/Logo.svg" />
            </head>
            <body className={inter.className}>
                {children}
                <ScrollToTop />
            </body>
        </html>
    );
}
