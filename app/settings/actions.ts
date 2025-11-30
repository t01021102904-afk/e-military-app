"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function deleteAccount() {
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: "You must be logged in to delete your account" }
  }

  try {
    // This function has SECURITY DEFINER and can delete from both public.users and auth.users
    const { error: deleteError } = await supabase.rpc("delete_own_account")

    if (deleteError) {
      console.error("[v0] Error deleting account:", deleteError)
      return { error: "Failed to delete your account. Please try again." }
    }

    // Sign out the user
    await supabase.auth.signOut()

    revalidatePath("/", "layout")

    return { success: true }
  } catch (error) {
    console.error("[v0] Unexpected error during account deletion:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}
