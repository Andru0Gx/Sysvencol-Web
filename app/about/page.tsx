import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import PageHeader from "@/components/page-header";

import TeamSection from "@/components/about/Team";
import CertificationSection from "@/components/about/certifications";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            {/* 
            <PageHeader
                title="Nosotros"
                description="Conoce más sobre Sysvencol y nuestra trayectoria en la industria"
            /> */}

            {/* Historia y Misión */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-3xl font-bold tracking-tight text-[#243f60] sm:text-4xl">
                                Nuestra Historia
                            </h2>
                            <p className="mt-4 text-lg text-gray-600">
                                Sysvencol fue fundada en 2005 con la visión de
                                proporcionar servicios y herramientas de alta
                                calidad para la industria petrolera y
                                petroquímica. Desde nuestros inicios, nos hemos
                                comprometido con la excelencia y la innovación,
                                lo que nos ha permitido crecer y expandirnos a
                                nivel internacional.
                            </p>
                            <p className="mt-4 text-lg text-gray-600">
                                A lo largo de los años, hemos desarrollado una
                                sólida reputación por nuestra capacidad para
                                ofrecer soluciones personalizadas que satisfacen
                                las necesidades específicas de nuestros
                                clientes, siempre manteniendo los más altos
                                estándares de calidad y seguridad.
                            </p>

                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-[#243f60]">
                                    Nuestra Misión
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Somos una empresa dedicada a la actividad
                                    petrolera mediante los Servicios y
                                    Suministros, ofreciendo soluciones oportunas
                                    para ejecutar y optimizar los procesos del
                                    cliente. Contando un equipo altamente
                                    capacitado y utilizando tecnologías de
                                    vanguardia, garantizando la eficiencia y la
                                    confiabilidad.
                                </p>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-[#243f60]">
                                    Nuestra Visión
                                </h3>
                                <p className="mt-2 text-gray-600">
                                    Constituirse en el proveedor líder de
                                    Servicios y Suministros de la industria
                                    petrolera de Venezuela y América del Sur,
                                    reconocido por mantener los más altos
                                    estándares de calidad y servicio, pioneros
                                    en la implementación de nuevas tecnologías
                                    que agreguen valor a las operaciones de
                                    nuestros clientes.
                                </p>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="relative h-[400px] overflow-hidden rounded-lg shadow-xl">
                                <Image
                                    src="/Us/Empresa.jpg"
                                    alt="Historia de Sysvencol"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Valores */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-[#243f60] sm:text-4xl">
                            Nuestros Valores
                        </h2>
                        <p className="mt-4 text-lg text-gray-600">
                            En Sysvencol, nuestros valores fundamentales guían
                            todas nuestras acciones y decisiones
                        </p>
                    </div>

                    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-lg bg-white p-8 shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-[#243f60]">
                                Excelencia
                            </h3>
                            <p className="text-gray-600">
                                Nos esforzamos por alcanzar la excelencia en
                                todo lo que hacemos, desde la calidad de
                                nuestros servicios hasta la atención al cliente.
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-8 shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-[#243f60]">
                                Integridad
                            </h3>
                            <p className="text-gray-600">
                                Actuamos con honestidad, transparencia y ética
                                en todas nuestras relaciones comerciales y
                                profesionales.
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-8 shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-[#243f60]">
                                Innovación
                            </h3>
                            <p className="text-gray-600">
                                Buscamos constantemente nuevas y mejores formas
                                de hacer las cosas, adoptando tecnologías y
                                métodos innovadores.
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-8 shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-[#243f60]">
                                Compromiso
                            </h3>
                            <p className="text-gray-600">
                                Estamos comprometidos con la satisfacción de
                                nuestros clientes, la seguridad de nuestros
                                empleados y la protección del medio ambiente.
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-8 shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-[#243f60]">
                                Trabajo en Equipo
                            </h3>
                            <p className="text-gray-600">
                                Fomentamos la colaboración y el trabajo en
                                equipo, valorando las contribuciones de cada
                                miembro para lograr objetivos comunes.
                            </p>
                        </div>
                        <div className="rounded-lg bg-white p-8 shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-[#243f60]">
                                Responsabilidad Social
                            </h3>
                            <p className="text-gray-600">
                                Asumimos nuestra responsabilidad con la sociedad
                                y el medio ambiente, promoviendo prácticas
                                sostenibles y contribuyendo al desarrollo de las
                                comunidades donde operamos.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certificaciones */}

            {/* CTA */}
            <section className="bg-[#243f60] py-16 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            ¿Listo para trabajar con nosotros?
                        </h2>
                        <p className="mt-4 text-lg text-white/80">
                            Contáctenos hoy mismo para discutir cómo podemos
                            ayudarle con sus necesidades específicas
                        </p>
                        <div className="mt-8">
                            <Button
                                size="lg"
                                className="bg-white text-[#243f60] hover:bg-white/90"
                            >
                                Contáctenos
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
