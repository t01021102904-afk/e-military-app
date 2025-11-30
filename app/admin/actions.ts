"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { checkIsSuperAdmin } from "@/lib/auth-utils"

export async function removeAdmin(adminId: string) {
  const isSuperAdmin = await checkIsSuperAdmin()

  if (!isSuperAdmin) {
    throw new Error("Only super admins can remove administrators")
  }

  const supabase = await createClient()

  const { error } = await supabase.from("admin_users").delete().eq("id", adminId)

  if (error) throw error

  revalidatePath("/admin")
}

export async function promoteToSuperAdmin(adminId: string) {
  const isSuperAdmin = await checkIsSuperAdmin()

  if (!isSuperAdmin) {
    throw new Error("Only super admins can promote administrators")
  }

  const supabase = await createClient()

  const { error } = await supabase.from("admin_users").update({ role: "super_admin" }).eq("id", adminId)

  if (error) throw error

  revalidatePath("/admin")
}

export async function updateHomepageContent(
  sectionId: string,
  data: { title: string; content: string; image_url: string },
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) throw new Error("Not authenticated")

  // Check if user is admin
  const { data: adminUser } = await supabase.from("admin_users").select("id").eq("id", user.id).single()

  if (!adminUser) {
    throw new Error("Only admins can update homepage content")
  }

  const { error } = await supabase
    .from("homepage_content")
    .update({
      title: data.title,
      content: data.content,
      image_url: data.image_url,
      updated_at: new Date().toISOString(),
      updated_by: user.id,
    })
    .eq("id", sectionId)

  if (error) throw error

  revalidatePath("/")
  revalidatePath("/about")
  revalidatePath("/admin")
}
