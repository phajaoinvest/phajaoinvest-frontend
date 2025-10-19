"use client"
import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/i18n"
import { TrendingUp, TrendingDown, ShoppingCart, ArrowLeft } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Mock RSI data
const oversoldStocks = [
  { symbol: "CMG", name: "Chipotle Mexican Grill, Inc.", rsi: 23.91, price: 38.62 },
  { symbol: "TTD", name: "The Trade Desk, Inc.", rsi: 24.9, price: 45.95 },
  { symbol: "LULU", name: "Lululemon Athletica Inc", rsi: 26.43, price: 160.09 },
  { symbol: "STZ", name: "Constellation Brands, Inc.", rsi: 27.26, price: 137.62 },
  { symbol: "SNPS", name: "Synopsys, Inc.", rsi: 28.31, price: 426.51 },
]

const overboughtStocks = [
  { symbol: "GOOGL", name: "Alphabet Inc. (Class A)", rsi: 84.37, price: 249.98 },
  { symbol: "GOOG", name: "Alphabet Inc Class C", rsi: 84.08, price: 249.46 },
  { symbol: "MU", name: "Micron Technology, Inc.", rsi: 79.73, price: 157.43 },
  { symbol: "BIDU", name: "Baidu, Inc.", rsi: 79.18, price: 115.04 },
  { symbol: "IREN", name: "IREN Ltd", rsi: 79.09, price: 35.22 },
  { symbol: "APP", name: "Applovin Corporation", rsi: 78.71, price: 586.07 },
]

export default function RSIAnalysisPage() {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-background via-muted/20 to-primary/5 py-8 mt-16">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                <h1 className="text-md font-bold">{t("rsi.title")}</h1>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push("/stock-analysis")}
                className="border hover:border-primary hover:bg-transparent"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {t("gainer.back")}
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="shadow-xl border border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <ShoppingCart className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm text-green-700 dark:text-green-300">{t("rsi.good_title")}</span>
                </CardTitle>
                <p className="text-sm text-green-600 dark:text-green-400 ml-12">
                  {t("rsi.good_des")}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {oversoldStocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="bg-white/80 dark:bg-gray-800/50 rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-green-200/50 dark:border-green-800/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-sm font-bold text-gray-900 dark:text-white">{stock.symbol}</h3>
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300">
                            {t("rsi.rsi")}: {stock.rsi}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-primary">{stock.price}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">USD</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-xl border border-red-500 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
                    <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <span className="text-sm text-red-700 dark:text-red-300">{t("rsi.bad_title")}</span>
                </CardTitle>
                <p className="text-sm text-red-600 dark:text-red-400 ml-12">
                  {t("rsi.bad_des")}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {overboughtStocks.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="bg-white/80 dark:bg-gray-800/50 rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer border border-red-200/50 dark:border-red-800/30"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-sm font-bold text-gray-900 dark:text-white">{stock.symbol}</h3>
                          <Badge className="bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300">
                            {t("rsi.rsi")}: {stock.rsi}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{stock.name}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-primary">{stock.price}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">USD</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                  <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    {t("rsi.warning_title")}
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                    {t("rsi.warning_des")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
