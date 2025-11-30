"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowBanner(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 border-t border-gray-700 p-4 md:p-6 shadow-lg">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-300 leading-relaxed">
              We use essential cookies to maintain your login session and improve your experience. By continuing to use
              this site, you consent to our use of cookies.{" "}
              <Link href="/privacy" className="text-cyan-400 hover:text-cyan-300 underline">
                Learn more
              </Link>
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={declineCookies}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 bg-transparent"
            >
              Decline
            </Button>
            <Button onClick={acceptCookies} size="sm" className="bg-cyan-500 hover:bg-cyan-600">
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
