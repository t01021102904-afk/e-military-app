import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export async function StatsOverview() {
  const supabase = await createClient()

  const { count: totalUsers } = await supabase.from("users").select("*", { count: "exact", head: true })

  const { count: totalLetters } = await supabase.from("letters").select("*", { count: "exact", head: true })

  const { count: pendingLetters } = await supabase
    .from("letters")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending")

  const { count: approvedLetters } = await supabase
    .from("letters")
    .select("*", { count: "exact", head: true })
    .eq("status", "approved")

  const { data: settings } = await supabase
    .from("site_settings")
    .select("key, value")
    .in("key", ["total_letters_delivered", "current_batch_count"])

  const totalDelivered = settings?.find((s) => s.key === "total_letters_delivered")?.value?.count || 0
  const currentBatch = settings?.find((s) => s.key === "current_batch_count")?.value?.count || 0

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalUsers || 0}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Total Letters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalLetters || 0}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-yellow-600">{pendingLetters || 0}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Approved Letters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">{approvedLetters || 0}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Letters Delivered</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalDelivered}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">Current Batch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{currentBatch}</div>
        </CardContent>
      </Card>
    </div>
  )
}
