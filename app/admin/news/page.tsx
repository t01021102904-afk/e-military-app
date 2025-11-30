import { createClient } from "@/lib/supabase/server"
import { isAdmin } from "@/lib/auth-utils"
import { redirect } from "next/navigation"
import NewsManagement from "@/components/admin/news-management"

export default async function AdminNewsPage() {
  const supabase = await createClient()
  const adminCheck = await isAdmin(supabase)

  if (!adminCheck) {
    redirect("/auth/login")
  }

  const { data: news } = await supabase
    .from("news")
    .select(`
      *,
      users:author_id (
        display_name
      )
    `)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Manage News</h1>
        <NewsManagement initialNews={news || []} />
      </div>
    </div>
  )
}
