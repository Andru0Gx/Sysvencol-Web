import { CheckCircle2 } from "lucide-react";
import { ValoresList } from "@/lib/types";

export default function Valores() {
    return (
        <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-[#243f60] sm:text-4xl">
                        Nuestros Valores
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        En Sysvencol, nuestros valores fundamentales guían todas
                        nuestras acciones y decisiones
                    </p>
                </div>

                <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {ValoresList.map((valor) => (
                        <div
                            key={valor.tittle}
                            className="rounded-lg bg-white p-8 shadow-lg"
                        >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-[#243f60]">
                                {valor.tittle}
                            </h3>
                            <p className="text-gray-600">{valor.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
