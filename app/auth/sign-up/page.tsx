"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false)
  const [isOver13, setIsOver13] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isOver13) {
      setError("You must be 13 years or older to use this service")
      return
    }

    if (!agreedToTerms || !agreedToPrivacy) {
      setError("Please agree to the Terms of Service and Privacy Policy")
      return
    }

    if (!name || name.trim().length < 2) {
      setError("Please enter your full name (at least 2 characters)")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address")
      return
    }

    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { data: existingUser } = await supabase.from("users").select("id").eq("email", email).maybeSingle()

      if (existingUser) {
        setError("This ID is already in use.")
        setIsLoading(false)
        return
      }

      console.log("[v0] Attempting to send sign-up OTP to:", email)

      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          data: {
            display_name: name.trim(),
          },
        },
      })

      if (otpError) {
        console.error("[v0] Full Supabase OTP error:", {
          message: otpError.message,
          status: otpError.status,
          name: otpError.name,
          code: otpError.code,
          details: otpError.details,
        })

        if (otpError.message.includes("rate limit")) {
          setError("Too many attempts. Please wait a few minutes and try again.")
        } else {
          setError(
            `Unable to send verification email. Error: ${otpError.message}. Please contact support at williamp2904@gmail.com`,
          )
        }
        setIsLoading(false)
        return
      }

      console.log("[v0] Sign-up OTP sent successfully")
      sessionStorage.setItem("pendingUserName", name.trim())
      sessionStorage.setItem("pendingUserEmail", email)

      router.push(`/auth/verify-otp?email=${encodeURIComponent(email)}`)
    } catch (error: unknown) {
      console.error("[v0] Sign-up error:", error)
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError("Sign up failed. Please try again.")
      }
      setIsLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black p-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-zinc-800 rounded-full opacity-20" />
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-zinc-800 rounded-full opacity-20" />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
        <div className="absolute top-2/3 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-100" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="shadow-2xl border-zinc-800 bg-zinc-900/90 backdrop-blur">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold tracking-tight text-white uppercase">Sign Up</CardTitle>
            <CardDescription className="text-base text-zinc-400">
              Join us in supporting our military service members
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading}
                  className="h-11 bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                />
              </div>

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

              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="age"
                    checked={isOver13}
                    onCheckedChange={(checked) => setIsOver13(checked === true)}
                    disabled={isLoading}
                    className="border-zinc-700"
                  />
                  <label htmlFor="age" className="text-sm leading-tight cursor-pointer text-zinc-300">
                    I confirm that I am 13 years of age or older (Required)
                  </label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                    disabled={isLoading}
                    className="border-zinc-700"
                  />
                  <label htmlFor="terms" className="text-sm leading-tight cursor-pointer text-zinc-300">
                    I agree to the{" "}
                    <Link href="/terms" target="_blank" className="text-cyan-400 hover:text-cyan-300 font-medium">
                      Terms of Service & Volunteer Agreement
                    </Link>{" "}
                    (Required)
                  </label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="privacy"
                    checked={agreedToPrivacy}
                    onCheckedChange={(checked) => setAgreedToPrivacy(checked === true)}
                    disabled={isLoading}
                    className="border-zinc-700"
                  />
                  <label htmlFor="privacy" className="text-sm leading-tight cursor-pointer text-zinc-300">
                    I agree to the{" "}
                    <Link href="/privacy" target="_blank" className="text-cyan-400 hover:text-cyan-300 font-medium">
                      Privacy Policy
                    </Link>{" "}
                    (Required)
                  </label>
                </div>

                <div className="bg-zinc-800/50 border border-zinc-700 p-3 rounded-lg text-xs text-zinc-400">
                  An 8-digit verification code will be sent to your email. By signing up, you become a volunteer and
                  agree to provide letters free of charge.
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/30 p-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-11 text-base font-semibold bg-cyan-500 hover:bg-cyan-600 text-black"
                disabled={isLoading || !isOver13}
              >
                {isLoading ? "Sending verification code..." : "Send Verification Code"}
              </Button>

              <div className="text-center text-sm text-zinc-400">
                Already have an account?{" "}
                <Link href="/auth/login" className="font-medium text-cyan-400 hover:text-cyan-300">
                  Sign In
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
