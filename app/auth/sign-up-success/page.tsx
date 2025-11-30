import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f1e8] p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-[#6b7c59]/20">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Mail className="h-16 w-16 text-[#6b7c59]" />
            </div>
            <CardTitle className="text-2xl text-center text-black">Check Your Email</CardTitle>
            <CardDescription className="text-center text-black/70">
              We have sent you a confirmation link
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-[#6b7c59]/10 border border-[#6b7c59]/30 rounded-lg p-4">
              <p className="text-sm text-center text-black leading-relaxed">
                Please check your email inbox and click the confirmation link to activate your account. Once confirmed,
                you can sign in and start writing letters to support our service members.
              </p>
            </div>

            <div className="space-y-2 text-center text-sm text-black/70">
              <p>Did not receive the email?</p>
              <ul className="list-disc list-inside space-y-1 text-left mx-auto max-w-xs">
                <li>Check your spam or junk folder</li>
                <li>Make sure you entered the correct email</li>
                <li>Wait a few minutes and check again</li>
              </ul>
            </div>

            <div className="flex justify-center pt-2">
              <Button
                asChild
                variant="outline"
                className="border-[#6b7c59]/30 text-[#6b7c59] hover:bg-[#6b7c59]/10 bg-transparent"
              >
                <Link href="/auth/login">Return to Sign In</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
