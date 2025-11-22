"use client";
import React from "react";
import { usePathname, useRouter } from "@/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Plus,
  Sparkles,
} from "lucide-react";
import { Agent, NavigationItem, Translator } from "./types";
import { AGENT_ICONS, NAVIGATION, USER } from "./constants";

// Logo Component
function LogoSection({
  sidebarOpen,
  onToggle,
}: {
  sidebarOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="h-16 border-b border-zinc-800 flex items-center px-6 bg-zinc-900">
      <div className="flex items-center justify-between w-full">
        {sidebarOpen && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-white text-lg font-bold">Anan</h1>
              <p className="text-zinc-400 text-xs">AI Platform</p>
            </div>
          </div>
        )}
        <button
          onClick={onToggle}
          className="text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800 transition-all duration-300 ease-in-out"
          aria-label="Toggle sidebar"
          type="button"
        >
          {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
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
}: {
  item: NavigationItem;
  isActive: boolean;
  sidebarOpen: boolean;
  onClick: () => void;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ease-in-out group ${
        isActive
          ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
          : "text-zinc-400 hover:text-white hover:bg-zinc-800"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-white" : "text-zinc-400 group-hover:text-white"}`} />
      {sidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}
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
      className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ease-in-out text-left group ${
        isActive
          ? "bg-zinc-800 text-white border border-zinc-700"
          : "text-zinc-400 hover:text-white hover:bg-zinc-800"
      }`}
    >
      <div className="flex items-center gap-3 w-full">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative flex items-center justify-center">
            <AgentIcon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-zinc-400 group-hover:text-white"}`} />
            <div
              className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-zinc-900 ${
                agent.status === "active" ? "bg-green-500" : "bg-zinc-500"
              }`}
            />
          </div>
          <span className="truncate text-sm font-medium flex-1">{agent.name}</span>
        </div>
        {isActive && (
          <Sparkles className="w-3 h-3 text-blue-400 shrink-0" />
        )}
      </div>
    </button>
  );
}

// User Section Component
function UserSection({ sidebarOpen }: { sidebarOpen: boolean }) {
  return (
    <div className="p-4 border-t border-zinc-800 bg-zinc-900">
      <div className="flex items-center gap-3 p-3 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center overflow-hidden border border-zinc-700">
          <img 
            src={USER.avatar} 
            alt="User avatar"
            className="w-full h-full object-cover"
          />
        </div>
        {sidebarOpen && (
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-semibold truncate">{USER.name}</p>
            <p className="text-zinc-400 text-xs truncate">{USER.role}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function Sidebar({
  sidebarOpen,
  onToggle,
  agents,
  onAgentClick,
  onCreateAgent,
  t,
}: {
  sidebarOpen: boolean;
  onToggle: () => void;
  agents: Agent[];
  onAgentClick: (agentId: string) => void;
  onCreateAgent: () => void;
  t: Translator;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const isActiveRoute = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname === href || (!!pathname && pathname.startsWith(href + "/"));

  return (
    <aside
      className={`bg-zinc-900 border-r border-zinc-800 ${
        sidebarOpen ? "w-64" : "w-20"
      } transition-all duration-300 flex flex-col`}
    >
      <LogoSection sidebarOpen={sidebarOpen} onToggle={onToggle} />

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto bg-zinc-900">
        {/* Main Navigation */}
        {NAVIGATION.map((item) => (
          <NavigationButton
            key={item.href}
            item={item}
            isActive={isActiveRoute(item.href)}
            sidebarOpen={sidebarOpen}
            onClick={() => router.push(item.href)}
          />
        ))}

        {/* Divider */}
        <div className="border-t border-zinc-800 my-4" />

        {/* Create Agent */}
        <button
          onClick={onCreateAgent}
          className="flex items-center w-full px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-300 ease-in-out"
        >
          <Plus className="w-5 h-5" />
          {sidebarOpen && (
            <span className="ml-3 font-medium">{t("createAgent")}</span>
          )}
        </button>

        {/* Existing Agents */}
        {sidebarOpen && (
          <div className="mt-6">
            <h3 className="text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-3 px-1">
              {t("existingAgents")}
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

      <UserSection sidebarOpen={sidebarOpen} />
    </aside>
  );
}
