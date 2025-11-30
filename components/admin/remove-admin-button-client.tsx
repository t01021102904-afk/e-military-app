"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { removeAdmin } from "@/app/admin/actions"
import { useRouter } from "next/navigation"
import { Trash2, Loader2 } from "lucide-react"

export function RemoveAdminButtonClient({ adminId, adminName }: { adminId: string; adminName: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRemove = async () => {
    if (!confirm(`Are you sure you want to remove ${adminName} as an administrator?`)) {
      return
    }

    setIsLoading(true)
    try {
      await removeAdmin(adminId)
      router.refresh()
    } catch (error) {
      console.error("Failed to remove admin:", error)
      alert("Failed to remove administrator")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="destructive" size="sm" onClick={handleRemove} disabled={isLoading}>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
    </Button>
  )
}
