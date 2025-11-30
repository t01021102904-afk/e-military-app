"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { approveLetter, rejectLetter } from "@/app/actions/admin-actions"
import { useRouter } from "next/navigation"
import { Check, X, Loader2 } from "lucide-react"

export function LetterActions({ letterId, onUpdate }: { letterId: string; onUpdate?: () => void }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [showRejectForm, setShowRejectForm] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleApprove = async () => {
    setIsProcessing(true)
    setError(null)

    try {
      const result = await approveLetter(letterId)
      if (result.success) {
        if (onUpdate) {
          onUpdate()
        } else {
          router.refresh()
        }
      } else {
        setError(result.error || "Failed to approve letter")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      setError("Please provide a reason for rejection")
      return
    }

    setIsProcessing(true)
    setError(null)

    try {
      const result = await rejectLetter(letterId, rejectionReason)
      if (result.success) {
        if (onUpdate) {
          onUpdate()
        } else {
          router.refresh()
        }
      } else {
        setError(result.error || "Failed to reject letter")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setIsProcessing(false)
    }
  }

  if (showRejectForm) {
    return (
      <div className="space-y-4 border-t border-zinc-800 pt-4">
        <div className="space-y-2">
          <Label htmlFor="rejection-reason" className="text-white">
            Rejection Reason
          </Label>
          <Textarea
            id="rejection-reason"
            placeholder="Explain why this letter cannot be approved..."
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            className="min-h-[100px] bg-zinc-950 border-zinc-800 text-white"
          />
        </div>
        {error && <p className="text-sm text-red-400">{error}</p>}
        <div className="flex gap-2">
          <Button onClick={handleReject} variant="destructive" disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Rejecting...
              </>
            ) : (
              "Confirm Rejection"
            )}
          </Button>
          <Button
            onClick={() => setShowRejectForm(false)}
            variant="outline"
            disabled={isProcessing}
            className="bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700"
          >
            Cancel
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2 border-t border-zinc-800 pt-4">
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="flex gap-2">
        <Button
          onClick={handleApprove}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Approve
            </>
          )}
        </Button>
        <Button
          onClick={() => setShowRejectForm(true)}
          variant="destructive"
          className="flex-1"
          disabled={isProcessing}
        >
          <X className="mr-2 h-4 w-4" />
          Reject
        </Button>
      </div>
    </div>
  )
}
