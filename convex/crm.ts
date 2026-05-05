/* eslint-disable @typescript-eslint/no-explicit-any */
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

const now = () => Date.now();

export const listContacts = query({
  args: {
    organizationId: v.id("organizations"),
    lifecycleStage: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  handler: async (ctx: any, args: any) => {
    if (args.lifecycleStage) {
      return await ctx.db
        .query("contacts")
        .withIndex("by_lifecycle", (q: any) =>
          q.eq("organizationId", args.organizationId).eq("lifecycleStage", args.lifecycleStage as never),
        )
        .collect();
    }

    if (args.source) {
      return await ctx.db
        .query("contacts")
        .withIndex("by_source", (q: any) => q.eq("organizationId", args.organizationId).eq("source", args.source as never))
        .collect();
    }

    return await ctx.db
      .query("contacts")
      .withIndex("by_organization", (q: any) => q.eq("organizationId", args.organizationId))
      .collect();
  },
});

export const createContact = mutation({
  args: {
    organizationId: v.id("organizations"),
    type: v.union(
      v.literal("buyer"),
      v.literal("seller"),
      v.literal("landlord"),
      v.literal("tenant"),
      v.literal("investor"),
      v.literal("developer"),
      v.literal("agent_partner"),
      v.literal("vendor"),
    ),
    fullName: v.string(),
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
    ownerUserId: v.optional(v.id("users")),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx: any, args: any) => {
    const timestamp = now();
    const contactId = await ctx.db.insert("contacts", {
      ...args,
      displayName: args.fullName,
      status: "active",
      leadScore: 50,
      lifecycleStage: "new_lead",
      tags: args.tags ?? [],
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    await ctx.db.insert("interactions", {
      organizationId: args.organizationId,
      type: "contact_created",
      subject: "Contact created",
      relatedType: "contact",
      relatedId: contactId,
      contactId,
      userId: args.ownerUserId,
      occurredAt: timestamp,
    });

    return contactId;
  },
});

export const listProperties = query({
  args: {
    organizationId: v.id("organizations"),
    status: v.optional(v.string()),
    listingStatus: v.optional(v.string()),
  },
  handler: async (ctx: any, args: any) => {
    if (args.status) {
      return await ctx.db
        .query("properties")
        .withIndex("by_status", (q: any) => q.eq("organizationId", args.organizationId).eq("status", args.status as never))
        .collect();
    }

    if (args.listingStatus) {
      return await ctx.db
        .query("properties")
        .withIndex("by_listing_status", (q: any) =>
          q.eq("organizationId", args.organizationId).eq("listingStatus", args.listingStatus as never),
        )
        .collect();
    }

    return await ctx.db
      .query("properties")
      .withIndex("by_organization", (q: any) => q.eq("organizationId", args.organizationId))
      .collect();
  },
});

export const createProperty = mutation({
  args: {
    organizationId: v.id("organizations"),
    title: v.string(),
    code: v.string(),
    type: v.string(),
    status: v.union(
      v.literal("draft"),
      v.literal("active"),
      v.literal("reserved"),
      v.literal("under_offer"),
      v.literal("sold"),
      v.literal("rented"),
      v.literal("inactive"),
      v.literal("off_market"),
    ),
    listingStatus: v.union(v.literal("private"), v.literal("exclusive"), v.literal("public"), v.literal("pocket")),
    ownerContactId: v.optional(v.id("contacts")),
    developerName: v.optional(v.string()),
    assignedUserId: v.optional(v.id("users")),
    tags: v.optional(v.array(v.string())),
  },
  handler: async (ctx: any, args: any) => {
    const timestamp = now();
    const propertyId = await ctx.db.insert("properties", {
      ...args,
      tags: args.tags ?? [],
      createdAt: timestamp,
      updatedAt: timestamp,
    });

    await ctx.db.insert("interactions", {
      organizationId: args.organizationId,
      type: "property_created",
      subject: "Property created",
      relatedType: "property",
      relatedId: propertyId,
      propertyId,
      userId: args.assignedUserId,
      occurredAt: timestamp,
    });

    return propertyId;
  },
});

export const moveDealStage = mutation({
  args: {
    organizationId: v.id("organizations"),
    dealId: v.id("deals"),
    toStageId: v.id("pipelineStages"),
    changedBy: v.optional(v.id("users")),
  },
  handler: async (ctx: any, args: any) => {
    const deal = await ctx.db.get(args.dealId);
    if (!deal) throw new Error("Deal not found");

    const timestamp = now();
    await ctx.db.patch(args.dealId, {
      stageId: args.toStageId,
      updatedAt: timestamp,
    });

    await ctx.db.insert("dealStageHistory", {
      dealId: args.dealId,
      fromStageId: deal.stageId,
      toStageId: args.toStageId,
      changedBy: args.changedBy,
      changedAt: timestamp,
    });

    await ctx.db.insert("interactions", {
      organizationId: args.organizationId,
      type: "deal_stage_changed",
      subject: "Deal stage changed",
      relatedType: "deal",
      relatedId: args.dealId,
      contactId: deal.primaryContactId,
      dealId: args.dealId,
      userId: args.changedBy,
      occurredAt: timestamp,
    });
  },
});

export const timeline = query({
  args: {
    contactId: v.optional(v.id("contacts")),
    dealId: v.optional(v.id("deals")),
    propertyId: v.optional(v.id("properties")),
  },
  handler: async (ctx: any, args: any) => {
    if (args.contactId) {
      return await ctx.db
        .query("interactions")
        .withIndex("by_contact", (q: any) => q.eq("contactId", args.contactId))
        .order("desc")
        .take(50);
    }

    if (args.dealId) {
      return await ctx.db.query("interactions").withIndex("by_deal", (q: any) => q.eq("dealId", args.dealId)).order("desc").take(50);
    }

    if (args.propertyId) {
      return await ctx.db
        .query("interactions")
        .withIndex("by_property", (q: any) => q.eq("propertyId", args.propertyId))
        .order("desc")
        .take(50);
    }

    return [];
  },
});
