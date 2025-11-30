import { createClient as createServerClient } from "@/lib/supabase/server"
import type { SupabaseClient } from "@supabase/supabase-js"

export async function isAdmin(supabase: SupabaseClient) {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false

  const { data: adminUser } = await supabase.from("admin_users").select("id").eq("id", user.id).maybeSingle()

  return !!adminUser
}

export async function checkIsAdmin() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false

  const { data: adminUser } = await supabase.from("admin_users").select("id").eq("id", user.id).single()

  return !!adminUser
}

export async function checkIsSuperAdmin() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return false

  const { data: adminUser } = await supabase.from("admin_users").select("role").eq("id", user.id).single()

  return adminUser?.role === "super_admin" || adminUser?.role === "Executive Director"
}

export async function getAdminRole() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: adminUser } = await supabase.from("admin_users").select("role").eq("id", user.id).single()

  return adminUser?.role || null
}

export async function getCurrentUser() {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase.from("users").select("*").eq("id", user.id).single()

  return profile
}
