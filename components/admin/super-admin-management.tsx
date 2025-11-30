import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AddAdminForm } from "./add-admin-form"
import { RemoveAdminButtonClient } from "./remove-admin-button-client"
import { PromoteAdminButtonClient } from "./promote-admin-button-client"

export async function SuperAdminManagement() {
  const supabase = await createClient()

  // Get current user to check if they're super admin
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: currentAdminUser } = await supabase.from("admin_users").select("role").eq("id", user?.id).single()

  const isSuperAdmin = currentAdminUser?.role === "super_admin" || currentAdminUser?.role === "Executive Director"

  // Fetch all admins with their roles
  const { data: adminUsers } = await supabase
    .from("admin_users")
    .select("id, role, created_at")
    .order("created_at", { ascending: true })

  // Fetch user details for each admin
  const adminsWithDetails = await Promise.all(
    (adminUsers || []).map(async (admin) => {
      const { data: userProfile } = await supabase
        .from("users")
        .select("display_name, email")
        .eq("id", admin.id)
        .single()

      return {
        ...admin,
        email: userProfile?.email || "No email",
        display_name: userProfile?.display_name || "No name",
      }
    }),
  )

  return (
    <div className="space-y-4">
      {isSuperAdmin && (
        <Card>
          <CardHeader>
            <CardTitle>Add Administrator</CardTitle>
            <CardDescription>Add a new user as an administrator by their user ID</CardDescription>
          </CardHeader>
          <CardContent>
            <AddAdminForm />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Administrators</CardTitle>
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
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        admin.role === "super_admin" || admin.role === "Executive Director" ? "default" : "secondary"
                      }
                    >
                      {admin.role === "Executive Director"
                        ? "Executive Director"
                        : admin.role === "super_admin"
                          ? "Super Admin"
                          : "Admin"}
                    </Badge>
                    {isSuperAdmin && admin.id !== user?.id && (
                      <div className="flex gap-2">
                        {admin.role === "admin" && (
                          <PromoteAdminButtonClient adminId={admin.id} adminName={admin.display_name} />
                        )}
                        <RemoveAdminButtonClient adminId={admin.id} adminName={admin.display_name} />
                      </div>
                    )}
                  </div>
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
