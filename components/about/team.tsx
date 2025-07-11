import Image from "next/image";

export default function TeamSection() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-[#243f60] sm:text-4xl">
                        Nuestro Equipo
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Contamos con un equipo de profesionales altamente
                        capacitados y comprometidos con la excelencia
                    </p>
                </div>

                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((member) => (
                        <div key={member} className="text-center">
                            <div className="mx-auto h-48 w-48 overflow-hidden rounded-full">
                                <Image
                                    src={`/placeholder.svg?height=200&width=200`}
                                    alt={`Miembro del equipo ${member}`}
                                    width={200}
                                    height={200}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <h3 className="mt-4 text-xl font-bold text-[#243f60]">
                                Nombre Apellido
                            </h3>
                            <p className="text-gray-600">Cargo en la empresa</p>
                            <p className="mt-2 text-sm text-gray-500">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
