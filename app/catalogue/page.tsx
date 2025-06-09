import Image from "next/image"
import Link from "next/link"
import { Download, Search, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"

// Simulación de una base de datos de productos
const productsData = [
  {
    id: "1",
    name: "Sistema de Control Industrial PLC-5000",
    category: "Automatización",
    subcategory: "Controladores",
    image: "/placeholder.svg?height=400&width=600",
    description: "Sistema de control programable de alta precisión para entornos industriales exigentes.",
    pdfCatalog: "/catalogos/plc-5000.pdf",
  },
  {
    id: "2",
    name: "Sensor de Temperatura TS-200",
    category: "Sensores",
    subcategory: "Temperatura",
    image: "/placeholder.svg?height=400&width=600",
    description: "Sensor de temperatura de alta precisión con rango de -50°C a 250°C.",
    pdfCatalog: "/catalogos/ts-200.pdf",
  },
  {
    id: "3",
    name: "Variador de Frecuencia VF-800",
    category: "Automatización",
    subcategory: "Variadores",
    image: "/placeholder.svg?height=400&width=600",
    description: "Variador de frecuencia para control preciso de motores eléctricos industriales.",
    pdfCatalog: "/catalogos/vf-800.pdf",
  },
  {
    id: "4",
    name: "Sistema de Monitoreo Remoto SMR-100",
    category: "Monitoreo",
    subcategory: "Sistemas Remotos",
    image: "/placeholder.svg?height=400&width=600",
    description: "Sistema de monitoreo remoto para supervisión en tiempo real de equipos industriales.",
    pdfCatalog: "/catalogos/smr-100.pdf",
  },
  {
    id: "5",
    name: "Válvula de Control Proporcional VCP-300",
    category: "Válvulas",
    subcategory: "Control Proporcional",
    image: "/placeholder.svg?height=400&width=600",
    description: "Válvula de control proporcional para regulación precisa de fluidos en procesos industriales.",
    pdfCatalog: "/catalogos/vcp-300.pdf",
  },
  {
    id: "6",
    name: "Interfaz Hombre-Máquina IHM-700",
    category: "Automatización",
    subcategory: "Interfaces",
    image: "/placeholder.svg?height=400&width=600",
    description: "Pantalla táctil de alta resolución para control y monitoreo de procesos industriales.",
    pdfCatalog: "/catalogos/ihm-700.pdf",
  },
]

export default function CataloguePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <PageHeader title="Catálogo" description="Explore nuestra amplia gama de productos y servicios" />

      {/* Filtros y Búsqueda */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input type="search" placeholder="Buscar productos..." className="pl-10" />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="tools">Herramientas</SelectItem>
                  <SelectItem value="equipment">Equipos</SelectItem>
                  <SelectItem value="services">Servicios</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Más recientes</SelectItem>
                  <SelectItem value="name-asc">Nombre (A-Z)</SelectItem>
                  <SelectItem value="name-desc">Nombre (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Catálogo Principal */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Filtros Laterales */}
            <div className="lg:col-span-1">
              <div className="rounded-lg border p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#243f60]">Filtros</h3>
                  <Filter className="h-5 w-5 text-gray-500" />
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="category">
                    <AccordionTrigger className="text-base font-medium">Categorías</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {categories.map((category, index) => (
                          <div key={index} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`category-${index}`}
                              className="h-4 w-4 rounded border-gray-300 text-[#243f60] focus:ring-[#243f60]"
                            />
                            <label htmlFor={`category-${index}`} className="ml-2 text-sm text-gray-600">
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="brand">
                    <AccordionTrigger className="text-base font-medium">Marcas</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {brands.map((brand, index) => (
                          <div key={index} className="flex items-center">
                            <input
                              type="checkbox"
                              id={`brand-${index}`}
                              className="h-4 w-4 rounded border-gray-300 text-[#243f60] focus:ring-[#243f60]"
                            />
                            <label htmlFor={`brand-${index}`} className="ml-2 text-sm text-gray-600">
                              {brand}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="price">
                    <AccordionTrigger className="text-base font-medium">Precio</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="price-all"
                            name="price"
                            className="h-4 w-4 border-gray-300 text-[#243f60] focus:ring-[#243f60]"
                          />
                          <label htmlFor="price-all" className="ml-2 text-sm text-gray-600">
                            Todos los precios
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="price-low"
                            name="price"
                            className="h-4 w-4 border-gray-300 text-[#243f60] focus:ring-[#243f60]"
                          />
                          <label htmlFor="price-low" className="ml-2 text-sm text-gray-600">
                            Económico
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="price-medium"
                            name="price"
                            className="h-4 w-4 border-gray-300 text-[#243f60] focus:ring-[#243f60]"
                          />
                          <label htmlFor="price-medium" className="ml-2 text-sm text-gray-600">
                            Precio medio
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="price-high"
                            name="price"
                            className="h-4 w-4 border-gray-300 text-[#243f60] focus:ring-[#243f60]"
                          />
                          <label htmlFor="price-high" className="ml-2 text-sm text-gray-600">
                            Premium
                          </label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="mt-6">
                  <Button className="w-full bg-[#243f60] hover:bg-[#1a2e48]">Aplicar Filtros</Button>
                </div>
              </div>

              <div className="mt-8 rounded-lg border p-4">
                <h3 className="mb-4 text-lg font-bold text-[#243f60]">Catálogos PDF</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                      <Download className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#243f60]">Catálogo General</h4>
                      <p className="text-sm text-gray-600">Todos nuestros productos y servicios</p>
                      <Link
                        href="#"
                        className="mt-1 inline-block text-sm font-medium text-[#243f60] hover:text-[#1a2e48]"
                      >
                        Descargar PDF
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                      <Download className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#243f60]">Herramientas Especializadas</h4>
                      <p className="text-sm text-gray-600">Catálogo de herramientas</p>
                      <Link
                        href="#"
                        className="mt-1 inline-block text-sm font-medium text-[#243f60] hover:text-[#1a2e48]"
                      >
                        Descargar PDF
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                      <Download className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-[#243f60]">Equipos Industriales</h4>
                      <p className="text-sm text-gray-600">Catálogo de equipos</p>
                      <Link
                        href="#"
                        className="mt-1 inline-block text-sm font-medium text-[#243f60] hover:text-[#1a2e48]"
                      >
                        Descargar PDF
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Productos */}
            <div className="lg:col-span-3">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {productsData.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="relative h-48 w-full">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <span className="inline-block rounded-full bg-[#243f60]/10 px-2 py-1 text-xs font-medium text-[#243f60]">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#243f60]">{product.name}</h3>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">{product.description}</p>
                    </CardContent>
                    <CardFooter className="border-t p-4">
                      <div className="flex w-full items-center justify-between">
                        <span className="text-sm text-gray-500">Ref: {product.id}</span>
                        <Link href={product.pdfCatalog} target="_blank">
                          <Button size="sm" className="bg-[#243f60] hover:bg-[#1a2e48]">
                            Ver detalles
                          </Button>
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solicitud de Información */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-[#243f60] p-8 shadow-xl sm:p-12">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  ¿No encuentra lo que busca?
                </h2>
                <p className="mt-4 text-lg text-white/80">
                  Contáctenos para obtener información sobre productos específicos o solicitar una cotización
                  personalizada.
                </p>
              </div>
              <div className="flex items-center justify-center lg:justify-end">
                <Button size="lg" className="bg-white text-[#243f60] hover:bg-white/90">
                  Solicitar información
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

const categories = [
  "Herramientas Manuales",
  "Herramientas Eléctricas",
  "Equipos de Perforación",
  "Equipos de Seguridad",
  "Válvulas y Conexiones",
  "Bombas y Compresores",
  "Instrumentación",
  "Servicios Especializados",
]

const brands = [
  "Sysvencol",
  "Industrial Pro",
  "PetroTech",
  "SafetyFirst",
  "PowerTools",
  "OilMaster",
  "TechValve",
  "PumpPro",
]
