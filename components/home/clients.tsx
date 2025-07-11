import Link from "next/link";
import Image from "next/image";

export default function ClientsSection() {
    const Clients = [
        {
            url: "https://www.chevron.com/",
            img: "/Clientes/Chevron.svg",
            alt: "Logotipo de Chevron",
        },
        {
            url: "https://www.repsol.com/",
            img: "/Clientes/Repsol.svg",
            alt: "Logotipo de Repsol",
        },
        {
            url: "https://www.maureletprom.fr/en/",
            img: "/Clientes/M&P.svg",
            alt: "Logotipo de Maurel & Prom",
        },
        {
            url: "https://www.slb.com/",
            img: "/Clientes/SLB.svg",
            alt: "Logotipo de Schlumberger (SLB)",
        },
        {
            url: "https://totalenergies.com/company",
            img: "/Clientes/totalenergies.webp",
            alt: "Logotipo de TotalEnergies",
        },
        {
            url: "https://www.weatherford.com/",
            img: "/Clientes/Weatherford.png",
            alt: "Logotipo de Weatherford",
        },
    ];
    return (
        <section className="py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-[#243f60] sm:text-4xl">
                        Nuestros Clientes
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Empresas líderes en la industria confían en nuestros
                        servicios
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
                    {Clients.map((client, i) => (
                        <Link
                            href={client.url}
                            target="_blank"
                            key={i}
                            className="flex items-center justify-center"
                        >
                            <Image
                                src={client.img}
                                alt={client.alt}
                                width={160}
                                height={80}
                                className="transition-all duration-300 "
                                // className="grayscale transition-all duration-300 hover:grayscale-0"
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
