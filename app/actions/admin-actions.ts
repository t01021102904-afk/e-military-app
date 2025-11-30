"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function approveLetter(letterId: string) {
  try {
    const supabase = await createClient()

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return { success: false, error: "Not authenticated" }
    }

    const { data: adminUser } = await supabase.from("admin_users").select("id").eq("id", user.id).single()

    if (!adminUser) {
      return { success: false, error: "Not authorized" }
    }

    // Update letter status
    const { error } = await supabase
      .from("letters")
      .update({
        status: "approved",
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", letterId)

    if (error) {
      console.error("[v0] Error approving letter:", error)
      return { success: false, error: "Failed to approve letter" }
    }

    // Update current batch count
    const { data: currentBatchData } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "current_batch_count")
      .single()

    const currentCount = currentBatchData?.value?.count || 0

    await supabase
      .from("site_settings")
      .update({
        value: { count: currentCount + 1 },
      })
      .eq("key", "current_batch_count")

    revalidatePath("/admin")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("[v0] Unexpected error in approveLetter:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function rejectLetter(letterId: string, reason: string) {
  try {
    const supabase = await createClient()

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return { success: false, error: "Not authenticated" }
    }

    const { data: adminUser } = await supabase.from("admin_users").select("id").eq("id", user.id).single()

    if (!adminUser) {
      return { success: false, error: "Not authorized" }
    }

    // Update letter status
    const { error } = await supabase
      .from("letters")
      .update({
        status: "rejected",
        rejection_reason: reason,
        reviewed_by: user.id,
        reviewed_at: new Date().toISOString(),
      })
      .eq("id", letterId)

    if (error) {
      console.error("[v0] Error rejecting letter:", error)
      return { success: false, error: "Failed to reject letter" }
    }

    revalidatePath("/admin")

    return { success: true }
  } catch (error) {
    console.error("[v0] Unexpected error in rejectLetter:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function updateSiteSettings({
  totalLetters,
  currentBatch,
  batchGoal,
}: {
  totalLetters: number
  currentBatch: number
  batchGoal: number
}) {
  try {
    const supabase = await createClient()

    // Check if user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return { success: false, error: "Not authenticated" }
    }

    const { data: adminUser } = await supabase.from("admin_users").select("id").eq("id", user.id).single()

    if (!adminUser) {
      return { success: false, error: "Not authorized" }
    }

    // Update all settings
    const updates = [
      {
        key: "total_letters_delivered",
        value: { count: totalLetters },
      },
      {
        key: "current_batch_count",
        value: { count: currentBatch },
      },
      {
        key: "batch_goal",
        value: { count: batchGoal },
      },
    ]

    for (const update of updates) {
      const { error } = await supabase.from("site_settings").update({ value: update.value }).eq("key", update.key)

      if (error) {
        console.error("[v0] Error updating setting:", update.key, error)
        return { success: false, error: `Failed to update ${update.key}` }
      }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    revalidatePath("/admin/settings")

    return { success: true }
  } catch (error) {
    console.error("[v0] Unexpected error in updateSiteSettings:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function addAdmin(userId: string) {
  try {
    const supabase = await createClient()

    // Check if current user is admin
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return { success: false, error: "Not authenticated" }
    }

    const { data: adminUser } = await supabase.from("admin_users").select("id").eq("id", user.id).single()

    if (!adminUser) {
      return { success: false, error: "Not authorized" }
    }

    // Check if user exists
    const { data: targetUser } = await supabase.from("users").select("id").eq("id", userId).single()

    if (!targetUser) {
      return { success: false, error: "User not found" }
    }

    const { data: existingAdmin } = await supabase.from("admin_users").select("id").eq("id", userId).maybeSingle()

    if (existingAdmin) {
      return { success: false, error: "User is already an administrator" }
    }

    // Add as admin
    const { error } = await supabase.from("admin_users").insert({ id: userId })

    if (error) {
      console.error("[v0] Error adding admin:", error)
      return { success: false, error: "Failed to add administrator" }
    }

    revalidatePath("/admin/settings")

    return { success: true }
  } catch (error) {
    console.error("[v0] Unexpected error in addAdmin:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
