import { Mail, FileCheck, Send } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: Mail,
      title: "Write",
      description: "Anyone can write a letter online to support our troops",
    },
    {
      icon: FileCheck,
      title: "We Review & Print",
      description: "Volunteers review and print approved letters",
    },
    {
      icon: Send,
      title: "Deliver",
      description: "Letters are bundled in groups of 1,000 and sent to military bases",
    },
  ]

  return (
    <section className="w-full py-20 md:py-32 bg-gradient-to-b from-black to-zinc-950 border-t border-white/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-12 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white uppercase">
              How It Works
            </h2>
            <p className="mx-auto max-w-[700px] text-white/60 text-lg font-light tracking-wide">
              Three simple steps to support our military
            </p>
          </div>

          <div className="w-full max-w-6xl grid gap-12 md:grid-cols-3 mt-12">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center space-y-6 text-center group">
                <div className="relative">
                  <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-accent text-black">
                    <step.icon className="h-10 w-10" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="text-sm font-bold text-accent uppercase tracking-widest">Step {index + 1}</div>
                  <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                  <p className="text-white/60 font-light tracking-wide">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
