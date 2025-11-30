import { Heart, TrendingUp, Users, Smile } from "lucide-react"

export function LetterImpact() {
  const impacts = [
    {
      icon: Heart,
      title: "Reduces Loneliness",
      description: "Letters remind soldiers they are not forgotten",
    },
    {
      icon: TrendingUp,
      title: "Boosts Morale",
      description: "Encouragement from home strengthens mental resilience",
    },
    {
      icon: Users,
      title: "Provides Emotional Support",
      description: "Kind words offer comfort during difficult times",
    },
    {
      icon: Smile,
      title: "Creates Connection",
      description: "Letters bridge the gap between soldiers and civilians",
    },
  ]

  return (
    <section className="w-full py-20 md:py-32 bg-black border-t border-white/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-12 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white uppercase">
              Letter Impact
            </h2>
            <p className="mx-auto max-w-[700px] text-white/60 text-lg font-light tracking-wide">
              Why your letters matter
            </p>
          </div>

          <div className="w-full max-w-6xl grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-12">
            {impacts.map((impact, index) => (
              <div
                key={index}
                className="flex flex-col items-center space-y-4 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8 backdrop-blur-sm hover:border-accent/50 transition-all group"
              >
                <impact.icon className="h-12 w-12 text-accent group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-white uppercase tracking-wide">{impact.title}</h3>
                <p className="text-sm text-white/60 text-center font-light leading-relaxed">{impact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
