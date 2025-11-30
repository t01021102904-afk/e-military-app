import Link from "next/link"

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-black">
      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-white">
          <div className="space-y-4">
            <h3 className="font-bold text-xl uppercase tracking-wider">E-Mailitary</h3>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              A nonprofit volunteer platform delivering heartfelt letters to U.S. military service members
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold uppercase tracking-wider text-sm">Legal Information</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
                  Terms of Service & Volunteer Agreement
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold uppercase tracking-wider text-sm">Contact</h4>
            <p className="text-sm text-white/60">Email: williamp2904@gmail.com</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/60">
          <p className="uppercase tracking-wider">
            © 2025 E-Mailitary. All Rights Reserved. Nonprofit Volunteer Organization
          </p>
        </div>
      </div>
    </footer>
  )
}
