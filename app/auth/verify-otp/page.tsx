"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [email, setEmail] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(emailParam)
    } else {
      router.push("/auth/sign-up")
    }
  }, [searchParams, router])

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!otp || otp.length !== 8) {
      setError("Please enter a valid 8-character code")
      return
    }

    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { data, error: verifyError } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      })

      if (verifyError) throw verifyError

      if (data.session && data.user) {
        const { data: existingUser } = await supabase.from("users").select("id").eq("id", data.user.id).maybeSingle()

        const pendingName = sessionStorage.getItem("pendingUserName")

        if (!existingUser) {
          const { error: insertError } = await supabase.from("users").insert({
            id: data.user.id,
            email: data.user.email!,
            display_name: pendingName || data.user.email!,
          })

          if (insertError) {
            console.error("Error creating user:", insertError)
            throw new Error("Failed to create user profile")
          }
        } else if (pendingName) {
          const { error: updateError } = await supabase
            .from("users")
            .update({
              display_name: pendingName,
            })
            .eq("id", data.user.id)

          if (updateError) {
            console.error("Error updating display name:", updateError)
          }
        }

        sessionStorage.removeItem("pendingUserName")
        sessionStorage.removeItem("pendingUserEmail")
        sessionStorage.removeItem("pendingUserPassword")

        router.push("/")
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("expired")) {
          setError("This code has expired. Please request a new one.")
        } else if (error.message.includes("invalid")) {
          setError("Invalid verification code. Please check and try again.")
        } else {
          setError(error.message)
        }
      } else {
        setError("Verification failed. Please try again.")
      }
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)
    setError(null)

    const supabase = createClient()

    try {
      const pendingName = sessionStorage.getItem("pendingUserName")

      const { error: resendError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          data: pendingName
            ? {
                display_name: pendingName,
              }
            : undefined,
        },
      })

      if (resendError) throw resendError

      setError("A new verification code has been sent to your email")
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Failed to resend code. Please try again.")
      }
    } finally {
      setIsResending(false)
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
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Mail className="h-16 w-16 text-cyan-400" />
            </div>
            <CardTitle className="text-2xl text-center text-white uppercase tracking-wide">
              Enter Verification Code
            </CardTitle>
            <CardDescription className="text-center text-zinc-400">
              We sent an 8-character code to {email}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-white">
                  Verification Code
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 8-character code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.toUpperCase().slice(0, 8))}
                  required
                  disabled={isLoading}
                  className="h-12 text-center text-2xl tracking-widest font-mono bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                  maxLength={8}
                />
              </div>

              {error && (
                <div
                  className={`rounded-lg border p-3 text-sm ${
                    error.includes("sent")
                      ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                      : "bg-red-500/10 border-red-500/30 text-red-400"
                  }`}
                >
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 text-base font-semibold bg-cyan-500 hover:bg-cyan-600 text-black"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify Email"}
              </Button>

              <div className="space-y-4">
                <div className="text-center text-sm text-zinc-400">
                  <p>Did not receive the code?</p>
                  <Button
                    type="button"
                    variant="link"
                    onClick={handleResendOTP}
                    disabled={isResending}
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    {isResending ? "Sending..." : "Resend Code"}
                  </Button>
                </div>

                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4">
                  <ul className="list-disc list-inside space-y-1 text-sm text-zinc-400">
                    <li>Check your spam or junk folder</li>
                    <li>Code expires after 1 hour</li>
                    <li>You can request a new code after 60 seconds</li>
                  </ul>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
