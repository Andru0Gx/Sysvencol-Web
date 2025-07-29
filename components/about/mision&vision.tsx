export default function MisionVision() {
    return (
        <section className="relative py-24 overflow-hidden">
            {/* Fondo abstracto SVG */}
            <svg
                className="absolute left-0 top-0 w-full h-full z-0"
                viewBox="0 0 1440 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
            >
                <path
                    d="M0,400 Q400,300 800,400 T1440,400 L1440,600 L0,600 Z"
                    fill="#e0e7ef"
                />
                <path
                    d="M0,300 Q500,200 900,350 T1440,300 L1440,600 L0,600 Z"
                    fill="#243f60"
                    fillOpacity="0.85"
                />

                <ellipse
                    cx="1100"
                    cy="350"
                    rx="200"
                    ry="100"
                    fill="#243f60"
                    fillOpacity="0.07"
                />
            </svg>
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* Misión */}
                <div className="lg:w-1/2 w-full text-justify bg-white/80 rounded-2xl shadow-lg p-10 backdrop-blur-sm hover:scale-105 transition-all">
                    <h3 className="text-3xl font-bold text-[#243f60] mb-4">
                        Nuestra Misión
                    </h3>
                    <p className="text-lg text-gray-700">
                        Somos una empresa dedicada a la actividad petrolera
                        mediante los Servicios y Suministros, ofreciendo
                        soluciones oportunas para ejecutar y optimizar los
                        procesos del cliente. Contando con un equipo altamente
                        capacitado y utilizando tecnologías de vanguardia,
                        garantizando la eficiencia y la confiabilidad.
                    </p>
                </div>
                {/* Visión */}
                <div className="lg:w-1/2 w-full text-justify bg-white/80 rounded-2xl shadow-lg p-10 backdrop-blur-sm hover:scale-105 transition-all">
                    <h3 className="text-3xl font-bold text-[#243f60] mb-4">
                        Nuestra Visión
                    </h3>
                    <p className="text-lg text-gray-700">
                        Constituirse en el proveedor líder de Servicios y
                        Suministros de la Industria Petrolera de Venezuela y
                        América del Sur, reconocido por mantener los más altos
                        estándares de calidad y servicio, pioneros en la
                        implementación de nuevas tecnologías que agreguen valor
                        a las operaciones de nuestros clientes.
                    </p>
                </div>
            </div>
        </section>
    );
}
