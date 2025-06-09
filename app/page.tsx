"use client";

import type React from "react";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    ChevronRight,
    Phone,
    Mail,
    MapPin,
    ArrowRight,
    Download,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HeroCarousel from "@/components/hero-carousel";
import ServiceCard from "@/components/service-card";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Home() {
    // Referencias para desplazamiento suave
    const aboutRef = useRef<HTMLElement>(null);
    const servicesRef = useRef<HTMLElement>(null);
    const testimonialsRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);

    // Función para desplazamiento suave
    const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const Clients = [
        {
            url: "https://www.chevron.com/",
            img: "/Clientes/Chevron.svg",
            alt: "Logotipo de Chevron",
        },
        {
            url: "https://www.repsol.com/",
            img: "/Clientes/Repsol.svg",
            alt: "Logotipo de Repsol",
        },
        {
            url: "https://www.maureletprom.fr/en/",
            img: "/Clientes/M&P.svg",
            alt: "Logotipo de Maurel & Prom",
        },
        {
            url: "https://www.slb.com/",
            img: "/Clientes/SLB.svg",
            alt: "Logotipo de Schlumberger (SLB)",
        },
        {
            url: "https://totalenergies.com/company",
            img: "/Clientes/totalenergies.webp",
            alt: "Logotipo de TotalEnergies",
        },
        {
            url: "https://www.weatherford.com/",
            img: "/Clientes/Weatherford.png",
            alt: "Logotipo de Weatherford",
        },
    ];

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="relative">
                <HeroCarousel />
                <div className="absolute inset-0 flex items-center bg-black/30">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-2xl">
                            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                                Soluciones industriales de alta calidad
                            </h1>
                            <p className="mt-4 text-lg text-white/90 md:text-xl">
                                Especialistas en servicios y herramientas para
                                la industria petrolera y petroquímica
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Button
                                    size="lg"
                                    className="bg-[#243f60] hover:bg-[#1a2e48]"
                                    onClick={() => scrollToSection(servicesRef)}
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

            {/* Features Section */}
            <section className="bg-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        <Card className="border-none shadow-lg">
                            <CardContent className="flex flex-col items-center p-6 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="12" cy="12" r="10" />
                                        <path d="m4.9 4.9 14.2 14.2" />
                                        <path d="M12 7v5l2.5 1.5" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-xl font-bold">
                                    Experiencia Comprobada
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Más de 20 años de experiencia en la
                                    industria petrolera y petroquímica
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-lg">
                            <CardContent className="flex flex-col items-center p-6 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                                        <path d="m14.5 9-5 5" />
                                        <path d="m9.5 9 5 5" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-xl font-bold">
                                    Calidad Garantizada
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Comprometidos con los más altos estándares
                                    de calidad y seguridad
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="border-none shadow-lg">
                            <CardContent className="flex flex-col items-center p-6 text-center">
                                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="32"
                                        height="32"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                </div>
                                <h3 className="mt-4 text-xl font-bold">
                                    Equipo Especializado
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Personal altamente capacitado y certificado
                                    para cada proyecto
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section ref={aboutRef} id="about" className="bg-gray-50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-8 lg:grid-cols-2">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-[#243f60] sm:text-4xl">
                                Sobre Sysvencol
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Somos una empresa especializada en servicios y
                                herramientas para la industria petrolera y
                                petroquímica. Desde nuestra fundación, nos hemos
                                comprometido a ofrecer soluciones de alta
                                calidad que cumplen con los estándares más
                                exigentes del mercado.
                            </p>
                            <p className="mt-4 text-lg text-gray-600">
                                Nuestro equipo de profesionales altamente
                                capacitados trabaja constantemente para
                                garantizar la satisfacción de nuestros clientes,
                                ofreciendo servicios personalizados y adaptados
                                a sus necesidades específicas.
                            </p>
                            <div className="mt-8">
                                <Link href="/about">
                                    <Button className="bg-[#243f60] hover:bg-[#1a2e48]">
                                        Conoce más sobre nosotros{" "}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="relative h-[400px] overflow-hidden rounded-lg shadow-xl">
                            <Image
                                src="/Home/16.png"
                                alt="Equipo Sysvencol"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section ref={servicesRef} id="services" className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-[#243f60] sm:text-4xl">
                            Nuestros Servicios
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Ofrecemos una amplia gama de servicios
                            especializados para la industria petrolera y
                            petroquímica
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <ServiceCard
                            title="Mantenimiento de Equipos"
                            description="Servicio especializado de mantenimiento preventivo y correctivo para equipos industriales."
                            icon="wrench"
                            imageUrl="/placeholder.svg?height=600&width=800"
                            url="/services#maintenance"
                        />
                        <ServiceCard
                            title="Transporte Especializado"
                            description="Transporte seguro y eficiente de equipos y materiales para la industria petrolera."
                            icon="truck"
                            imageUrl="/placeholder.svg?height=600&width=800"
                            url="/services#transport"
                        />
                        <ServiceCard
                            title="Herramientas Especializadas"
                            description="Suministro de herramientas de alta calidad diseñadas para trabajos específicos."
                            icon="tool"
                            imageUrl="/placeholder.svg?height=600&width=800"
                            url="/services#tools"
                        />
                    </div>

                    <div className="mt-12 text-center">
                        <Link href="/services">
                            <Button
                                size="lg"
                                className="bg-[#243f60] hover:bg-[#1a2e48]"
                            >
                                Ver todos los servicios{" "}
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials Section
            <section
                ref={testimonialsRef}
                id="testimonials"
                className="bg-[#243f60] py-16 text-white"
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Lo que dicen nuestros clientes
                        </h2>
                        <p className="mt-4 text-lg text-white/80">
                            La satisfacción de nuestros clientes es nuestra
                            mayor prioridad
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="bg-white/10 border-none">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-1 text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            stroke="none"
                                        >
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="mt-4 text-white/90">
                                    "Sysvencol ha sido un socio confiable para
                                    nuestra empresa. Su equipo profesional y su
                                    compromiso con la calidad son
                                    excepcionales."
                                </p>
                                <div className="mt-6 flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-white/20"></div>
                                    <div className="ml-3">
                                        <p className="font-medium">
                                            Carlos Rodríguez
                                        </p>
                                        <p className="text-sm text-white/70">
                                            Director de Operaciones, Petro
                                            Industries
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/10 border-none">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-1 text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            stroke="none"
                                        >
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="mt-4 text-white/90">
                                    "El servicio de mantenimiento que nos
                                    proporciona Sysvencol ha mejorado
                                    significativamente la eficiencia de nuestros
                                    equipos."
                                </p>
                                <div className="mt-6 flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-white/20"></div>
                                    <div className="ml-3">
                                        <p className="font-medium">
                                            María González
                                        </p>
                                        <p className="text-sm text-white/70">
                                            Gerente de Planta, ChemTech
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white/10 border-none">
                            <CardContent className="p-6">
                                <div className="flex items-center space-x-1 text-yellow-400">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            stroke="none"
                                        >
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="mt-4 text-white/90">
                                    "Las herramientas suministradas por
                                    Sysvencol son de la más alta calidad y han
                                    superado nuestras expectativas en
                                    rendimiento y durabilidad."
                                </p>
                                <div className="mt-6 flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-white/20"></div>
                                    <div className="ml-3">
                                        <p className="font-medium">
                                            Alejandro Méndez
                                        </p>
                                        <p className="text-sm text-white/70">
                                            Jefe de Mantenimiento, OilTech
                                            Solutions
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section> */}

            {/* Clients Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-[#243f60] sm:text-4xl">
                            Nuestros Clientes
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Empresas líderes en la industria confían en nuestros
                            servicios
                        </p>
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
                        {Clients.map((client, i) => (
                            <Link
                                href={client.url}
                                target="_blank"
                                key={i}
                                className="flex items-center justify-center"
                            >
                                <Image
                                    src={client.img}
                                    alt={client.alt}
                                    width={160}
                                    height={80}
                                    className="grayscale transition-all duration-300 hover:grayscale-0"
                                />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section ref={contactRef} id="contact" className="bg-gray-50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl bg-[#243f60] p-8 shadow-xl sm:p-12">
                        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
                            <div>
                                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    ¿Listo para mejorar sus operaciones?
                                </h2>
                                <p className="mt-4 text-lg text-white/80">
                                    Contáctenos hoy mismo para discutir cómo
                                    podemos ayudarle a optimizar sus procesos y
                                    aumentar su productividad.
                                </p>
                                <div className="mt-8 space-y-4">
                                    <div className="flex items-center">
                                        <Phone className="h-5 w-5 text-white/70" />
                                        <span className="ml-3 text-white">
                                            +1 786 571 9496 / +58 251 8175112
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="h-5 w-5 text-white/70" />
                                        <span className="ml-3 text-white">
                                            info@sysvencol.com /
                                            sysvencol@gmail.com
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <MapPin className="h-5 w-5 text-white/70" />
                                        <span className="ml-3 text-white">
                                            2900 SW 28th Terrace Suite 202,
                                            Miami FL 33133
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-8">
                                    <Link href="/contact">
                                        <Button className="bg-white text-[#243f60] hover:bg-white/90">
                                            Contactar ahora{" "}
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                            <div>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
