import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, User, Tag, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"

// Simulación de base de datos de artículos
const articles = {
  "5-tendencias-en-la-industria-petrolera": {
    slug: "5-tendencias-en-la-industria-petrolera",
    title: "5 Tendencias Emergentes en la Industria Petrolera para 2023",
    excerpt:
      "Descubre las principales tendencias tecnológicas y operativas que están transformando el sector petrolero en 2023.",
    content: `
      <p>La industria petrolera está experimentando una transformación significativa impulsada por avances tecnológicos, preocupaciones ambientales y cambios en la demanda global. En este artículo, exploramos las cinco tendencias más importantes que están dando forma al futuro del sector en 2023.</p>

      <h2>1. Digitalización y Automatización</h2>
      <p>La implementación de tecnologías digitales está revolucionando la forma en que operan las empresas petroleras. Desde la exploración hasta la producción y distribución, la digitalización está mejorando la eficiencia operativa y reduciendo costos.</p>
      <p>Las principales innovaciones incluyen:</p>
      <ul>
        <li>Inteligencia artificial para análisis predictivo de mantenimiento</li>
        <li>Internet de las cosas (IoT) para monitoreo en tiempo real</li>
        <li>Gemelos digitales para simulación de operaciones</li>
        <li>Automatización de procesos mediante robótica avanzada</li>
      </ul>

      <h2>2. Transición Energética</h2>
      <p>Las compañías petroleras están diversificando sus carteras para incluir fuentes de energía renovable y tecnologías bajas en carbono. Esta transición responde tanto a la presión regulatoria como a las demandas del mercado por opciones más sostenibles.</p>
      <p>Observamos un aumento en:</p>
      <ul>
        <li>Inversiones en energía solar y eólica</li>
        <li>Desarrollo de tecnologías de captura y almacenamiento de carbono</li>
        <li>Producción de hidrógeno como vector energético</li>
        <li>Biocombustibles avanzados</li>
      </ul>

      <h2>3. Optimización de la Cadena de Suministro</h2>
      <p>La volatilidad del mercado ha impulsado a las empresas a repensar sus cadenas de suministro para hacerlas más resilientes y eficientes. La tecnología blockchain está emergiendo como una herramienta clave para mejorar la transparencia y trazabilidad.</p>

      <h2>4. Sostenibilidad Ambiental</h2>
      <p>La reducción de la huella ambiental se ha convertido en una prioridad estratégica. Las empresas están implementando prácticas más sostenibles en todas sus operaciones, desde la reducción de emisiones de metano hasta la gestión responsable del agua.</p>

      <h2>5. Nuevos Modelos de Negocio</h2>
      <p>El sector está explorando modelos de negocio innovadores que se adapten mejor al cambiante panorama energético. Esto incluye asociaciones estratégicas, servicios basados en datos y soluciones integradas de energía.</p>

      <h2>Conclusión</h2>
      <p>La industria petrolera se encuentra en un punto de inflexión, donde la adaptación a estas tendencias emergentes determinará quiénes prosperarán en el futuro. Las empresas que abracen la innovación tecnológica, la sostenibilidad y los nuevos modelos de negocio estarán mejor posicionadas para navegar los desafíos y oportunidades que se avecinan.</p>
    `,
    author: "Ing. Carlos Rodríguez",
    date: "15 de mayo de 2023",
    category: "Industria Petrolera",
    tags: ["Tecnología", "Sostenibilidad", "Innovación", "Energía"],
    image: "/placeholder.svg?height=600&width=1200",
    relatedArticles: ["mantenimiento-preventivo-equipos", "seguridad-industrial-mejores-practicas"],
  },
  "mantenimiento-preventivo-equipos": {
    slug: "mantenimiento-preventivo-equipos",
    title: "Guía Completa de Mantenimiento Preventivo para Equipos Industriales",
    excerpt:
      "Aprende las mejores prácticas para implementar un programa efectivo de mantenimiento preventivo en tus equipos industriales.",
    content: `
      <p>El mantenimiento preventivo es fundamental para garantizar la operatividad y longevidad de los equipos industriales. En esta guía, compartimos estrategias probadas para implementar un programa efectivo que minimice tiempos de inactividad y optimice el rendimiento.</p>

      <h2>Importancia del Mantenimiento Preventivo</h2>
      <p>Un programa de mantenimiento preventivo bien diseñado puede:</p>
      <ul>
        <li>Reducir costos operativos a largo plazo</li>
        <li>Extender la vida útil de los equipos</li>
        <li>Mejorar la seguridad en el lugar de trabajo</li>
        <li>Aumentar la eficiencia y productividad</li>
        <li>Prevenir fallas catastróficas</li>
      </ul>

      <h2>Componentes Clave de un Programa Efectivo</h2>
      <p>Para maximizar los beneficios, tu programa debe incluir:</p>
      <ol>
        <li>Inventario detallado de equipos</li>
        <li>Programación basada en datos</li>
        <li>Procedimientos estandarizados</li>
        <li>Capacitación continua del personal</li>
        <li>Sistema de gestión de mantenimiento computarizado (CMMS)</li>
      </ol>

      <h2>Implementación Paso a Paso</h2>
      <p>Sigue estos pasos para implementar tu programa:</p>
      <ol>
        <li>Realiza un análisis de criticidad de equipos</li>
        <li>Establece frecuencias de mantenimiento basadas en recomendaciones del fabricante y experiencia operativa</li>
        <li>Desarrolla listas de verificación detalladas</li>
        <li>Implementa un sistema de seguimiento y documentación</li>
        <li>Establece KPIs para medir la efectividad</li>
      </ol>

      <h2>Tecnologías Emergentes</h2>
      <p>Considera incorporar estas tecnologías para llevar tu programa al siguiente nivel:</p>
      <ul>
        <li>Monitoreo de condición en tiempo real</li>
        <li>Análisis predictivo basado en IA</li>
        <li>Realidad aumentada para asistencia técnica</li>
        <li>Drones para inspecciones en áreas de difícil acceso</li>
      </ul>

      <h2>Conclusión</h2>
      <p>La implementación de un programa de mantenimiento preventivo robusto requiere inversión inicial, pero los beneficios a largo plazo superan ampliamente los costos. Al adoptar un enfoque proactivo y aprovechar las tecnologías disponibles, puedes maximizar la disponibilidad y rendimiento de tus activos industriales.</p>
    `,
    author: "Ing. María Fernández",
    date: "3 de junio de 2023",
    category: "Mantenimiento Industrial",
    tags: ["Mantenimiento", "Equipos", "Eficiencia", "Tecnología"],
    image: "/placeholder.svg?height=600&width=1200",
    relatedArticles: ["5-tendencias-en-la-industria-petrolera", "seguridad-industrial-mejores-practicas"],
  },
  "seguridad-industrial-mejores-practicas": {
    slug: "seguridad-industrial-mejores-practicas",
    title: "Mejores Prácticas de Seguridad Industrial en el Sector Petrolero",
    excerpt:
      "Conoce las estrategias más efectivas para garantizar la seguridad en operaciones petroleras y prevenir accidentes laborales.",
    content: `
      <p>La seguridad industrial es una prioridad absoluta en el sector petrolero, donde los riesgos operativos pueden tener consecuencias graves. En este artículo, exploramos las mejores prácticas que las empresas líderes están implementando para proteger a su personal y activos.</p>

      <h2>Cultura de Seguridad</h2>
      <p>El fundamento de cualquier programa de seguridad efectivo es una cultura organizacional que priorice la seguridad por encima de todo. Esto implica:</p>
      <ul>
        <li>Liderazgo visible y comprometido</li>
        <li>Participación activa de todos los empleados</li>
        <li>Comunicación abierta sobre riesgos y preocupaciones</li>
        <li>Reconocimiento de comportamientos seguros</li>
        <li>Aprendizaje continuo de incidentes y casi accidentes</li>
      </ul>

      <h2>Sistemas de Gestión de Seguridad</h2>
      <p>Un sistema robusto debe incluir:</p>
      <ol>
        <li>Políticas y procedimientos claros</li>
        <li>Identificación y evaluación sistemática de riesgos</li>
        <li>Controles jerárquicos (eliminación, sustitución, controles de ingeniería, administrativos, EPP)</li>
        <li>Preparación y respuesta ante emergencias</li>
        <li>Auditorías y revisiones periódicas</li>
      </ol>

      <h2>Tecnologías para Mejorar la Seguridad</h2>
      <p>Las innovaciones tecnológicas están transformando la gestión de la seguridad:</p>
      <ul>
        <li>Wearables para monitoreo de signos vitales y exposición a riesgos</li>
        <li>Drones para inspecciones en áreas peligrosas</li>
        <li>Realidad virtual para entrenamiento en escenarios de alto riesgo</li>
        <li>Analítica predictiva para identificar patrones de riesgo</li>
        <li>Sistemas automatizados para tareas peligrosas</li>
      </ul>

      <h2>Capacitación y Competencia</h2>
      <p>El personal bien entrenado es fundamental para la seguridad operativa:</p>
      <ul>
        <li>Programas de inducción exhaustivos</li>
        <li>Entrenamiento específico para tareas de alto riesgo</li>
        <li>Simulacros regulares de emergencia</li>
        <li>Certificaciones y recertificaciones periódicas</li>
        <li>Mentorías y coaching en seguridad</li>
      </ul>

      <h2>Conclusión</h2>
      <p>La implementación de estas mejores prácticas no solo reduce accidentes y lesiones, sino que también mejora la eficiencia operativa y la reputación corporativa. La seguridad no debe verse como un costo, sino como una inversión que genera retornos significativos en múltiples dimensiones.</p>
    `,
    author: "Dr. Alejandro Méndez",
    date: "22 de julio de 2023",
    category: "Seguridad Industrial",
    tags: ["Seguridad", "Prevención", "Riesgos", "Capacitación"],
    image: "/placeholder.svg?height=600&width=1200",
    relatedArticles: ["5-tendencias-en-la-industria-petrolera", "mantenimiento-preventivo-equipos"],
  },
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const article = articles[slug as keyof typeof articles]

  if (!article) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="container mx-auto flex flex-1 items-center justify-center px-4 py-16 text-center">
          <div>
            <h1 className="text-3xl font-bold text-[#243f60]">Artículo no encontrado</h1>
            <p className="mt-4 text-gray-600">
              Lo sentimos, el artículo que estás buscando no existe o ha sido eliminado.
            </p>
            <Link href="/blog">
              <Button className="mt-8 bg-[#243f60] hover:bg-[#1a2e48]">Volver al Blog</Button>
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
        title={article.title}
        description="Nuestro blog ofrece información actualizada sobre la industria petrolera y petroquímica"
        backgroundImage="/placeholder.svg?height=400&width=1920"
      />

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Link href="/blog" className="flex items-center text-[#243f60] hover:text-[#1a2e48]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Blog
          </Link>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="overflow-hidden rounded-lg">
              <Image
                src={article.image || "/placeholder.svg"}
                alt={article.title}
                width={1200}
                height={600}
                className="w-full object-cover"
              />
            </div>

            {/* Article Meta */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center">
                <User className="mr-1 h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center">
                <Tag className="mr-1 h-4 w-4" />
                <span>{article.category}</span>
              </div>
            </div>

            {/* Article Content */}
            <div className="prose prose-lg mt-8 max-w-none">
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>

            {/* Tags */}
            <div className="mt-8">
              <h3 className="mb-4 text-lg font-bold text-[#243f60]">Etiquetas:</h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full bg-[#243f60]/10 px-3 py-1 text-sm font-medium text-[#243f60]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Share */}
            <div className="mt-8 rounded-lg border border-gray-200 p-4">
              <h3 className="flex items-center text-lg font-bold text-[#243f60]">
                <Share2 className="mr-2 h-5 w-5" />
                Compartir este artículo
              </h3>
              <div className="mt-4 flex gap-4">
                <Button variant="outline" size="sm">
                  Facebook
                </Button>
                <Button variant="outline" size="sm">
                  Twitter
                </Button>
                <Button variant="outline" size="sm">
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm">
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            {/* Related Articles */}
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="mb-4 text-xl font-bold text-[#243f60]">Artículos Relacionados</h3>
              <div className="space-y-6">
                {article.relatedArticles.map((relatedSlug) => {
                  const relatedArticle = articles[relatedSlug as keyof typeof articles]
                  if (!relatedArticle) return null

                  return (
                    <div key={relatedSlug} className="flex gap-4">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={relatedArticle.image || "/placeholder.svg"}
                          alt={relatedArticle.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-[#243f60]">
                          <Link href={`/blog/${relatedArticle.slug}`} className="hover:underline">
                            {relatedArticle.title}
                          </Link>
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">{relatedArticle.date}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Categories */}
            <div className="mt-8 rounded-lg border border-gray-200 p-6">
              <h3 className="mb-4 text-xl font-bold text-[#243f60]">Categorías</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog?category=industria-petrolera" className="text-gray-600 hover:text-[#243f60]">
                    Industria Petrolera
                  </Link>
                </li>
                <li>
                  <Link href="/blog?category=mantenimiento-industrial" className="text-gray-600 hover:text-[#243f60]">
                    Mantenimiento Industrial
                  </Link>
                </li>
                <li>
                  <Link href="/blog?category=seguridad-industrial" className="text-gray-600 hover:text-[#243f60]">
                    Seguridad Industrial
                  </Link>
                </li>
                <li>
                  <Link href="/blog?category=tecnologia" className="text-gray-600 hover:text-[#243f60]">
                    Tecnología
                  </Link>
                </li>
                <li>
                  <Link href="/blog?category=sostenibilidad" className="text-gray-600 hover:text-[#243f60]">
                    Sostenibilidad
                  </Link>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="mt-8 rounded-lg bg-[#243f60] p-6 text-white">
              <h3 className="mb-4 text-xl font-bold">Suscríbete a nuestro Newsletter</h3>
              <p className="mb-4 text-gray-200">
                Recibe las últimas noticias y artículos directamente en tu bandeja de entrada.
              </p>
              <div className="space-y-4">
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-gray-900"
                />
                <Button className="w-full bg-white text-[#243f60] hover:bg-gray-100">Suscribirse</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
