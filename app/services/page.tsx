"use client";
import { useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";
import { ServicesInfo } from "@/lib/types";

import { useState } from "react";

export default function ServicesPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <PageHeader
                title="Nuestros Servicios"
                description="Soluciones especializadas para la industria petrolera y petroquímica"
            />
            {/* Todos los Servicios con filtro por categoría */}
            <section className="py-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Tabs de categorías */}
                    <CategoryTabs />
                </div>
            </section>
            <Footer />
        </div>
    );
}

// Componente para Tabs de categorías y filtrado de servicios

function CategoryTabs() {
    const servicios = Object.values(ServicesInfo.todos);
    // Categorías generales presentes en los datos
    const categoriasBase = Array.from(
        new Set(servicios.map((s) => s.category))
    );
    const categorias = ["Todos", ...categoriasBase];
    const [selectedTab, setSelectedTab] = useState<string>(categorias[0]);
    return (
        <div className="mt-12">
            <Tabs
                value={selectedTab}
                onValueChange={setSelectedTab}
                className="w-full"
            >
                <TabsList className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                    {categorias.map((cat) => (
                        <TabsTrigger
                            key={cat}
                            value={cat}
                            className="capitalize"
                        >
                            {cat}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {categorias.map((cat) => (
                    <TabsContent
                        key={cat}
                        value={cat}
                        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {(cat === "Todos"
                            ? servicios
                            : servicios.filter((s) => s.category === cat)
                        ).map((serv) => (
                            <Card
                                key={serv.title}
                                className="overflow-hidden transition-all duration-300 hover:shadow-lg"
                                id={serv.title
                                    .replace(/\s+/g, "")
                                    .toLowerCase()}
                            >
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={
                                            serv.imageUrl ||
                                            "/placeholder.svg?height=600&width=800"
                                        }
                                        alt={serv.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="mb-2 text-xl font-bold text-[#243f60]">
                                        {serv.title}
                                    </h3>
                                    <p className="mb-4 text-gray-600">
                                        {serv.description}
                                    </p>
                                    <ul className="mb-4 list-disc pl-5 text-gray-600">
                                        {(serv.content ?? []).map(
                                            (item: string, i: number) => (
                                                <li key={item}>{item}</li>
                                            )
                                        )}
                                    </ul>
                                    {serv.url && (
                                        <Button
                                            variant="ghost"
                                            className="p-0 text-[#243f60] hover:bg-transparent hover:text-[#1a2e48]"
                                            onClick={() =>
                                                (window.location.href =
                                                    serv.url)
                                            }
                                        >
                                            Ver más{" "}
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
