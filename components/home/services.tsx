import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/service-card";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ServicesInfo } from "@/lib/types";

export default function ServicesSection() {
    return (
        <section id="services" className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-[#243f60] sm:text-4xl">
                        Nuestros Servicios
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Ofrecemos una amplia gama de servicios especializados
                        para la industria petrolera y petroquímica
                    </p>
                </div>

                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {ServicesInfo.principalesInfo.map((service) => (
                        <ServiceCard
                            key={service.title}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                            imageUrl={service.imageUrl}
                            url={service.url}
                        />
                    ))}
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
    );
}
