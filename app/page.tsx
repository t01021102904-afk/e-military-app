import { Header } from "@/components/header"
import { Hero } from "@/components/home/hero"
import { Impact } from "@/components/home/impact"
import { HowItWorks } from "@/components/home/how-it-works"
import { LetterImpact } from "@/components/home/letter-impact"
import { AdminSetupBanner } from "@/components/admin-setup-banner"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "E-Mailitary — Support Our Troops with Letters",
  description:
    "E-Mailitary is a nonprofit project connecting civilians with US military soldiers through heartfelt letters of encouragement. Write a letter today and make a difference.",
  alternates: {
    canonical: "https://www.e-mailitary.com",
  },
}

export default async function HomePage() {
  const supabase = await createClient()
  const { data: heroData } = await supabase.from("homepage_content").select("*").eq("section", "hero").single()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <AdminSetupBanner />
      <main className="flex-1">
        <Hero heroData={heroData} />
        <div id="impact">
          <Impact />
        </div>
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <LetterImpact />
      </main>
      <Footer />
    </div>
  )
}
