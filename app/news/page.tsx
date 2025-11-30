import { createClient } from "@/lib/supabase/server"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { BackButton } from "@/components/back-button"

export default async function NewsPage() {
  const supabase = await createClient()

  const { data: news } = await supabase
    .from("news")
    .select(`
      *,
      users:author_id (
        display_name
      )
    `)
    .eq("published", true)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-100" />
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-200" />
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-300" />
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="mb-8">
          <BackButton />
        </div>

        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">NEWS</h1>
          <div className="h-1 w-24 bg-cyan-400 mx-auto" />
        </div>

        {/* News Grid */}
        {!news || news.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No news available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {news.map((article: any) => (
              <Link key={article.id} href={`/news/${article.id}`} className="group">
                <article className="bg-zinc-900 border border-zinc-800 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden h-full flex flex-col">
                  {/* Image */}
                  {article.image_url && (
                    <div className="relative w-full h-64 bg-zinc-800 overflow-hidden">
                      <Image
                        src={article.image_url || "/placeholder.svg"}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-400 mb-4 line-clamp-3 flex-1">{article.content}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-zinc-800">
                      <span>{article.users?.display_name || "E-Mailitary Team"}</span>
                      <time>{format(new Date(article.created_at), "MMM dd, yyyy")}</time>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
