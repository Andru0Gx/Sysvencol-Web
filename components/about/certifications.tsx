import Image from "next/image";

export default function CertificationSection() {
    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-[#243f60] sm:text-4xl">
                        Certificaciones
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Cumplimos con los más altos estándares de calidad y
                        seguridad en la industria
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4">
                    {[1, 2, 3, 4].map((cert) => (
                        <div key={cert} className="flex flex-col items-center">
                            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white p-4 shadow-md">
                                <Image
                                    src={`/placeholder.svg?height=100&width=100`}
                                    alt={`Certificación ${cert}`}
                                    width={100}
                                    height={100}
                                />
                            </div>
                            <h3 className="mt-4 text-center text-lg font-bold text-[#243f60]">
                                ISO 9001
                            </h3>
                            <p className="text-center text-sm text-gray-600">
                                Gestión de Calidad
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
