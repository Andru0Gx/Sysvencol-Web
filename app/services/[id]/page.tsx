import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ServicesInfo } from "@/lib/types";

function slugify(str: string) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

export default async function ServiceDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const awaitedParams = await params;
    const { id } = awaitedParams;
    // Buscar el servicio por slug
    const serviceEntry = Object.entries(ServicesInfo.todos).find(
        ([key, value]) => slugify(key) === id
    );
    const service = serviceEntry ? serviceEntry[1] : null;

    if (!service) {
        return (
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <div className="container mx-auto flex flex-1 items-center justify-center px-4 py-16 text-center">
                    <div>
                        <h1 className="text-3xl font-bold text-[#243f60]">
                            Servicio no encontrado
                        </h1>
                        <p className="mt-4 text-gray-600">
                            Lo sentimos, el servicio que estás buscando no
                            existe o ha sido descontinuado.
                        </p>
                        <Link href="/services">
                            <Button className="mt-8 bg-[#243f60] hover:bg-[#1a2e48]">
                                Ver todos los servicios
                            </Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                {/* Breadcrumbs */}
                <div className="mb-8 hover:bg-gray-100 px-2 py-1 rounded-full w-fit">
                    <Link
                        href="/services"
                        className="flex items-center text-[#243f60] hover:text-[#1a2e48] "
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver a Servicios
                    </Link>
                </div>

                {/* Service Overview */}
                <div className="mb-12">
                    <div className="grid gap-12 lg:grid-cols-2">
                        <div>
                            <h1 className="text-3xl font-bold text-[#243f60]">
                                {service.title}
                            </h1>
                            <div className="prose prose-lg mt-6 max-w-none">
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: service.description || "",
                                    }}
                                />
                            </div>

                            {service.content && (
                                <div className="mt-8">
                                    <h2 className="text-xl font-bold text-[#243f60]">
                                        Características del Servicio
                                    </h2>
                                    <ul className="mt-4 space-y-2">
                                        {service.content.map(
                                            (
                                                feature: string,
                                                index: number
                                            ) => (
                                                <li
                                                    key={index}
                                                    className="flex items-start"
                                                >
                                                    <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                                                    <span>{feature}</span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            )}

                            <div className="mt-8">
                                <Link href="/contact">
                                    <Button
                                        size="lg"
                                        className="bg-[#243f60] hover:bg-[#1a2e48]"
                                    >
                                        Solicitar Información
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div>
                            <div className="overflow-hidden rounded-lg">
                                <Image
                                    src={service.imageUrl || "/placeholder.svg"}
                                    alt={service.title}
                                    width={800}
                                    height={600}
                                    className="w-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Detalles del Servicio (PostContent) */}
                    {service.CompleteDescription && (
                        <section className="mt-16 w-full border-t-2 pt-8">
                            <h2 className="text-2xl font-bold text-[#243f60] mb-8 text-center">
                                Descripción del Servicio
                            </h2>
                            <div className="prose prose-lg w-full max-w-none mb-10 text-justify">
                                {service.CompleteDescription}
                            </div>
                            {service.PostContent &&
                                service.PostContent.length > 0 && (
                                    <div className="mt-12 w-full">
                                        <Accordion
                                            type="multiple"
                                            className="w-full"
                                        >
                                            {service.PostContent.map(
                                                (item: any, idx: number) => (
                                                    <AccordionItem
                                                        value={`item-${idx}`}
                                                        key={idx}
                                                    >
                                                        <AccordionTrigger
                                                            className="text-lg font-semibold text-[#243f60] px-4 py-4 rounded transition-colors data-[state=open]:bg-[#243f60] data-[state=open]:text-white"
                                                            style={{
                                                                transition:
                                                                    "background-color 0.3s ease",
                                                            }}
                                                        >
                                                            <span className="block w-full text-left">
                                                                {item.title}
                                                            </span>
                                                        </AccordionTrigger>
                                                        <AccordionContent>
                                                            <p className="text-gray-800 text-base leading-relaxed bg-[#efefef] p-4">
                                                                {item.paragraph}
                                                            </p>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                )
                                            )}
                                        </Accordion>
                                    </div>
                                )}
                        </section>
                    )}
                </div>

                {/* CTA Section */}
                <div className="mt-16 rounded-lg bg-[#243f60] p-8 text-white">
                    <div className="grid gap-8 md:grid-cols-2 md:items-center">
                        <div>
                            <h2 className="text-2xl font-bold">
                                ¿Listo para mejorar sus operaciones?
                            </h2>
                            <p className="mt-4">
                                Contáctenos hoy mismo para discutir cómo
                                nuestros servicios de{" "}
                                {service.title.toLowerCase()} pueden ayudar a su
                                empresa a alcanzar nuevos niveles de eficiencia
                                y rendimiento.
                            </p>
                        </div>
                        <div className="flex justify-center md:justify-end">
                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white hover:bg-[#efefef] text-[#243f60]"
                                >
                                    Contactar Ahora
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Related Services */}
                {service.category && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold text-[#243f60]">
                            Servicios Relacionados
                        </h2>
                        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {Object.entries(ServicesInfo.todos)
                                .filter(
                                    ([key, s]) =>
                                        s.category === service.category &&
                                        slugify(key) !== id
                                )
                                .map(([key, s]) => (
                                    <div
                                        key={key}
                                        className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm"
                                    >
                                        <div className="relative h-48">
                                            <Image
                                                src={
                                                    s.imageUrl ||
                                                    "/placeholder.svg"
                                                }
                                                alt={s.title}
                                                width={400}
                                                height={300}
                                                className="object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <h3 className="text-xl font-bold text-[#243f60]">
                                                {s.title}
                                            </h3>
                                            <p className="mt-2 text-gray-600">
                                                {s.description}
                                            </p>
                                            <Link
                                                href={`/services/${slugify(
                                                    key
                                                )}`}
                                            >
                                                <Button className="mt-4 bg-[#243f60] hover:bg-[#1a2e48]">
                                                    Ver Detalles
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}
