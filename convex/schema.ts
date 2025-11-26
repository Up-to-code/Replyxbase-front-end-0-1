import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";


export default defineSchema({
  user: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    emailVerified: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_email", ["email"]),
  session: defineTable({
    userId: v.id("user"),
    expiresAt: v.number(),
    token: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
    ipAddress: v.optional(v.string()),
    userAgent: v.optional(v.string()),
    activeOrganizationId: v.optional(v.string()),
  })
    .index("by_token", ["token"])
    .index("by_userId", ["userId"]),
  organization: defineTable({
    name: v.string(),
    slug: v.string(),
    logo: v.optional(v.string()),
    createdAt: v.number(),
    metadata: v.optional(v.any()),
  }).index("by_slug", ["slug"]),
  member: defineTable({
    organizationId: v.id("organization"),
    userId: v.id("user"),
    role: v.string(),
    createdAt: v.number(),
  })
    .index("by_orgId", ["organizationId"])
    .index("by_userId", ["userId"])
    .index("by_orgId_userId", ["organizationId", "userId"]),
  invitation: defineTable({
    organizationId: v.id("organization"),
    email: v.string(),
    role: v.optional(v.string()),
    status: v.string(),
    expiresAt: v.number(),
    inviterId: v.id("user"),
    createdAt: v.number(),
  })
    .index("by_orgId", ["organizationId"])
    .index("by_email", ["email"]),
  account: defineTable({
    userId: v.id("user"),
    accountId: v.string(),
    providerId: v.string(),
    accessToken: v.optional(v.string()),
    refreshToken: v.optional(v.string()),
    expiresAt: v.optional(v.number()),
    password: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_accountId_providerId", ["accountId", "providerId"]),
  verification: defineTable({
    code: v.string(),
    userId: v.id("user"),
    email: v.string(),
    expiresAt: v.number(),
    createdAt: v.number(),
  })
    .index("by_code", ["code"])
    .index("by_userId", ["userId"]),
});
