import Image from "next/image"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <PageHeader title="Nosotros" description="Conoce más sobre Sysvencol y nuestra trayectoria en la industria" />

      {/* Historia y Misión */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold tracking-tight text-[#243f60] sm:text-4xl">Nuestra Historia</h2>
              <p className="mt-4 text-lg text-gray-600">
                Sysvencol fue fundada en 2005 con la visión de proporcionar servicios y herramientas de alta calidad
                para la industria petrolera y petroquímica. Desde nuestros inicios, nos hemos comprometido con la
                excelencia y la innovación, lo que nos ha permitido crecer y expandirnos a nivel internacional.
              </p>
              <p className="mt-4 text-lg text-gray-600">
                A lo largo de los años, hemos desarrollado una sólida reputación por nuestra capacidad para ofrecer
                soluciones personalizadas que satisfacen las necesidades específicas de nuestros clientes, siempre
                manteniendo los más altos estándares de calidad y seguridad.
              </p>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-[#243f60]">Nuestra Misión</h3>
                <p className="mt-2 text-gray-600">
                  Proporcionar servicios y herramientas de la más alta calidad para la industria petrolera y
                  petroquímica, contribuyendo al éxito de nuestros clientes a través de soluciones innovadoras y
                  eficientes.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold text-[#243f60]">Nuestra Visión</h3>
                <p className="mt-2 text-gray-600">
                  Ser reconocidos como líderes en la provisión de servicios y herramientas para la industria petrolera y
                  petroquímica, destacándonos por nuestra excelencia, innovación y compromiso con la satisfacción del
                  cliente.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative h-[400px] overflow-hidden rounded-lg shadow-xl">
                <Image
                  src="/placeholder.svg?height=800&width=1200"
                  alt="Historia de Sysvencol"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#243f60] sm:text-4xl">Nuestros Valores</h2>
            <p className="mt-4 text-lg text-gray-600">
              En Sysvencol, nuestros valores fundamentales guían todas nuestras acciones y decisiones
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#243f60]">Excelencia</h3>
              <p className="text-gray-600">
                Nos esforzamos por alcanzar la excelencia en todo lo que hacemos, desde la calidad de nuestros servicios
                hasta la atención al cliente.
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#243f60]">Integridad</h3>
              <p className="text-gray-600">
                Actuamos con honestidad, transparencia y ética en todas nuestras relaciones comerciales y profesionales.
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#243f60]">Innovación</h3>
              <p className="text-gray-600">
                Buscamos constantemente nuevas y mejores formas de hacer las cosas, adoptando tecnologías y métodos
                innovadores.
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#243f60]">Compromiso</h3>
              <p className="text-gray-600">
                Estamos comprometidos con la satisfacción de nuestros clientes, la seguridad de nuestros empleados y la
                protección del medio ambiente.
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#243f60]">Trabajo en Equipo</h3>
              <p className="text-gray-600">
                Fomentamos la colaboración y el trabajo en equipo, valorando las contribuciones de cada miembro para
                lograr objetivos comunes.
              </p>
            </div>
            <div className="rounded-lg bg-white p-8 shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-[#243f60]">Responsabilidad Social</h3>
              <p className="text-gray-600">
                Asumimos nuestra responsabilidad con la sociedad y el medio ambiente, promoviendo prácticas sostenibles
                y contribuyendo al desarrollo de las comunidades donde operamos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#243f60] sm:text-4xl">Nuestro Equipo</h2>
            <p className="mt-4 text-lg text-gray-600">
              Contamos con un equipo de profesionales altamente capacitados y comprometidos con la excelencia
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
                <h3 className="mt-4 text-xl font-bold text-[#243f60]">Nombre Apellido</h3>
                <p className="text-gray-600">Cargo en la empresa</p>
                <p className="mt-2 text-sm text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                  dolore magna aliqua.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificaciones */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#243f60] sm:text-4xl">Certificaciones</h2>
            <p className="mt-4 text-lg text-gray-600">
              Cumplimos con los más altos estándares de calidad y seguridad en la industria
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
                <h3 className="mt-4 text-center text-lg font-bold text-[#243f60]">ISO 9001</h3>
                <p className="text-center text-sm text-gray-600">Gestión de Calidad</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#243f60] py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">¿Listo para trabajar con nosotros?</h2>
            <p className="mt-4 text-lg text-white/80">
              Contáctenos hoy mismo para discutir cómo podemos ayudarle con sus necesidades específicas
            </p>
            <div className="mt-8">
              <Button size="lg" className="bg-white text-[#243f60] hover:bg-white/90">
                Contáctenos
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
