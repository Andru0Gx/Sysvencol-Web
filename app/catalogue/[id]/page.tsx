import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Download, ShoppingCart, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Simulación de base de datos de productos
const products = {
  "lht-001": {
    id: "LHT-001",
    name: "Llave Hidráulica de Torque",
    category: "Herramientas",
    description:
      "Llave hidráulica de torque de alta precisión para aplicaciones industriales que requieren un apriete controlado y preciso.",
    longDescription: `
      <p>La Llave Hidráulica de Torque LHT-001 es una herramienta de alta precisión diseñada para aplicaciones industriales que requieren un apriete controlado y preciso. Fabricada con materiales de la más alta calidad, esta llave ofrece un rendimiento excepcional y una durabilidad superior.</p>
      
      <p>Características principales:</p>
      <ul>
        <li>Capacidad de torque: 1,000 - 10,000 Nm</li>
        <li>Precisión: ±3%</li>
        <li>Presión máxima de trabajo: 700 bar</li>
        <li>Construcción en acero aleado de alta resistencia</li>
        <li>Diseño ergonómico para facilitar su uso</li>
        <li>Sistema de seguridad anti-sobrecarga</li>
        <li>Compatible con bombas hidráulicas estándar</li>
      </ul>
      
      <p>Aplicaciones:</p>
      <ul>
        <li>Mantenimiento de equipos industriales</li>
        <li>Montaje y desmontaje de conexiones roscadas</li>
        <li>Instalación y mantenimiento de tuberías</li>
        <li>Aplicaciones en la industria petrolera y petroquímica</li>
        <li>Construcción y mantenimiento de estructuras metálicas</li>
      </ul>
    `,
    specifications: [
      { name: "Capacidad de torque", value: "1,000 - 10,000 Nm" },
      { name: "Precisión", value: "±3%" },
      { name: "Presión máxima", value: "700 bar" },
      { name: "Material", value: "Acero aleado de alta resistencia" },
      { name: "Peso", value: "12 kg" },
      { name: "Dimensiones", value: "450 x 150 x 100 mm" },
      { name: "Garantía", value: "2 años" },
    ],
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    features: [
      "Alta precisión en el apriete",
      "Construcción robusta y duradera",
      "Diseño ergonómico para mayor comodidad",
      "Sistema de seguridad anti-sobrecarga",
      "Compatible con accesorios estándar",
      "Certificación de calidad internacional",
    ],
    relatedProducts: ["VCF-002", "BCI-003", "HCT-009"],
  },
  "vcf-002": {
    id: "VCF-002",
    name: "Válvula de Control de Flujo",
    category: "Válvulas",
    description:
      "Válvula de control de flujo diseñada para regular con precisión el flujo de líquidos y gases en sistemas de tuberías industriales.",
    longDescription: `
      <p>La Válvula de Control de Flujo VCF-002 es una válvula de alta calidad diseñada para regular con precisión el flujo de líquidos y gases en sistemas de tuberías industriales. Fabricada con materiales resistentes a la corrosión, esta válvula ofrece un rendimiento fiable en condiciones exigentes.</p>
      
      <p>Características principales:</p>
      <ul>
        <li>Diseño de globo con asiento metálico</li>
        <li>Cuerpo en acero inoxidable 316</li>
        <li>Presión nominal: PN40</li>
        <li>Temperatura de operación: -20°C a +400°C</li>
        <li>Conexiones: Bridadas ANSI 150/300</li>
        <li>Actuador neumático con posicionador</li>
        <li>Certificación ATEX para zonas peligrosas</li>
      </ul>
      
      <p>Aplicaciones:</p>
      <ul>
        <li>Control de flujo en procesos industriales</li>
        <li>Regulación de presión en sistemas de tuberías</li>
        <li>Control de temperatura en intercambiadores de calor</li>
        <li>Aplicaciones en la industria petrolera y petroquímica</li>
        <li>Sistemas de distribución de vapor</li>
      </ul>
    `,
    specifications: [
      { name: "Tipo", value: "Válvula de globo" },
      { name: "Material del cuerpo", value: "Acero inoxidable 316" },
      { name: "Presión nominal", value: "PN40" },
      { name: "Temperatura de operación", value: "-20°C a +400°C" },
      { name: "Conexiones", value: "Bridadas ANSI 150/300" },
      { name: "Actuador", value: "Neumático con posicionador" },
      { name: "Certificación", value: "ATEX" },
    ],
    images: [
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
      "/placeholder.svg?height=800&width=1200",
    ],
    features: [
      "Control preciso del flujo",
      "Resistente a la corrosión",
      "Amplio rango de temperatura de operación",
      "Actuador neumático de alta fiabilidad",
      "Certificación para zonas peligrosas",
      "Fácil mantenimiento",
    ],
    relatedProducts: ["LHT-001", "BCI-003", "SMP-008"],
  },
  "bci-003": {
    id: "BCI-003",
    name: "Bomba Centrífuga Industrial",
    category: "Bombas",
    description: "Bomba centrífuga de alto rendimiento para aplicaciones industriales exigentes.",
    images: ["/placeholder.svg?height=800&width=1200"],
    features: ["Alta eficiencia", "Bajo mantenimiento", "Resistente a la corrosión"],
    relatedProducts: ["LHT-001", "VCF-002"],
  },
  "hct-009": {
    id: "HCT-009",
    name: "Herramienta de Corte de Tubería",
    category: "Herramientas",
    description: "Herramienta profesional para corte preciso de tuberías en diversos materiales.",
    images: ["/placeholder.svg?height=800&width=1200"],
    features: ["Corte preciso", "Mango ergonómico", "Compatible con múltiples materiales"],
    relatedProducts: ["LHT-001", "VCF-002"],
  },
  "smp-008": {
    id: "SMP-008",
    name: "Sistema de Monitoreo de Presión",
    category: "Instrumentación",
    description: "Sistema avanzado para monitoreo continuo de presión en instalaciones industriales.",
    images: ["/placeholder.svg?height=800&width=1200"],
    features: ["Monitoreo en tiempo real", "Alertas automáticas", "Interfaz intuitiva"],
    relatedProducts: ["VCF-002", "BCI-003"],
  },
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const product = products[id.toLowerCase() as keyof typeof products]

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="container mx-auto flex flex-1 items-center justify-center px-4 py-16 text-center">
          <div>
            <h1 className="text-3xl font-bold text-[#243f60]">Producto no encontrado</h1>
            <p className="mt-4 text-gray-600">
              Lo sentimos, el producto que estás buscando no existe o ha sido descontinuado.
            </p>
            <Link href="/catalogue">
              <Button className="mt-8 bg-[#243f60] hover:bg-[#1a2e48]">Volver al Catálogo</Button>
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

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Link href="/catalogue" className="flex items-center text-[#243f60] hover:text-[#1a2e48]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Catálogo
          </Link>
        </div>

        {/* Product Overview */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Images */}
          <div>
            <div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
              <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.slice(1).map((image, index) => (
                <div key={index} className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} - Vista ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-2">
              <span className="inline-block rounded-full bg-[#243f60]/10 px-2 py-1 text-xs font-medium text-[#243f60]">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-[#243f60]">{product.name}</h1>
            <p className="mt-4 text-lg text-gray-600">{product.description}</p>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-[#243f60]">Características Principales</h2>
              <ul className="mt-4 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="mr-2 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" className="bg-[#243f60] hover:bg-[#1a2e48]">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Solicitar Cotización
              </Button>
              <Button size="lg" variant="outline">
                <Download className="mr-2 h-5 w-5" />
                Descargar Ficha Técnica
              </Button>
            </div>

            <div className="mt-8 rounded-lg border border-gray-200 p-4">
              <h3 className="font-bold text-[#243f60]">Información Adicional</h3>
              <p className="mt-2 text-gray-600">
                Para más información sobre este producto, especificaciones técnicas detalladas o para solicitar una
                demostración, por favor contáctenos.
              </p>
              <Link href="/contact">
                <Button className="mt-4 bg-[#243f60] hover:bg-[#1a2e48]">Contactar</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="description">Descripción</TabsTrigger>
              <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
              <TabsTrigger value="applications">Aplicaciones</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <div className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: product.longDescription || "" }} />
              </div>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <div className="overflow-hidden rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {product.specifications?.map((spec, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-[#243f60]">{spec.name}</td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600">{spec.value}</td>
                      </tr>
                    )) || (
                      <tr>
                        <td className="px-6 py-4 text-sm text-gray-600" colSpan={2}>
                          Especificaciones no disponibles
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            <TabsContent value="applications" className="mt-6">
              <div className="prose prose-lg max-w-none">
                <h3>Aplicaciones Principales</h3>
                <p>
                  Este producto está diseñado para su uso en diversas aplicaciones en la industria petrolera y
                  petroquímica, incluyendo:
                </p>
                <ul>
                  <li>Operaciones de perforación y extracción</li>
                  <li>Mantenimiento de equipos industriales</li>
                  <li>Instalación y mantenimiento de tuberías</li>
                  <li>Procesos de refinación</li>
                  <li>Sistemas de transporte de fluidos</li>
                </ul>
                <p>
                  Para obtener asesoramiento sobre aplicaciones específicas, por favor contacte con nuestro equipo
                  técnico.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-[#243f60]">Productos Relacionados</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {product.relatedProducts?.map((relatedId) => {
              const relatedProduct = products[relatedId.toLowerCase() as keyof typeof products]
              if (!relatedProduct) return null

              return (
                <Card key={relatedId} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={relatedProduct.images[0] || "/placeholder.svg"}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="mb-2">
                      <span className="inline-block rounded-full bg-[#243f60]/10 px-2 py-1 text-xs font-medium text-[#243f60]">
                        {relatedProduct.category}
                      </span>
                    </div>
                    <h3 className="line-clamp-1 text-lg font-bold text-[#243f60]">{relatedProduct.name}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-gray-600">{relatedProduct.description}</p>
                    <Link href={`/catalogue/${relatedProduct.id.toLowerCase()}`}>
                      <Button className="mt-4 w-full bg-[#243f60] hover:bg-[#1a2e48]">Ver Detalles</Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
