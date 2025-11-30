import { createClient } from "@/lib/supabase/server"

export async function Impact() {
  const supabase = await createClient()

  // Fetch site settings
  const { data: settings } = await supabase
    .from("site_settings")
    .select("key, value")
    .in("key", ["total_letters_delivered", "current_batch_count", "batch_goal"])

  const totalLetters = settings?.find((s) => s.key === "total_letters_delivered")?.value?.count || 0
  const currentBatch = settings?.find((s) => s.key === "current_batch_count")?.value?.count || 0
  const batchGoal = settings?.find((s) => s.key === "batch_goal")?.value?.count || 1000

  const progressPercentage = (currentBatch / batchGoal) * 100

  const { data: donationsData } = await supabase.from("donations").select("amount")
  const totalDonations = donationsData?.reduce((sum, donation) => sum + Number(donation.amount), 0) || 0

  return (
    <section className="w-full py-20 md:py-32 bg-black border-t border-white/10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-12 text-center">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-white uppercase">Impact</h2>
            <p className="mx-auto max-w-[700px] text-white/60 text-lg font-light tracking-wide">
              Together, we're making a difference in the lives of our troops
            </p>
          </div>

          <div className="w-full max-w-6xl grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-10 backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
              <div className="relative flex flex-col items-center space-y-3">
                <div className="text-6xl font-bold text-accent">{totalLetters.toLocaleString()}</div>
                <div className="text-sm font-medium text-white/60 uppercase tracking-wider">
                  Total Letters Delivered
                </div>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-10 backdrop-blur-sm">
              <div className="absolute top-0 left-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
              <div className="relative flex flex-col items-center space-y-4">
                <div className="text-6xl font-bold text-accent">
                  {currentBatch} / {batchGoal}
                </div>
                <div className="text-sm font-medium text-white/60 uppercase tracking-wider">Current Batch Progress</div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-accent h-2 rounded-full transition-all"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <p className="text-xs text-white/50 tracking-wide">Letters delivered in batches of {batchGoal}</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-10 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
              <div className="relative flex flex-col items-center space-y-3">
                <div className="text-6xl font-bold text-accent">
                  ${totalDonations.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="text-sm font-medium text-white/60 uppercase tracking-wider">Total Donations</div>
                <p className="text-xs text-white/50 tracking-wide">Supporting our mission</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
