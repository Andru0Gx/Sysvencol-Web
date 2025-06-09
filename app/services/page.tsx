"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"

const services = [
  {
    id: "maintenance",
    title: "Mantenimiento de Equipos",
    description: "Servicio especializado de mantenimiento preventivo y correctivo para equipos industriales.",
  },
  {
    id: "transport",
    title: "Transporte Especializado",
    description: "Transporte seguro y eficiente de equipos y materiales para la industria petrolera.",
  },
  {
    id: "tools",
    title: "Herramientas Especializadas",
    description: "Suministro de herramientas de alta calidad diseñadas para trabajos específicos.",
  },
  {
    id: "consulting",
    title: "Consultoría Técnica",
    description: "Asesoramiento experto para optimizar procesos y mejorar la eficiencia operativa.",
  },
  {
    id: "installation",
    title: "Instalación de Sistemas",
    description: "Instalación profesional de sistemas y equipos para la industria petrolera.",
  },
  {
    id: "training",
    title: "Capacitación",
    description: "Programas de capacitación para el personal técnico y operativo.",
  },
]

export default function ServicesPage() {
  const searchParams = useSearchParams()
  const defaultTab = searchParams.get("tab") || "maintenance"

  // Referencias para desplazamiento a secciones específicas
  const maintenanceRef = useRef<HTMLDivElement>(null)
  const transportRef = useRef<HTMLDivElement>(null)
  const toolsRef = useRef<HTMLDivElement>(null)
  const consultingRef = useRef<HTMLDivElement>(null)
  const installationRef = useRef<HTMLDivElement>(null)
  const trainingRef = useRef<HTMLDivElement>(null)

  // Mapa de referencias para facilitar el acceso
  const refs = {
    maintenance: maintenanceRef,
    transport: transportRef,
    tools: toolsRef,
    consulting: consultingRef,
    installation: installationRef,
    training: trainingRef,
  }

  // Efecto para manejar los anclajes en la URL
  useEffect(() => {
    const hash = window.location.hash.replace("#", "")
    if (hash && refs[hash as keyof typeof refs]?.current) {
      refs[hash as keyof typeof refs].current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <PageHeader
        title="Nuestros Servicios"
        description="Soluciones especializadas para la industria petrolera y petroquímica"
      />

      {/* Servicios Principales */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#243f60] sm:text-4xl">Servicios Principales</h2>
            <p className="mt-4 text-lg text-gray-600">
              Ofrecemos una amplia gama de servicios especializados para satisfacer las necesidades de la industria
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden transition-all duration-300 hover:shadow-lg" id={service.id}>
                <div className="relative h-48 w-full">
                  <Image
                    src="/placeholder.svg?height=600&width=800"
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-[#243f60]">{service.title}</h3>
                  <p className="mb-4 text-gray-600">{service.description}</p>
                  <Button
                    variant="ghost"
                    className="p-0 text-[#243f60] hover:bg-transparent hover:text-[#1a2e48]"
                    onClick={() => {
                      const ref = refs[service.id as keyof typeof refs]
                      if (ref?.current) {
                        ref.current.scrollIntoView({ behavior: "smooth" })
                      }
                    }}
                  >
                    Más información <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Detalles de Servicios */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue={defaultTab} className="w-full">
            <div className="mx-auto mb-8 max-w-md">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="maintenance">Mantenimiento</TabsTrigger>
                <TabsTrigger value="transport">Transporte</TabsTrigger>
                <TabsTrigger value="tools">Herramientas</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="maintenance">
              <div ref={maintenanceRef} className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-bold text-[#243f60]">Mantenimiento de Equipos</h3>
                  <p className="mt-4 text-gray-600">
                    Nuestro servicio de mantenimiento de equipos está diseñado para garantizar el funcionamiento óptimo
                    y prolongar la vida útil de sus activos industriales. Contamos con técnicos altamente capacitados y
                    utilizamos las últimas tecnologías para proporcionar un servicio de calidad superior.
                  </p>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-start">
                      <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#243f60] text-white">
                        <span>1</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#243f60]">Mantenimiento Preventivo</h4>
                        <p className="text-gray-600">
                          Inspecciones regulares y mantenimiento programado para prevenir fallos y minimizar el tiempo
                          de inactividad.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#243f60] text-white">
                        <span>2</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#243f60]">Mantenimiento Correctivo</h4>
                        <p className="text-gray-600">
                          Reparación rápida y eficiente de equipos averiados para restaurar su funcionamiento normal.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#243f60] text-white">
                        <span>3</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#243f60]">Mantenimiento Predictivo</h4>
                        <p className="text-gray-600">
                          Monitoreo y análisis de condiciones para predecir fallos antes de que ocurran.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button
                      className="bg-[#243f60] hover:bg-[#1a2e48]"
                      onClick={() => (window.location.href = "/contact?service=maintenance")}
                    >
                      Solicitar servicio
                    </Button>
                  </div>
                </div>
                <div className="relative h-[400px] overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=800&width=1200"
                    alt="Mantenimiento de Equipos"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="transport">
              <div ref={transportRef} className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-bold text-[#243f60]">Transporte Especializado</h3>
                  <p className="mt-4 text-gray-600">
                    Ofrecemos servicios de transporte especializado para equipos y materiales de la industria petrolera
                    y petroquímica. Nuestro equipo de profesionales garantiza un transporte seguro y eficiente,
                    cumpliendo con todas las normativas y estándares de seguridad.
                  </p>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-start">
                      <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#243f60] text-white">
                        <span>1</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#243f60]">Transporte de Equipos Pesados</h4>
                        <p className="text-gray-600">Transporte seguro de equipos pesados y maquinaria industrial.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#243f60] text-white">
                        <span>2</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#243f60]">Transporte de Materiales Peligrosos</h4>
                        <p className="text-gray-600">
                          Transporte especializado de materiales peligrosos con todas las medidas de seguridad
                          necesarias.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#243f60] text-white">
                        <span>3</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#243f60]">Logística y Planificación</h4>
                        <p className="text-gray-600">
                          Planificación detallada de rutas y logística para garantizar entregas puntuales y seguras.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button
                      className="bg-[#243f60] hover:bg-[#1a2e48]"
                      onClick={() => (window.location.href = "/contact?service=transport")}
                    >
                      Solicitar servicio
                    </Button>
                  </div>
                </div>
                <div className="relative h-[400px] overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=800&width=1200"
                    alt="Transporte Especializado"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tools">
              <div ref={toolsRef} className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-2xl font-bold text-[#243f60]">Herramientas Especializadas</h3>
                  <p className="mt-4 text-gray-600">
                    Suministramos herramientas especializadas de alta calidad para la industria petrolera y
                    petroquímica. Nuestras herramientas están diseñadas para ofrecer un rendimiento óptimo en las
                    condiciones más exigentes.
                  </p>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-start">
                      <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#243f60] text-white">
                        <span>1</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#243f60]">Herramientas de Perforación</h4>
                        <p className="text-gray-600">
                          Herramientas especializadas para operaciones de perforación en la industria petrolera.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#243f60] text-white">
                        <span>2</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#243f60]">Herramientas de Mantenimiento</h4>
                        <p className="text-gray-600">
                          Herramientas diseñadas específicamente para el mantenimiento de equipos industriales.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#243f60] text-white">
                        <span>3</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-[#243f60]">Herramientas de Seguridad</h4>
                        <p className="text-gray-600">
                          Herramientas y equipos de seguridad para garantizar operaciones seguras en entornos
                          peligrosos.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Button
                      className="bg-[#243f60] hover:bg-[#1a2e48]"
                      onClick={() => (window.location.href = "/catalogue?category=tools")}
                    >
                      Ver catálogo
                    </Button>
                  </div>
                </div>
                <div className="relative h-[400px] overflow-hidden rounded-lg">
                  <Image
                    src="/placeholder.svg?height=800&width=1200"
                    alt="Herramientas Especializadas"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Servicios adicionales */}
          <div className="mt-16">
            <div ref={consultingRef} id="consulting" className="mb-16 grid gap-8 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl font-bold text-[#243f60]">Consultoría Técnica</h3>
                <p className="mt-4 text-gray-600">
                  Nuestro servicio de consultoría técnica ofrece asesoramiento experto para optimizar procesos y mejorar
                  la eficiencia operativa en la industria petrolera y petroquímica. Nuestros consultores tienen amplia
                  experiencia en el sector y pueden ayudarle a identificar oportunidades de mejora y soluciones a
                  problemas específicos.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#243f60] text-white">
                      <span>1</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#243f60]">Análisis de Procesos</h4>
                      <p className="text-gray-600">
                        Evaluación detallada de procesos para identificar áreas de mejora y optimización.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#243f60] text-white">
                      <span>2</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#243f60]">Asesoramiento Técnico</h4>
                      <p className="text-gray-600">
                        Asesoramiento especializado en aspectos técnicos de la industria petrolera y petroquímica.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#243f60] text-white">
                      <span>3</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#243f60]">Implementación de Soluciones</h4>
                      <p className="text-gray-600">
                        Apoyo en la implementación de soluciones y mejoras identificadas durante el proceso de
                        consultoría.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button
                    className="bg-[#243f60] hover:bg-[#1a2e48]"
                    onClick={() => (window.location.href = "/contact?service=consulting")}
                  >
                    Solicitar consultoría
                  </Button>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative h-[400px] overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=800&width=1200"
                  alt="Consultoría Técnica"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div ref={installationRef} id="installation" className="mb-16 grid gap-8 lg:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold text-[#243f60]">Instalación de Sistemas</h3>
                <p className="mt-4 text-gray-600">
                  Ofrecemos servicios de instalación profesional de sistemas y equipos para la industria petrolera y
                  petroquímica. Nuestro equipo de técnicos especializados garantiza una instalación segura y eficiente,
                  cumpliendo con todos los estándares y normativas del sector.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#243f60] text-white">
                      <span>1</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#243f60]">Planificación y Diseño</h4>
                      <p className="text-gray-600">
                        Planificación detallada y diseño de la instalación según las necesidades específicas del
                        cliente.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#243f60] text-white">
                      <span>2</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#243f60]">Instalación y Configuración</h4>
                      <p className="text-gray-600">
                        Instalación profesional y configuración de sistemas y equipos industriales.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#243f60] text-white">
                      <span>3</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#243f60]">Pruebas y Puesta en Marcha</h4>
                      <p className="text-gray-600">
                        Realización de pruebas exhaustivas y puesta en marcha de los sistemas instalados.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button
                    className="bg-[#243f60] hover:bg-[#1a2e48]"
                    onClick={() => (window.location.href = "/contact?service=installation")}
                  >
                    Solicitar instalación
                  </Button>
                </div>
              </div>
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=800&width=1200"
                  alt="Instalación de Sistemas"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div ref={trainingRef} id="training" className="grid gap-8 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl font-bold text-[#243f60]">Capacitación</h3>
                <p className="mt-4 text-gray-600">
                  Nuestros programas de capacitación están diseñados para proporcionar a su personal técnico y operativo
                  los conocimientos y habilidades necesarios para operar de manera eficiente y segura en la industria
                  petrolera y petroquímica.
                </p>
                <div className="mt-6 space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#243f60] text-white">
                      <span>1</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#243f60]">Capacitación Técnica</h4>
                      <p className="text-gray-600">
                        Formación especializada en aspectos técnicos de equipos y sistemas industriales.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#243f60] text-white">
                      <span>2</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#243f60]">Capacitación en Seguridad</h4>
                      <p className="text-gray-600">
                        Formación en seguridad industrial y prevención de riesgos en entornos peligrosos.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 flex h-6 w-6 items-center justify-center rounded-full bg-[#243f60] text-white">
                      <span>3</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#243f60]">Programas Personalizados</h4>
                      <p className="text-gray-600">
                        Desarrollo de programas de capacitación adaptados a las necesidades específicas de su empresa.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Button
                    className="bg-[#243f60] hover:bg-[#1a2e48]"
                    onClick={() => (window.location.href = "/contact?service=training")}
                  >
                    Solicitar capacitación
                  </Button>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative h-[400px] overflow-hidden rounded-lg">
                <Image src="/placeholder.svg?height=800&width=1200" alt="Capacitación" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso de Trabajo */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#243f60] sm:text-4xl">Nuestro Proceso de Trabajo</h2>
            <p className="mt-4 text-lg text-gray-600">
              Un enfoque metódico y eficiente para garantizar resultados de calidad
            </p>
          </div>

          <div className="mt-12">
            <div className="relative">
              {/* Línea de conexión */}
              <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-[#243f60]/20 md:hidden"></div>

              <div className="grid gap-8 md:grid-cols-4">
                <div className="relative flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#243f60] text-white">
                    <span className="text-lg font-bold">1</span>
                  </div>
                  <div className="absolute left-1/2 top-6 h-1 w-full -translate-x-1/2 bg-[#243f60]/20 md:block hidden"></div>
                  <h3 className="mt-4 text-xl font-bold text-[#243f60]">Consulta Inicial</h3>
                  <p className="mt-2 text-gray-600">
                    Evaluamos sus necesidades específicas y discutimos los objetivos del proyecto.
                  </p>
                </div>
                <div className="relative flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#243f60] text-white">
                    <span className="text-lg font-bold">2</span>
                  </div>
                  <div className="absolute left-1/2 top-6 h-1 w-full -translate-x-1/2 bg-[#243f60]/20 md:block hidden"></div>
                  <h3 className="mt-4 text-xl font-bold text-[#243f60]">Planificación</h3>
                  <p className="mt-2 text-gray-600">
                    Desarrollamos un plan detallado y un cronograma para el proyecto.
                  </p>
                </div>
                <div className="relative flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#243f60] text-white">
                    <span className="text-lg font-bold">3</span>
                  </div>
                  <div className="absolute left-1/2 top-6 h-1 w-full -translate-x-1/2 bg-[#243f60]/20 md:block hidden"></div>
                  <h3 className="mt-4 text-xl font-bold text-[#243f60]">Ejecución</h3>
                  <p className="mt-2 text-gray-600">Implementamos el plan con precisión y atención al detalle.</p>
                </div>
                <div className="relative flex flex-col items-center text-center md:items-start md:text-left">
                  <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full bg-[#243f60] text-white">
                    <span className="text-lg font-bold">4</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-[#243f60]">Seguimiento</h3>
                  <p className="mt-2 text-gray-600">
                    Proporcionamos soporte continuo y seguimiento para garantizar su satisfacción.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="bg-[#243f60] py-16 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Lo que dicen nuestros clientes</h2>
            <p className="mt-4 text-lg text-white/80">
              La satisfacción de nuestros clientes es nuestra mayor prioridad
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-6">
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
                "Sysvencol ha sido un socio confiable para nuestra empresa. Su equipo profesional y su compromiso con la
                calidad son excepcionales."
              </p>
              <div className="mt-6 flex items-center">
                <div className="h-10 w-10 rounded-full bg-white/20"></div>
                <div className="ml-3">
                  <p className="font-medium">Carlos Rodríguez</p>
                  <p className="text-sm text-white/70">Director de Operaciones, Petro Industries</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white/10 p-6">
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
                "El servicio de mantenimiento que nos proporciona Sysvencol ha mejorado significativamente la eficiencia
                de nuestros equipos."
              </p>
              <div className="mt-6 flex items-center">
                <div className="h-10 w-10 rounded-full bg-white/20"></div>
                <div className="ml-3">
                  <p className="font-medium">María González</p>
                  <p className="text-sm text-white/70">Gerente de Planta, ChemTech</p>
                </div>
              </div>
            </div>
            <div className="rounded-lg bg-white/10 p-6">
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
                "Las herramientas suministradas por Sysvencol son de la más alta calidad y han superado nuestras
                expectativas en rendimiento y durabilidad."
              </p>
              <div className="mt-6 flex items-center">
                <div className="h-10 w-10 rounded-full bg-white/20"></div>
                <div className="ml-3">
                  <p className="font-medium">Alejandro Méndez</p>
                  <p className="text-sm text-white/70">Jefe de Mantenimiento, OilTech Solutions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-[#243f60] p-8 shadow-xl sm:p-12">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  ¿Necesita servicios especializados?
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Contáctenos hoy mismo para discutir cómo podemos ayudarle con sus necesidades específicas.
                </p>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <Button
                  size="lg"
                  className="bg-white text-[#243f60] hover:bg-white/90"
                  onClick={() => (window.location.href = "/contact")}
                >
                  Solicitar cotización
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
