"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { updateHomepageContent } from "@/app/admin/actions"
import { useRouter } from "next/navigation"
import { Upload } from "lucide-react"

type Section = {
  id: string
  section: string
  title: string | null
  content: string | null
  image_url: string | null
}

export function HomepageContentForm({ section }: { section: Section }) {
  const [isLoading, setIsLoading] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [formData, setFormData] = useState({
    title: section.title || "",
    content: section.content || "",
    image_url: section.image_url || "",
  })
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateHomepageContent(section.id, formData)
      router.refresh()
      alert("Homepage content updated successfully!")
    } catch (error) {
      console.error("Failed to update content:", error)
      alert("Failed to update content")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleImageUpload(file: File) {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    setIsUploading(true)

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
      setFormData((prev) => ({ ...prev, image_url: url }))
    } catch (error) {
      console.error("Upload error:", error)
      alert("Failed to upload image")
    } finally {
      setIsUploading(false)
    }
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(true)
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  function handleFileInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded-lg">
      <div className="font-semibold text-lg capitalize">{section.section} Section</div>

      <div className="space-y-2">
        <Label htmlFor={`title-${section.id}`}>Title</Label>
        <Input
          id={`title-${section.id}`}
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Section title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor={`content-${section.id}`}>Content</Label>
        <Textarea
          id={`content-${section.id}`}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Section content"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label>Image</Label>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
          }`}
        >
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInputChange} className="hidden" />
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            {isUploading ? "Uploading..." : "Drop an image here or click to select"}
          </p>
        </div>

        {formData.image_url && (
          <div className="mt-2">
            <img src={formData.image_url || "/placeholder.svg"} alt="Preview" className="max-w-xs rounded-lg" />
            <Input
              value={formData.image_url}
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
              placeholder="Or paste image URL"
              className="mt-2"
            />
          </div>
        )}
      </div>

      <Button type="submit" disabled={isLoading || isUploading}>
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}
