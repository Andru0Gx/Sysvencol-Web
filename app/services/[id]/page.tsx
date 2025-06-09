import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"

// Simulación de base de datos de servicios
const services = {
  "mantenimiento-industrial": {
    id: "mantenimiento-industrial",
    name: "Mantenimiento Industrial",
    shortDescription: "Servicios especializados de mantenimiento preventivo y correctivo para equipos industriales.",
    description: `
      <p>Nuestros servicios de mantenimiento industrial están diseñados para maximizar la disponibilidad y rendimiento de sus equipos, minimizando tiempos de inactividad y extendiendo su vida útil.</p>
      
      <p>Contamos con personal altamente capacitado y certificado, equipado con las herramientas y tecnologías más avanzadas para garantizar un servicio de la más alta calidad.</p>
      
      <p>Nuestro enfoque proactivo nos permite identificar y resolver problemas potenciales antes de que afecten sus operaciones, resultando en ahorros significativos y mayor productividad.</p>
    `,
    features: [
      "Mantenimiento preventivo programado",
      "Mantenimiento predictivo basado en condición",
      "Reparaciones de emergencia 24/7",
      "Overhaul de equipos críticos",
      "Gestión de inventario de repuestos",
      "Análisis de causa raíz de fallas",
    ],
    process: [
      {
        title: "Evaluación Inicial",
        description:
          "Realizamos un diagnóstico completo de sus equipos e instalaciones para identificar necesidades específicas.",
      },
      {
        title: "Planificación Estratégica",
        description: "Desarrollamos un plan de mantenimiento personalizado según los requerimientos de su operación.",
      },
      {
        title: "Implementación",
        description: "Ejecutamos las actividades de mantenimiento con los más altos estándares de calidad y seguridad.",
      },
      {
        title: "Seguimiento y Mejora Continua",
        description: "Monitoreamos resultados y ajustamos estrategias para optimizar continuamente el rendimiento.",
      },
    ],
    faqs: [
      {
        question: "¿Con qué frecuencia se debe realizar el mantenimiento preventivo?",
        answer:
          "La frecuencia óptima depende de varios factores, incluyendo el tipo de equipo, intensidad de uso, ambiente operativo y recomendaciones del fabricante. Desarrollamos programas personalizados basados en un análisis detallado de estos factores.",
      },
      {
        question: "¿Qué beneficios ofrece el mantenimiento predictivo frente al preventivo tradicional?",
        answer:
          "El mantenimiento predictivo utiliza tecnologías de monitoreo de condición para intervenir solo cuando es necesario, optimizando costos y reduciendo intervenciones innecesarias. Esto resulta en mayor disponibilidad de equipos y menor costo total de mantenimiento.",
      },
      {
        question: "¿Cómo garantizan la calidad de sus servicios?",
        answer:
          "Implementamos rigurosos sistemas de gestión de calidad certificados bajo ISO 9001. Nuestro personal recibe capacitación continua y utilizamos procedimientos estandarizados con verificaciones de calidad en cada etapa del servicio.",
      },
    ],
    testimonials: [
      {
        quote:
          "Desde que contratamos los servicios de mantenimiento de Sysvencol, hemos reducido nuestros tiempos de inactividad en un 40% y extendido la vida útil de nuestros equipos críticos.",
        author: "Ing. Roberto Méndez",
        company: "Petroindustrial S.A.",
      },
      {
        quote:
          "Su enfoque proactivo y capacidad de respuesta han sido fundamentales para mantener nuestras operaciones funcionando sin interrupciones. Un socio confiable que recomendamos ampliamente.",
        author: "Dra. Carolina Jiménez",
        company: "Refinería del Pacífico",
      },
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    relatedServices: ["automatizacion-control", "integridad-mecanica", "servicios-ingenieria"],
  },
  "automatizacion-control": {
    id: "automatizacion-control",
    name: "Automatización y Control",
    shortDescription:
      "Soluciones avanzadas de automatización industrial para optimizar procesos y aumentar eficiencia.",
    description: `
      <p>Nuestras soluciones de automatización y control están diseñadas para transformar sus operaciones industriales, mejorando la eficiencia, precisión y seguridad de sus procesos.</p>
      
      <p>Integramos tecnologías de vanguardia como PLC, SCADA, DCS y sistemas IoT industriales para crear soluciones personalizadas que respondan a sus necesidades específicas.</p>
      
      <p>Desde la conceptualización hasta la implementación y soporte continuo, trabajamos en estrecha colaboración con su equipo para garantizar una transición fluida y resultados excepcionales.</p>
    `,
    features: [
      "Diseño e implementación de sistemas de control",
      "Integración de sistemas existentes",
      "Modernización de infraestructura de control",
      "Desarrollo de HMI intuitivas",
      "Sistemas de monitoreo remoto",
      "Soluciones de IoT industrial",
    ],
    process: [
      {
        title: "Análisis de Requerimientos",
        description: "Evaluamos sus procesos actuales e identificamos oportunidades de mejora mediante automatización.",
      },
      {
        title: "Diseño de Solución",
        description:
          "Desarrollamos una arquitectura de sistema personalizada que se alinea con sus objetivos operativos.",
      },
      {
        title: "Implementación",
        description: "Instalamos y configuramos los sistemas con mínima interrupción a sus operaciones existentes.",
      },
      {
        title: "Capacitación y Soporte",
        description:
          "Proporcionamos entrenamiento completo y soporte técnico continuo para maximizar el valor de su inversión.",
      },
    ],
    faqs: [
      {
        question: "¿Qué retorno de inversión puedo esperar de un proyecto de automatización?",
        answer:
          "El ROI típico varía según la aplicación, pero nuestros clientes generalmente experimentan retornos entre 6 y 18 meses, derivados de mayor productividad, reducción de errores, menor consumo energético y optimización de recursos humanos.",
      },
      {
        question: "¿Pueden integrar sistemas de diferentes fabricantes?",
        answer:
          "Sí, tenemos amplia experiencia en la integración de sistemas heterogéneos. Utilizamos protocolos estándar y desarrollamos interfaces personalizadas cuando es necesario para garantizar una comunicación fluida entre diferentes plataformas.",
      },
      {
        question: "¿Cómo abordan la ciberseguridad en sus soluciones?",
        answer:
          "La seguridad es una prioridad en todos nuestros proyectos. Implementamos múltiples capas de protección, incluyendo segmentación de redes, autenticación robusta, encriptación de datos y monitoreo continuo, siguiendo estándares como IEC 62443.",
      },
    ],
    testimonials: [
      {
        quote:
          "La solución de automatización implementada por Sysvencol transformó nuestra planta, aumentando la producción en un 25% mientras reducía los costos operativos en un 18%.",
        author: "Ing. Fernando Gutiérrez",
        company: "Industrias Químicas del Norte",
      },
      {
        quote:
          "Su enfoque metódico y conocimiento técnico fueron evidentes en cada fase del proyecto. El sistema ha funcionado impecablemente desde su implementación hace dos años.",
        author: "Ing. Alejandra Morales",
        company: "Procesadora Industrial S.A.",
      },
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    relatedServices: ["mantenimiento-industrial", "integridad-mecanica", "servicios-ingenieria"],
  },
  "integridad-mecanica": {
    id: "integridad-mecanica",
    name: "Integridad Mecánica",
    shortDescription: "Evaluación y gestión de integridad de activos para garantizar operación segura y confiable.",
    images: ["/placeholder.svg?height=600&width=800"],
    relatedServices: ["mantenimiento-industrial", "automatizacion-control", "servicios-ingenieria"],
  },
  "servicios-ingenieria": {
    id: "servicios-ingenieria",
    name: "Servicios de Ingeniería",
    shortDescription: "Soluciones de ingeniería multidisciplinaria para proyectos industriales complejos.",
    images: ["/placeholder.svg?height=600&width=800"],
    relatedServices: ["mantenimiento-industrial", "automatizacion-control", "integridad-mecanica"],
  },
}

export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const service = services[id as keyof typeof services]

  if (!service) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="container mx-auto flex flex-1 items-center justify-center px-4 py-16 text-center">
          <div>
            <h1 className="text-3xl font-bold text-[#243f60]">Servicio no encontrado</h1>
            <p className="mt-4 text-gray-600">
              Lo sentimos, el servicio que estás buscando no existe o ha sido descontinuado.
            </p>
            <Link href="/services">
              <Button className="mt-8 bg-[#243f60] hover:bg-[#1a2e48]">Ver todos los servicios</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <PageHeader
        title={service.name}
        description="Soluciones especializadas para la industria petrolera y petroquímica"
        backgroundImage="/placeholder.svg?height=400&width=1920"
      />

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Link href="/services" className="flex items-center text-[#243f60] hover:text-[#1a2e48]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a Servicios
          </Link>
        </div>

        {/* Service Overview */}
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-bold text-[#243f60]">{service.name}</h1>
            <div className="prose prose-lg mt-6 max-w-none">
              <div dangerouslySetInnerHTML={{ __html: service.description || "" }} />
            </div>

            {service.features && (
              <div className="mt-8">
                <h2 className="text-xl font-bold text-[#243f60]">Características del Servicio</h2>
                <ul className="mt-4 space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8">
              <Link href="/contact">
                <Button size="lg" className="bg-[#243f60] hover:bg-[#1a2e48]">
                  Solicitar Información
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <div className="overflow-hidden rounded-lg">
              <Image
                src={service.images?.[0] || "/placeholder.svg"}
                alt={service.name}
                width={800}
                height={600}
                className="w-full object-cover"
              />
            </div>

            {service.images && service.images.length > 1 && (
              <div className="mt-4 grid grid-cols-2 gap-4">
                {service.images.slice(1, 3).map((image, index) => (
                  <div key={index} className="overflow-hidden rounded-lg">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${service.name} - ${index + 2}`}
                      width={400}
                      height={300}
                      className="w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Service Details Tabs */}
        {(service.process || service.faqs || service.testimonials) && (
          <div className="mt-16">
            <Tabs defaultValue="process" className="w-full">
              <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
                <TabsTrigger value="process">Proceso</TabsTrigger>
                <TabsTrigger value="faqs">Preguntas Frecuentes</TabsTrigger>
                <TabsTrigger value="testimonials">Testimonios</TabsTrigger>
              </TabsList>

              {service.process && (
                <TabsContent value="process" className="mt-6">
                  <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <h3 className="text-xl font-bold text-[#243f60]">Nuestro Proceso</h3>
                    <div className="mt-6">
                      {service.process.map((step, index) => (
                        <div key={index} className="mb-8 flex last:mb-0">
                          <div className="mr-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#243f60] text-white">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-[#243f60]">{step.title}</h4>
                            <p className="mt-2 text-gray-600">{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              )}

              {service.faqs && (
                <TabsContent value="faqs" className="mt-6">
                  <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <h3 className="text-xl font-bold text-[#243f60]">Preguntas Frecuentes</h3>
                    <Accordion type="single" collapsible className="mt-6">
                      {service.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`faq-${index}`}>
                          <AccordionTrigger className="text-left font-medium text-[#243f60]">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                </TabsContent>
              )}

              {service.testimonials && (
                <TabsContent value="testimonials" className="mt-6">
                  <div className="rounded-lg border border-gray-200 bg-white p-6">
                    <h3 className="text-xl font-bold text-[#243f60]">Lo que dicen nuestros clientes</h3>
                    <div className="mt-6 space-y-6">
                      {service.testimonials.map((testimonial, index) => (
                        <div key={index} className="rounded-lg bg-gray-50 p-6">
                          <p className="italic text-gray-600">"{testimonial.quote}"</p>
                          <div className="mt-4">
                            <p className="font-medium text-[#243f60]">{testimonial.author}</p>
                            <p className="text-sm text-gray-500">{testimonial.company}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 rounded-lg bg-[#243f60] p-8 text-white">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl font-bold">¿Listo para mejorar sus operaciones?</h2>
              <p className="mt-4">
                Contáctenos hoy mismo para discutir cómo nuestros servicios de {service.name.toLowerCase()} pueden
                ayudar a su empresa a alcanzar nuevos niveles de eficiencia y rendimiento.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#243f60]"
                >
                  Contactar Ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Related Services */}
        {service.relatedServices && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#243f60]">Servicios Relacionados</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {service.relatedServices.map((relatedId) => {
                const relatedService = services[relatedId as keyof typeof services]
                if (!relatedService) return null

                return (
                  <div key={relatedId} className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="relative h-48">
                      <Image
                        src={relatedService.images?.[0] || "/placeholder.svg"}
                        alt={relatedService.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#243f60]">{relatedService.name}</h3>
                      <p className="mt-2 text-gray-600">{relatedService.shortDescription}</p>
                      <Link href={`/services/${relatedService.id}`}>
                        <Button className="mt-4 bg-[#243f60] hover:bg-[#1a2e48]">Ver Detalles</Button>
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
