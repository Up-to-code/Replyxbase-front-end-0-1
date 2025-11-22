import React from "react";
import { Metadata } from "next";
import LandingPageClient from "@/components/landing/LandingPageClient";

export const metadata: Metadata = {
  title: "ChatConnect - AI-Powered Customer Support Platform",
  description: "Automate your customer support with AI agents. Unified inbox for WhatsApp, Telegram, and Web. Increase sales and reduce response times.",
  openGraph: {
    title: "ChatConnect - AI-Powered Customer Support",
    description: "Automate your customer support with AI agents. Unified inbox for WhatsApp, Telegram, and Web.",
    type: "website",
    url: "https://chatconnect.com",
    images: [
      {
        url: "/assets/dashboard_hero.png",
        width: 1200,
        height: 630,
        alt: "ChatConnect Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatConnect - AI Customer Support",
    description: "Automate support and boost sales with AI agents.",
    images: ["/assets/dashboard_hero.png"],
  },
};

export default function LandingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ChatConnect",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Automate your customer support with AI agents. Unified inbox for WhatsApp, Telegram, and Web.",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LandingPageClient />
    </>
  );
}
