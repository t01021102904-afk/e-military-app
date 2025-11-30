"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { promoteToSuperAdmin } from "@/app/admin/actions"
import { useRouter } from "next/navigation"
import { Shield, Loader2 } from "lucide-react"

export function PromoteAdminButtonClient({ adminId, adminName }: { adminId: string; adminName: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handlePromote = async () => {
    if (!confirm(`Are you sure you want to promote ${adminName} to Super Admin?`)) {
      return
    }

    setIsLoading(true)
    try {
      await promoteToSuperAdmin(adminId)
      router.refresh()
    } catch (error) {
      console.error("Failed to promote admin:", error)
      alert("Failed to promote administrator")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handlePromote} disabled={isLoading}>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
    </Button>
  )
}
