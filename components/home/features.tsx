import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, ShieldCheck, Users } from "lucide-react";

export default function FeaturesSection() {
    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <Card className="border-none shadow-lg">
                        <CardContent className="flex flex-col items-center p-6 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                                <BadgeCheck className="h-8 w-8" />
                            </div>
                            <h3 className="mt-4 text-xl font-bold">
                                Experiencia Comprobada
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Más de 20 años de experiencia en la industria
                                petrolera y petroquímica
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-lg">
                        <CardContent className="flex flex-col items-center p-6 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                                <ShieldCheck className="h-8 w-8" />
                            </div>
                            <h3 className="mt-4 text-xl font-bold">
                                Calidad Garantizada
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Comprometidos con los más altos estándares de
                                calidad y seguridad
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="border-none shadow-lg">
                        <CardContent className="flex flex-col items-center p-6 text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                                <Users className="h-8 w-8" />
                            </div>
                            <h3 className="mt-4 text-xl font-bold">
                                Equipo Especializado
                            </h3>
                            <p className="mt-2 text-gray-600">
                                Personal altamente capacitado y certificado para
                                cada proyecto
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
