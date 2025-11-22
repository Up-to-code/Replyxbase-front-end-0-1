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
  { id: 1, label: "New message from Sarah", time: "2 min ago", type: "message", read: false },
  { id: 2, label: "Payment received for order #2842", time: "1 hour ago", type: "payment", read: false },
  { id: 3, label: "System update available", time: "2 hours ago", type: "update", read: true },
  { id: 4, label: "Security alert: New login detected", time: "3 hours ago", type: "security", read: false },
  { id: 5, label: "Your subscription renews in 7 days", time: "5 hours ago", type: "system", read: true },
  { id: 6, label: "New follower: TechCorp Inc", time: "6 hours ago", type: "message", read: true },
  { id: 7, label: "Download completed: Monthly report", time: "1 day ago", type: "system", read: true },
];

export const PROFILE_MENU: ProfileMenuItem[] = [
  { label: "Profile", icon: User, href: "/dashboard/profile", description: "View your personal profile" },
  { label: "Billing", icon: CreditCard, href: "/dashboard/billing", description: "Manage billing and subscription" },
  { label: "Security", icon: Shield, href: "/dashboard/security", description: "Security and privacy settings" },
  { label: "Downloads", icon: Download, href: "/dashboard/downloads", description: "Your downloaded files" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings", description: "Account and app settings" },
  { label: "Help", icon: HelpCircle, href: "/dashboard/help", description: "Get help and support" },
  { label: "Sign Out", icon: LogOut, action: "logout", description: "Sign out of your account" },
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
