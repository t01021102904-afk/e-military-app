import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            ← Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>

        <div className="prose prose-lg max-w-none space-y-6 text-foreground">
          <p className="text-muted-foreground">Last Updated: January 2025</p>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Introduction</h2>
            <p>
              E-Mailitary ("we," "us," or "our") operates as a volunteer-based non-profit organization. This Privacy
              Policy describes how we collect, use, and protect your personal information in accordance with applicable
              laws, including New York State law and federal regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Information We Collect</h2>
            <p>We collect minimal information necessary to provide our volunteer services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Required Information:</strong> Email address (for account creation and authentication), Full
                name (for personalization)
              </li>
              <li>
                <strong>Automatically Collected:</strong> Letter content, submission timestamps, IP addresses (for
                security and service improvement)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account authentication and user identification</li>
              <li>Letter writing and submission services</li>
              <li>Content moderation and filtering inappropriate content</li>
              <li>Service usage analytics and statistics</li>
              <li>Important service announcements via email (optional, only for critical updates)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Retention</h2>
            <p>
              We retain your personal information until you delete your account. Upon account deletion, your data is
              immediately removed from our systems. However, in accordance with applicable laws, certain information may
              be retained for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Abuse prevention records: 1 year (as required by law)</li>
              <li>Service usage logs: 3 months (for security purposes)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Information Sharing</h2>
            <p>E-Mailitary does not sell, rent, or share your personal information with third parties, except:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>When required by law or legal process</li>
              <li>To prevent imminent harm to life, health, or safety</li>
              <li>With your explicit consent</li>
            </ul>
            <p className="mt-4">
              <strong>Letter Delivery:</strong> Letters are printed anonymously and delivered to military bases. No
              personal information about the author (including email address or name) is included.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Your Rights Under US Law</h2>
            <p>You have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Right to access your personal information</li>
              <li>Right to correct inaccurate information</li>
              <li>Right to delete your personal information and request full account deletion</li>
              <li>Right to opt-out of certain data uses</li>
              <li>Right to data portability</li>
            </ul>
            <p className="mt-4">To exercise these rights, contact us at williamp2904@gmail.com</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Data Security</h2>
            <p>
              We implement industry-standard security measures including encryption, access controls, and regular
              security audits to protect your information. To the maximum extent permitted by law, we are not liable for
              unauthorized access resulting from third-party breaches beyond our reasonable control. However, no
              internet transmission is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Cookies</h2>
            <p>
              E-Mailitary uses essential cookies to maintain login sessions. Refusing cookies may limit service
              functionality. We do not use tracking or advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">9. Children's Privacy</h2>
            <p>
              Our service is not directed to individuals under 13 years of age. We do not knowingly collect personal
              information from children under 13. If we become aware of such collection, we will delete the information
              immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">10. Contact Information</h2>
            <p>For privacy-related inquiries, contact:</p>
            <ul className="list-none pl-0 space-y-2">
              <li>
                <strong>Organization:</strong> E-Mailitary
              </li>
              <li>
                <strong>Email:</strong> williamp2904@gmail.com
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will
              notify users of material changes through our website. Continued use of our service after changes indicates
              acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">12. Governing Law</h2>
            <p>
              This Privacy Policy is governed by the laws of the State of New York and applicable federal laws, without
              regard to conflict of law principles.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
