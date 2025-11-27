"use server";

// TODO: Implement alternative backend for user password updates
// Convex has been removed from the project
import { getToken } from "../lib/auth-server";

// Authenticated mutation via server function
export async function updatePassword({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) {
  // TODO: Implement with new backend
  throw new Error("Password update functionality requires backend implementation");
}