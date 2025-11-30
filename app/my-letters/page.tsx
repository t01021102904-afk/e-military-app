import { Header } from "@/components/header"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function MyLettersPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: userProfile } = await supabase.from("users").select("letters_written").eq("id", user.id).single()

  const { data: letters } = await supabase
    .from("letters")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Pending Review</Badge>
      case "approved":
        return <Badge className="bg-green-600">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      case "delivered":
        return <Badge className="bg-blue-600">Delivered</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">My Letters</h1>
                <p className="text-muted-foreground">
                  You&apos;ve written {userProfile?.letters_written || 0} approved letter(s)
                </p>
              </div>
            </div>

            {letters && letters.length > 0 ? (
              <div className="space-y-4">
                {letters.map((letter) => (
                  <Card key={letter.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">
                          Letter from {new Date(letter.created_at).toLocaleDateString()}
                        </CardTitle>
                        {getStatusBadge(letter.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-3">{letter.content}</p>
                      {letter.status === "rejected" && letter.rejection_reason && (
                        <div className="mt-4 p-3 bg-destructive/10 border border-destructive rounded">
                          <p className="text-sm text-destructive">
                            <strong>Rejection reason:</strong> {letter.rejection_reason}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">You haven&apos;t written any letters yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
