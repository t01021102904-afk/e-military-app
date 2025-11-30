"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import NewsForm from "./news-form"
import NewsList from "./news-list"

interface NewsManagementProps {
  initialNews: any[]
}

export default function NewsManagement({ initialNews }: NewsManagementProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingNews, setEditingNews] = useState<any>(null)

  const handleEdit = (news: any) => {
    setEditingNews(news)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingNews(null)
  }

  return (
    <div className="space-y-8">
      {/* Create Button */}
      {!showForm && (
        <Button onClick={() => setShowForm(true)} className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold">
          <Plus className="w-4 h-4 mr-2" />
          Create News Article
        </Button>
      )}

      {/* Form */}
      {showForm && <NewsForm news={editingNews} onClose={handleCloseForm} />}

      {/* News List */}
      <NewsList news={initialNews} onEdit={handleEdit} />
    </div>
  )
}
