"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteAccount } from "./actions"
import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"

export default function SettingsPage() {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleDeleteAccount = async () => {
    setIsDeleting(true)
    setError("")

    try {
      const result = await deleteAccount()

      if (result.error) {
        setError(result.error)
        setIsDeleting(false)
      } else {
        // Account deleted successfully, redirect to home
        router.push("/")
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      setIsDeleting(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Account Settings</h1>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Delete Account
          </CardTitle>
          <CardDescription>Permanently delete your account and all associated data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Once you delete your account, there is no going back. This action will:</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Permanently delete your account information</li>
              <li>Delete all letters you have written</li>
              <li>Remove all your data from our database</li>
            </ul>
            <p className="font-semibold mt-4">This action cannot be undone.</p>
          </div>

          {error && <div className="bg-destructive/10 text-destructive px-4 py-3 rounded-md text-sm">{error}</div>}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full" disabled={isDeleting}>
                {isDeleting ? "Deleting Account..." : "Delete My Account"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your account and remove all your data from
                  our servers, including all letters you have written.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Yes, Delete My Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  )
}
