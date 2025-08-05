import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Phone, Mail, MapPin } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { EnterpriseInfo } from "@/lib/types";

import { useState } from "react";

export default function CtaSection() {
    // Define initial form data structure according to ContactFormProps
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    // ...existing code...

    return (
        <section id="contact" className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="rounded-2xl bg-[#243f60] p-8 shadow-xl sm:p-12">
                    <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                ¿Listo para mejorar sus operaciones?
                            </h2>
                            <p className="mt-4 text-lg text-white/80">
                                Contáctenos hoy mismo para discutir cómo podemos
                                ayudarle a optimizar sus procesos y aumentar su
                                productividad.
                            </p>
                            <div className="mt-8 space-y-4">
                                <div className="flex items-center">
                                    <Phone className="h-5 w-5 text-white/70" />
                                    <span className="ml-3 text-white">
                                        {EnterpriseInfo.phone}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <Mail className="h-5 w-5 text-white/70" />
                                    <span className="ml-3 text-white">
                                        {EnterpriseInfo.email}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-5 w-5 text-white/70" />
                                    <span className="ml-3 text-white">
                                        <span className="text-white font-bold">
                                            Monagas -
                                        </span>
                                        {EnterpriseInfo.address.Monagas}
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <MapPin className="h-5 w-5 text-white/70" />
                                    <span className="ml-3 text-white w-fit">
                                        <span className="text-white font-bold">
                                            Zulia -
                                        </span>
                                        {EnterpriseInfo.address.Zulia}
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
                            <ContactForm
                                formData={formData}
                                setFormData={setFormData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
