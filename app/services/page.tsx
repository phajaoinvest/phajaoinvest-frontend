"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Globe,
  TrendingUp,
  Star,
  CheckCircle,
  Shield,
  Award,
  BarChart3,
  Newspaper,
  Phone,
  Mail,
} from "lucide-react"

export default function ServicesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("membership")

  useEffect(() => {
    const tab = searchParams.get("tab")
    if (tab && ["membership", "international", "returns", "picks"].includes(tab)) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/services?tab=${value}`, { scroll: false })
  }

  const handleMembershipClick = () => {
    // For now, we'll assume user is not logged in and redirect to login
    // In a real app, you would check authentication status here
    const isLoggedIn = false // This would be replaced with actual auth check

    if (isLoggedIn) {
      router.push("/pricing")
    } else {
      router.push("/auth/login")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-8 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="container mx-auto text-center space-y-2">
            <h1 className="text-xl md:text-2xl font-bold text-primary">
              Our Premium Services
            </h1>
            <p className="text-md text-muted-foreground max-w-3xl mx-auto">
              Comprehensive investment solutions designed to maximize your returns and provide expert guidance for your
              financial success
            </p>
          </div>
        </section>

        {/* Services Tabs */}
        <section className="pb-16 px-4">
          <div className="container mx-auto">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="membership" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span className="hidden sm:inline">Membership</span>
                  <span className="sm:hidden">Membership</span>
                </TabsTrigger>
                <TabsTrigger value="international" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">International Account</span>
                  <span className="sm:hidden">International</span>
                </TabsTrigger>
                <TabsTrigger value="returns" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  <span className="hidden sm:inline">Guaranteed Returns</span>
                  <span className="sm:hidden">Returns</span>
                </TabsTrigger>
                <TabsTrigger value="picks" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span className="hidden sm:inline">Premium Stock Picks</span>
                  <span className="sm:hidden">Stock Picks</span>
                </TabsTrigger>
              </TabsList>

              {/* Premium Membership Tab */}
              <TabsContent value="membership" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-md font-bold">Membership</h2>
                        <p className="text-sm text-muted-foreground">Access exclusive market insights and analysis tools</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8 text-sm">
                      <p className="leading-relaxed">
                        Join our exclusive premium membership to gain access to the latest market news in Laos language
                        and utilize our advanced stock analysis tools. Our membership provides you with comprehensive
                        market insights, real-time data, and expert analysis to make informed investment decisions.
                      </p>
                      <p className="leading-relaxed">
                        As a premium member, you'll receive daily market updates, weekly analysis reports, and access to
                        our proprietary stock screening tools. Our team of financial experts provides in-depth market
                        commentary and investment recommendations tailored to the Laos market and international
                        opportunities.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Newspaper className="h-4 h-4 text-primary" />
                            <h4 className="text-md font-semibold">Daily News</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">Latest market news in Laos language</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="h-4 h-4 text-primary" />
                            <h4 className="text-md font-semibold">Analysis Tools</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">Advanced stock screening and analysis</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          What's Included
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">Daily market news and updates in Laos language</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">Access to advanced stock analysis tools</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">Weekly market analysis reports</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">Real-time market data and alerts</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">Expert investment commentary</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">Priority customer support</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md">Membership Benefits</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">24/7 Access</Badge>
                          <span className="text-sm">Round-the-clock platform access</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">Mobile App</Badge>
                          <span className="text-sm">iOS and Android applications</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">Expert Support</Badge>
                          <span className="text-sm">Direct access to financial advisors</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Button size="lg" className="w-auto" onClick={handleMembershipClick}>
                      Start Your Membership
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* International Stock Account Tab */}
              <TabsContent value="international" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Globe className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-md font-bold">International Stock Account</h2>
                        <p className="text-sm text-muted-foreground">Access global markets with ease</p>
                      </div>
                    </div>

                    <div className="text-sm space-y-4 mb-8">
                      <p className="leading-relaxed">
                        Open an international stock account with us to access global markets and expand your investment
                        portfolio beyond local boundaries. Our international trading platform provides seamless access
                        to major stock exchanges worldwide, including NYSE, NASDAQ, LSE, and Asian markets.
                      </p>
                      <p className="leading-relaxed">
                        We handle all the complex paperwork and regulatory requirements, making it easy for you to start
                        trading international stocks. Our platform supports multiple currencies and provides real-time
                        market data from global exchanges, ensuring you never miss an investment opportunity.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Globe className="h-4 w-4 text-primary" />
                            <h4 className="text-md font-semibold">Global Access</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">Trade on major international exchanges</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-primary" />
                            <h4 className="text-md font-semibold">Secure Trading</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">Bank-level security and compliance</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md flex items-center gap-2">
                          <Globe className="h-4 w-4 text-blue-500" />
                          Available Markets
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-sm">US Markets (NYSE, NASDAQ)</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-sm">European Markets (LSE, Euronext)</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-sm">Asian Markets (Tokyo, Hong Kong, Singapore)</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-sm">Australian Securities Exchange (ASX)</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-sm">Canadian Markets (TSX)</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md">Account Features</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">Multi-Currency</Badge>
                          <span className="text-sm">Support for USD, EUR, GBP, JPY</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">Low Fees</Badge>
                          <span className="text-sm">Competitive international trading fees</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">Fast Settlement</Badge>
                          <span className="text-sm">Quick trade settlement and clearing</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Button size="lg" className="w-auto" onClick={() => router.push("/international-account")}>
                      Open International Account
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Guaranteed Returns Tab */}
              <TabsContent value="returns" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-md font-bold">Guaranteed Returns</h2>
                        <p className="text-sm text-muted-foreground">
                          Professional investment management with guaranteed profits
                        </p>
                      </div>
                    </div>

                    <div className="text-sm space-y-4 mb-8">
                      <p className="leading-relaxed">
                        Invest your money with our expert team and enjoy guaranteed returns of more than 15% annually.
                        Our professional fund managers use advanced strategies, market analysis, and risk management
                        techniques to ensure consistent profits for our clients.
                      </p>
                      <p className="leading-relaxed">
                        We employ a diversified investment approach, combining growth stocks, dividend-paying
                        securities, and strategic market timing to maximize returns while minimizing risk. Our track
                        record speaks for itself, with consistent performance above market averages and guaranteed
                        minimum returns for all clients.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <TrendingUp className="h-4 h-4 text-primary" />
                            <h4 className="text-md font-semibold">15%+ Returns</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">Guaranteed minimum annual returns</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="h-4 h-4 text-primary" />
                            <h4 className="text-md font-semibold">Expert Management</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">Professional fund managers</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md flex items-center gap-2">
                          <TrendingUp className="h-4 h-4 text-green-500" />
                          Investment Strategy
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">Diversified portfolio management</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">Risk-adjusted return optimization</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">Active market monitoring and rebalancing</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">Quarterly performance reviews</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-4 text-green-500 mt-0.5" />
                          <span className="text-sm">Transparent reporting and analytics</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md">Investment Tiers</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">Bronze</Badge>
                          <span className="text-sm">$10,000 - $49,999 (15% returns)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">Silver</Badge>
                          <span className="text-sm">$50,000 - $99,999 (18% returns)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">Gold</Badge>
                          <span className="text-sm">$100,000+ (20% returns)</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Button size="lg" className="w-auto" onClick={() => router.push("/guaranteed-returns")}>
                      Start Investing Today
                    </Button>
                  </div>
                </div>
              </TabsContent>

              {/* Premium Stock Picks Tab */}
              <TabsContent value="picks" className="space-y-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Star className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-md font-bold">Premium Stock Picks</h2>
                        <p className="text-sm text-muted-foreground">Weekly curated stock recommendations for maximum profit</p>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8 text-sm">
                      <p className="leading-relaxed">
                        Receive weekly premium stock recommendations from our team of expert analysts. Our stock picks
                        are carefully researched and selected based on comprehensive fundamental and technical analysis,
                        market trends, and profit potential.
                      </p>
                      <p className="leading-relaxed">
                        Each week, we deliver 3-5 high-potential stock picks with detailed analysis, entry points,
                        target prices, and stop-loss levels. Our recommendations have consistently outperformed market
                        averages, providing our subscribers with exceptional returns and profitable trading
                        opportunities.
                      </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="h-4 h-4 text-primary" />
                            <h4 className="font-semibold">Weekly Picks</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">3-5 curated stock recommendations</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <BarChart3 className="h-4 h-4 text-primary" />
                            <h4 className="font-semibold">Detailed Analysis</h4>
                          </div>
                          <p className="text-sm text-muted-foreground">Complete research and price targets</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md flex items-center gap-2">
                          <Star className="h-4 h-4 text-yellow-500" />
                          What You Get
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-sm">3-5 premium stock picks every week</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-sm">Detailed fundamental and technical analysis</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-sm">Entry points and optimal timing</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-sm">Target prices and profit projections</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-sm">Risk management and stop-loss levels</span>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-3 w-3 text-green-500 mt-0.5" />
                          <span className="text-sm">Follow-up updates and exit strategies</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-md">Performance Track Record</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">85% Win Rate</Badge>
                          <span className="text-sm">Successful recommendations</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">32% Avg Return</Badge>
                          <span className="text-sm">Average profit per pick</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary">2-8 Weeks</Badge>
                          <span className="text-sm">Average holding period</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Button size="lg" className="w-auto" onClick={() => router.push("/stock-picks")}>
                      Browse Stock Picks
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto text-center space-y-4">
            <div>
              <h2 className="text-md font-bold">Ready to Get Started?</h2>
              <p className="text-sm text-muted-foreground mb-8 max-w-2xl mx-auto">
                Contact our team to learn more about our services and how we can help you achieve your investment goals.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Call Us Now
              </Button>
              <Button size="lg" variant="outline" className="flex items-center gap-2 bg-transparent">
                <Mail className="h-4 w-4" />
                Send Email
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
