"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const slides = [
    {
        id: 1,
        image: "/Home/Workshop.webp",
        alt: "Servicios industriales",
    },
    {
        id: 2,
        image: "/Home/Workshop2.webp",
        alt: "Equipos especializados",
    },
    {
        id: 3,
        image: "/Home/Workshop3.webp",
        alt: "Soluciones para la industria",
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
        }, 5000);

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
                    <Image
                        src={slide.image || "/placeholder.svg"}
                        alt={slide.alt}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                </div>
            ))}

            <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 text-white hover:bg-black/30"
                onClick={prevSlide}
            >
                <ChevronLeft className="h-8 w-8" />
                <span className="sr-only">Anterior</span>
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/20 text-white hover:bg-black/30"
                onClick={nextSlide}
            >
                <ChevronRight className="h-8 w-8" />
                <span className="sr-only">Siguiente</span>
            </Button>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
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
