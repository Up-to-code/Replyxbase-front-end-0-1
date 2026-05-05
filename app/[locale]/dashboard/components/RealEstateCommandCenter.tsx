"use client";

import Link from "next/link";
import { ArrowRight, Building2, CalendarDays, Search, Target, Users } from "lucide-react";
import { contacts, estateStats, pipelineStages, properties } from "../real-estate-data";

const toneClasses: Record<string, string> = {
  emerald: "bg-emerald-50 text-emerald-700",
  blue: "bg-blue-50 text-blue-700",
  navy: "bg-slate-100 text-slate-800",
  amber: "bg-amber-50 text-amber-700",
};

const today = [
  { time: "10:30", title: "Lake View Residence", contact: "Sarah Mansour" },
  { time: "13:00", title: "Palm Hills Golf", contact: "Karim El Din" },
  { time: "16:30", title: "Seashell Chalet", contact: "Nour Adel" },
];

function Metric({ stat }: { stat: (typeof estateStats)[number] }) {
  const Icon = stat.icon;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-slate-500">{stat.label}</p>
          <p className="mt-1 text-2xl font-semibold text-slate-950">{stat.value}</p>
        </div>
        <div className={`rounded-md p-2 ${toneClasses[stat.tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-3 text-xs font-semibold text-emerald-700">{stat.change}</p>
    </div>
  );
}

function Section({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <h2 className="text-base font-semibold text-slate-950">{title}</h2>
        <Link href={href} className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-700">
          Open <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      {children}
    </section>
  );
}

export default function RealEstateCommandCenter() {
  const topDeals = pipelineStages.flatMap((stage) => stage.deals.map((deal) => ({ ...deal, stage: stage.name }))).slice(0, 3);

  return (
    <main className="min-h-screen bg-[#F6F8FA] p-4 text-slate-950 md:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px] space-y-5">
        <section className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">Real Estate CRM</p>
              <h1 className="mt-1 text-2xl font-semibold text-[#0B1F3A] md:text-3xl">Dashboard</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600">
                Leads, viewings, pipeline, and listings in one simple workspace.
              </p>
            </div>
            <div className="relative w-full lg:w-[360px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="h-10 w-full rounded-md border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                placeholder="Search..."
              />
            </div>
          </div>
        </section>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {estateStats.map((stat) => (
            <Metric key={stat.label} stat={stat} />
          ))}
        </div>

        <div className="grid gap-5 xl:grid-cols-3">
          <Section title="Today" href="/dashboard/calendar">
            <div className="space-y-3">
              {today.map((item) => (
                <div key={`${item.time}-${item.title}`} className="flex items-center gap-3 rounded-md bg-slate-50 p-3">
                  <span className="w-12 text-sm font-semibold text-[#0B1F3A]">{item.time}</span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-950">{item.title}</p>
                    <p className="truncate text-xs text-slate-500">{item.contact}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Pipeline" href="/dashboard/deals">
            <div className="space-y-3">
              {topDeals.map((deal) => (
                <div key={deal.title} className="rounded-md bg-slate-50 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-950">{deal.title}</p>
                      <p className="mt-1 text-xs text-slate-500">{deal.stage}</p>
                    </div>
                    <span className="text-sm font-semibold text-[#0B1F3A]">{deal.value}</span>
                  </div>
                  <p className="mt-2 truncate text-xs text-slate-600">{deal.next}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title="Customers" href="/dashboard/contacts">
            <div className="space-y-3">
              {contacts.map((contact) => (
                <div key={contact.name} className="flex items-center justify-between gap-3 rounded-md bg-slate-50 p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-950">{contact.name}</p>
                    <p className="truncate text-xs text-slate-500">{contact.preference}</p>
                  </div>
                  <span className="rounded-md bg-[#0B1F3A] px-2 py-1 text-xs font-bold text-white">{contact.score}%</span>
                </div>
              ))}
            </div>
          </Section>
        </div>

        <section className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 md:grid-cols-4">
          {[
            { label: "Pipeline", href: "/dashboard/deals", icon: Target },
            { label: "Calendar", href: "/dashboard/calendar", icon: CalendarDays },
            { label: "Customers", href: "/dashboard/contacts", icon: Users },
            { label: "Properties", href: "/dashboard/properties", icon: Building2 },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between rounded-md border border-slate-200 p-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                <span className="inline-flex items-center gap-2">
                  <Icon className="h-4 w-4 text-emerald-700" />
                  {item.label}
                </span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            );
          })}
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-950">{properties[0].title}</p>
              <p className="mt-1 text-sm text-slate-500">
                {properties[0].compound}, {properties[0].city}
              </p>
            </div>
            <p className="text-sm font-semibold text-[#0B1F3A]">{properties[0].price}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
