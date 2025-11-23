"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Building2, Globe2, Layout, Layers, Box, Hexagon, Triangle, Circle } from "lucide-react";

const TrustedBy = () => {
    const t = useTranslations("Landing.TrustedBy");
    
    const uniqueCompanies = [
        { name: "TechFlow", icon: Hexagon, color: "text-blue-600" },
        { name: "GrowthLabs", icon: Triangle, color: "text-green-600" },
        { name: "Elevate", icon: Layers, color: "text-purple-600" },
        { name: "GlobalCorp", icon: Globe2, color: "text-indigo-600" },
        { name: "NextGen", icon: Box, color: "text-orange-600" },
        { name: "FutureWorks", icon: Layout, color: "text-pink-600" },
    ];

    // Repeat the companies list to ensure infinite scroll density
    const companies = Array(10).fill(uniqueCompanies).flat();

    return (
        <section className="py-12 bg-white border-b border-gray-100 overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">{t("title")}</p>
            </div>

            <div className="relative w-full overflow-hidden" dir="ltr">
                {/* Fade Gradients */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                
                {/* Infinite Loop Container */}
                <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center gap-16 mx-8">
                            {companies.map((company, index) => (
                                <div key={`${i}-${index}`} className="flex items-center gap-2 group opacity-60 hover:opacity-100 transition-opacity cursor-pointer grayscale hover:grayscale-0 duration-300">
                                    <company.icon className={`w-8 h-8 ${company.color}`} />
                                    <span className="text-xl font-bold text-gray-700 group-hover:text-gray-900">{company.name}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;
