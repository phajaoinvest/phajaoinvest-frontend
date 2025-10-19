import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-black p-8 rounded-lg">
          <h1 className="text-4xl font-bold mb-8 text-center text-white">Terms of Service</h1>
          <div className="prose prose-gray max-w-none">
            <p className="text-white mb-6">Last updated: {new Date().toLocaleDateString()}</p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">1. Acceptance of Terms</h2>
              <p className="mb-4 text-white">
                By accessing and using PhaJaoInvest's services, you accept and agree to be bound by the terms and provision
                of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">2. Service Description</h2>
              <p className="mb-4 text-white">PhaJaoInvest provides the following services:</p>
              <ul className="list-disc pl-6 mb-4 text-white">
                <li>Premium membership with access to latest financial news in Laos language</li>
                <li>Stock analysis tools and market insights</li>
                <li>International stock trading account setup assistance</li>
                <li>Investment services with targeted returns above 15%</li>
                <li>Premium stock recommendations and market analysis</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">3. Subscription Terms</h2>
              <p className="mb-4 text-white">
                Premium memberships are available in 3, 6, and 12-month packages. All subscriptions:
              </p>
              <ul className="list-disc pl-6 mb-4 text-white">
                <li>Require upfront payment via bank transfer or QR code</li>
                <li>Are subject to admin approval after payment verification</li>
                <li>Provide access to all premium features during the subscription period</li>
                <li>Auto-expire at the end of the subscription term</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">4. Investment Disclaimer</h2>
              <p className="mb-4 text-white">
                <strong className="text-white">Important:</strong> All investment services carry inherent risks. While
                we target returns above 15%, past performance does not guarantee future results. You should:
              </p>
              <ul className="list-disc pl-6 mb-4 text-white">
                <li>Only invest money you can afford to lose</li>
                <li>Understand that all investments carry risk of loss</li>
                <li>Seek independent financial advice if needed</li>
                <li>Read all investment documentation carefully</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">5. Payment and Refunds</h2>
              <p className="mb-4 text-white">
                All payments must be made in advance. Refunds are not available once services have been activated,
                except in cases of service failure on our part. Payment verification may take 1-3 business days.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">6. User Responsibilities</h2>
              <p className="mb-4 text-white">Users agree to:</p>
              <ul className="list-disc pl-6 mb-4 text-white">
                <li>Provide accurate and complete information</li>
                <li>Maintain the confidentiality of account credentials</li>
                <li>Use services only for lawful purposes</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not share premium content with non-subscribers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">7. Limitation of Liability</h2>
              <p className="mb-4 text-white">
                PhaJaoInvest shall not be liable for any indirect, incidental, special, consequential, or punitive damages,
                including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">8. Contact Information</h2>
              <p className="mb-4 text-white">For questions about these Terms of Service, contact us at:</p>
              <ul className="list-none mb-4 text-white">
                <li>Email: legal@PhaJaoInvest.la</li>
                <li>Phone: 020 78856194</li>
                <li>WhatsApp: +856 20 5555 0123</li>
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
