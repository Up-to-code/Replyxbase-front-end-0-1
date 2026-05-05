import React from "react";
import { usePathname, useRouter } from "@/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  Plus,
  Sparkles,
} from "lucide-react";
import { Agent, NavigationItem } from "./types";
import { AGENT_ICONS, NAVIGATION } from "./constants";
import { useRTL } from "@/hooks/useRTL";

// Logo Component
function LogoSection({
  sidebarOpen,
  onToggle,
}: {
  sidebarOpen: boolean;
  onToggle: () => void;
}) {
  const { isRTL } = useRTL();
  
  return (
    <div className="h-16 border-b border-slate-200 flex items-center px-5 bg-white">
      <div className="flex items-center justify-between w-full">
        {sidebarOpen && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#0B1F3A] rounded-lg flex items-center justify-center shadow-sm shadow-blue-900/20">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-slate-950 text-base font-bold">Replyxbase Realty</h1>
              <p className="text-slate-500 text-xs">Real Estate CRM</p>
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="text-slate-400 hover:text-slate-600 p-2 rounded-lg hover:bg-slate-100 transition-all duration-300 ease-in-out"
          aria-label="Toggle sidebar"
          type="button"
        >
          {sidebarOpen ? (
            isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />
          ) : (
            isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}

// Navigation Component
function NavigationButton({
  item,
  isActive,
  sidebarOpen,
  onClick,
  label,
}: {
  item: NavigationItem;
  isActive: boolean;
  sidebarOpen: boolean;
  onClick: () => void;
  label: string;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center w-full px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out group ${
        isActive
          ? "bg-[#0B1F3A] text-white shadow-md shadow-blue-900/10"
          : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`} />
      {sidebarOpen && <span className="ms-3 text-sm font-medium">{label}</span>}
    </button>
  );
}

// Agent Component
function AgentButton({
  agent,
  isActive,
  onClick,
}: {
  agent: Agent;
  isActive: boolean;
  onClick: () => void;
}) {
  const AgentIcon = AGENT_ICONS[agent.type] || AGENT_ICONS.default;
  
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ease-in-out text-start group ${
        isActive
          ? "bg-emerald-50 text-emerald-800 border border-emerald-100 shadow-sm"
          : "text-slate-500 hover:text-slate-900 hover:bg-slate-100 border border-transparent"
      }`}
    >
      <div className="flex items-center gap-3 w-full">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative flex items-center justify-center">
            <AgentIcon className={`w-4 h-4 ${isActive ? "text-emerald-700" : "text-slate-400 group-hover:text-slate-600"}`} />
            <div
              className={`absolute -top-0.5 -end-0.5 w-2 h-2 rounded-full border border-white ${
                agent.status === "active" ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>
          <span className="truncate text-sm font-medium flex-1">{agent.name}</span>
        </div>
        {isActive && (
            <Sparkles className="w-3 h-3 text-emerald-700 shrink-0" />
        )}
      </div>
    </button>
  );
}



export function Sidebar({
  sidebarOpen,
  onToggle,
  agents,
  onAgentClick,
  onCreateAgent,
}: {
  sidebarOpen: boolean;
  onToggle: () => void;
  agents: Agent[];
  onAgentClick: (agentId: string) => void;
  onCreateAgent: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isActiveRoute = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname === href || (!!pathname && pathname.startsWith(href + "/"));

  return (
    <aside
      className={`bg-white border-e border-slate-200 flex flex-col transition-all duration-300 ease-in-out h-full sticky top-0 z-30 ${
        sidebarOpen ? "w-64" : "w-20"
      }`}
    >
      <LogoSection sidebarOpen={sidebarOpen} onToggle={onToggle} />

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto bg-white scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
        {/* Main Navigation */}
        {NAVIGATION.map((item) => (
          <NavigationButton
            key={item.href}
            item={item}
            isActive={isActiveRoute(item.href)}
            sidebarOpen={sidebarOpen}
            onClick={() => router.push(item.href)}
            label={item.label}
          />
        ))}

        {/* Divider */}
        <div className="border-t border-slate-100 my-4" />

        {/* Create Agent */}
        <button
          onClick={onCreateAgent}
          className="flex items-center w-full px-3 py-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-300 ease-in-out group"
        >
          <Plus className="w-5 h-5 group-hover:text-emerald-700 transition-colors" />
          {sidebarOpen && (
            <span className="ms-3 text-sm font-medium">Create AI agent</span>
          )}
        </button>

        {/* Existing Agents */}
        {sidebarOpen && (
          <div className="mt-6">
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-normal mb-3 px-1">
              AI agents
            </h3>
            <div className="space-y-1">
              {agents.map((agent) => (
                <AgentButton
                  key={agent.id}
                  agent={agent}
                  isActive={pathname === `/dashboard/agent/${agent.id}`}
                  onClick={() => onAgentClick(agent.id)}
                />
              ))}
            </div>
          </div>
        )}
      </nav>


    </aside>
  );
}
