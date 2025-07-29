import Image from "next/image";

export default function History() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="order-2 lg:order-1">
                        <h2 className="text-3xl font-bold tracking-tight text-[#243f60] sm:text-4xl">
                            Nuestra Historia
                        </h2>
                        <p className="mt-4 text-lg text-gray-600 text-justify">
                            Sysvencol fue fundada en 2005 con la visión de
                            proporcionar servicios y herramientas de alta
                            calidad para la industria petrolera y petroquímica.
                            Desde nuestros inicios, nos hemos comprometido con
                            la excelencia y la innovación, lo que nos ha
                            permitido crecer y expandirnos a nivel
                            internacional.
                        </p>
                        <p className="mt-4 text-lg text-gray-600 text-justify">
                            A lo largo de los años, hemos desarrollado una
                            sólida reputación por nuestra capacidad para ofrecer
                            soluciones personalizadas que satisfacen las
                            necesidades específicas de nuestros clientes,
                            siempre manteniendo los más altos estándares de
                            calidad y seguridad.
                        </p>
                    </div>
                    <div className="order-1 lg:order-2">
                        <div className="relative h-[500px] overflow-hidden rounded-lg shadow-xl">
                            <Image
                                src="/Us/WORKSHOP-I-2025.webp"
                                alt="Historia de Sysvencol"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
