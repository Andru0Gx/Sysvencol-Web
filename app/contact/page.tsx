"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import PageHeader from "@/components/page-header"

export default function ContactPage() {
  const searchParams = useSearchParams()
  const serviceParam = searchParams.get("service")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  // Establecer el asunto basado en el parámetro de servicio
  useEffect(() => {
    if (serviceParam) {
      let subject = ""
      switch (serviceParam) {
        case "maintenance":
          subject = "services-maintenance"
          break
        case "transport":
          subject = "services-transport"
          break
        case "tools":
          subject = "services-tools"
          break
        case "consulting":
          subject = "services-consulting"
          break
        case "installation":
          subject = "services-installation"
          break
        case "training":
          subject = "services-training"
          break
        default:
          subject = ""
      }

      if (subject) {
        setFormData((prev) => ({ ...prev, subject }))
      }
    }
  }, [serviceParam])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar el formulario
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
    alert("¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <PageHeader title="Contacto" description="Estamos aquí para ayudarle. Contáctenos hoy mismo." />

      {/* Información de Contacto y Formulario */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold text-[#243f60]">Información de Contacto</h2>
              <p className="mt-4 text-gray-600">
                Estamos disponibles para responder a sus preguntas y ayudarle con sus necesidades específicas. No dude
                en ponerse en contacto con nosotros a través de cualquiera de los siguientes medios.
              </p>

              <div className="mt-8 space-y-6">
                <div className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-[#243f60]">Teléfono</h3>
                    <p className="mt-1 text-gray-600">+1 786 571 9496</p>
                    <p className="text-gray-600">+58 251 8175112</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-[#243f60]">Correo Electrónico</h3>
                    <p className="mt-1 text-gray-600">info@sysvencol.com</p>
                    <p className="text-gray-600">sysvencol@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-[#243f60]">Dirección</h3>
                    <p className="mt-1 text-gray-600">2900 SW 28th Terrace Suite 202, Miami FL 33133</p>
                    <p className="mt-2 text-gray-600">
                      Manzana N° 39, Calle 11-A, Parcela 2 y 3, Zona Industrial Matanzas, Edo. Monagas
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="font-bold text-[#243f60]">Horario de Atención</h3>
                    <p className="mt-1 text-gray-600">Lunes a Viernes: 8:00 AM - 5:00 PM</p>
                    <p className="text-gray-600">Sábado: 9:00 AM - 1:00 PM</p>
                    <p className="text-gray-600">Domingo: Cerrado</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-[#243f60]">Envíenos un Mensaje</h2>
                  <p className="mt-2 text-gray-600">
                    Complete el formulario a continuación y nos pondremos en contacto con usted lo antes posible.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre Completo</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Su nombre completo"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="su@email.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 234 567 8900"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Asunto</Label>
                      <Select value={formData.subject} onValueChange={handleSelectChange}>
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Seleccione un asunto" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">Consulta General</SelectItem>
                          <SelectItem value="services-maintenance">Mantenimiento de Equipos</SelectItem>
                          <SelectItem value="services-transport">Transporte Especializado</SelectItem>
                          <SelectItem value="services-tools">Herramientas Especializadas</SelectItem>
                          <SelectItem value="services-consulting">Consultoría Técnica</SelectItem>
                          <SelectItem value="services-installation">Instalación de Sistemas</SelectItem>
                          <SelectItem value="services-training">Capacitación</SelectItem>
                          <SelectItem value="quote">Solicitud de Cotización</SelectItem>
                          <SelectItem value="support">Soporte Técnico</SelectItem>
                          <SelectItem value="other">Otro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensaje</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="¿Cómo podemos ayudarle?"
                        className="min-h-[120px]"
                      />
                    </div>

                    <Button type="submit" className="w-full bg-[#243f60] hover:bg-[#1a2e48]">
                      Enviar Mensaje <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Mapa */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-lg shadow-lg">
            <div className="aspect-[16/9] w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.6978208349686!2d-80.24053492394576!3d25.7326359770707!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b7d0bb8bcf7f%3A0x1d5f64bc09a027!2s2900%20SW%2028th%20Terrace%2C%20Miami%2C%20FL%2033133%2C%20EE.%20UU.!5e0!3m2!1ses!2sco!4v1682534567890!5m2!1ses!2sco"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-[#243f60] sm:text-4xl">Preguntas Frecuentes</h2>
            <p className="mt-4 text-lg text-gray-600">
              Respuestas a las preguntas más comunes sobre nuestros servicios
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="text-lg font-bold text-[#243f60]">
                ¿Qué áreas de la industria petrolera cubren sus servicios?
              </h3>
              <p className="mt-2 text-gray-600">
                Nuestros servicios cubren todas las áreas de la industria petrolera y petroquímica, incluyendo
                exploración, perforación, producción, refinación y transporte. Ofrecemos soluciones personalizadas para
                cada etapa del proceso.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="text-lg font-bold text-[#243f60]">¿Ofrecen servicios internacionales?</h3>
              <p className="mt-2 text-gray-600">
                Sí, ofrecemos servicios a nivel internacional. Contamos con oficinas en Estados Unidos y Venezuela, y
                hemos realizado proyectos en diversos países de América Latina y el Caribe.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="text-lg font-bold text-[#243f60]">¿Cómo puedo solicitar una cotización?</h3>
              <p className="mt-2 text-gray-600">
                Puede solicitar una cotización a través de nuestro formulario de contacto, por correo electrónico o
                llamando directamente a nuestras oficinas. Le responderemos en un plazo máximo de 24 horas hábiles.
              </p>
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <h3 className="text-lg font-bold text-[#243f60]">¿Qué garantías ofrecen para sus servicios?</h3>
              <p className="mt-2 text-gray-600">
                Todos nuestros servicios cuentan con garantía. El período y las condiciones específicas varían según el
                tipo de servicio, pero siempre nos comprometemos a garantizar la calidad y satisfacción del cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
