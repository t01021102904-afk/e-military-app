import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About E-Mailitary - Support Our Troops",
  description:
    "Learn about E-Mailitary's mission to connect people with US military service members through heartfelt letters of support and encouragement.",
  alternates: {
    canonical: "https://www.e-mailitary.com/about",
  },
}

export default async function AboutPage() {
  const supabase = await createClient()
  const { data: aboutSection } = await supabase.from("homepage_content").select("*").eq("section", "about").single()

  const title = aboutSection?.title || "About E-Mailitary"
  const content = aboutSection?.content || ""
  const imageUrl = aboutSection?.image_url || "/images/b62b9c16-1194-419e-ac63-47e00a03b9b9-16615-0000073e36f106e0.jpg"

  // Split content into paragraphs
  const paragraphs = content.split("\n\n").filter((p) => p.trim().length > 0)

  return (
    <div className="flex min-h-screen flex-col bg-black">
      <Header />
      <main className="flex-1">
        <section className="w-full bg-black relative overflow-hidden">
          {/* Decorative stars */}
          <div className="absolute top-20 left-20 w-2 h-2 bg-white rounded-full animate-pulse" />
          <div
            className="absolute top-40 right-32 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-40 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          />

          <div className="container px-4 md:px-6 py-12">
            <div className="mx-auto max-w-5xl">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white mb-4">{title}</h1>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-5xl" role="img" aria-label="United States Flag">
                    🇺🇸
                  </span>
                  <span className="text-2xl text-white/60">🤝</span>
                  <span className="text-5xl" role="img" aria-label="South Korea Flag">
                    🇰🇷
                  </span>
                </div>
              </div>

              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-2xl border border-gray-800">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt="US and South Korean military forces joint training"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 bg-black relative">
          {/* Decorative elements */}
          <div className="absolute bottom-20 right-40 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <div
            className="absolute top-32 left-1/3 w-3 h-3 bg-white rounded-full animate-pulse"
            style={{ animationDelay: "1.5s" }}
          />

          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl space-y-8">
              <div className="prose prose-lg max-w-none space-y-6">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed text-gray-200 whitespace-pre-wrap">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex justify-center pt-6">
                <Button
                  size="lg"
                  asChild
                  className="text-lg px-8 py-6 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
                >
                  <Link href="/write">Write Your First Letter</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
