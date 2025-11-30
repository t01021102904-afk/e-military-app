import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export async function UsersManagement() {
  const supabase = await createClient()

  const { data: users } = await supabase.from("users").select("*").order("created_at", { ascending: false })

  const { data: admins } = await supabase.from("admin_users").select("id")

  const adminIds = new Set(admins?.map((a) => a.id) || [])

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Users: {users?.length || 0}</CardTitle>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {users && users.length > 0 ? (
          users.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{user.display_name || "No name"}</CardTitle>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="flex gap-2">
                    {adminIds.has(user.id) && <Badge>Admin</Badge>}
                    <Badge variant="secondary">{user.letters_written} letters</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Joined: {new Date(user.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No users found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
