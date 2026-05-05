import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const role = v.union(
  v.literal("admin_broker"),
  v.literal("agent"),
  v.literal("assistant"),
  v.literal("client_portal"),
);

const contactType = v.union(
  v.literal("buyer"),
  v.literal("seller"),
  v.literal("landlord"),
  v.literal("tenant"),
  v.literal("investor"),
  v.literal("developer"),
  v.literal("agent_partner"),
  v.literal("vendor"),
);

const lifecycleStage = v.union(
  v.literal("new_lead"),
  v.literal("qualified"),
  v.literal("viewing"),
  v.literal("offer"),
  v.literal("negotiation"),
  v.literal("won"),
  v.literal("lost"),
  v.literal("nurturing"),
  v.literal("archived"),
);

const propertyStatus = v.union(
  v.literal("draft"),
  v.literal("active"),
  v.literal("reserved"),
  v.literal("under_offer"),
  v.literal("sold"),
  v.literal("rented"),
  v.literal("inactive"),
  v.literal("off_market"),
);

const relatedType = v.union(
  v.literal("contact"),
  v.literal("property"),
  v.literal("deal"),
  v.literal("conversation"),
  v.literal("booking"),
  v.literal("viewing"),
  v.literal("task"),
  v.literal("document"),
);

export default defineSchema({
  organizations: defineTable({
    name: v.string(),
    slug: v.string(),
    plan: v.string(),
    timezone: v.string(),
    locale: v.string(),
    createdAt: v.number(),
  }).index("by_slug", ["slug"]),

  users: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("invited"), v.literal("disabled")),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  teams: defineTable({
    organizationId: v.id("organizations"),
    name: v.string(),
    managerUserId: v.optional(v.id("users")),
    createdAt: v.number(),
  }).index("by_organization", ["organizationId"]),

  memberships: defineTable({
    organizationId: v.id("organizations"),
    userId: v.id("users"),
    role,
    teamId: v.optional(v.id("teams")),
    status: v.union(v.literal("active"), v.literal("invited"), v.literal("disabled")),
    createdAt: v.number(),
  })
    .index("by_organization", ["organizationId"])
    .index("by_user", ["userId"])
    .index("by_org_role", ["organizationId", "role"]),

  contacts: defineTable({
    organizationId: v.id("organizations"),
    type: contactType,
    fullName: v.string(),
    displayName: v.optional(v.string()),
    phone: v.optional(v.string()),
    email: v.optional(v.string()),
    whatsappId: v.optional(v.string()),
    source: v.union(
      v.literal("whatsapp"),
      v.literal("website"),
      v.literal("referral"),
      v.literal("portal"),
      v.literal("manual"),
      v.literal("campaign"),
    ),
    status: v.union(v.literal("active"), v.literal("inactive"), v.literal("archived")),
    ownerUserId: v.optional(v.id("users")),
    leadScore: v.optional(v.number()),
    lifecycleStage,
    tags: v.array(v.string()),
    customFields: v.optional(v.any()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_organization", ["organizationId"])
    .index("by_phone", ["phone"])
    .index("by_whatsapp", ["whatsappId"])
    .index("by_owner", ["ownerUserId"])
    .index("by_lifecycle", ["organizationId", "lifecycleStage"])
    .index("by_source", ["organizationId", "source"]),

  contactPreferences: defineTable({
    contactId: v.id("contacts"),
    intent: v.union(v.literal("buy"), v.literal("rent"), v.literal("sell"), v.literal("lease"), v.literal("invest")),
    budgetMin: v.optional(v.number()),
    budgetMax: v.optional(v.number()),
    currency: v.string(),
    locations: v.array(v.string()),
    propertyTypes: v.array(v.string()),
    bedroomsMin: v.optional(v.number()),
    bathroomsMin: v.optional(v.number()),
    areaMin: v.optional(v.number()),
    paymentMethod: v.optional(v.string()),
    moveInDate: v.optional(v.string()),
    urgency: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("urgent")),
    updatedAt: v.number(),
  }).index("by_contact", ["contactId"]),

  contactGroups: defineTable({
    organizationId: v.id("organizations"),
    name: v.string(),
    color: v.string(),
    description: v.optional(v.string()),
  }).index("by_organization", ["organizationId"]),

  contactGroupMembers: defineTable({
    contactId: v.id("contacts"),
    groupId: v.id("contactGroups"),
  })
    .index("by_contact", ["contactId"])
    .index("by_group", ["groupId"]),

  contactRelationships: defineTable({
    contactId: v.id("contacts"),
    relatedContactId: v.id("contacts"),
    relationshipType: v.string(),
  }).index("by_contact", ["contactId"]),

  properties: defineTable({
    organizationId: v.id("organizations"),
    title: v.string(),
    code: v.string(),
    type: v.string(),
    status: propertyStatus,
    listingStatus: v.union(v.literal("private"), v.literal("exclusive"), v.literal("public"), v.literal("pocket")),
    ownerContactId: v.optional(v.id("contacts")),
    developerName: v.optional(v.string()),
    assignedUserId: v.optional(v.id("users")),
    tags: v.array(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_organization", ["organizationId"])
    .index("by_status", ["organizationId", "status"])
    .index("by_listing_status", ["organizationId", "listingStatus"])
    .index("by_assigned_user", ["assignedUserId"]),

  propertySpecs: defineTable({
    propertyId: v.id("properties"),
    bedrooms: v.optional(v.number()),
    bathrooms: v.optional(v.number()),
    areaSqm: v.number(),
    floor: v.optional(v.number()),
    totalFloors: v.optional(v.number()),
    parkingSpaces: v.optional(v.number()),
    furnished: v.boolean(),
    finishingType: v.optional(v.string()),
    viewType: v.optional(v.string()),
  }).index("by_property", ["propertyId"]),

  propertyLocations: defineTable({
    propertyId: v.id("properties"),
    country: v.string(),
    city: v.string(),
    district: v.string(),
    compound: v.optional(v.string()),
    street: v.optional(v.string()),
    latitude: v.optional(v.number()),
    longitude: v.optional(v.number()),
    mapUrl: v.optional(v.string()),
  })
    .index("by_property", ["propertyId"])
    .index("by_city", ["city"])
    .index("by_district", ["city", "district"])
    .index("by_compound", ["city", "district", "compound"]),

  propertyPricing: defineTable({
    propertyId: v.id("properties"),
    salePrice: v.optional(v.number()),
    rentPrice: v.optional(v.number()),
    currency: v.string(),
    paymentPlan: v.optional(v.string()),
    maintenanceFee: v.optional(v.number()),
    commissionRate: v.optional(v.number()),
    pricePerSqm: v.optional(v.number()),
  })
    .index("by_property", ["propertyId"])
    .index("by_sale_price", ["salePrice"])
    .index("by_rent_price", ["rentPrice"]),

  propertyMedia: defineTable({
    propertyId: v.id("properties"),
    storageId: v.optional(v.id("_storage")),
    url: v.optional(v.string()),
    mediaType: v.union(v.literal("image"), v.literal("video"), v.literal("floor_plan")),
    sortOrder: v.number(),
    altText: v.optional(v.string()),
    isCover: v.boolean(),
  }).index("by_property", ["propertyId"]),

  propertyDocuments: defineTable({
    propertyId: v.id("properties"),
    documentId: v.id("documents"),
    category: v.string(),
  }).index("by_property", ["propertyId"]),

  propertyFeatures: defineTable({
    propertyId: v.id("properties"),
    featureKey: v.string(),
    featureLabel: v.string(),
  }).index("by_property", ["propertyId"]),

  propertyStatusHistory: defineTable({
    propertyId: v.id("properties"),
    oldStatus: propertyStatus,
    newStatus: propertyStatus,
    changedBy: v.optional(v.id("users")),
    changedAt: v.number(),
  }).index("by_property", ["propertyId"]),

  pipelines: defineTable({
    organizationId: v.id("organizations"),
    name: v.string(),
    type: v.string(),
    isDefault: v.boolean(),
    createdBy: v.optional(v.id("users")),
    createdAt: v.number(),
  }).index("by_organization", ["organizationId"]),

  pipelineStages: defineTable({
    pipelineId: v.id("pipelines"),
    name: v.string(),
    orderIndex: v.number(),
    probability: v.number(),
    color: v.string(),
    automationRules: v.optional(v.any()),
  }).index("by_pipeline", ["pipelineId"]),

  deals: defineTable({
    organizationId: v.id("organizations"),
    pipelineId: v.id("pipelines"),
    stageId: v.id("pipelineStages"),
    title: v.string(),
    dealType: v.string(),
    primaryContactId: v.id("contacts"),
    assignedUserId: v.optional(v.id("users")),
    value: v.optional(v.number()),
    currency: v.string(),
    probability: v.number(),
    status: v.union(v.literal("open"), v.literal("won"), v.literal("lost"), v.literal("paused"), v.literal("archived")),
    lostReason: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_organization", ["organizationId"])
    .index("by_stage", ["stageId"])
    .index("by_contact", ["primaryContactId"])
    .index("by_assigned_user", ["assignedUserId"]),

  dealContacts: defineTable({
    dealId: v.id("deals"),
    contactId: v.id("contacts"),
    role: v.string(),
  })
    .index("by_deal", ["dealId"])
    .index("by_contact", ["contactId"]),

  dealProperties: defineTable({
    dealId: v.id("deals"),
    propertyId: v.id("properties"),
    matchId: v.optional(v.id("propertyMatches")),
    interestLevel: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
  })
    .index("by_deal", ["dealId"])
    .index("by_property", ["propertyId"]),

  dealStageHistory: defineTable({
    dealId: v.id("deals"),
    fromStageId: v.optional(v.id("pipelineStages")),
    toStageId: v.id("pipelineStages"),
    changedBy: v.optional(v.id("users")),
    changedAt: v.number(),
  }).index("by_deal", ["dealId"]),

  offers: defineTable({
    dealId: v.id("deals"),
    propertyId: v.id("properties"),
    amount: v.number(),
    currency: v.string(),
    status: v.union(v.literal("draft"), v.literal("submitted"), v.literal("accepted"), v.literal("rejected"), v.literal("expired")),
    submittedAt: v.optional(v.number()),
    expiresAt: v.optional(v.number()),
  }).index("by_deal", ["dealId"]),

  commissions: defineTable({
    dealId: v.id("deals"),
    amount: v.number(),
    percentage: v.number(),
    split: v.optional(v.any()),
    status: v.union(v.literal("forecast"), v.literal("earned"), v.literal("paid"), v.literal("void")),
  }).index("by_deal", ["dealId"]),

  calendarEvents: defineTable({
    organizationId: v.id("organizations"),
    title: v.string(),
    type: v.union(v.literal("viewing"), v.literal("call"), v.literal("meeting"), v.literal("open_house"), v.literal("contract_signing"), v.literal("follow_up")),
    startAt: v.number(),
    endAt: v.number(),
    location: v.optional(v.string()),
    status: v.union(v.literal("scheduled"), v.literal("confirmed"), v.literal("completed"), v.literal("cancelled")),
    assignedUserId: v.optional(v.id("users")),
  })
    .index("by_organization", ["organizationId"])
    .index("by_assigned_time", ["assignedUserId", "startAt"])
    .index("by_time", ["organizationId", "startAt"]),

  viewings: defineTable({
    eventId: v.id("calendarEvents"),
    contactId: v.id("contacts"),
    propertyId: v.id("properties"),
    dealId: v.optional(v.id("deals")),
    status: v.union(v.literal("scheduled"), v.literal("confirmed"), v.literal("completed"), v.literal("cancelled"), v.literal("no_show")),
    feedback: v.optional(v.string()),
    rating: v.optional(v.number()),
  })
    .index("by_event", ["eventId"])
    .index("by_contact", ["contactId"])
    .index("by_property", ["propertyId"])
    .index("by_deal", ["dealId"]),

  reminders: defineTable({
    organizationId: v.id("organizations"),
    relatedType,
    relatedId: v.string(),
    dueAt: v.number(),
    assignedUserId: v.optional(v.id("users")),
    status: v.union(v.literal("open"), v.literal("done"), v.literal("snoozed"), v.literal("cancelled")),
  })
    .index("by_organization", ["organizationId"])
    .index("by_assigned_due", ["assignedUserId", "dueAt"]),

  tasks: defineTable({
    organizationId: v.id("organizations"),
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(v.literal("open"), v.literal("in_progress"), v.literal("done"), v.literal("cancelled")),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("urgent")),
    dueAt: v.optional(v.number()),
    assignedUserId: v.optional(v.id("users")),
    relatedType: v.optional(relatedType),
    relatedId: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_organization", ["organizationId"])
    .index("by_assigned_due", ["assignedUserId", "dueAt"]),

  conversations: defineTable({
    organizationId: v.id("organizations"),
    channel: v.union(v.literal("whatsapp"), v.literal("email"), v.literal("sms"), v.literal("website"), v.literal("instagram")),
    externalThreadId: v.string(),
    contactId: v.optional(v.id("contacts")),
    assignedUserId: v.optional(v.id("users")),
    status: v.union(v.literal("open"), v.literal("pending"), v.literal("closed")),
    lastMessageAt: v.number(),
    unreadCount: v.number(),
  })
    .index("by_organization", ["organizationId"])
    .index("by_external_thread", ["externalThreadId"])
    .index("by_contact", ["contactId"])
    .index("by_assigned", ["assignedUserId"]),

  messages: defineTable({
    conversationId: v.id("conversations"),
    senderType: v.union(v.literal("contact"), v.literal("user"), v.literal("ai"), v.literal("system")),
    senderId: v.optional(v.string()),
    body: v.string(),
    mediaStorageId: v.optional(v.id("_storage")),
    direction: v.union(v.literal("inbound"), v.literal("outbound")),
    status: v.union(v.literal("sent"), v.literal("delivered"), v.literal("read"), v.literal("failed"), v.literal("received")),
    sentAt: v.number(),
  }).index("by_conversation", ["conversationId", "sentAt"]),

  interactions: defineTable({
    organizationId: v.id("organizations"),
    type: v.string(),
    subject: v.string(),
    body: v.optional(v.string()),
    relatedType,
    relatedId: v.string(),
    contactId: v.optional(v.id("contacts")),
    dealId: v.optional(v.id("deals")),
    propertyId: v.optional(v.id("properties")),
    userId: v.optional(v.id("users")),
    occurredAt: v.number(),
  })
    .index("by_organization", ["organizationId"])
    .index("by_contact", ["contactId", "occurredAt"])
    .index("by_deal", ["dealId", "occurredAt"])
    .index("by_property", ["propertyId", "occurredAt"])
    .index("by_related", ["relatedType", "relatedId"]),

  aiSummaries: defineTable({
    sourceType: relatedType,
    sourceId: v.string(),
    summary: v.string(),
    extracted: v.any(),
    confidence: v.number(),
    createdAt: v.number(),
  }).index("by_source", ["sourceType", "sourceId"]),

  propertyMatches: defineTable({
    contactId: v.id("contacts"),
    propertyId: v.id("properties"),
    dealId: v.optional(v.id("deals")),
    score: v.number(),
    reasons: v.array(v.string()),
    objections: v.array(v.string()),
    status: v.union(v.literal("suggested"), v.literal("sent_to_client"), v.literal("client_interested"), v.literal("dismissed"), v.literal("converted_to_viewing")),
    createdAt: v.number(),
  })
    .index("by_contact", ["contactId"])
    .index("by_property", ["propertyId"])
    .index("by_deal", ["dealId"]),

  leadScores: defineTable({
    contactId: v.id("contacts"),
    score: v.number(),
    grade: v.union(v.literal("A"), v.literal("B"), v.literal("C"), v.literal("D")),
    factors: v.array(v.string()),
    modelVersion: v.string(),
    createdAt: v.number(),
  }).index("by_contact", ["contactId"]),

  aiActions: defineTable({
    organizationId: v.id("organizations"),
    type: v.string(),
    title: v.string(),
    payload: v.any(),
    status: v.union(v.literal("suggested"), v.literal("approved"), v.literal("dismissed"), v.literal("completed")),
    assignedUserId: v.optional(v.id("users")),
    dueAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_organization", ["organizationId"])
    .index("by_assigned", ["assignedUserId"]),

  automationRules: defineTable({
    organizationId: v.id("organizations"),
    trigger: v.string(),
    conditions: v.any(),
    actions: v.any(),
    enabled: v.boolean(),
  }).index("by_organization", ["organizationId"]),

  documents: defineTable({
    organizationId: v.id("organizations"),
    title: v.string(),
    storageId: v.optional(v.id("_storage")),
    fileUrl: v.optional(v.string()),
    mimeType: v.string(),
    category: v.string(),
    uploadedBy: v.optional(v.id("users")),
    relatedType: v.optional(relatedType),
    relatedId: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_organization", ["organizationId"])
    .index("by_related", ["relatedType", "relatedId"]),
});
