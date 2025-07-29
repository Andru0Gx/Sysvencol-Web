import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
    title: string;
    description: string;
    icon: string;
    imageUrl: string;
    url?: string;
}

export default function ServiceCard({
    title,
    description,
    icon,
    imageUrl,
    url = "#",
}: ServiceCardProps) {
    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
            <div className="relative h-48 w-full">
                <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={title}
                    fill
                    className="object-cover"
                />
            </div>
            <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#243f60]/10 text-[#243f60]">
                    <Image
                        className="h-24 w-24"
                        src={icon}
                        alt={title}
                        width={20}
                        height={20}
                    ></Image>
                </div>
                <h3 className="mb-2 text-xl font-bold text-[#243f60]">
                    {title}
                </h3>
                <p className="mb-4 text-gray-600">{description}</p>
                <Link href={url}>
                    <Button
                        variant="ghost"
                        className="p-0 text-[#243f60] hover:bg-transparent hover:text-[#1a2e48]"
                    >
                        Más información <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
