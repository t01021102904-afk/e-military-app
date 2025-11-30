"use server"

import { createClient } from "@/lib/supabase/server"
import { validateLetterContent } from "@/lib/content-filter"

export async function submitLetter(content: string) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return {
        success: false,
        error: "You must be logged in to submit a letter.",
      }
    }

    const userId = user.id
    // </CHANGE>

    const validation = validateLetterContent(content)

    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
      }
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const { data: todayLetters, error: countError } = await supabase
      .from("letters")
      .select("id", { count: "exact" })
      .eq("user_id", userId)
      .gte("created_at", today.toISOString())
      .lt("created_at", tomorrow.toISOString())

    if (countError) {
      console.error("[v0] Error checking daily letter count:", countError)
      return {
        success: false,
        error: "Failed to check daily limit. Please try again.",
      }
    }

    const letterCount = todayLetters?.length || 0
    if (letterCount >= 5) {
      return {
        success: false,
        error: "You have reached the daily limit of 5 letters. Please try again tomorrow.",
      }
    }

    const { error } = await supabase.from("letters").insert({
      user_id: userId,
      content: content.trim(),
      status: "pending",
    })

    if (error) {
      console.error("[v0] Letter submission error:", error)
      return {
        success: false,
        error: "Failed to submit letter. Please try again.",
      }
    }

    return { success: true }
  } catch (error) {
    console.error("[v0] Unexpected error in submitLetter:", error)
    return {
      success: false,
      error: "An unexpected error occurred.",
    }
  }
}
