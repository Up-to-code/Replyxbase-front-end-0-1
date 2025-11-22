"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "@/navigation";
import {
  Bell,
  Menu,
  ChevronDown,
} from "lucide-react";
import type { Notification, ProfileMenuItem, Translator } from "./types";
import { NOTIFICATIONS, NOTIFICATION_ICONS, PROFILE_MENU, USER } from "./constants";

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
function NotificationItem({ notification }: { notification: Notification }) {
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
    <div className={`w-full p-4 border-b border-gray-100 hover:bg-gray-50 text-left transition-colors duration-300 ease-in-out bg-white ${
      !notification.read ? 'bg-blue-50 hover:bg-blue-100' : ''
    }`}>
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)} bg-gray-100`}>
          <NotificationIcon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{notification.label}</p>
          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
        </div>
        {!notification.read && (
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
        )}
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
      className="absolute right-0 top-full mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden"
    >
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-lg">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mt-1">
          You have {NOTIFICATIONS.length} notifications
        </p>
      </div>
      <div className="max-h-96 overflow-y-auto bg-white">
        {NOTIFICATIONS.map((item) => (
          <NotificationItem key={item.id} notification={item} />
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 bg-white">
        <button
          className="w-full py-2 text-sm text-blue-600 hover:text-blue-700 font-medium hover:bg-blue-50 rounded-lg transition-colors duration-300 ease-in-out"
          type="button"
        >
          View all notifications
        </button>
      </div>
    </div>
  );
}

// Profile Menu Item Component
function ProfileMenuItem({ item, onAction }: {
  item: ProfileMenuItem;
  onAction: (href?: string, action?: string) => void;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={() => onAction(item.href, item.action)}
      className="flex items-start w-full p-4 hover:bg-gray-50 text-left transition-colors duration-300 ease-in-out group"
    >
      <div className="p-2 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors duration-300 ease-in-out mr-3">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-medium text-gray-900 block">{item.label}</span>
        {item.description && (
          <span className="text-xs text-gray-500 mt-1 block">{item.description}</span>
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
      className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden"
    >
      {/* User Header */}
      <div className="p-6 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center overflow-hidden border-2 border-blue-100">
            <img 
              src={USER.avatar} 
              alt="User avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 text-lg truncate">{USER.name}</p>
            <p className="text-sm text-gray-600 mt-1 truncate">{USER.email}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                {USER.role}
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                {USER.plan}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white">
        {PROFILE_MENU.map((item, index) => (
          <div key={item.label}>
            <ProfileMenuItem item={item} onAction={onAction} />
            {index === 3 && <div className="border-t border-gray-100 mx-4" />}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-xs text-gray-500">
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
      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setNotificationsOpen((prev) => !prev)}
          className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center">
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
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center">
      <div className="px-6 w-full">
        <div className="flex items-center justify-between">
          {/* Left: Menu button only */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onSidebarToggle}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-300 ease-in-out lg:hidden"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Right: Notifications & Profile */}
          <HeaderActions t={t} />
        </div>
      </div>
    </header>
  );
}
