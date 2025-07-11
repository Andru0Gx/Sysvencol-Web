import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
    return (
        <section id="testimonials" className="bg-[#243f60] py-16 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Lo que dicen nuestros clientes
                    </h2>
                    <p className="mt-4 text-lg text-white/80">
                        La satisfacción de nuestros clientes es nuestra mayor
                        prioridad
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
                                compromiso con la calidad son excepcionales."
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
                                "Las herramientas suministradas por Sysvencol
                                son de la más alta calidad y han superado
                                nuestras expectativas en rendimiento y
                                durabilidad."
                            </p>
                            <div className="mt-6 flex items-center">
                                <div className="h-10 w-10 rounded-full bg-white/20"></div>
                                <div className="ml-3">
                                    <p className="font-medium">
                                        Alejandro Méndez
                                    </p>
                                    <p className="text-sm text-white/70">
                                        Jefe de Mantenimiento, OilTech Solutions
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
