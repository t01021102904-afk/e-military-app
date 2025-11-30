"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addAdmin } from "@/app/actions/admin-actions"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export function AddAdminForm() {
  const [userId, setUserId] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const result = await addAdmin(userId)

      if (result.success) {
        setSuccess(true)
        setUserId("")
        router.refresh()
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setError(result.error || "Failed to add administrator")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="userId">User ID</Label>
        <Input
          id="userId"
          type="text"
          placeholder="Enter user UUID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <p className="text-xs text-muted-foreground">You can find the user ID in the Users tab</p>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive rounded-lg">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-50 border border-green-600 rounded-lg">
          <p className="text-sm text-green-600">Administrator added successfully!</p>
        </div>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          "Add Administrator"
        )}
      </Button>
    </form>
  )
}
