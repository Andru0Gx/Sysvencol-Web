import Link from "next/link"
import Image from "next/image"
import { Search, Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import PageHeader from "@/components/page-header"

// Simulación de una base de datos de artículos
const articlesData = [
  {
    slug: "mantenimiento-preventivo-equipos-industriales",
    title: "Guía completa de mantenimiento preventivo para equipos industriales",
    date: "15 de abril de 2024",
    author: "Ing. Carlos Rodríguez",
    category: "Mantenimiento",
    tags: ["mantenimiento preventivo", "equipos industriales", "eficiencia"],
    image: "/placeholder.svg?height=600&width=1200",
    excerpt:
      "Descubra cómo implementar un programa efectivo de mantenimiento preventivo para maximizar la vida útil de sus equipos industriales.",
  },
  {
    slug: "automatizacion-procesos-industriales",
    title: "Automatización de procesos industriales: El futuro de la manufactura",
    date: "28 de marzo de 2024",
    author: "Ing. María González",
    category: "Automatización",
    tags: ["automatización", "industria 4.0", "eficiencia productiva"],
    image: "/placeholder.svg?height=600&width=1200",
    excerpt:
      "Explore cómo la automatización está transformando la industria manufacturera y cómo puede implementarla en su empresa.",
  },
  {
    slug: "eficiencia-energetica-industria",
    title: "Estrategias de eficiencia energética para la industria moderna",
    date: "10 de febrero de 2024",
    author: "Ing. Alejandro Martínez",
    category: "Sostenibilidad",
    tags: ["eficiencia energética", "sostenibilidad", "reducción de costos"],
    image: "/placeholder.svg?height=600&width=1200",
    excerpt:
      "Descubra cómo implementar medidas de eficiencia energética que reduzcan costos y mejoren la sostenibilidad de su operación industrial.",
  },
  {
    slug: "seguridad-industrial-mejores-practicas",
    title: "Mejores prácticas de seguridad industrial para 2024",
    date: "5 de enero de 2024",
    author: "Ing. Laura Sánchez",
    category: "Seguridad",
    tags: ["seguridad industrial", "prevención de riesgos", "normativas"],
    image: "/placeholder.svg?height=600&width=1200",
    excerpt:
      "Conozca las últimas tendencias y mejores prácticas en seguridad industrial para proteger a sus trabajadores y cumplir con las normativas vigentes.",
  },
  {
    slug: "tecnologias-emergentes-sector-industrial",
    title: "5 tecnologías emergentes que están transformando el sector industrial",
    date: "20 de diciembre de 2023",
    author: "Ing. Roberto Méndez",
    category: "Innovación",
    tags: ["tecnología", "innovación", "industria 4.0"],
    image: "/placeholder.svg?height=600&width=1200",
    excerpt:
      "Un análisis de las tecnologías más prometedoras que están revolucionando los procesos industriales y creando nuevas oportunidades de negocio.",
  },
  {
    slug: "mantenimiento-predictivo-ia",
    title: "Cómo la inteligencia artificial está revolucionando el mantenimiento predictivo",
    date: "8 de noviembre de 2023",
    author: "Ing. Daniel Torres",
    category: "Mantenimiento",
    tags: ["inteligencia artificial", "mantenimiento predictivo", "big data"],
    image: "/placeholder.svg?height=600&width=1200",
    excerpt:
      "Descubra cómo los algoritmos de IA y el análisis de datos están transformando el enfoque del mantenimiento industrial, permitiendo predecir fallos antes de que ocurran.",
  },
]

// Categorías únicas extraídas de los artículos
const categories = Array.from(new Set(articlesData.map((article) => article.category)))

// Todos los tags únicos extraídos de los artículos
const allTags = Array.from(new Set(articlesData.flatMap((article) => article.tags)))

export default function BlogPage() {
  const featuredArticles = articlesData.slice(0, 3)
  const recentArticles = articlesData.slice(3)

  return (
    <main className="min-h-screen bg-white">
      <PageHeader
        title="Blog"
        subtitle="Noticias, artículos y recursos sobre la industria"
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Blog", href: "/blog" },
        ]}
      />

      <section id="featured-articles" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Artículos destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <Link href={`/blog/${article.slug}`} key={article.slug} className="group">
                <div className="bg-white rounded-lg shadow-md overflow-hidden h-full transition-transform duration-300 group-hover:shadow-lg">
                  <div className="relative h-48">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {article.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{article.date}</span>
                      <span className="mx-2">•</span>
                      <User className="h-4 w-4 mr-1" />
                      <span>{article.author}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                    <div className="flex items-center text-blue-600 font-medium">
                      <span>Leer más</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">Artículos recientes</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input type="search" placeholder="Buscar artículos..." className="pl-10 w-full md:w-64" />
                </div>
              </div>

              <div className="space-y-8">
                {recentArticles.map((article) => (
                  <Link href={`/blog/${article.slug}`} key={article.slug} className="group">
                    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg">
                      <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/3 relative h-48 md:h-auto">
                          <Image
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="md:w-2/3 p-6">
                          <div className="flex items-center text-sm text-gray-500 mb-2">
                            <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full mr-2">
                              {article.category}
                            </span>
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{article.date}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 mb-4">{article.excerpt}</p>
                          <div className="flex items-center text-blue-600 font-medium">
                            <span>Leer más</span>
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <Button variant="outline" className="px-8">
                  Cargar más artículos
                </Button>
              </div>
            </div>

            <div className="lg:w-1/3 space-y-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Categorías</h3>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        href={`/blog?category=${category}`}
                        className="flex justify-between items-center py-2 px-3 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <span>{category}</span>
                        <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded-full">
                          {articlesData.filter((a) => a.category === category).length}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Etiquetas populares</h3>
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Link
                      href={`/blog?tag=${tag}`}
                      key={tag}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold mb-4">Suscríbete a nuestro boletín</h3>
                <p className="text-gray-600 mb-4">
                  Recibe nuestros últimos artículos y noticias directamente en tu bandeja de entrada.
                </p>
                <div className="space-y-3">
                  <Input placeholder="Tu correo electrónico" type="email" />
                  <Button className="w-full">Suscribirse</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
