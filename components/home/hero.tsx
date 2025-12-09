import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles } from "lucide-react"

type HeroData = {
  id: string
  section: string
  title: string | null
  content: string | null
  image_url: string | null
} | null

export function Hero({ heroData }: { heroData?: HeroData }) {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      {heroData?.image_url && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroData.image_url})` }}
        />
      )}

      {/* Animated radial background */}
      <div className="absolute inset-0 radial-lines opacity-30" />

      {/* Radiating lines effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-white/5 to-transparent"
            style={{
              transform: `rotate(${i * 15}deg)`,
              transformOrigin: "center center",
            }}
          />
        ))}
      </div>

      {/* Decorative stars */}
      <div className="absolute top-20 left-10 text-white/20 star-accent">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="absolute top-40 right-20 text-white/15 star-accent" style={{ animationDelay: "1s" }}>
        <Sparkles className="w-6 h-6" />
      </div>
      <div className="absolute bottom-32 left-1/4 text-white/10 star-accent" style={{ animationDelay: "2s" }}>
        <Sparkles className="w-10 h-10" />
      </div>
      <div className="absolute bottom-20 right-1/3 text-white/20 star-accent" style={{ animationDelay: "1.5s" }}>
        <Sparkles className="w-7 h-7" />
      </div>

      {/* Main content */}
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-3 max-w-4xl mb-4">
            <p className="text-lg md:text-xl text-cyan-400 font-semibold">Welcome to E-Mailitary</p>
            <p className="text-base md:text-lg text-white/80 font-light max-w-3xl mx-auto">
              E-Mailitary is a nonprofit writing project where anyone can send letters to U.S. service members. Our
              mission is to connect people with military heroes through kindness and encouragement.
            </p>
          </div>

          <div className="space-y-6 max-w-4xl">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl text-white">
              {heroData?.title || "E-Mailitary"}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/70 font-light tracking-wide max-w-3xl mx-auto">
              {heroData?.content || "Support Our Troops with Words of Encouragement"}
            </p>
            <p className="text-base md:text-lg text-white/50 font-light max-w-2xl mx-auto">
              Delivering heartfelt letters to US military soldiers. Write a letter today and make a real difference.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              asChild
              className="bg-accent text-black hover:bg-accent/90 font-semibold text-base px-8 py-6 uppercase tracking-wider"
            >
              <Link href="/write">Write a Letter</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/20 text-white hover:bg-white/10 hover:text-white font-semibold text-base px-8 py-6 uppercase tracking-wider bg-transparent"
            >
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  )
}
