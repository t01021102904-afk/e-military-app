import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HomepageContentForm } from "./homepage-content-form"

export async function HomepageContentEditor() {
  const supabase = await createClient()

  const { data: sections } = await supabase.from("homepage_content").select("*").order("section")

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Homepage Content Management</CardTitle>
          <CardDescription>Edit homepage sections, text, and images</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {sections?.map((section) => (
              <HomepageContentForm key={section.id} section={section} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
