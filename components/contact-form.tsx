"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
      message: "",
    })
    alert("¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white">
          Nombre
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          placeholder="Tu nombre"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">
          Correo electrónico
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          placeholder="tu@email.com"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone" className="text-white">
          Teléfono
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
          placeholder="+1 234 567 8900"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message" className="text-white">
          Mensaje
        </Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          className="min-h-[120px] bg-white/10 border-white/20 text-white placeholder:text-white/50"
          placeholder="¿Cómo podemos ayudarte?"
        />
      </div>
      <Button type="submit" className="w-full bg-white text-[#243f60] hover:bg-white/90">
        Enviar mensaje
      </Button>
    </form>
  )
}
