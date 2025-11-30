import { Header } from "@/components/header"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SiteSettingsForm } from "@/components/admin/site-settings-form"
import { AdminManagement } from "@/components/admin/admin-management"

export default async function SettingsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: adminUser } = await supabase.from("admin_users").select("id").eq("id", user.id).single()

  if (!adminUser) {
    redirect("/")
  }

  const { data: settings } = await supabase
    .from("site_settings")
    .select("key, value")
    .in("key", ["total_letters_delivered", "current_batch_count", "batch_goal"])

  const totalLetters = settings?.find((s) => s.key === "total_letters_delivered")?.value?.count || 0
  const currentBatch = settings?.find((s) => s.key === "current_batch_count")?.value?.count || 0
  const batchGoal = settings?.find((s) => s.key === "batch_goal")?.value?.count || 1000

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-5xl">
          <div className="space-y-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Settings</h1>
              <p className="text-gray-400">Manage site settings and administrators</p>
            </div>

            <Tabs defaultValue="site" className="space-y-4">
              <TabsList className="bg-zinc-900 border-zinc-800">
                <TabsTrigger value="site">Site Settings</TabsTrigger>
                <TabsTrigger value="admins">Administrators</TabsTrigger>
              </TabsList>

              <TabsContent value="site" className="space-y-4">
                <SiteSettingsForm
                  initialTotalLetters={totalLetters}
                  initialCurrentBatch={currentBatch}
                  initialBatchGoal={batchGoal}
                />
              </TabsContent>

              <TabsContent value="admins" className="space-y-4">
                <AdminManagement />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
