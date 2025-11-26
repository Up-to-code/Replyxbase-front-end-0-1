import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { organization } from "better-auth/plugins";
import { components } from "./_generated/api";
import { DataModel } from "./_generated/dataModel";
import { query } from "./_generated/server";
import { betterAuth } from "better-auth";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { customAdapter } from "./customAdapter";

const siteUrl = process.env.SITE_URL ?? process.env.CONVEX_SITE_URL ?? "http://localhost:3000";

// The component client has methods needed for integrating Convex with Better Auth,
// as well as helper methods for general use.
export const authComponent = createClient<DataModel>(components.betterAuth);

export const createAuth = (
  ctx: GenericCtx<DataModel>,
  { optionsOnly } = { optionsOnly: false },
) => {
  return betterAuth({
    // disable logging when createAuth is called just to generate options.
    // this is not required, but there's a lot of noise in logs without it.
    logger: {
      disabled: optionsOnly,
      level: "debug",
    },
    baseURL: siteUrl,
    database: customAdapter(ctx),
    user: {
      modelName: "user",
    },
    session: {
      modelName: "session",
    },
    account: {
      modelName: "account",
    },
    verification: {
      modelName: "verification",
    },
    // Configure simple, non-verified email/password to get started
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    plugins: [
      // The Convex plugin is required for Convex compatibility
      convex(),
      // Organization plugin for multi-tenant support
      organization(),
      // ...(process.env.POLAR_ACCESS_TOKEN && process.env.POLAR_ACCESS_TOKEN !== "your_polar_access_token_here"
      //   ? [
      //       polar({
      //         client: new Polar({
      //           accessToken: process.env.POLAR_ACCESS_TOKEN,
      //           server: "sandbox", // Default to sandbox, change to production when ready
      //         }),
      //         createCustomerOnSignUp: true,
      //         use: [
      //           checkout({
      //             products: [
      //               {
      //                 productId: "49c98482-1f0e-4f81-802d-ca75829de5ae",
      //                 slug: "starter",
      //               },
      //               {
      //                 productId: "9a569da3-1c7a-4ed0-9752-4141d22f8bf8",
      //                 slug: "pro",
      //               },
      //             ],
      //             authenticatedUsersOnly: true,
      //           }),
      //           portal(),
      //           usage(),
      //           webhooks({
      //             secret: process.env.POLAR_WEBHOOK_SECRET ?? "",
      //             onPayload: async (payload) => {
      //               console.log("Polar webhook payload:", payload);
      //             },
      //           }),
      //         ],
      //       }),
      //     ]
      //   : []),
    ],
  });
};

// Example function for getting the current user
// Feel free to edit, omit, etc.
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return authComponent.getAuthUser(ctx);
  },
});
