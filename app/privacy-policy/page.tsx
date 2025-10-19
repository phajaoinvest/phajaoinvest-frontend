import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center text-white">Privacy Policy</h1>
          <div className="prose prose-gray max-w-none">
            <p className="text-white mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">1. Information We Collect</h2>
              <p className="mb-4 text-white">
                PhaJaoInvest collects information you provide directly to us, such as when you create an account, subscribe
                to our premium membership, or contact our support team. This includes:
              </p>
              <ul className="list-disc pl-6 mb-4 text-white">
                <li>Personal information (name, email address, phone number)</li>
                <li>Financial information for investment services</li>
                <li>Payment information for subscription processing</li>
                <li>Usage data and analytics for service improvement</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">2. How We Use Your Information</h2>
              <p className="mb-4 text-white">We use the information we collect to:</p>
              <ul className="list-disc pl-6 mb-4 text-white">
                <li>Provide stock analysis tools and investment recommendations</li>
                <li>Process premium membership subscriptions</li>
                <li>Facilitate international stock trading accounts</li>
                <li>Send market news and updates in Laos language</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">3. Information Sharing</h2>
              <p className="mb-4 text-white">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                consent, except as described in this policy. We may share information with:
              </p>
              <ul className="list-disc pl-6 mb-4 text-white">
                <li>Service providers who assist in our operations</li>
                <li>Financial institutions for trading account setup</li>
                <li>Regulatory authorities when required by law</li>
                <li>Professional advisors and auditors</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">4. Data Security</h2>
              <p className="mb-4 text-white">
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular
                security audits.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">5. Your Rights</h2>
              <p className="mb-4 text-white">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 text-white">
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability</li>
                <li>File complaints with regulatory authorities</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">6. Contact Us</h2>
              <p className="mb-4 text-white">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <ul className="list-none mb-4 text-white">
                <li>Email: privacy@PhaJaoInvest.la</li>
                <li>Phone: 020 78856194</li>
                <li>Address: Vientiane, Laos</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
