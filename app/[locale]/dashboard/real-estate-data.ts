import {
  Activity,
  BarChart3,
  Bot,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Home,
  MessageCircle,
  PieChart,
  Search,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

export type CrmModuleKey =
  | "contacts"
  | "properties"
  | "deals"
  | "calendar"
  | "tasks"
  | "documents"
  | "marketing"
  | "analytics"
  | "ai"
  | "team";

export const estateStats = [
  { label: "Hot leads", value: "42", change: "+18%", icon: Users, tone: "emerald" },
  { label: "Active inventory", value: "128", change: "+9", icon: Building2, tone: "blue" },
  { label: "Open pipeline", value: "EGP 184M", change: "+23%", icon: Target, tone: "navy" },
  { label: "Viewings today", value: "17", change: "6 confirmed", icon: CalendarDays, tone: "amber" },
];

export const properties = [
  {
    id: "px-1024",
    title: "Lake View Corner Apartment",
    code: "NC-0421",
    type: "Apartment",
    status: "Active",
    listingStatus: "Exclusive",
    city: "New Cairo",
    district: "Fifth Settlement",
    compound: "Lake View Residence",
    price: "EGP 7.8M",
    beds: 3,
    baths: 3,
    area: 185,
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    matches: 18,
    agent: "Maya Hassan",
    tags: ["installments", "garden view", "ready"],
  },
  {
    id: "px-1099",
    title: "Palm Hills Standalone Villa",
    code: "PH-7710",
    type: "Villa",
    status: "Under offer",
    listingStatus: "Private",
    city: "6th of October",
    district: "Palm Hills",
    compound: "Palm Hills Golf",
    price: "EGP 31M",
    beds: 5,
    baths: 6,
    area: 520,
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    matches: 7,
    agent: "Omar Nabil",
    tags: ["pool", "corner", "seller motivated"],
  },
  {
    id: "px-1130",
    title: "North Coast Serviced Chalet",
    code: "NCST-230",
    type: "Chalet",
    status: "Active",
    listingStatus: "Public",
    city: "North Coast",
    district: "Sidi Abdelrahman",
    compound: "Seashell",
    price: "EGP 12.4M",
    beds: 2,
    baths: 2,
    area: 132,
    image:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
    matches: 11,
    agent: "Farida Samir",
    tags: ["sea view", "furnished", "rental yield"],
  },
];

export const contacts = [
  {
    name: "Sarah Mansour",
    type: "Buyer",
    source: "WhatsApp",
    stage: "Qualified",
    budget: "EGP 6M - 9M",
    preference: "3BR in New Cairo, installments",
    score: 91,
    owner: "Maya Hassan",
    lastTouch: "12 min ago",
  },
  {
    name: "Karim El Din",
    type: "Investor",
    source: "Referral",
    stage: "Viewing",
    budget: "EGP 20M - 35M",
    preference: "Villas with rental yield",
    score: 84,
    owner: "Omar Nabil",
    lastTouch: "1 hr ago",
  },
  {
    name: "Nadine Aziz",
    type: "Seller",
    source: "Manual",
    stage: "Valuation",
    budget: "Listing owner",
    preference: "Palm Hills villa listing",
    score: 76,
    owner: "Farida Samir",
    lastTouch: "Today",
  },
];

export const pipelineStages = [
  {
    name: "New Lead",
    total: "EGP 22M",
    deals: [
      { title: "Sarah - New Cairo apartment", contact: "Sarah Mansour", value: "EGP 8M", score: 91, next: "Send 3 matches" },
      { title: "Ahmed - rental townhouse", contact: "Ahmed Latif", value: "EGP 65K/mo", score: 69, next: "Confirm budget" },
    ],
  },
  {
    name: "Properties Sent",
    total: "EGP 46M",
    deals: [
      { title: "Karim - investment villa", contact: "Karim El Din", value: "EGP 31M", score: 84, next: "Viewing tomorrow" },
    ],
  },
  {
    name: "Negotiation",
    total: "EGP 58M",
    deals: [
      { title: "Nour - Seashell chalet", contact: "Nour Adel", value: "EGP 12.4M", score: 78, next: "Draft offer" },
    ],
  },
  {
    name: "Contract",
    total: "EGP 58M",
    deals: [
      { title: "Palm Hills resale", contact: "Mona Sherif", value: "EGP 25M", score: 88, next: "Collect IDs" },
    ],
  },
];

export const timeline = [
  { type: "WhatsApp", text: "Sarah confirmed interest in Lake View Residence and asked about installments.", time: "12 min ago" },
  { type: "AI Summary", text: "Budget clear, urgent timeline, prefers ready 3BR apartments in New Cairo.", time: "14 min ago" },
  { type: "Viewing", text: "Palm Hills villa viewing completed; client requested offer range.", time: "1 hr ago" },
  { type: "Stage Change", text: "Karim moved from Qualified to Properties Sent.", time: "2 hrs ago" },
];

export const aiActions = [
  {
    title: "Recommend Lake View apartment to Sarah",
    body: "91% match: budget, location, bedrooms, installment preference.",
    action: "Send WhatsApp",
  },
  {
    title: "Follow up after Palm Hills viewing",
    body: "Client asked about closing flexibility. Draft a negotiation message.",
    action: "Draft reply",
  },
  {
    title: "Fix stale listing",
    body: "NCST-230 has strong demand but only 4 photos. Add gallery before campaign.",
    action: "Create task",
  },
];

export const moduleConfigs: Record<
  CrmModuleKey,
  {
    title: string;
    eyebrow: string;
    description: string;
    icon: typeof Home;
    primaryAction: string;
    metrics: { label: string; value: string }[];
  }
> = {
  contacts: {
    title: "People",
    eyebrow: "Contacts",
    description: "Buyers, sellers, landlords, tenants, investors, developers, partners, preferences, notes, and timelines.",
    icon: Users,
    primaryAction: "New contact",
    metrics: [
      { label: "Active contacts", value: "1,284" },
      { label: "A-grade leads", value: "42" },
      { label: "Needs follow-up", value: "19" },
    ],
  },
  properties: {
    title: "Listings",
    eyebrow: "Properties",
    description: "Inventory, units, galleries, specs, pricing, owner links, status history, and matching demand.",
    icon: Building2,
    primaryAction: "Add property",
    metrics: [
      { label: "Active", value: "128" },
      { label: "Exclusive", value: "41" },
      { label: "Low media", value: "9" },
    ],
  },
  deals: {
    title: "Pipeline",
    eyebrow: "Deals",
    description: "Custom buyer, rental, and seller pipelines with linked contacts, properties, viewings, offers, and commissions.",
    icon: Target,
    primaryAction: "New deal",
    metrics: [
      { label: "Open value", value: "EGP 184M" },
      { label: "Offer stage", value: "11" },
      { label: "Stage aging", value: "6 alerts" },
    ],
  },
  calendar: {
    title: "Calendar",
    eyebrow: "Viewings",
    description: "Viewings, calls, meetings, open houses, contract dates, follow-ups, and field-agent schedules.",
    icon: CalendarDays,
    primaryAction: "Schedule viewing",
    metrics: [
      { label: "Today", value: "17" },
      { label: "Confirmed", value: "11" },
      { label: "Needs feedback", value: "4" },
    ],
  },
  tasks: {
    title: "Tasks",
    eyebrow: "Work queue",
    description: "Follow-ups, document requests, viewing feedback, AI-created action suggestions, and team accountability.",
    icon: CheckCircle2,
    primaryAction: "New task",
    metrics: [
      { label: "Due today", value: "24" },
      { label: "Overdue", value: "7" },
      { label: "AI suggested", value: "12" },
    ],
  },
  documents: {
    title: "Documents",
    eyebrow: "Vault",
    description: "Contracts, IDs, ownership documents, brochures, floor plans, payment plans, and e-signature readiness.",
    icon: FileText,
    primaryAction: "Upload document",
    metrics: [
      { label: "Stored files", value: "384" },
      { label: "Contracts", value: "28" },
      { label: "Awaiting IDs", value: "5" },
    ],
  },
  marketing: {
    title: "Marketing",
    eyebrow: "Lead capture",
    description: "WhatsApp click-to-chat campaigns, lead forms, property QR codes, portals, and source attribution.",
    icon: Search,
    primaryAction: "New campaign",
    metrics: [
      { label: "Leads this week", value: "193" },
      { label: "Best source", value: "WhatsApp" },
      { label: "Conversion", value: "18.4%" },
    ],
  },
  analytics: {
    title: "Reports",
    eyebrow: "Analytics",
    description: "Pipeline performance, agent activity, lead sources, inventory health, demand, forecast, and commissions.",
    icon: BarChart3,
    primaryAction: "Export report",
    metrics: [
      { label: "Weighted forecast", value: "EGP 72M" },
      { label: "Avg response", value: "4m" },
      { label: "Win rate", value: "22%" },
    ],
  },
  ai: {
    title: "AI Assistant",
    eyebrow: "Intelligence",
    description: "Summaries, extracted preferences, lead scoring, property matching, reply drafts, and next best actions.",
    icon: Bot,
    primaryAction: "Ask AI",
    metrics: [
      { label: "Suggestions", value: "37" },
      { label: "Summaries", value: "118" },
      { label: "Matches sent", value: "64" },
    ],
  },
  team: {
    title: "Team",
    eyebrow: "Management",
    description: "Agents, assistants, roles, territories, assignment rules, capacity, and performance visibility.",
    icon: PieChart,
    primaryAction: "Invite member",
    metrics: [
      { label: "Agents", value: "12" },
      { label: "Assistants", value: "4" },
      { label: "Unassigned leads", value: "8" },
    ],
  },
};

export const workflowSteps = [
  { title: "WhatsApp lead", detail: "Inbound message creates or updates a contact.", icon: MessageCircle },
  { title: "AI summary", detail: "Budget, intent, urgency, and missing questions are extracted.", icon: Sparkles },
  { title: "Property match", detail: "Active listings are scored with transparent reasons.", icon: Building2 },
  { title: "Pipeline action", detail: "Deal, viewing, task, and timeline events stay linked.", icon: Activity },
  { title: "Follow-up", detail: "Agent approves AI-suggested reply or next action.", icon: Clock3 },
];
