import { Header } from "@/components/header"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LettersManagement } from "@/components/admin/letters-management"
import { UsersManagement } from "@/components/admin/users-management"
import { StatsOverview } from "@/components/admin/stats-overview"
import { SuperAdminManagement } from "@/components/admin/super-admin-management"
import { HomepageContentEditor } from "@/components/admin/homepage-content-editor"

export default async function AdminPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: adminUser } = await supabase.from("admin_users").select("id, role").eq("id", user.id).single()

  if (!adminUser) {
    redirect("/")
  }

  const isSuperAdmin = adminUser.role === "super_admin" || adminUser.role === "Executive Director"

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-7xl">
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Admin Dashboard</h1>
              <p className="text-gray-400">
                {isSuperAdmin ? adminUser.role : "Admin"} - Manage letters, users, and site settings
              </p>
            </div>

            <Tabs defaultValue="letters" className="space-y-4">
              <TabsList className="bg-zinc-900 border border-zinc-800">
                <TabsTrigger value="letters">Letters</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="stats">Statistics</TabsTrigger>
                {isSuperAdmin && (
                  <>
                    <TabsTrigger value="admins">Admins</TabsTrigger>
                    <TabsTrigger value="homepage">Homepage</TabsTrigger>
                  </>
                )}
              </TabsList>

              <TabsContent value="letters" className="space-y-4">
                <LettersManagement />
              </TabsContent>

              <TabsContent value="users" className="space-y-4">
                <UsersManagement />
              </TabsContent>

              <TabsContent value="news" className="space-y-4">
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">Manage news articles from the dedicated News page</p>
                  <a
                    href="/admin/news"
                    className="inline-block bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-6 py-3 rounded transition-colors"
                  >
                    Go to News Management
                  </a>
                </div>
              </TabsContent>

              <TabsContent value="stats" className="space-y-4">
                <StatsOverview />
              </TabsContent>

              {isSuperAdmin && (
                <>
                  <TabsContent value="admins" className="space-y-4">
                    <SuperAdminManagement />
                  </TabsContent>

                  <TabsContent value="homepage" className="space-y-4">
                    <HomepageContentEditor />
                  </TabsContent>
                </>
              )}
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
