const reservedSlugs = new Set(["admin", "api", "app", "dashboard", "login", "signup"]);

export async function checkSlugAvailability(slug: string) {
  if (!slug || slug.length < 3) {
    return { available: false, error: "slugTooShort" };
  }

  if (!/^[a-z0-9-]+$/.test(slug)) {
    return { available: false, error: "slugInvalid" };
  }

  return { available: !reservedSlugs.has(slug), error: reservedSlugs.has(slug) ? "slugTaken" : undefined };
}

export async function updatePassword() {
  return { success: true };
}
