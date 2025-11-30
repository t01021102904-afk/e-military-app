"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

async function checkAdminAuth() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { authorized: false, error: "You must be logged in" }
  }

  const { data: adminUser } = await supabase.from("admin_users").select("id").eq("id", user.id).maybeSingle()

  if (!adminUser) {
    return { authorized: false, error: "You must be an admin to perform this action" }
  }

  return { authorized: true, userId: user.id }
}

export async function createNews(formData: FormData) {
  const authCheck = await checkAdminAuth()
  if (!authCheck.authorized) {
    return { error: authCheck.error }
  }

  const supabase = await createClient()

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const imageUrl = formData.get("imageUrl") as string
  const published = formData.get("published") === "true"

  const { data, error } = await supabase
    .from("news")
    .insert({
      title,
      content,
      image_url: imageUrl || null,
      author_id: authCheck.userId!,
      published,
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/news")
  revalidatePath("/admin/news")
  return { data }
}

export async function updateNews(id: string, formData: FormData) {
  const authCheck = await checkAdminAuth()
  if (!authCheck.authorized) {
    return { error: authCheck.error }
  }

  const supabase = await createClient()

  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const imageUrl = formData.get("imageUrl") as string
  const published = formData.get("published") === "true"

  const { data, error } = await supabase
    .from("news")
    .update({
      title,
      content,
      image_url: imageUrl || null,
      published,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/news")
  revalidatePath("/admin/news")
  return { data }
}

export async function deleteNews(id: string) {
  const authCheck = await checkAdminAuth()
  if (!authCheck.authorized) {
    return { error: authCheck.error }
  }

  const supabase = await createClient()

  const { error } = await supabase.from("news").delete().eq("id", id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/news")
  revalidatePath("/admin/news")
  return { success: true }
}

export async function togglePublish(id: string, published: boolean) {
  const authCheck = await checkAdminAuth()
  if (!authCheck.authorized) {
    return { error: authCheck.error }
  }

  const supabase = await createClient()

  const { data, error } = await supabase
    .from("news")
    .update({ published, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/news")
  revalidatePath("/admin/news")
  return { data }
}
