"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

import { Button } from "@/components/ui/button";

const slides = [
    {
        id: 1,
        image: "/Home/Sysvencol.webp",
        alt: "Sysvencol, C.A.",
        title: "Soluciones industriales de alta calidad",
        description:
            "Especialistas en servicios y herramientas para la industria petrolera y petroquímica",
        buttons: [
            {
                label: "Catálogo",
                href: "Catalogo.pdf",
                icon: <Download className="ml-2 h-4 w-4" />,
                target: "_blank",
            },
        ],
    },
    {
        id: 2,
        image: "/Home/Equipo.webp",
        alt: "Completación de pozos",
        title: "Completación de pozos",
        description:
            "Soluciones avanzadas para la completación de pozos petroleros, optimizando la producción y seguridad.",
        buttons: [
            {
                label: "Ver Servicios",
                href: "/services",
                icon: <ChevronRight className="ml-2 h-4 w-4" />,
                target: "",
            },
        ],
    },
    {
        id: 3,
        image: "/Home/Carrillo.webp",
        alt: "Servicios industriales",
        title: "Servicios industriales",
        description:
            "Especialistas en servicios para la industria petrolera y petroquímica, con equipos de última generación.",
        buttons: [
            {
                label: "Ver Servicios",
                href: "/services",
                icon: <ChevronRight className="ml-2 h-4 w-4" />,
                target: "",
            },
        ],
    },
    {
        id: 4,
        image: "/Home/herramientas.webp",
        alt: "Herramientas y equipos especializados",
        title: "Herramientas y equipos especializados",
        description:
            "Contamos con herramientas y equipos especializados para cada necesidad industrial, garantizando eficiencia y calidad.",
        buttons: [
            {
                label: "Solicitar Información",
                href: "/contact",
                icon: null,
                target: "",
            },
        ],
    },
    {
        id: 5,
        image: "/Home/Workshop3.webp",
        alt: "Soluciones para la industria",
        title: "Soluciones para la industria",
        description:
            "Ofrecemos soluciones integrales para la industria, adaptadas a cada cliente y proyecto.",
        buttons: [
            {
                label: "Nuestros Clientes",
                href: "/about",
                icon: null,
                target: "",
            },
        ],
    },
];

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Cambia de slide cada 5 segundos

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-[500px] w-full overflow-hidden md:h-[600px] lg:h-[700px]">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                >
                    {index === currentSlide && (
                        <div className="absolute inset-0 flex items-center bg-black/60 z-20">
                            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="max-w-2xl">
                                    <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                                        {slide.title}
                                    </h1>
                                    <p className="mt-4 text-lg text-white/90 md:text-xl">
                                        {slide.description}
                                    </p>
                                    <div className="mt-8 flex flex-wrap gap-4">
                                        {slide.buttons.map((btn, i) => (
                                            <Link
                                                href={btn.href}
                                                key={i}
                                                target={btn.target}
                                            >
                                                <Button
                                                    size="lg"
                                                    className="text-[#243f60] bg-white hover:bg-[#1a2e48] hover:text-white"
                                                >
                                                    {btn.label} {btn.icon}
                                                </Button>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <Image
                        src={slide.image || "/placeholder.svg"}
                        alt={slide.alt}
                        fill
                        className="object-cover pointer-events-none"
                        priority={index === 0}
                    />
                </div>
            ))}

            <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/20 text-white hover:bg-black/30"
                onClick={prevSlide}
            >
                <ChevronLeft className="h-8 w-8" />
                <span className="sr-only">Anterior</span>
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/20 text-white hover:bg-black/30"
                onClick={nextSlide}
            >
                <ChevronRight className="h-8 w-8" />
                <span className="sr-only">Siguiente</span>
            </Button>

            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        className={`h-2 w-8 rounded-full transition-all ${
                            index === currentSlide ? "bg-white" : "bg-white/50"
                        }`}
                        onClick={() => setCurrentSlide(index)}
                    >
                        <span className="sr-only">Slide {index + 1}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
