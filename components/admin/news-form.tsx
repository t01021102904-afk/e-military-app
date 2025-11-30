"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createNews, updateNews } from "@/app/actions/news-actions"
import { useRouter } from "next/navigation"
import { Upload, X } from "lucide-react"

interface NewsFormProps {
  news?: any
  onClose: () => void
}

export default function NewsForm({ news, onClose }: NewsFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(news?.title || "")
  const [content, setContent] = useState(news?.content || "")
  const [imageUrl, setImageUrl] = useState(news?.image_url || "")
  const [published, setPublished] = useState(news?.published || false)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError("")

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const { url } = await response.json()
      setImageUrl(url)
    } catch (err) {
      setError("Failed to upload image")
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const formData = new FormData()
    formData.append("title", title)
    formData.append("content", content)
    formData.append("imageUrl", imageUrl)
    formData.append("published", published.toString())

    const result = news ? await updateNews(news.id, formData) : await createNews(formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      router.refresh()
      onClose()
    }
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{news ? "Edit News Article" : "Create News Article"}</h2>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-400 hover:text-white">
          <X className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <Label htmlFor="title" className="text-white">
            Title *
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        </div>

        {/* Content */}
        <div>
          <Label htmlFor="content" className="text-white">
            Content *
          </Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        </div>

        {/* Image Upload */}
        <div>
          <Label htmlFor="image" className="text-white">
            Featured Image
          </Label>
          <div className="mt-2 space-y-4">
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("image-upload")?.click()}
                disabled={uploading}
                className="border-zinc-700 text-white hover:bg-zinc-800"
              >
                <Upload className="w-4 h-4 mr-2" />
                {uploading ? "Uploading..." : "Upload Image"}
              </Button>
              <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </div>
            {imageUrl && (
              <div className="relative w-full h-48 bg-zinc-800 border border-zinc-700 rounded">
                <img
                  src={imageUrl || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-full object-cover rounded"
                />
              </div>
            )}
          </div>
        </div>

        {/* Published */}
        <div className="flex items-center gap-2">
          <input
            id="published"
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="w-4 h-4"
          />
          <Label htmlFor="published" className="text-white cursor-pointer">
            Publish immediately
          </Label>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Actions */}
        <div className="flex gap-4">
          <Button type="submit" disabled={loading} className="bg-cyan-500 hover:bg-cyan-600 text-black font-semibold">
            {loading ? "Saving..." : news ? "Update" : "Create"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="border-zinc-700 text-white hover:bg-zinc-800 bg-transparent"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
