import { Header } from "@/components/header"
import { LetterForm } from "@/components/write/letter-form"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Write a Letter - E-Mailitary",
  description: "Write a heartfelt letter to support US military troops. Your words of encouragement make a difference.",
  alternates: {
    canonical: "https://www.e-mailitary.com/write",
  },
}

export default async function WritePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-4xl px-6 py-12">
          <div className="space-y-8">
            <div className="space-y-3 text-center">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">Write a Letter to Our Troops</h1>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Your words of encouragement can make a real difference in a soldier's day. Share your support,
                gratitude, and positive thoughts.
              </p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-xl border border-cyan-500/30">
              <h3 className="font-semibold text-lg mb-3 text-cyan-400">Guidelines:</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>Minimum 500 characters required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>Be respectful and encouraging</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>Avoid political topics, military intelligence requests, or inappropriate content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>General blessings like "God bless you" or "Pray for you" are welcome</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span>No requests for money or personal information</span>
                </li>
              </ul>
            </div>

            <LetterForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
