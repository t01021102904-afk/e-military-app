import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | E-Mailitary",
  description:
    "E-Mailitary is a nonprofit project connecting civilians with US military soldiers through heartfelt letters of encouragement. Read our Terms of Service and Volunteer Agreement.",
  alternates: {
    canonical: "https://www.e-mailitary.com/terms",
  },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/">
          <Button variant="ghost" className="mb-8">
            ← Back to Home
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-8 text-foreground">Terms of Service & Volunteer Agreement</h1>

        <div className="prose prose-lg max-w-none space-y-6 text-foreground">
          <p className="text-muted-foreground">Last Updated: January 2025</p>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Service Overview</h2>
            <p>
              E-Mailitary is a non-profit volunteer platform that enables volunteers to send letters of support and
              gratitude to United States military service members.
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>
                This service is <strong>free of charge</strong> and does not involve any monetary transactions.
              </li>
              <li>
                All participants engage as <strong>volunteers</strong> on a voluntary basis.
              </li>
              <li>Letters are reviewed by administrators and delivered to military bases in periodic batches.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Volunteer Agreement</h2>
            <p>By using E-Mailitary services, you agree to the following:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Voluntary Participation:</strong> You participate voluntarily as a volunteer and do not expect
                any monetary compensation.
              </li>
              <li>
                <strong>Content License:</strong> You grant E-Mailitary a royalty-free, non-exclusive, revocable license
                for the sole purpose of delivering and promoting military support initiatives through your submitted
                letters.
              </li>
              <li>
                <strong>Anonymity:</strong> Letters are delivered anonymously without including your personal
                information.
              </li>
              <li>
                <strong>Limitation of Liability:</strong> To the maximum extent permitted by law, E-Mailitary is not
                liable for delays, loss, or non-delivery of letters during the transmission process.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Letter Writing Guidelines</h2>
            <p>All volunteers must comply with the following guidelines:</p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Acceptable Content</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Messages of support, encouragement, and gratitude</li>
              <li>General life updates and well-wishes</li>
              <li>Positive motivational content</li>
              <li>General religious blessings (e.g., "God bless you," "Prayers for you")</li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Prohibited Content</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Political opinions, propaganda, or partisan content</li>
              <li>Religious proselytization or coercion</li>
              <li>Questions about military operations, classified information, or troop movements</li>
              <li>Sexual, explicit, or inappropriate content</li>
              <li>Requests for money or personal contact information</li>
              <li>Hate speech, discriminatory language, or harassment</li>
              <li>Profanity or vulgar language</li>
            </ul>

            <p className="mt-4">
              <strong>Minimum Length:</strong> Letters must be at least 500 characters (approximately 100 words).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Content Review and Approval</h2>
            <p>All letters undergo administrative review:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Letters violating guidelines may be rejected.</li>
              <li>Rejected letters may be revised and resubmitted.</li>
              <li>
                Approved letters may not be edited or deleted once they have been printed or distributed. However, users
                may request account deletion under applicable privacy laws.
              </li>
              <li>Administrators reserve the right to remove inappropriate content.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Account Suspension and Termination</h2>
            <p>Your account may be suspended or terminated if you:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide false information during registration</li>
              <li>Repeatedly violate content guidelines</li>
              <li>Abuse or disrupt the service</li>
              <li>Engage in defamatory or offensive behavior</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Disclaimer of Warranties</h2>
            <p>E-Mailitary is not responsible for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Delays or loss of letters during delivery</li>
              <li>Whether service members receive or read the letters</li>
              <li>Service interruptions or technical errors</li>
              <li>
                Third-party data breaches, to the maximum extent permitted by law (except in cases of willful misconduct
                or gross negligence by E-Mailitary)
              </li>
            </ul>
            <p className="mt-4">THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Intellectual Property</h2>
            <p>Submitted letter copyrights are handled as follows:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Authors grant E-Mailitary a royalty-free, non-exclusive, revocable license to use submitted letters
                solely for military support purposes.
              </li>
              <li>
                E-Mailitary may print, distribute, and use letters in promotional materials related to military support
                initiatives.
              </li>
              <li>Personal information is excluded; letters are used anonymously.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless E-Mailitary, its officers, volunteers, and agents from any
              claims, damages, or expenses arising from your use of the service or violation of these Terms.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">User Responsibility and Indemnification</h3>
            <p>
              Users are solely responsible for all activities related to their use of E-Mailitary services. If any
              financial loss occurs to E-Mailitary or its members due to a user's intentional or negligent actions, the
              user shall fully indemnify and compensate for such damages.
            </p>
            <p className="mt-4">
              If E-Mailitary becomes directly or indirectly involved in litigation, disputes, investigations, or other
              legal proceedings due to a user's actions, the user shall defend and hold E-Mailitary harmless, bearing
              all costs to ensure that E-Mailitary does not suffer legal or financial harm. This includes attorney fees,
              court costs, settlement amounts, and related expenses.
            </p>
            <p className="mt-4">
              For purposes of this clause, "E-Mailitary" includes the founder, officers, core leaders, and all
              individuals involved in organizational operations. Users have a duty to protect these individuals from
              personal property damages resulting from the user's actions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">9. Changes to Terms</h2>
            <p>
              E-Mailitary may modify these Terms as necessary. Changes will be posted on our website, and continued use
              of the service after changes constitutes acceptance of the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">10. Governing Law and Jurisdiction</h2>
            <p>
              These Terms are governed by the laws of the State of New York, USA, without regard to conflict of law
              principles. Any disputes arising under these Terms shall be resolved in the courts of New York.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">11. Donations</h2>
            <p>
              E-Mailitary accepts donations to support volunteer operations. By making a donation, you agree to the
              following:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Non-Profit Status:</strong> E-Mailitary is a volunteer organization. Donations are{" "}
                <strong>not tax-deductible</strong> as we are not a registered 501(c)(3) organization.
              </li>
              <li>
                <strong>Data Collection:</strong> We collect only your name and email address for the purpose of sending
                donation confirmation emails. No other personal information is collected.
              </li>
              <li>
                <strong>Payment Security:</strong> All payment information is securely processed by Stripe, our
                third-party payment processor. Payment details (credit card numbers, billing information) are{" "}
                <strong>never stored on our servers</strong>.
              </li>
              <li>
                <strong>No Refunds:</strong> All donations are final and <strong>non-refundable</strong>. Donations are
                immediately applied to operational costs for volunteer activities and cannot be canceled or refunded
                after payment is processed.
              </li>
              <li>
                <strong>Use of Funds:</strong> All donations are used immediately for operational purposes related to
                volunteer activities, including printing, postage, website maintenance, and administrative costs.
              </li>
              <li>
                <strong>Donation Account:</strong> Donations are received through a dedicated personal account used
                exclusively for receiving and managing donations. This account is separate from general operating funds
                and is used solely for donation receipts and organizational purposes.
              </li>
            </ul>

            <h3 className="text-xl font-semibold mt-6 mb-3">Donation Usage</h3>
            <p>Donations are used for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Printing Costs:</strong> Production of flyers, posters, informational materials, and other
                printed materials
              </li>
              <li>
                <strong>Personnel Costs:</strong> Project management, event coordination, volunteer management, and
                other necessary human resources
              </li>
              <li>
                <strong>Advertising and Promotion:</strong> Online advertising, social media promotion, offline
                promotional materials, etc.
              </li>
              <li>
                <strong>Website Development and Maintenance:</strong> Website creation, hosting, updates, and technical
                support
              </li>
              <li>
                <strong>Equipment and Supplies:</strong> Purchase of equipment and materials necessary for event
                operations and activities
              </li>
              <li>
                <strong>Operating Expenses:</strong> Domain costs, software subscription fees, communication costs, and
                other basic organizational operating expenses
              </li>
              <li>
                <strong>Education and Program Development:</strong> Workshops, seminars, community program creation,
                etc.
              </li>
              <li>
                <strong>Content Creation:</strong> Photography, videography, and other promotional and documentary
                content creation
              </li>
              <li>
                <strong>Design Outsourcing:</strong> Branding, poster design, material design, and other external
                designer services
              </li>
              <li>
                <strong>Volunteer Activity Supplies:</strong> Purchase of supplies and consumables necessary for
                volunteer activities
              </li>
            </ul>
            <p className="mt-4">
              Donations are executed transparently according to the above items and are used exclusively for activities
              aligned with the organization's purpose and community development.
            </p>

            <p className="mt-4">
              By clicking the Donate button, you acknowledge that you have read and agree to these donation terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">12. Contact Information</h2>
            <p>For questions about these Terms:</p>
            <ul className="list-none pl-0 space-y-2">
              <li>
                <strong>Email:</strong> williamp2904@gmail.com
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}
