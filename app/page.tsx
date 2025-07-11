"use client";

import type React from "react";

import HeroSection from "@/components/home/hero";
import FeaturesSection from "@/components/home/features";
import AboutSection from "@/components/home/about";
// import TestimonialsSection from "@/components/home/testimonials";
import ServicesSection from "@/components/home/services";
import ClientsSection from "@/components/home/clients";
import CtaSection from "@/components/home/cta";

import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <HeroSection />
            <FeaturesSection />
            <AboutSection />
            <ServicesSection />
            <ClientsSection />
            <CtaSection />

            <Footer />
        </div>
    );
}
