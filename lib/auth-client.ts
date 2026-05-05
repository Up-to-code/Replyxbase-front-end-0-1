"use client";

import { useSyncExternalStore } from "react";

type DemoUser = {
  id: string;
  name: string;
  email: string;
  image?: string;
};

type DemoOrganization = {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  logo?: string;
  metadata?: {
    plan?: string;
  };
};

type DemoSession = {
  user: DemoUser;
  session: {
    activeOrganizationId: string;
  };
};

type AuthError = {
  message?: string;
};

type AuthResult<T = unknown> = {
  data?: T | null;
  error: AuthError | null;
};

const listeners = new Set<() => void>();

const state: {
  user: DemoUser;
  organizations: DemoOrganization[];
  activeOrganizationId: string;
} = {
  user: {
    id: "demo-user",
    name: "Demo User",
    email: "demo@replyxbase.com",
  },
  organizations: [
    {
      id: "demo-org",
      name: "Replyxbase Demo",
      slug: "replyxbase-demo",
      createdAt: new Date("2026-05-04T00:00:00.000Z"),
      metadata: { plan: "Frontend" },
    },
  ],
  activeOrganizationId: "demo-org",
};

const notify = () => {
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const getSnapshot = () => state;

const useStore = () => useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

const getSession = (): DemoSession => ({
  user: state.user,
  session: {
    activeOrganizationId: state.activeOrganizationId,
  },
});

export const authClient = {
  useSession() {
    useStore();
    return { data: getSession(), isPending: false };
  },
  useListOrganizations() {
    useStore();
    return { data: state.organizations, isPending: false };
  },
  useActiveOrganization() {
    useStore();
    return {
      data: state.organizations.find((org) => org.id === state.activeOrganizationId) ?? null,
      isPending: false,
    };
  },
  signIn: {
    social: async ({ callbackURL }: { provider: string; callbackURL?: string }): Promise<AuthResult> => {
      if (callbackURL && typeof window !== "undefined") window.location.href = callbackURL;
      return { error: null };
    },
    email: async ({ email }: { email: string; password: string }): Promise<AuthResult> => {
      state.user.email = email;
      notify();
      return { error: null };
    },
  },
  signUp: {
    email: async ({ name, email }: { name: string; email: string; password: string }): Promise<AuthResult> => {
      state.user.name = name;
      state.user.email = email;
      notify();
      return { error: null };
    },
  },
  signOut: async (): Promise<AuthResult> => ({ error: null }),
  organization: {
    setActive: async ({ organizationId }: { organizationId: string }): Promise<AuthResult> => {
      state.activeOrganizationId = organizationId;
      notify();
      return { error: null };
    },
    create: async (
      data: { name: string; slug: string; logo?: string },
      callbacks?: {
        onSuccess?: () => void;
        onError?: (ctx: { error: Error }) => void;
      },
    ): Promise<AuthResult<DemoOrganization>> => {
      try {
        const organization = {
          id: `org-${Date.now()}`,
          name: data.name,
          slug: data.slug,
          createdAt: new Date(),
          logo: data.logo,
          metadata: { plan: "Frontend" },
        };
        state.organizations = [...state.organizations, organization];
        state.activeOrganizationId = organization.id;
        notify();
        callbacks?.onSuccess?.();
        return { data: organization, error: null };
      } catch (error) {
        const authError = error instanceof Error ? error : new Error("Organization update failed");
        callbacks?.onError?.({ error: authError });
        return { data: null, error: { message: authError.message } };
      }
    },
    update: async (data: { organizationId: string; name?: string; slug?: string; logo?: string }): Promise<AuthResult> => {
      state.organizations = state.organizations.map((org) =>
        org.id === data.organizationId
          ? {
              ...org,
              name: data.name ?? org.name,
              slug: data.slug ?? org.slug,
              logo: data.logo ?? org.logo,
            }
          : org,
      );
      notify();
      return { error: null };
    },
  },
};
