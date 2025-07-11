import HeroCarousel from "@/components/hero-carousel";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="relative">
            <HeroCarousel />
            <div className="absolute inset-0 flex items-center bg-black/30">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                            Soluciones industriales de alta calidad
                        </h1>
                        <p className="mt-4 text-lg text-white/90 md:text-xl">
                            Especialistas en servicios y herramientas para la
                            industria petrolera y petroquímica
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Button // redirects to the services page
                                size="lg"
                                className="bg-[#243f60] hover:bg-[#1a2e48]"
                            >
                                Nuestros Servicios{" "}
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Link href="Catalogo.pdf" target="_blank">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="bg-white/10 text-white hover:bg-white/20"
                                >
                                    Catálogo{" "}
                                    <Download className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
