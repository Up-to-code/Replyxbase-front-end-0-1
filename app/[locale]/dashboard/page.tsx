import React from "react";
import { Metadata } from "next";
import RealEstateCommandCenter from "./components/RealEstateCommandCenter";
import { getTranslations } from "next-intl/server";
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("Dashboard.Home");

  return {
    title: "Real Estate CRM Command Center",
    description: t("subtitle"),
  };
}

export default function DashboardPage() {
  return <RealEstateCommandCenter />;
}
