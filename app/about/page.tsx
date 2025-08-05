import Image from "next/image";
import { Bold, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageHeader from "@/components/page-header";

import MisionVision from "@/components/about/mision&vision";
import History from "@/components/about/history";
import Valores from "@/components/about/valores";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            {/* <PageHeader
                title="Nosotros"
                description="Conoce más sobre Sysvencol y nuestra trayectoria en la industria"
            /> */}
            {/* Historia y Misión */}
            <History />
            <MisionVision />
            <Valores />

            {/* CTA */}
            <section className="bg-[#243f60] py-16 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            ¿Listo para trabajar con nosotros?
                        </h2>
                        <p className="mt-4 text-lg text-white/80">
                            Contáctanos hoy mismo para discutir cómo podemos
                            ayudarle con sus necesidades específicas
                        </p>
                        <div className="mt-8">
                            <a href="/contact">
                                <Button
                                    size="lg"
                                    className="bg-white text-[#243f60] hover:bg-white/90"
                                >
                                    Contáctanos
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
