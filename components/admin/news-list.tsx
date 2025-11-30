"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { deleteNews, togglePublish } from "@/app/actions/news-actions"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

interface NewsListProps {
  news: any[]
  onEdit: (news: any) => void
}

export default function NewsList({ news, onEdit }: NewsListProps) {
  const router = useRouter()
  const [deleting, setDeleting] = useState<string | null>(null)
  const [toggling, setToggling] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this news article?")) return

    setDeleting(id)
    await deleteNews(id)
    router.refresh()
    setDeleting(null)
  }

  const handleTogglePublish = async (id: string, published: boolean) => {
    setToggling(id)
    await togglePublish(id, !published)
    router.refresh()
    setToggling(null)
  }

  if (!news || news.length === 0) {
    return <div className="text-center py-12 text-gray-400">No news articles yet. Create one to get started!</div>
  }

  return (
    <div className="space-y-4">
      {news.map((article: any) => (
        <div key={article.id} className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg flex gap-6">
          {/* Image */}
          {article.image_url && (
            <div className="relative w-32 h-32 bg-zinc-800 rounded flex-shrink-0">
              <Image
                src={article.image_url || "/placeholder.svg"}
                alt={article.title}
                fill
                className="object-cover rounded"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3 className="text-xl font-bold text-white truncate">{article.title}</h3>
              <span
                className={`px-2 py-1 text-xs rounded ${
                  article.published ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {article.published ? "Published" : "Draft"}
              </span>
            </div>
            <p className="text-gray-400 text-sm line-clamp-2 mb-4">{article.content}</p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                <span>{article.users?.display_name || "Unknown"}</span>
                <span className="mx-2">•</span>
                <span>{format(new Date(article.created_at), "MMM dd, yyyy")}</span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleTogglePublish(article.id, article.published)}
                  disabled={toggling === article.id}
                  className="border-zinc-700 text-white hover:bg-zinc-800"
                >
                  {article.published ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onEdit(article)}
                  className="border-zinc-700 text-white hover:bg-zinc-800"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDelete(article.id)}
                  disabled={deleting === article.id}
                  className="border-red-700 text-red-400 hover:bg-red-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
