"use client"
import { useTranslation } from "@/lib/i18n"
import { useRouter } from "next/navigation"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { ArrowLeft, TrendingUp, TrendingDown, Lock, ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCustomerStore } from "../store/useCustomerStore"

const topGainers = [
  { symbol: "QS", name: "Quantumscape Corp", change: 10.45, price: 9.64 },
  { symbol: "ABTC", name: "American Bitcoin Corp", change: 9.37, price: 7.12 },
  { symbol: "BZ", name: "Kanzhun Limited", change: 7.54, price: 24.51 },
  { symbol: "NTES", name: "NetEase, Inc.", change: 6.21, price: 154.95 },
  { symbol: "IXHL", name: "Incannex Healthcare Inc", change: 6.16, price: 0.54 },
  { symbol: "IXHL", name: "Incannex Healthcare Inc", change: 6.16, price: 0.54 },
  { symbol: "IXHL", name: "Incannex Healthcare Inc", change: 6.16, price: 0.54 },
  { symbol: "IXHL", name: "Incannex Healthcare Inc", change: 6.16, price: 0.54 },
  { symbol: "IXHL", name: "Incannex Healthcare Inc", change: 6.16, price: 0.54 },
]

const topLosers = [
  { symbol: "CARM", name: "Carisma Therapeutics Inc", change: -8.81, price: 0.38 },
  { symbol: "GOOD", name: "Gladstone Commercial Corp", change: -6.89, price: 13.01 },
  { symbol: "RNA", name: "Avidity Biosciences, Inc.", change: -5.41, price: 42.15 },
  { symbol: "LXRX", name: "Lexicon Pharmaceuticals Inc", change: -5.1, price: 1.13 },
  { symbol: "TAL", name: "TAL Education Group", change: -4.84, price: 10.99 },
  { symbol: "TAL", name: "TAL Education Group", change: -4.84, price: 10.99 },
  { symbol: "TAL", name: "TAL Education Group", change: -4.84, price: 10.99 },
  { symbol: "TAL", name: "TAL Education Group", change: -4.84, price: 10.99 },
  { symbol: "TAL", name: "TAL Education Group", change: -4.84, price: 10.99 },
]

export default function TopGainersLosersPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const customer = useCustomerStore((state) => state.customer);
  const { ref: gainersRef, isVisible: gainersVisible } = useScrollAnimation({})
  const { ref: losersRef, isVisible: losersVisible } = useScrollAnimation({})


  if (!customer || customer === null) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 bg-background flex items-center justify-center py-20 px-4">
          <div className="max-w-5xl w-full space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-yellow-500/10 relative">
                <div className="absolute inset-0 rounded-2xl bg-yellow-500/20 animate-pulse" />
                <Lock className="h-5 w-5 text-primary relative z-10" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold mb-4 tracking-tight">{t("stock.analysis.success_title")}</h1>
              <p className="text-xs sm:text-sm text-muted-foreground mx-auto">
                {t("stock.analysis.success_description")}
              </p>
            </div>

            <Card className="border text-primary">
              <CardContent className="p-8 text-center">
                <h2 className="text-md sm:text-xl font-bold mb-3">{t("stock.analysis.ready_start")}</h2>
                <p className="text-xs sm:text-sm text-muted-foreground mb-8 max-w-xl mx-auto">
                  {t("stock.analysis.join_invest")}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button
                    className="text-primary text-sm text-black font-semibold px-4 sm:px-8 h-10 group"
                    onClick={() => router.push("/auth/login")}
                  >
                    {t("news.sigin_to_continue")}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    className="h-10 px-4 sm:px-8 text-sm border-2 hover:bg-primary"
                    onClick={() => router.push("/auth/register")}
                  >
                    {t("news.create_account")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-background via-muted/20 to-primary/5 py-8 mt-16">
        <div className="container mx-auto max-w-6xl px-2 sm:px-4 space-y-4">

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <div className="text-md">📈</div>
              <h1 className="text-md font-bold">{t("gainer.title")}</h1>
            </div>
            <Button variant="outline" onClick={() => router.push("/stock-analysis")} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t("gainer.back")}
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            <Card
              ref={gainersRef}
              className={`bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800 shadow-lg transition-all duration-700 ${gainersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-md text-green-700 dark:text-green-400">
                  <TrendingUp className="h-4 w-4" />
                  {t("gainer.top10")} &nbsp;🚀
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topGainers.map((stock, index) => (
                  <div
                    key={stock.symbol}
                    className={`bg-white/80 dark:bg-gray-900/40 rounded-lg p-3 border border-green-100 dark:border-green-800/50 hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${gainersVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                      }`}
                    style={{
                      transitionDelay: gainersVisible ? `${index * 100}ms` : "0ms",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-sm text-gray-900 dark:text-gray-100">{stock.symbol}</span>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 font-semibold">
                            +{stock.change}%
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-md font-bold text-gray-900 dark:text-gray-100">{stock.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card
              ref={losersRef}
              className={`bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20 border-red-200 dark:border-red-800 shadow-lg transition-all duration-700 ${losersVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-md text-red-700 dark:text-red-400">
                  <TrendingDown className="h-4 w-4" />
                  {t("loser.top10")} 💔
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topLosers.map((stock, index) => (
                  <div
                    key={stock.symbol}
                    className={`bg-white/80 dark:bg-gray-900/40 rounded-lg p-3 border border-red-100 dark:border-red-800/50 hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${losersVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
                      }`}
                    style={{
                      transitionDelay: losersVisible ? `${index * 100}ms` : "0ms",
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="font-bold text-sm text-gray-900 dark:text-gray-100">{stock.symbol}</span>
                          <Badge variant="destructive" className="font-semibold">
                            {stock.change}%
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-md font-bold text-gray-900 dark:text-gray-100">{stock.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
