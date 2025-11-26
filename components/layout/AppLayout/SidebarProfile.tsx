"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "@/navigation";
import { ChevronDown, Check, Plus, LogOut, ChevronsUpDown } from "lucide-react";
import { MOCK_ORGANIZATIONS, PROFILE_MENU, USER } from "./constants";
import { Translator } from "./types";

function useClickOutside(callback: () => void) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    }
    document.addEventListener("mousedown", handleClick, true);
    return () =>
      document.removeEventListener("mousedown", handleClick, true);
  }, [callback]);

  return ref;
}

export function SidebarProfile({ 
  t, 
  sidebarOpen 
}: { 
  t: Translator;
  sidebarOpen: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(MOCK_ORGANIZATIONS[0]);
  const router = useRouter();
  const ref = useClickOutside(() => setIsOpen(false));

  const handleAction = (href?: string, action?: string) => {
    if (action === "logout") {
      // TODO: Implement logout
      setIsOpen(false);
    } else if (href) {
      router.push(href);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-3 p-2 w-full rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200 group ${
          !sidebarOpen ? "justify-center" : ""
        }`}
      >
        <div className="relative">
          <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden shadow-sm">
            <img
              src={USER.avatar}
              alt={USER.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-md bg-white border border-gray-100 flex items-center justify-center overflow-hidden shadow-sm">
             <img
              src={selectedOrg.avatar}
              alt={selectedOrg.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {sidebarOpen && (
          <>
            <div className="flex-1 min-w-0 text-start">
              <p className="text-sm font-semibold text-gray-900 truncate leading-tight">
                {USER.name}
              </p>
              <p className="text-xs text-gray-500 truncate font-medium">
                {selectedOrg.name}
              </p>
            </div>
            <ChevronsUpDown className="w-4 h-4 text-gray-400" />
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 bottom-full mb-2 w-72 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 z-50 overflow-hidden ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-100">
          {/* Organization Switcher Section */}
          <div className="p-2">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 py-1.5 mb-1">
              {t("Header.organizations")}
            </div>
            {MOCK_ORGANIZATIONS.map((org) => (
              <button
                key={org.id}
                onClick={() => setSelectedOrg(org)}
                className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                  selectedOrg.id === org.id
                    ? "bg-blue-50 text-[#2A4D9A]"
                    : "hover:bg-gray-50 text-gray-700"
                }`}
              >
                <div className="w-6 h-6 rounded-md bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden">
                  <img
                    src={org.avatar}
                    alt={org.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="flex-1 text-start text-sm font-medium truncate">
                  {org.name}
                </span>
                {selectedOrg.id === org.id && (
                  <Check className="w-3.5 h-3.5 text-[#2A4D9A]" />
                )}
              </button>
            ))}
            <button className="w-full flex items-center gap-3 p-2 text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all mt-1">
              <div className="w-6 h-6 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center">
                <Plus className="w-3.5 h-3.5" />
              </div>
              {t("Header.createOrganization")}
            </button>
          </div>

          <div className="h-px bg-gray-100 my-1 mx-2" />

          {/* User Menu Section */}
          <div className="p-2 max-h-[15rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 py-1.5 mb-1">
              {t("Header.account")}
            </div>
            {PROFILE_MENU.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => handleAction(item.href, item.action)}
                  className="flex items-center w-full p-2 hover:bg-gray-50 text-start transition-all duration-200 rounded-lg group text-gray-700"
                >
                  <Icon className="w-4 h-4 text-gray-400 group-hover:text-gray-600 me-3" />
                  <span className="text-sm font-medium">{t(`Header.ProfileMenu.${item.label}`)}</span>
                </button>
              );
            })}
          </div>

          <div className="p-3 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center overflow-hidden">
                <img 
                  src={USER.avatar} 
                  alt={USER.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">{USER.name}</p>
                <p className="text-xs text-gray-500 truncate">{USER.email}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
