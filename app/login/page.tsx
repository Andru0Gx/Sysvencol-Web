"use client";

import type React from "react";
import PageHeader from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

type LoginValues = { email: string; password: string };

export default function LoginPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const form = useForm<LoginValues>({
        defaultValues: { email: "", password: "" },
        mode: "onBlur",
    });

    const onSubmit = async (values: LoginValues) => {
        setSubmitting(true);
        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await res.json();

            if (!res.ok) {
                // Mostrar errores de campo devueltos por el backend
                if (data?.errors) {
                    Object.entries<string>(data.errors).forEach(
                        ([name, message]) => {
                            form.setError(name as keyof LoginValues, {
                                type: "server",
                                message,
                            });
                        }
                    );
                }
                toast({
                    title: "No se pudo iniciar sesión",
                    description: data?.message ?? "Revise sus datos.",
                    variant: "destructive" as any,
                });
                return;
            }

            // Redirigir y forzar recarga para que el layout lea la nueva cookie
            if (typeof window !== "undefined") {
                window.location.href = "/admin";
            } else {
                router.replace("/admin");
            }
        } catch (err) {
            toast({
                title: "Error de red",
                description: "No fue posible contactar al servidor.",
                variant: "destructive" as any,
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col">
            <PageHeader
                title="Iniciar sesión"
                description="Accede a tu cuenta para continuar."
            />
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto w-full max-w-md">
                        <Card>
                            <CardContent className="p-6 bg-[#f8fafc]">
                                <h2 className="text-2xl font-bold text-[#243f60] text-center">
                                    Bienvenido
                                </h2>
                                <p className="mt-2 text-center text-gray-600">
                                    Introduzca sus credenciales para acceder
                                </p>

                                <div className="mt-6">
                                    <Form {...form}>
                                        <form
                                            onSubmit={form.handleSubmit(
                                                onSubmit
                                            )}
                                            className="space-y-5"
                                        >
                                            <FormField
                                                control={form.control}
                                                name="email"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Correo electrónico
                                                        </FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                                                <Input
                                                                    type="email"
                                                                    placeholder="nombre@empresa.com"
                                                                    autoComplete="email"
                                                                    className="pl-9"
                                                                    {...field}
                                                                />
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="password"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Contraseña
                                                        </FormLabel>
                                                        <FormControl>
                                                            <div className="relative">
                                                                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                                                <Input
                                                                    type={
                                                                        showPassword
                                                                            ? "text"
                                                                            : "password"
                                                                    }
                                                                    placeholder="••••••••"
                                                                    autoComplete="current-password"
                                                                    className="pl-9 pr-10"
                                                                    {...field}
                                                                />
                                                                <button
                                                                    type="button"
                                                                    aria-label={
                                                                        showPassword
                                                                            ? "Ocultar contraseña"
                                                                            : "Mostrar contraseña"
                                                                    }
                                                                    onClick={() =>
                                                                        setShowPassword(
                                                                            (
                                                                                s
                                                                            ) =>
                                                                                !s
                                                                        )
                                                                    }
                                                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                                                >
                                                                    {showPassword ? (
                                                                        <EyeOff className="h-4 w-4" />
                                                                    ) : (
                                                                        <Eye className="h-4 w-4" />
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button
                                                type="submit"
                                                className="w-full"
                                                disabled={submitting}
                                            >
                                                {submitting
                                                    ? "Ingresando..."
                                                    : "Iniciar sesión"}
                                            </Button>
                                        </form>
                                    </Form>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </div>
    );
}
