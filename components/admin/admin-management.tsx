import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddAdminForm } from "./add-admin-form"

export async function AdminManagement() {
  const supabase = await createClient()

  const { data: adminUsers } = await supabase
    .from("admin_users")
    .select("id, role, created_at")
    .order("created_at", { ascending: true })

  // Get user details for each admin
  let adminsWithDetails = []
  if (adminUsers && adminUsers.length > 0) {
    const adminIds = adminUsers.map((admin) => admin.id)
    const { data: usersData } = await supabase.from("users").select("id, email, display_name").in("id", adminIds)

    // Manually join the data
    adminsWithDetails = adminUsers.map((admin) => {
      const user = usersData?.find((u) => u.id === admin.id)
      return {
        id: admin.id,
        role: admin.role,
        created_at: admin.created_at,
        email: user?.email || "No email",
        display_name: user?.display_name || user?.email?.split("@")[0] || "No name",
      }
    })
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Add Administrator</CardTitle>
          <CardDescription>Add a new user as an administrator by their user ID</CardDescription>
        </CardHeader>
        <CardContent>
          <AddAdminForm />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Administrators</CardTitle>
          <CardDescription>Total admins: {adminsWithDetails?.length || 0}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {adminsWithDetails && adminsWithDetails.length > 0 ? (
              adminsWithDetails.map((admin) => (
                <div key={admin.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">{admin.display_name}</div>
                    <div className="text-sm text-muted-foreground">{admin.email}</div>
                    <div className="text-xs text-muted-foreground">
                      Admin since: {new Date(admin.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <Badge>{admin.role}</Badge>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground text-center py-4">No administrators found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
