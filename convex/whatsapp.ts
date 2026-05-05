/* eslint-disable @typescript-eslint/no-explicit-any */
import { v } from "convex/values";
import { action, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";

export const simulateInboundLead = action({
  args: {
    organizationId: v.id("organizations"),
    phone: v.string(),
    name: v.string(),
    message: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    return await ctx.runMutation(internal.whatsapp.storeInboundLead, {
      ...args,
      externalThreadId: `whatsapp:${args.phone}`,
    });
  },
});

export const storeInboundLead = internalMutation({
  args: {
    organizationId: v.id("organizations"),
    phone: v.string(),
    name: v.string(),
    message: v.string(),
    externalThreadId: v.string(),
  },
  handler: async (ctx: any, args: any) => {
    const timestamp = Date.now();

    const existingContact = await ctx.db
      .query("contacts")
      .withIndex("by_phone", (q: any) => q.eq("phone", args.phone))
      .first();

    const contactId =
      existingContact?._id ??
      (await ctx.db.insert("contacts", {
        organizationId: args.organizationId,
        type: "buyer",
        fullName: args.name,
        displayName: args.name,
        phone: args.phone,
        whatsappId: args.phone,
        source: "whatsapp",
        status: "active",
        leadScore: 72,
        lifecycleStage: "new_lead",
        tags: ["whatsapp", "ai-review"],
        createdAt: timestamp,
        updatedAt: timestamp,
      }));

    const conversation = await ctx.db
      .query("conversations")
      .withIndex("by_external_thread", (q: any) => q.eq("externalThreadId", args.externalThreadId))
      .first();

    const conversationId =
      conversation?._id ??
      (await ctx.db.insert("conversations", {
        organizationId: args.organizationId,
        channel: "whatsapp",
        externalThreadId: args.externalThreadId,
        contactId,
        status: "open",
        lastMessageAt: timestamp,
        unreadCount: 1,
      }));

    if (conversation) {
      await ctx.db.patch(conversation._id, {
        contactId,
        lastMessageAt: timestamp,
        unreadCount: conversation.unreadCount + 1,
      });
    }

    await ctx.db.insert("messages", {
      conversationId,
      senderType: "contact",
      senderId: contactId,
      body: args.message,
      direction: "inbound",
      status: "received",
      sentAt: timestamp,
    });

    await ctx.db.insert("aiSummaries", {
      sourceType: "conversation",
      sourceId: conversationId,
      summary: `New WhatsApp buyer lead: ${args.message}`,
      extracted: {
        intent: "buy",
        missingQuestions: ["Preferred location", "Budget range", "Bedrooms"],
        suggestedNextAction: "Ask one qualifying question and send matching active listings.",
      },
      confidence: 0.62,
      createdAt: timestamp,
    });

    await ctx.db.insert("aiActions", {
      organizationId: args.organizationId,
      type: "qualify_whatsapp_lead",
      title: `Qualify ${args.name} from WhatsApp`,
      payload: {
        contactId,
        conversationId,
        message: args.message,
      },
      status: "suggested",
      dueAt: timestamp + 30 * 60 * 1000,
      createdAt: timestamp,
    });

    await ctx.db.insert("interactions", {
      organizationId: args.organizationId,
      type: "whatsapp_message",
      subject: "Inbound WhatsApp lead",
      body: args.message,
      relatedType: "conversation",
      relatedId: conversationId,
      contactId,
      occurredAt: timestamp,
    });

    return { contactId, conversationId };
  },
});
