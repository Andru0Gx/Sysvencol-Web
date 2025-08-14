"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export type ContactFormVariant = "default" | "card";

interface ContactFormProps {
    formData: {
        name: string;
        email: string;
        phone: string;
        subject: string;
        message: string;
    };
    setFormData: React.Dispatch<
        React.SetStateAction<{
            name: string;
            email: string;
            phone: string;
            subject: string;
            message: string;
        }>
    >;
    variant?: ContactFormVariant;
}

export function ContactForm({
    formData,
    setFormData,
    variant = "default",
}: ContactFormProps) {
    const { toast } = useToast();
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData((prev) => ({ ...prev, subject: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) {
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                });
                toast({
                    title: "¡Mensaje enviado!",
                    description:
                        "Gracias por contactarnos. Nos pondremos en contacto contigo pronto.",
                    duration: 4000,
                    variant: "success",
                });
            } else {
                toast({
                    title: data.title || "Error al enviar",
                    description:
                        data.message ||
                        "Hubo un error al enviar el mensaje. Intente nuevamente.",
                    variant: "destructive",
                    duration: 4000,
                });
            }
        } catch (error) {
            toast({
                title: "Error de red",
                description:
                    "Hubo un error al enviar el mensaje. Intente nuevamente.",
                variant: "destructive",
                duration: 4000,
            });
        }
    };

    // Diseño tipo "card"
    if (variant === "card") {
        return (
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nombre Completo</Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
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
                    <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={(e) => handleSelectChange(e.target.value)}
                        className={`w-full rounded-md border  px-3 py-2 h-[42px] focus:outline-none focus:ring-2 focus:ring-[#243f60] text-base font-normal leading-normal transition-colors duration-150 placeholder:text-[#243f60]/50 placeholder:text-base appearance-none ${
                            formData.subject === ""
                                ? "text-[#243f60]/50"
                                : "text-[#243f60]"
                        }`}
                    >
                        <option value="" className="text-[#243f60]/50">
                            Seleccione un asunto
                        </option>
                        <option
                            value="Consulta General"
                            className="text-[#243f60]"
                        >
                            Consulta General
                        </option>
                        <option
                            value="Solicitud de Cotización"
                            className="text-[#243f60]"
                        >
                            Solicitud de Cotización
                        </option>
                        <option
                            value="Soporte Técnico"
                            className="text-[#243f60]"
                        >
                            Soporte Técnico
                        </option>
                        <option
                            value="Completación de Pozos"
                            className="text-[#243f60]"
                        >
                            Completación de Pozos
                        </option>
                        <option
                            value="Intervención de Pozos"
                            className="text-[#243f60]"
                        >
                            Intervención de Pozos
                        </option>
                        <option
                            value="Elevación Artificial y Control de Arena"
                            className="text-[#243f60]"
                        >
                            Elevación Artificial y Control de Arena
                        </option>
                        <option
                            value="Infraestructura Digital"
                            className="text-[#243f60]"
                        >
                            Infraestructura Digital
                        </option>
                        <option
                            value="Pruebas No Destructivas"
                            className="text-[#243f60]"
                        >
                            Pruebas No Destructivas
                        </option>
                        <option value="Otros" className="text-[#243f60]">
                            Otros
                        </option>
                    </select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="message">Mensaje</Label>
                    <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="¿Cómo podemos ayudarle?"
                        className="min-h-[120px]"
                    />
                </div>
                <Button
                    type="submit"
                    className="w-full bg-[#243f60] text-white hover:bg-[#1a2e48]"
                >
                    Enviar Mensaje
                </Button>
            </form>
        );
    }

    // Diseño "default"
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name" className="text-white text-base">
                    Nombre Completo
                </Label>
                <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-[#f8fafc] border-[#243f60] text-[#243f60] placeholder:text-[#243f60]/50 placeholder:text-base focus:ring-2 focus:ring-[#243f60] text-base"
                    placeholder="Su nombre completo"
                />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-white text-base">
                        Correo Electrónico
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-[#f8fafc] border-[#243f60] text-[#243f60] placeholder:text-[#243f60]/50 placeholder:text-base focus:ring-2 focus:ring-[#243f60] text-base"
                        placeholder="su@email.com"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone" className="text-white text-base">
                        Teléfono
                    </Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="bg-[#f8fafc] border-[#243f60] text-[#243f60] placeholder:text-[#243f60]/50 placeholder:text-base focus:ring-2 focus:ring-[#243f60] text-base"
                        placeholder="+1 234 567 8900"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <Label htmlFor="subject" className="text-white text-base">
                    Asunto
                </Label>
                <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={(e) => handleSelectChange(e.target.value)}
                    className={`w-full rounded-md border bg-[#f8fafc] border-[#243f60] px-3 py-2 h-[42px] focus:outline-none focus:ring-2 focus:ring-[#243f60] text-base font-normal leading-normal transition-colors duration-150 placeholder:text-[#243f60]/50 placeholder:text-base appearance-none ${
                        formData.subject === ""
                            ? "text-[#243f60]/50"
                            : "text-[#243f60]"
                    }`}
                >
                    <option value="" className="text-[#243f60]/50">
                        Seleccione un asunto
                    </option>
                    <option value="Consulta General" className="text-[#243f60]">
                        Consulta General
                    </option>
                    <option
                        value="Solicitud de Cotización"
                        className="text-[#243f60]"
                    >
                        Solicitud de Cotización
                    </option>
                    <option value="Soporte Técnico" className="text-[#243f60]">
                        Soporte Técnico
                    </option>
                    <option
                        value="Completación de Pozos"
                        className="text-[#243f60]"
                    >
                        Completación de Pozos
                    </option>
                    <option
                        value="Intervención de Pozos"
                        className="text-[#243f60]"
                    >
                        Intervención de Pozos
                    </option>
                    <option
                        value="Elevación Artificial y Control de Arena"
                        className="text-[#243f60]"
                    >
                        Elevación Artificial y Control de Arena
                    </option>
                    <option
                        value="Infraestructura Digital"
                        className="text-[#243f60]"
                    >
                        Infraestructura Digital
                    </option>
                    <option
                        value="Pruebas No Destructivas"
                        className="text-[#243f60]"
                    >
                        Pruebas No Destructivas
                    </option>
                    <option value="Otros" className="text-[#243f60]">
                        Otros
                    </option>
                </select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="message" className="text-white text-base">
                    Mensaje
                </Label>
                <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="min-h-[120px] bg-[#f8fafc] border-[#243f60] text-[#243f60] placeholder:text-[#243f60]/50 placeholder:text-base focus:ring-2 focus:ring-[#243f60] text-base"
                    placeholder="¿Cómo podemos ayudarle?"
                />
            </div>
            <Button
                type="submit"
                className="w-full bg-white text-[#243f60] hover:bg-white/90"
            >
                Enviar mensaje
            </Button>
        </form>
    );
}
