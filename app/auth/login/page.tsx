"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const message = searchParams.get("message")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      console.log("[v0] Attempting to send OTP to:", email)

      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false, // Don't create new users on login
        },
      })

      if (otpError) {
        // Log full error details for debugging
        console.error("[v0] Full Supabase error object:", {
          message: otpError.message,
          status: otpError.status,
          name: otpError.name,
          // @ts-ignore
          code: otpError.code,
          // @ts-ignore
          details: otpError.details,
        })

        // User-friendly error messages
        if (otpError.message.includes("User not found")) {
          throw new Error("No account found with this email. Please sign up first.")
        }

        if (otpError.message.includes("rate limit")) {
          throw new Error("Too many attempts. Please wait a few minutes and try again.")
        }

        // SMTP or email-related errors
        throw new Error(
          `Unable to send verification email. Error: ${otpError.message}. Please contact support at williamp2904@gmail.com`,
        )
      }

      console.log("[v0] OTP sent successfully")
      sessionStorage.setItem("pendingLoginEmail", email)
      router.push(`/auth/verify-login?email=${encodeURIComponent(email)}`)
    } catch (error: unknown) {
      console.error("[v0] Login error:", error)
      setError(error instanceof Error ? error.message : "Failed to send verification code")
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black p-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-zinc-800 rounded-full opacity-20" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-zinc-800 rounded-full opacity-20" />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="shadow-2xl border-zinc-800 bg-zinc-900/90 backdrop-blur">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight text-white uppercase">E-Mailitary</CardTitle>
            <CardDescription className="text-base text-zinc-400">
              Enter your email to receive a login code
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {message && (
                <div className="rounded-lg bg-cyan-500/10 border border-cyan-500/30 p-3 text-sm text-cyan-400">
                  {message}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>

              {error && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 text-base font-semibold bg-cyan-500 hover:bg-cyan-600 text-black"
                disabled={isLoading}
              >
                {isLoading ? "Sending Code..." : "Send Verification Code"}
              </Button>

              <div className="text-center text-sm text-zinc-400">
                Don't have an account?{" "}
                <Link href="/auth/sign-up" className="font-medium text-cyan-400 hover:text-cyan-300">
                  Sign Up
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
