"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<null | {
    src: string
    alt: string
    category: string
  }>(null)

  const openLightbox = (image: { src: string; alt: string; category: string }) => {
    setSelectedImage(image)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "auto"
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <PageHeader title="Galería" description="Explore nuestros proyectos y trabajos realizados" />

      {/* Galería de Imágenes */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="all" className="w-full">
            <div className="mx-auto mb-8 max-w-md">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="projects">Proyectos</TabsTrigger>
                <TabsTrigger value="equipment">Equipos</TabsTrigger>
                <TabsTrigger value="team">Equipo</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="group relative cursor-pointer overflow-hidden rounded-lg"
                    onClick={() => openLightbox(image)}
                  >
                    <div className="relative h-64 w-full">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-center text-lg font-bold text-white">{image.alt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="projects">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {galleryImages
                  .filter((image) => image.category === "projects")
                  .map((image, index) => (
                    <div
                      key={index}
                      className="group relative cursor-pointer overflow-hidden rounded-lg"
                      onClick={() => openLightbox(image)}
                    >
                      <div className="relative h-64 w-full">
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="text-center text-lg font-bold text-white">{image.alt}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="equipment">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {galleryImages
                  .filter((image) => image.category === "equipment")
                  .map((image, index) => (
                    <div
                      key={index}
                      className="group relative cursor-pointer overflow-hidden rounded-lg"
                      onClick={() => openLightbox(image)}
                    >
                      <div className="relative h-64 w-full">
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="text-center text-lg font-bold text-white">{image.alt}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="team">
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {galleryImages
                  .filter((image) => image.category === "team")
                  .map((image, index) => (
                    <div
                      key={index}
                      className="group relative cursor-pointer overflow-hidden rounded-lg"
                      onClick={() => openLightbox(image)}
                    >
                      <div className="relative h-64 w-full">
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="text-center text-lg font-bold text-white">{image.alt}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Videos */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#243f60] sm:text-4xl">Videos</h2>
            <p className="mt-4 text-lg text-gray-600">
              Conozca más sobre nuestros servicios y proyectos a través de nuestros videos
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((video) => (
              <div key={video} className="overflow-hidden rounded-lg shadow-lg">
                <div className="relative aspect-video w-full">
                  <Image
                    src="/placeholder.svg?height=720&width=1280"
                    alt={`Video ${video}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-[#243f60] shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="none"
                      >
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-[#243f60]">Título del Video {video}</h3>
                  <p className="mt-2 text-gray-600">Breve descripción del contenido del video.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 z-10 text-white hover:bg-white/10"
            onClick={closeLightbox}
          >
            <X className="h-8 w-8" />
            <span className="sr-only">Cerrar</span>
          </Button>
          <div className="relative max-h-[80vh] max-w-[90vw]">
            <Image
              src={selectedImage.src || "/placeholder.svg"}
              alt={selectedImage.alt}
              width={1200}
              height={800}
              className="max-h-[80vh] w-auto object-contain"
            />
            <div className="mt-4 text-center text-white">
              <p className="text-lg font-bold">{selectedImage.alt}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

const galleryImages = [
  {
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Proyecto de Mantenimiento 1",
    category: "projects",
  },
  {
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Equipo Especializado 1",
    category: "equipment",
  },
  {
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Nuestro Equipo 1",
    category: "team",
  },
  {
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Proyecto de Instalación 1",
    category: "projects",
  },
  {
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Herramientas Especializadas 1",
    category: "equipment",
  },
  {
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Capacitación del Equipo 1",
    category: "team",
  },
  {
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Proyecto de Transporte 1",
    category: "projects",
  },
  {
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Equipos de Seguridad 1",
    category: "equipment",
  },
  {
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Equipo en Acción 1",
    category: "team",
  },
  {
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Proyecto de Consultoría 1",
    category: "projects",
  },
  {
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Maquinaria Especializada 1",
    category: "equipment",
  },
  {
    src: "/placeholder.svg?height=800&width=1200",
    alt: "Reunión de Equipo 1",
    category: "team",
  },
]
