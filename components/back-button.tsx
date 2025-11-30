"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      onClick={() => router.back()}
      variant="ghost"
      size="sm"
      className="text-white/70 hover:text-white hover:bg-white/10 transition-colors"
      aria-label="Go back"
    >
      <ArrowLeft className="h-5 w-5" />
    </Button>
  )
}
