import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

/**
 * List all organizations for the current user
 */
export const listUserOrganizations = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    // Get all memberships for this user
    const memberships = await ctx.db
      .query("member")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    // Get all organizations from memberships
    const organizations = await Promise.all(
      memberships.map(async (membership) => {
        const org = await ctx.db.get(membership.organizationId);
        return org
          ? {
              ...org,
              role: membership.role,
            }
          : null;
      })
    );

    return organizations.filter((org) => org !== null);
  },
});

/**
 * Get the active organization from session
 */
export const getActiveOrganization = query({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      return null;
    }

    // Get current session to find active organization
    const sessions = await ctx.db
      .query("session")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    const activeSession = sessions.find((s) => s.expiresAt > Date.now());
    if (!activeSession?.activeOrganizationId) {
      return null;
    }

    const org = await ctx.db.get(activeSession.activeOrganizationId as any);
    return org;
  },
});

/**
 * Create a new organization
 */
export const createOrganization = mutation({
  args: {
    name: v.string(),
    slug: v.optional(v.string()),
    logo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    // Generate slug from name if not provided
    const slug =
      args.slug ||
      args.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

    // Check if slug already exists
    const existing = await ctx.db
      .query("organization")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();

    if (existing) {
      throw new Error("Organization with this slug already exists");
    }

    // Create organization
    const orgId = await ctx.db.insert("organization", {
      name: args.name,
      slug,
      logo: args.logo,
      createdAt: Date.now(),
      metadata: {},
    });

    // Add creator as owner
    await ctx.db.insert("member", {
      organizationId: orgId,
      userId: user._id,
      role: "owner",
      createdAt: Date.now(),
    });

    return orgId;
  },
});

/**
 * Switch active organization in session
 */
export const switchOrganization = mutation({
  args: {
    organizationId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    // Verify user is a member of this organization
    const membership = await ctx.db
      .query("member")
      .withIndex("by_orgId_userId", (q) =>
        q.eq("organizationId", args.organizationId as any).eq("userId", user._id)
      )
      .first();

    if (!membership) {
      throw new Error("Not a member of this organization");
    }

    // Update all active sessions for this user
    const sessions = await ctx.db
      .query("session")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    for (const session of sessions) {
      if (session.expiresAt > Date.now()) {
        await ctx.db.patch(session._id, {
          activeOrganizationId: args.organizationId,
        });
      }
    }

    return { success: true };
  },
});

/**
 * Get members of an organization
 */
export const getOrganizationMembers = query({
  args: {
    organizationId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    // Verify user is a member
    const membership = await ctx.db
      .query("member")
      .withIndex("by_orgId_userId", (q) =>
        q.eq("organizationId", args.organizationId as any).eq("userId", user._id)
      )
      .first();

    if (!membership) {
      throw new Error("Not a member of this organization");
    }

    // Get all members
    const members = await ctx.db
      .query("member")
      .withIndex("by_orgId", (q) => q.eq("organizationId", args.organizationId as any))
      .collect();

    // Populate user data
    const membersWithUsers = await Promise.all(
      members.map(async (member) => {
        const memberUser = await ctx.db.get(member.userId);
        return {
          ...member,
          user: memberUser,
        };
      })
    );

    return membersWithUsers;
  },
});

/**
 * Invite a member to an organization
 */
export const inviteMember = mutation({
  args: {
    organizationId: v.string(),
    email: v.string(),
    role: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.getAuthUser(ctx);
    if (!user) {
      throw new Error("Not authenticated");
    }

    // Verify user has permission (owner or admin)
    const membership = await ctx.db
      .query("member")
      .withIndex("by_orgId_userId", (q) =>
        q.eq("organizationId", args.organizationId as any).eq("userId", user._id)
      )
      .first();

    if (!membership || !["owner", "admin"].includes(membership.role)) {
      throw new Error("Insufficient permissions");
    }

    // Create invitation
    const invitationId = await ctx.db.insert("invitation", {
      organizationId: args.organizationId as any,
      email: args.email,
      role: args.role || "member",
      status: "pending",
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
      inviterId: user._id,
      createdAt: Date.now(),
    });

    return invitationId;
  },
});
