"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateSiteSettings } from "@/app/actions/admin-actions"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export function SiteSettingsForm({
  initialTotalLetters,
  initialCurrentBatch,
  initialBatchGoal,
}: {
  initialTotalLetters: number
  initialCurrentBatch: number
  initialBatchGoal: number
}) {
  const [totalLetters, setTotalLetters] = useState(initialTotalLetters)
  const [currentBatch, setCurrentBatch] = useState(initialCurrentBatch)
  const [batchGoal, setBatchGoal] = useState(initialBatchGoal)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateSiteSettings({
        total_letters_delivered: totalLetters,
        current_batch_count: currentBatch,
        batch_goal: batchGoal,
      })
      router.refresh()
      alert("Settings updated successfully!")
    } catch (error) {
      console.error("Failed to update settings:", error)
      alert("Failed to update settings")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Impact Statistics</CardTitle>
        <CardDescription>Update the numbers displayed on the homepage</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="totalLetters">Total Letters Delivered</Label>
            <Input
              id="totalLetters"
              type="number"
              value={totalLetters}
              onChange={(e) => setTotalLetters(Number(e.target.value))}
              min="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentBatch">Current Batch Count</Label>
            <Input
              id="currentBatch"
              type="number"
              value={currentBatch}
              onChange={(e) => setCurrentBatch(Number(e.target.value))}
              min="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="batchGoal">Batch Goal</Label>
            <Input
              id="batchGoal"
              type="number"
              value={batchGoal}
              onChange={(e) => setBatchGoal(Number(e.target.value))}
              min="1"
            />
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Update Settings"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
