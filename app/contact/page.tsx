"use client";

import type React from "react";
import { Mail, Phone, MapPin, Clock, Circle } from "lucide-react";
import { EnterpriseInfo } from "@/lib/types";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ContactForm } from "@/components/contact-form";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "@/components/page-header";

export default function ContactPage() {
    const searchParams = useSearchParams();
    const serviceParam = searchParams.get("service");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    useEffect(() => {
        if (serviceParam) {
            let subject = "";
            switch (serviceParam) {
                case "maintenance":
                    subject = "services-maintenance";
                    break;
                case "transport":
                    subject = "services-transport";
                    break;
                case "tools":
                    subject = "services-tools";
                    break;
                case "consulting":
                    subject = "services-consulting";
                    break;
                case "installation":
                    subject = "services-installation";
                    break;
                case "training":
                    subject = "services-training";
                    break;
                default:
                    subject = "";
            }
            if (subject) {
                setFormData((prev) => ({ ...prev, subject }));
            }
        }
    }, [serviceParam]);

    // ...existing code...

    return (
        <div className="flex min-h-screen flex-col">
            <PageHeader
                title="Contacto"
                description="Estamos aquí para ayudarle. Contáctenos hoy mismo."
            />
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-8 lg:grid-cols-2">
                        <div>
                            <h2 className="text-2xl font-bold text-[#243f60]">
                                Información de Contacto
                            </h2>
                            <p className="mt-4 text-gray-600">
                                Estamos disponibles para responder a sus
                                preguntas y ayudarle con sus necesidades
                                específicas. No dude en ponerse en contacto con
                                nosotros a través de cualquiera de los
                                siguientes medios.
                            </p>
                            <div className="mt-8 space-y-6">
                                <div className="flex items-start">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                                        <Phone className="h-5 w-5" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-bold text-[#243f60]">
                                            Teléfono
                                        </h3>
                                        <p className="mt-1 text-gray-600">
                                            {EnterpriseInfo.phone}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                                        <Mail className="h-5 w-5" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-bold text-[#243f60]">
                                            Correo Electrónico
                                        </h3>
                                        <p className="mt-1 text-gray-600">
                                            {EnterpriseInfo.email}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                                        <MapPin className="h-5 w-5" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-bold text-[#243f60]">
                                            Dirección
                                        </h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                {/* <Circle className="mr-3 h-3 w-3 flex-shrink-0 fill-accenttext-primary" /> */}

                                                <p className="text-gray-600">
                                                    <span className="font-semibold">
                                                        Monagas
                                                    </span>
                                                    {" - "}
                                                    {
                                                        EnterpriseInfo.address
                                                            .Monagas
                                                    }
                                                </p>
                                            </div>
                                            <div className="flex items-center mt-2">
                                                {/* <Circle className="mr-3 h-3 w-3 flex-shrink-0 fill-accent text-primary" /> */}
                                                <p className="text-gray-600">
                                                    <span className="font-semibold">
                                                        Zulia
                                                    </span>
                                                    {" - "}
                                                    {
                                                        EnterpriseInfo.address
                                                            .Zulia
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                                        <Clock className="h-5 w-5" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="font-bold text-[#243f60]">
                                            Horario de Atención
                                        </h3>
                                        <p className="mt-1 text-gray-600">
                                            <span className="font-semibold">
                                                Mañana
                                            </span>{" "}
                                            - {EnterpriseInfo.horario.morning}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-semibold">
                                                Tarde
                                            </span>{" "}
                                            - {EnterpriseInfo.horario.afternoon}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Card>
                                <CardContent className="p-6 bg-[#f8fafc] ">
                                    <h2 className="text-2xl font-bold text-[#243f60]">
                                        Envíenos un Mensaje
                                    </h2>
                                    <p className="mt-2 text-gray-600">
                                        Complete el formulario a continuación y
                                        nos pondremos en contacto con usted lo
                                        antes posible.
                                    </p>
                                    <ContactForm
                                        formData={formData}
                                        setFormData={setFormData}
                                        variant="card"
                                    />
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
