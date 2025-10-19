"use client"

import { useRouter } from "next/navigation"
import { useTranslation } from "@/lib/i18n"
import { ArrowLeft, TrendingDown } from "lucide-react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const lowSupportStocks = [
  {
    symbol: "ABTC",
    name: "American Bitcoin Corp",
    currentPrice: 7.1,
    supportLevel: 7.65,
    difference: -7.19,
  },
  {
    symbol: "RNA",
    name: "Avidity Biosciences, Inc.",
    currentPrice: 41.74,
    supportLevel: 43.25,
    difference: -3.49,
  },
  {
    symbol: "COLL",
    name: "Collegium Pharmaceutical",
    currentPrice: 36.25,
    supportLevel: 37.25,
    difference: -2.68,
  },
  {
    symbol: "QS",
    name: "QuantumScape Corp",
    currentPrice: 9.5,
    supportLevel: 9.75,
    difference: -2.56,
  },
  {
    symbol: "AZN",
    name: "AstraZeneca PLC",
    currentPrice: 77.71,
    supportLevel: 79.25,
    difference: -1.94,
  },
  {
    symbol: "VKTX",
    name: "Viking Therapeutics",
    currentPrice: 24.03,
    supportLevel: 24.5,
    difference: -1.92,
  },
  {
    symbol: "NVDY",
    name: "NVIDIA Corporation",
    currentPrice: 16.06,
    supportLevel: 16.25,
    difference: -1.17,
  },
  {
    symbol: "CROX",
    name: "Crocs, Inc.",
    currentPrice: 76.6,
    supportLevel: 77.25,
    difference: -0.84,
  },
  {
    symbol: "ISRG",
    name: "Intuitive Surgical",
    currentPrice: 445.99,
    supportLevel: 449.0,
    difference: -0.67,
  },
  {
    symbol: "MTDR",
    name: "Matador Resources",
    currentPrice: 46.94,
    supportLevel: 47.25,
    difference: -0.66,
  },
  {
    symbol: "HOOD",
    name: "Robinhood Markets",
    currentPrice: 112.8,
    supportLevel: 113.5,
    difference: -0.62,
  },
  {
    symbol: "ABT",
    name: "Abbott Laboratories",
    currentPrice: 132.78,
    supportLevel: 133.5,
    difference: -0.54,
  },
]

export default function LowSupportPricingPage() {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-slate-900 py-8 mt-16">
        <div className="container mx-auto max-w-7xl px-4 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-900/30 rounded-full border border-red-800/50">
                  <TrendingDown className="h-4 w-4 text-red-400" />
                </div>
                <div>
                  <h1 className="text-md font-bold text-white">{t("lowsupport.title")}</h1>
                  <p className="text-sm text-slate-400">{t("lowsupport.des")}</p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => router.push("/stock-analysis")}
                className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("gainer.back")}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {lowSupportStocks.map((stock, index) => (
              <Card
                key={stock.symbol}
                className="group hover:shadow-2xl hover:shadow-red-500/20 transition-all duration-300 hover:-translate-y-1 bg-slate-800 border-slate-700 hover:border-red-500/50 cursor-pointer"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <CardContent className="p-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                        {stock.symbol}&nbsp;&nbsp;<span className="text-xs">({stock.name})</span>
                      </h3>
                      <div className="p-2 bg-red-900/30 rounded-full group-hover:bg-red-800/40 transition-colors border border-red-800/30">
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      </div>
                    </div>

                    <div className="space-y-1 pt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-400">{t("lowsupport.current_price")}:</span>
                        <span className="font-semibold text-sm text-white">{stock.currentPrice.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-400">{t("lowsupport.support_level")}:</span>
                        <span className="font-semibold text-sm text-white">{stock.supportLevel.toFixed(2)}</span>
                      </div>

                      <div className="border-t border-slate-700 pt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-red-400">{t("lowsupport.below_support")}:</span>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-red-400">{stock.difference.toFixed(2)}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-red-500 to-red-400 h-1.5 rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${Math.min(Math.abs(stock.difference) * 10, 100)}%`,
                            animationDelay: `${index * 150}ms`,
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500 mt-1">
                        <span>{t("lowsupport.support_level")}</span>
                        <span>{t("lowsupport.current_price")}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator />

          <Card className="mt-12 bg-slate-800 border-slate-700">
            <CardContent className="p-4 sm:p-8">
              <div className="text-center">
                <h2 className="text-lg font-bold text-red-400 mb-4">{t("lowsupport.summary_title")}</h2>
                <p className="text-md text-slate-300 max-w-3xl mx-auto leading-relaxed">
                  {t("lowsupport.summary_des")}
                </p>
                <div className="mt-6 flex justify-center gap-4 text-sm">
                  <div className="bg-slate-700/50 rounded-lg px-4 py-2 border border-slate-600">
                    <span className="font-semibold text-red-400">{t("lowsupport.total_stock")}: </span>
                    <span className="text-primary text-md font-bold">{lowSupportStocks.length}</span>
                  </div>
                  <div className="bg-slate-700/50 rounded-lg px-4 py-2 border border-slate-600">
                    <span className="font-semibold text-red-400">{t("lowsupport.avg")}: </span>
                    <span className="text-primary text-md font-bold">
                      {(
                        lowSupportStocks.reduce((sum, stock) => sum + Math.abs(stock.difference), 0) /
                        lowSupportStocks.length
                      ).toFixed(2)}
                      %
                    </span>
                  </div>
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
