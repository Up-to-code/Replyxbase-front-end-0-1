"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "@/navigation";
import {
  Bell,
  Menu,
  ChevronDown,
  Search,
} from "lucide-react";
import type { Notification, ProfileMenuItem, Translator } from "./types";
import { NOTIFICATIONS, NOTIFICATION_ICONS, PROFILE_MENU, USER } from "./constants";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";

// Custom Hooks
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

// Notification Item Component
function NotificationItem({ notification, t }: { notification: Notification; t: Translator }) {
  const NotificationIcon = NOTIFICATION_ICONS[notification.type] || NOTIFICATION_ICONS.default;
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'message': return 'text-blue-500';
      case 'payment': return 'text-green-500';
      case 'security': return 'text-red-500';
      case 'update': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className={`w-full p-3 rounded-xl border transition-all duration-200 ease-in-out group cursor-pointer relative overflow-hidden ${
      !notification.read 
        ? 'bg-white border-blue-100 shadow-sm hover:shadow-md hover:border-blue-200' 
        : 'bg-white border-transparent hover:bg-white hover:border-gray-200 hover:shadow-sm'
    }`}>
      {!notification.read && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-xl" />
      )}
      <div className="flex items-start gap-3 pl-2">
        <div className={`p-2 rounded-xl ${getNotificationColor(notification.type)} bg-gray-50 group-hover:bg-white group-hover:shadow-sm transition-all duration-200 ring-1 ring-gray-100`}>
          <NotificationIcon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-start justify-between gap-2">
            <p className={`text-sm font-semibold leading-snug ${!notification.read ? 'text-gray-900' : 'text-gray-600'}`}>
              {t(`Header.Notifications.${notification.label}`)}
            </p>
            <span className="text-[10px] font-medium text-gray-400 whitespace-nowrap bg-gray-50 px-1.5 py-0.5 rounded-md border border-gray-100">
              {t(`Header.Notifications.${notification.time}`)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Notifications Dropdown Component
function NotificationsDropdown({
  isOpen,
  onClose,
  t,
}: {
  isOpen: boolean;
  onClose: () => void;
  t: Translator;
}) {
  const ref = useClickOutside(onClose);
  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="absolute end-0 top-full mt-2 w-96 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 z-50 overflow-hidden ring-1 ring-black/5"
    >
      <div className="p-4 border-b border-gray-100 bg-white flex items-center justify-between sticky top-0 z-10">
        <div>
          <h3 className="font-bold text-gray-900 text-base">{t("Header.notifications")}</h3>
          <p className="text-gray-500 text-xs mt-0.5 font-medium">
            {t("Header.unreadMessages", { count: unreadCount })}
          </p>
        </div>
        {unreadCount > 0 && (
          <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2.5 py-1.5 rounded-lg transition-colors">
            {t("Header.markAllRead")}
          </button>
        )}
      </div>
      
      <div className="max-h-[28rem] overflow-y-auto bg-gray-50/50 p-2 space-y-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {NOTIFICATIONS.map((item) => (
          <NotificationItem key={item.id} notification={item} t={t} />
        ))}
      </div>
      
      <div className="p-3 border-t border-gray-100 bg-white sticky bottom-0 z-10">
        <button
          className="w-full py-2.5 text-sm text-gray-700 hover:text-gray-900 font-semibold hover:bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 ease-in-out shadow-sm"
          type="button"
        >
          {t("Header.viewAllNotifications")}
        </button>
      </div>
    </div>
  );
}

// ... (ProfileMenuItem and ProfileDropdown remain unchanged) ...



// Profile Menu Item Component
function ProfileMenuItem({ item, onAction, t }: {
  item: ProfileMenuItem;
  onAction: (href?: string, action?: string) => void;
  t: Translator;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={() => onAction(item.href, item.action)}
      className="flex items-start w-full p-3 hover:bg-gray-50 text-start transition-all duration-200 ease-in-out group rounded-xl"
    >
      <div className="p-2 rounded-lg bg-gray-50 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-200 ease-in-out me-3 shadow-sm ring-1 ring-gray-100 group-hover:ring-blue-100">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0 pt-1">
        <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 block transition-colors">
          {t(`Header.ProfileMenu.${item.label}`)}
        </span>
        {item.description && (
          <span className="text-xs text-gray-400 group-hover:text-gray-500 mt-0.5 block transition-colors">
            {t(`Header.ProfileMenu.${item.description}`)}
          </span>
        )}
      </div>
    </button>
  );
}

// Profile Dropdown Component
function ProfileDropdown({
  isOpen,
  onClose,
  onAction,
  t,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAction: (href?: string, action?: string) => void;
  t: Translator;
}) {
  const ref = useClickOutside(onClose);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="absolute end-0 top-full mt-2 w-80 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-200/50 z-50 overflow-hidden ring-1 ring-black/5"
    >
      {/* User Header */}
      <div className="p-5 border-b border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-white shadow-sm ring-1 ring-gray-100">
            <img 
              src={USER.avatar} 
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 text-lg truncate leading-tight">{USER.name}</p>
            <p className="text-sm text-gray-500 truncate">{USER.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-[11px] font-bold uppercase tracking-wide rounded-full border border-blue-100">
                {USER.role}
              </span>
              <span className="px-2.5 py-0.5 bg-green-50 text-green-700 text-[11px] font-bold uppercase tracking-wide rounded-full border border-green-100">
                {USER.plan}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-2 bg-white max-h-[20rem] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {PROFILE_MENU.map((item, index) => (
          <div key={item.label}>
            <ProfileMenuItem item={item} onAction={onAction} t={t} />
            {index === 3 && <div className="my-2 border-t border-gray-100 mx-2" />}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center justify-between text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          <span>Last login: Today, 14:30</span>
          <span>v2.4.1</span>
        </div>
      </div>
    </div>
  );
}

// Header Actions Component (Notifications + Profile)
function HeaderActions({ t }: { t: Translator }) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const router = useRouter();

  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

  useEffect(() => {
    if (notificationsOpen || profileOpen) {
      const handler = () => {
        setNotificationsOpen(false);
        setProfileOpen(false);
      };
      window.addEventListener("hashchange", handler);
      return () => window.removeEventListener("hashchange", handler);
    }
  }, [notificationsOpen, profileOpen]);

  const handleProfileAction = useCallback(
    (href?: string, action?: string) => {
      if (action === "logout") {
        // TODO: Implement logout
        setProfileOpen(false);
      } else if (href) {
        router.push(href);
        setProfileOpen(false);
      }
    },
    [router]
  );

  return (
    <div className="flex items-center gap-2">
      {/* Language Switcher */}
      <LanguageSwitcher />

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setNotificationsOpen((prev) => !prev)}
          className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -end-1 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
        <NotificationsDropdown
          isOpen={notificationsOpen}
          onClose={() => setNotificationsOpen(false)}
          t={t}
        />
      </div>

      {/* Profile */}
      <div className="relative">
        <button
          onClick={() => setProfileOpen((prev) => !prev)}
          className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out border border-transparent hover:border-gray-200"
          aria-label="Profile menu"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center overflow-hidden">
            <img 
              src={USER.avatar} 
              alt="User avatar"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ease-in-out ${
            profileOpen ? 'rotate-180' : ''
          }`} />
        </button>
        <ProfileDropdown
          isOpen={profileOpen}
          onClose={() => setProfileOpen(false)}
          onAction={handleProfileAction}
          t={t}
        />
      </div>
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
  const [shortcut, setShortcut] = useState("Ctrl");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform)) {
      setShortcut("⌘");
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center sticky top-0 z-40">
      <div className="w-full">
        <div className="w-full px-4 flex items-center justify-between">
          {/* Left: Menu button only */}
          <div className="flex items-center gap-4 flex-1">
            <button
              type="button"
              onClick={onSidebarToggle}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out lg:hidden"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex items-center max-w-md w-full relative">
              <Search className="absolute left-3 rtl:left-auto rtl:right-3 w-4 h-4 text-gray-400" />
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder={t("Header.searchPlaceholder")} 
                className="w-full bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl pl-10 pr-4 rtl:pl-4 rtl:pr-10 py-2 text-sm transition-all duration-300"
              />
              <div className="absolute right-3 rtl:right-auto rtl:left-3 flex items-center gap-1 pointer-events-none">
                <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-gray-200 bg-gray-100 px-1.5 font-mono text-[10px] font-medium text-gray-500">
                  <span className="text-xs">{shortcut}</span>K
                </kbd>
              </div>
            </div>
          </div>

          {/* Right: Notifications & Profile */}
          <HeaderActions t={t} />
        </div>
      </div>
    </header>
  );
}
