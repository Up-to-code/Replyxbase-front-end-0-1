"use client";

import React from "react";
import { CalendarDays, Menu, Plus, Search, Sparkles } from "lucide-react";
import type { Translator } from "./types";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { OrganizationSwitcher } from "./OrganizationSwitcher";
import { UserMenu } from "./UserMenu";
import { Notifications } from "./Notifications";

// Header Actions Component (Notifications + Language)
function HeaderActions({ t }: { t: Translator }) {
  return (
    <div className="flex items-center gap-2">
      {/* Language Switcher */}
      <LanguageSwitcher />

      {/* Notifications */}
      <Notifications t={t} />
    </div>
  );
}

// Header Component
export function Header({
  onSidebarToggle,
  t,
}: {
  onSidebarToggle: () => void;
  t: Translator;
}) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center sticky top-0 z-50">
      <div className="w-full">
        <div className="w-full px-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1">
            <button
              type="button"
              onClick={onSidebarToggle}
              className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-300 ease-in-out lg:hidden"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative hidden w-full max-w-xl md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-100"
                placeholder="Search contacts, properties, deals, WhatsApp, documents..."
              />
            </div>
            <div className="hidden items-center gap-2 xl:flex">
              <button className="inline-flex items-center gap-2 rounded-lg bg-[#0B1F3A] px-3 py-2 text-sm font-semibold text-white hover:bg-[#123B63]">
                <Plus className="h-4 w-4" />
                Quick create
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-emerald-100 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800 hover:bg-emerald-100">
                <Sparkles className="h-4 w-4" />
                Ask AI
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                <CalendarDays className="h-4 w-4" />
                Viewing
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <OrganizationSwitcher t={t} />

            <HeaderActions t={t} />

            <UserMenu t={t} align="end" />
          </div>
        </div>
      </div>
    </header>
  );
}
