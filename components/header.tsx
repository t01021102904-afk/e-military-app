import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { UserMenu } from "@/components/user-menu"
import { BackButton } from "@/components/back-button"
import { Heart } from "lucide-react"

export async function Header() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let isAdmin = false
  if (user) {
    const { data: adminUser } = await supabase.from("admin_users").select("id").eq("id", user.id).maybeSingle()
    isAdmin = !!adminUser
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/90">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <BackButton />
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-white uppercase">E-Mailitary</span>
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="/#impact"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors uppercase tracking-wide"
          >
            Impact
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors uppercase tracking-wide"
          >
            How it Works
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors uppercase tracking-wide"
          >
            About Us
          </Link>
          <Link
            href="/news"
            className="text-sm font-medium text-white/70 hover:text-white transition-colors uppercase tracking-wide"
          >
            News
          </Link>

          <Button
            asChild
            size="sm"
            className="bg-accent text-black hover:bg-accent/90 font-semibold uppercase tracking-wide"
          >
            <a href="https://buy.stripe.com/dRm3cxak970lbXJbJ13ZK01" target="_blank" rel="noopener noreferrer">
              <Heart className="w-4 h-4 mr-2" />
              Donate
            </a>
          </Button>

          {user ? (
            <>
              <Link
                href="/write"
                className="text-sm font-medium text-white/70 hover:text-white transition-colors uppercase tracking-wide"
              >
                Write Letter
              </Link>
              {isAdmin && (
                <>
                  <Link
                    href="/admin"
                    className="text-sm font-medium text-white/70 hover:text-white transition-colors uppercase tracking-wide"
                  >
                    Admin
                  </Link>
                  <Link
                    href="/admin/settings"
                    className="text-sm font-medium text-white/70 hover:text-white transition-colors uppercase tracking-wide"
                  >
                    Settings
                  </Link>
                </>
              )}
              <UserMenu user={user} />
            </>
          ) : (
            <>
              <Button
                asChild
                size="sm"
                className="bg-white/10 text-white hover:bg-white/20 font-semibold uppercase tracking-wide border border-white/20"
              >
                <Link href="/auth/login">Login</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
