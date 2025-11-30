"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { submitLetter } from "@/app/actions/letter-actions"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export function LetterForm() {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [agreedToGuidelines, setAgreedToGuidelines] = useState(false)
  const router = useRouter()

  const charCount = content.trim().length
  const minChars = 500
  const maxChars = 5000
  const isValid = charCount >= minChars && charCount <= maxChars

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreedToGuidelines) {
      setError("Please agree to the letter writing guidelines")
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const result = await submitLetter(content)

      if (result.success) {
        router.push("/write/success")
      } else {
        setError(result.error || "Failed to submit letter")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-lg">
        <p className="text-sm text-cyan-300">
          <span className="font-semibold">Daily Limit:</span> You can write up to 5 letters per day to ensure quality
          and prevent spam.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="content" className="text-white">
          Your Letter
        </Label>
        <Textarea
          id="content"
          placeholder="Dear Service Member,&#10;&#10;Thank you for your service and sacrifice..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[400px] resize-none bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-500"
          disabled={isSubmitting}
        />
        <div className="flex justify-between items-center text-sm">
          <span className={charCount < minChars ? "text-gray-500" : "text-green-400"}>
            {charCount} / {minChars} characters (minimum)
          </span>
          <span className={charCount > maxChars ? "text-red-400" : "text-gray-500"}>
            {charCount} / {maxChars} characters (maximum)
          </span>
        </div>
      </div>

      <div className="flex items-start space-x-3 p-4 bg-white/10 rounded-lg border-2 border-white/30">
        <Checkbox
          id="guidelines"
          checked={agreedToGuidelines}
          onCheckedChange={(checked) => setAgreedToGuidelines(checked === true)}
          disabled={isSubmitting}
          className="border-white data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
        />
        <label htmlFor="guidelines" className="text-sm leading-tight cursor-pointer text-white font-medium">
          I have read the{" "}
          <Link href="/terms" target="_blank" className="text-cyan-400 hover:text-cyan-300 font-semibold underline">
            Letter Writing Guidelines
          </Link>{" "}
          and agree to provide my letter to E-Mailitary free of charge and have it delivered anonymously to U.S.
          military service members. I am participating voluntarily as a volunteer and will not request monetary
          compensation.
        </label>
      </div>

      {error && (
        <div className="p-4 bg-red-950/30 border border-red-500/50 rounded-lg">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={!isValid || isSubmitting || !agreedToGuidelines}
        className="w-full bg-cyan-500 hover:bg-cyan-600"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Letter"
        )}
      </Button>
    </form>
  )
}
