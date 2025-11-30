"use client"

import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import { LetterActions } from "./letter-actions"
import { ChevronDown, ChevronUp } from "lucide-react"

type Letter = {
  id: string
  content: string
  status: string
  created_at: string
  rejection_reason?: string
  user_id: string
  users?: {
    email: string
    display_name: string
  }
}

export function LettersManagement() {
  const [letters, setLetters] = useState<Letter[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedLetter, setExpandedLetter] = useState<string | null>(null)

  useEffect(() => {
    loadLetters()
  }, [])

  async function loadLetters() {
    const supabase = createClient()
    const { data } = await supabase
      .from("letters")
      .select(`
        *,
        users:user_id (email, display_name)
      `)
      .order("created_at", { ascending: false })
      .limit(100)

    if (data) {
      setLetters(data as Letter[])
    }
    setLoading(false)
  }

  const pendingLetters = letters.filter((l) => l.status === "pending")
  const approvedLetters = letters.filter((l) => l.status === "approved")
  const rejectedLetters = letters.filter((l) => l.status === "rejected")

  const toggleLetter = (letterId: string) => {
    setExpandedLetter(expandedLetter === letterId ? null : letterId)
  }

  const renderLetterCard = (letter: Letter) => {
    const isExpanded = expandedLetter === letter.id

    return (
      <Card key={letter.id} className="bg-zinc-900 border-zinc-800">
        <CardHeader
          className="cursor-pointer hover:bg-zinc-800/50 transition-colors"
          onClick={() => toggleLetter(letter.id)}
        >
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <CardTitle className="text-base text-white">
                  {letter.users?.display_name || letter.users?.email || "Unknown User"}
                </CardTitle>
                <Badge
                  variant={
                    letter.status === "pending" ? "secondary" : letter.status === "approved" ? "default" : "destructive"
                  }
                  className="text-xs"
                >
                  {letter.status}
                </Badge>
              </div>
              <p className="text-xs text-gray-400">
                {new Date(letter.created_at).toLocaleDateString()} {new Date(letter.created_at).toLocaleTimeString()}
              </p>
              <p className="text-sm text-gray-300 line-clamp-1">{letter.content.substring(0, 100)}...</p>
            </div>
            <div className="ml-4">
              {isExpanded ? (
                <ChevronUp className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-400" />
              )}
            </div>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="space-y-4 border-t border-zinc-800 pt-4">
            <div className="max-h-96 overflow-y-auto bg-zinc-950 p-4 rounded border border-zinc-800">
              <p className="text-sm text-gray-200 whitespace-pre-wrap">{letter.content}</p>
            </div>

            <div className="text-xs text-gray-400">
              <p>Character count: {letter.content.length}</p>
              <p>User ID: {letter.user_id}</p>
            </div>

            {letter.status === "rejected" && letter.rejection_reason && (
              <div className="p-3 bg-red-950/30 border border-red-900 rounded">
                <p className="text-sm text-red-400">
                  <strong>Rejection reason:</strong> {letter.rejection_reason}
                </p>
              </div>
            )}

            {letter.status === "pending" && <LetterActions letterId={letter.id} onUpdate={loadLetters} />}
          </CardContent>
        )}
      </Card>
    )
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Loading letters...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Pending Review</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{pendingLetters.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Approved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{approvedLetters.length}</div>
          </CardContent>
        </Card>
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-400">Rejected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{rejectedLetters.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="bg-zinc-900 border border-zinc-800">
          <TabsTrigger value="pending" className="data-[state=active]:bg-zinc-800">
            Pending Review ({pendingLetters.length})
          </TabsTrigger>
          <TabsTrigger value="approved" className="data-[state=active]:bg-zinc-800">
            Approved ({approvedLetters.length})
          </TabsTrigger>
          <TabsTrigger value="rejected" className="data-[state=active]:bg-zinc-800">
            Rejected ({rejectedLetters.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-3">
          {pendingLetters.length > 0 ? (
            pendingLetters.map(renderLetterCard)
          ) : (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="py-12 text-center">
                <p className="text-gray-400">No pending letters</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-3">
          {approvedLetters.length > 0 ? (
            approvedLetters.map(renderLetterCard)
          ) : (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="py-12 text-center">
                <p className="text-gray-400">No approved letters</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-3">
          {rejectedLetters.length > 0 ? (
            rejectedLetters.map(renderLetterCard)
          ) : (
            <Card className="bg-zinc-900 border-zinc-800">
              <CardContent className="py-12 text-center">
                <p className="text-gray-400">No rejected letters</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
