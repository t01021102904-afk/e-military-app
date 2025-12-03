import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-2xl">
          <div className="flex flex-col items-center text-center space-y-6">
            <CheckCircle className="h-20 w-20 text-green-600" />

            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Letter Submitted Successfully!</h1>
              <p className="text-muted-foreground text-lg max-w-[600px]">
                Thank you for supporting our troops. Your letter will be reviewed by our volunteers and, once approved,
                will be printed and included in the next batch of 1,000 letters sent to military bases.
              </p>
            </div>

            <div className="bg-muted p-6 rounded-lg border max-w-md">
              <h3 className="font-semibold mb-2">What happens next?</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground text-left">
                <li>Volunteers review your letter for content guidelines</li>
                <li>Approved letters are professionally printed</li>
                <li>Letters are bundled in groups of 1,000</li>
                <li>Batches are shipped to military bases</li>
              </ol>
            </div>

            <div className="flex gap-4">
              <Button asChild>
                <Link href="/my-letters">View My Letters</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/write">Write Another Letter</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
