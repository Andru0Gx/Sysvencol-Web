"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown, Globe, Phone, Mail } from "lucide-react";
import LogoSysvencol from "@/components/icons/Logo";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-full">
            {/* Top Bar */}
            <div className="bg-gray-100 py-2">
                <div className="container mx-auto flex flex-col justify-between px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center text-sm text-gray-600">
                            <Phone className="mr-2 h-4 w-4" />
                            <span>+1 786 571 9496 / +58 251 8175112</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <Mail className="mr-2 h-4 w-4" />
                            <span>info@sysvencol.com</span>
                        </div>
                    </div>
                    {/* <div className="mt-2 flex items-center space-x-4 sm:mt-0">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="flex items-center text-sm text-gray-600"
                                >
                                    <Globe className="mr-2 h-4 w-4" />
                                    <span>ES</span>
                                    <ChevronDown className="ml-1 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Español</DropdownMenuItem>
                                <DropdownMenuItem>English</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div> */}
                </div>
            </div>

            {/* Main Navigation */}
            <div className="border-b bg-white py-4">
                <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/" className="flex items-center">
                        <LogoSysvencol color1="#243f60" color2="#999" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex md:items-center md:space-x-8">
                        <Link
                            href="/"
                            className="text-[#243f60] font-medium hover:text-[#243f60]/80"
                        >
                            Inicio
                        </Link>
                        <Link
                            href="/about"
                            className="text-gray-600 hover:text-[#243f60]"
                        >
                            Nosotros
                        </Link>
                        <Link
                            href="/services"
                            className="text-gray-600 hover:text-[#243f60]"
                        >
                            Servicios
                        </Link>
                        {/* <Link
                            href="/gallery"
                            className="text-gray-600 hover:text-[#243f60]"
                        >
                            Galería
                        </Link>
                        <Link
                            href="/contact"
                            className="text-gray-600 hover:text-[#243f60]"
                        >
                            Contacto
                        </Link>
                        <Link
                            href="/blog"
                            className="text-gray-600 hover:text-[#243f60]"
                        >
                            Blog
                        </Link> */}
                    </nav>

                    <div className="hidden md:flex md:items-center md:space-x-4">
                        <Link
                            href="https://online.fliphtml5.com/eafhl/lxmq/"
                            target="_blank"
                        >
                            <Button className="bg-[#243f60] hover:bg-[#1a2e48]">
                                Catálogo
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Navigation */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                            >
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Abrir menú</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="right"
                            className="w-[300px] sm:w-[400px]"
                        >
                            <div className="flex flex-col space-y-6 py-6">
                                <Link
                                    href="/"
                                    className="flex items-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="150"
                                        height="50"
                                        viewBox="0 0 612 214.8"
                                    >
                                        <style>{`.st0{fill:#243f60}.st1{fill:#999}`}</style>
                                        <path
                                            d="M42 72a106 106 0 0 0 3 2l-8 18-1 1-3-1a61 61 0 0 1-12-5c-4-1-7-4-9-7s-4-7-4-12v-3l4-11c2-4 5-6 9-9l13-5 12-2 1 1-10 23-1 3 2 5 4 2z"
                                            className="st0"
                                        />
                                        <path
                                            d="M84 47v1l-1 2-10 27h-1a41 41 0 0 0-6-2v-1l4-10 7-19h1l6 2z"
                                            className="st1"
                                        />
                                        <path
                                            d="m89 106-3 12-8 9c-3 3-7 5-12 6-5 2-11 3-17 3a70 70 0 0 1-33-9l-8-6v-1l15-16a39 39 0 0 0 26 10h1a18 18 0 0 0 8-2l1-1 2-2 1-4v-1c0-3-2-4-5-5v-1h-1l8-19a442 442 0 0 0 13 5c3 1 6 4 8 7a20 20 0 0 1 4 11v4z"
                                            className="st0"
                                        />
                                        <path
                                            d="M72 42v1l-7 18-7 16-7 18h-1l-3-11v-1l4-8 7-17 7-18a60 60 0 0 1 7 2zm-14-4 1 1-7 18-5 12h-2c-3-1-5-4-4-7l2-4 8-20h7z"
                                            className="st1"
                                        />
                                    </svg>
                                </Link>
                                <nav className="flex flex-col space-y-4">
                                    <Link
                                        href="/"
                                        className="text-lg font-medium text-[#243f60]"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Inicio
                                    </Link>
                                    <Link
                                        href="/about"
                                        className="text-lg text-gray-600 hover:text-[#243f60]"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Nosotros
                                    </Link>
                                    <Link
                                        href="/services"
                                        className="text-lg text-gray-600 hover:text-[#243f60]"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Servicios
                                    </Link>
                                    {/* <Link
                                        href="/gallery"
                                        className="text-lg text-gray-600 hover:text-[#243f60]"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Galería
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="text-lg text-gray-600 hover:text-[#243f60]"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Contacto
                                    </Link>
                                    <Link
                                        href="/blog"
                                        className="text-lg text-gray-600 hover:text-[#243f60]"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Blog
                                    </Link> */}
                                </nav>
                                <div className="pt-4">
                                    <Link
                                        href="https://online.fliphtml5.com/eafhl/lxmq/"
                                        target="_blank"
                                    >
                                        <Button className="w-full bg-[#243f60] hover:bg-[#1a2e48]">
                                            Catálogo
                                        </Button>
                                    </Link>
                                </div>
                                <div className="space-y-2 pt-4">
                                    <div className="flex items-center">
                                        <Phone className="h-5 w-5 text-gray-600" />
                                        <span className="ml-3 text-gray-600">
                                            +1 786 571 9496
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="h-5 w-5 text-gray-600" />
                                        <span className="ml-3 text-gray-600">
                                            info@sysvencol.com
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
