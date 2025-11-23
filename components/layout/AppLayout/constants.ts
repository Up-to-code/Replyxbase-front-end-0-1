import {
  LayoutDashboard,
  MessageSquare,
  Bot,
  Users,
  Settings,
  User,
  CreditCard,
  Shield,
  Download,
  HelpCircle,
  LogOut,
  Bell,
  MessageCircle,
  Workflow,
} from "lucide-react";
import { Agent, NavigationItem, Notification, ProfileMenuItem } from "./types";

export const MOCK_AGENTS: Agent[] = [
  { id: "1", name: "Customer Support Bot", status: "active", type: "support" },
  { id: "2", name: "Sales Assistant", status: "active", type: "sales" },
  { id: "3", name: "Lead Qualifier", status: "inactive", type: "lead" },
  { id: "4", name: "FAQ Helper", status: "active", type: "faq" },
];

export const NAVIGATION: NavigationItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Inbox", href: "/dashboard/inbox", icon: MessageSquare },
  { label: "Agents", href: "/dashboard/agents", icon: Bot },
  { label: "CRM", href: "/dashboard/crm", icon: Users },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export const USER = {
  name: "Alex Johnson",
  email: "alex@example.com",
  role: "Admin",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
  plan: "Pro Plan",
};

export const NOTIFICATIONS: Notification[] = [
  { id: 1, label: "messageFromSarah", time: "2minAgo", type: "message", read: false },
  { id: 2, label: "paymentReceived", time: "1hourAgo", type: "payment", read: false },
  { id: 3, label: "systemUpdate", time: "2hoursAgo", type: "update", read: true },
  { id: 4, label: "securityAlert", time: "3hoursAgo", type: "security", read: false },
  { id: 5, label: "subscriptionRenew", time: "5hoursAgo", type: "system", read: true },
  { id: 6, label: "newFollower", time: "6hoursAgo", type: "message", read: true },
  { id: 7, label: "downloadCompleted", time: "1dayAgo", type: "system", read: true },
];

export const PROFILE_MENU: ProfileMenuItem[] = [
  { label: "profile", icon: User, href: "/dashboard/profile", description: "profileDesc" },
  { label: "billing", icon: CreditCard, href: "/dashboard/billing", description: "billingDesc" },
  { label: "security", icon: Shield, href: "/dashboard/security", description: "securityDesc" },
  { label: "downloads", icon: Download, href: "/dashboard/downloads", description: "downloadsDesc" },
  { label: "settings", icon: Settings, href: "/dashboard/settings", description: "settingsDesc" },
  { label: "help", icon: HelpCircle, href: "/dashboard/help", description: "helpDesc" },
  { label: "signOut", icon: LogOut, action: "logout", description: "signOutDesc" },
];

// Agent type icons mapping
export const AGENT_ICONS = {
  support: MessageCircle,
  sales: Users,
  lead: Workflow,
  faq: HelpCircle,
  default: Bot,
};

// Notification type icons mapping
export const NOTIFICATION_ICONS = {
  message: MessageSquare,
  system: Settings,
  payment: CreditCard,
  security: Shield,
  update: Download,
  default: Bell,
};
