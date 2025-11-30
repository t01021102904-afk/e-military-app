import { createClient } from "@/lib/supabase/server"
import { format } from "date-fns"
import Image from "next/image"
import { notFound } from "next/navigation"
import { BackButton } from "@/components/back-button"

function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
}

export default async function NewsArticlePage({
  params,
}: {
  params: { id: string }
}) {
  const supabase = await createClient()

  const { data: article } = await supabase
    .from("news")
    .select(`
      *,
      users:author_id (
        display_name
      )
    `)
    .eq("id", params.id)
    .eq("published", true)
    .single()

  if (!article) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-20">
        {/* Back button */}
        <div className="mb-8">
          <BackButton />
        </div>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{article.title}</h1>
            <div className="flex items-center gap-4 text-gray-400">
              <span>{article.users?.display_name || "E-Mailitary Team"}</span>
              <span>•</span>
              <time>{format(new Date(article.created_at), "MMMM dd, yyyy")}</time>
            </div>
          </header>

          {/* Featured Image */}
          {article.image_url && (
            <div className="relative w-full h-[400px] md:h-[600px] mb-8 bg-zinc-900 border border-zinc-800">
              <Image
                src={article.image_url || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none">
            <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">{sanitizeHtml(article.content)}</div>
          </div>
        </article>
      </div>
    </div>
  )
}
