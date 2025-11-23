import React from "react";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { SettingsClient } from "./components/SettingsClient";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Dashboard.Settings" });

  return {
    title: t("title"),
    description: t("subtitle"),
  };
}

export default function SettingsPage() {
  return <SettingsClient />;
}
