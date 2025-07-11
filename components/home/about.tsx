import LiteYouTube from "@/components/liteyoutube";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
    return (
        <section id="about" className="bg-gray-50 py-16">
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
                            comprometido a ofrecer soluciones de alta calidad
                            que cumplen con los estándares más exigentes del
                            mercado.
                        </p>
                        <p className="mt-4 text-lg text-gray-600">
                            Nuestro equipo de profesionales altamente
                            capacitados trabaja constantemente para garantizar
                            la satisfacción de nuestros clientes, ofreciendo
                            servicios personalizados y adaptados a sus
                            necesidades específicas.
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
                        <LiteYouTube
                            videoId="9SZc0FksaA4"
                            title="¿Qué Ofrecemos?"
                            backgroundImage="/bg_video.webp"
                        />

                        {/* <Image
                                src="/Home/16.png"
                                alt="Equipo Sysvencol"
                                fill
                                className="object-cover"
                            /> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
