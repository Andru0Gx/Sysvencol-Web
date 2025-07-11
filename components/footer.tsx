import Link from "next/link";
import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Mail,
    Phone,
    MapPin,
} from "lucide-react";
import { EnterpriseInfo } from "@/lib/types";

export default function Footer() {
    return (
        <footer className="bg-[#243f60] text-white">
            <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <h3 className="mb-4 text-lg font-bold">
                            Sobre Sysvencol
                        </h3>
                        <p className="mb-4 text-white/80">
                            Empresa especializada en servicios y herramientas
                            para la industria petrolera y petroquímica,
                            comprometida con la calidad y la excelencia en cada
                            proyecto.
                        </p>
                        <div className="flex space-x-4">
                            {EnterpriseInfo.socialmedia.map((social) => (
                                <Link
                                    key={social.name}
                                    href={social.url}
                                    className="text-white/80 hover:text-white"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i
                                        className={`fa-${social.type} fa-${social.icon} h-5 w-5`}
                                    ></i>
                                    <span className="sr-only">
                                        {social.name}
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-bold">
                            Enlaces rápidos
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="text-white/80 hover:text-white"
                                >
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-white/80 hover:text-white"
                                >
                                    Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services"
                                    className="text-white/80 hover:text-white"
                                >
                                    Servicios
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/gallery"
                                    className="text-white/80 hover:text-white"
                                >
                                    Galería
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-white/80 hover:text-white"
                                >
                                    Contacto
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-white/80 hover:text-white"
                                >
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-bold">Servicios</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/services/maintenance"
                                    className="text-white/80 hover:text-white"
                                >
                                    Mantenimiento de Equipos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services/transport"
                                    className="text-white/80 hover:text-white"
                                >
                                    Transporte Especializado
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services/tools"
                                    className="text-white/80 hover:text-white"
                                >
                                    Herramientas Especializadas
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services/consulting"
                                    className="text-white/80 hover:text-white"
                                >
                                    Consultoría Técnica
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services/installation"
                                    className="text-white/80 hover:text-white"
                                >
                                    Instalación de Sistemas
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services/training"
                                    className="text-white/80 hover:text-white"
                                >
                                    Capacitación
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-lg font-bold">Contacto</h3>
                        <ul className="space-y-4">
                            <li className="flex">
                                <MapPin className="mr-3 h-5 w-5 flex-shrink-0 text-white/70" />
                                <span className="text-white/80">
                                    {EnterpriseInfo.address.Monagas}
                                </span>
                            </li>
                            <li className="flex">
                                <MapPin className="mr-3 h-5 w-5 flex-shrink-0 text-white/70" />
                                <span className="text-white/80">
                                    {EnterpriseInfo.address.Zulia}
                                </span>
                            </li>
                            <li className="flex">
                                <Phone className="mr-3 h-5 w-5 flex-shrink-0 text-white/70" />
                                <span className="text-white/80">
                                    {EnterpriseInfo.phone}
                                </span>
                            </li>
                            <li className="flex">
                                <Mail className="mr-3 h-5 w-5 flex-shrink-0 text-white/70" />
                                <span className="text-white/80">
                                    {EnterpriseInfo.email}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-white/10 pt-8 text-center">
                    <p className="text-white/60">
                        © {new Date().getFullYear()} {EnterpriseInfo.name}.
                        Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}
