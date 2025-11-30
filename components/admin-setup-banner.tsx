"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, X } from "lucide-react"

export function AdminSetupBanner() {
  const [show, setShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState<string>("")

  useEffect(() => {
    checkAdminStatus()
  }, [])

  async function checkAdminStatus() {
    const supabase = createClient()

    // Get current user
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) return

    setUserId(user.id)

    // Check if any admins exist
    const { count } = await supabase.from("admin_users").select("*", { count: "exact", head: true })

    // Show banner if no admins exist and user is logged in
    if (count === 0) {
      setShow(true)
    }
  }

  async function makeFirstAdmin() {
    setIsLoading(true)
    try {
      const supabase = createClient()

      // Try to insert current user as admin
      const { error } = await supabase.from("admin_users").insert({ id: userId })

      if (!error) {
        alert("관리자 권한이 부여되었습니다! 페이지를 새로고침합니다.")
        window.location.reload()
      } else {
        alert("오류가 발생했습니다: " + error.message)
      }
    } catch (error) {
      alert("오류가 발생했습니다.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!show) return null

  return (
    <Alert className="border-orange-200 bg-orange-50">
      <Shield className="h-4 w-4 text-orange-600" />
      <AlertTitle className="text-orange-900">관리자 계정이 없습니다</AlertTitle>
      <AlertDescription className="text-orange-800">
        <p className="mb-2">이 시스템에 아직 관리자가 없습니다. 첫 번째 사용자로서 관리자 권한을 받으시겠습니까?</p>
        <div className="flex gap-2">
          <Button onClick={makeFirstAdmin} disabled={isLoading} size="sm" variant="default">
            {isLoading ? "처리 중..." : "관리자 되기"}
          </Button>
          <Button onClick={() => setShow(false)} size="sm" variant="outline">
            <X className="h-4 w-4" />
            닫기
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
