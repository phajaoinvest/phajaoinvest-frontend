"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TrendingUp, DollarSign, Search, Clock, Target, Shield, Mail, Loader } from "lucide-react"

// components:
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Pagination from "@/components/ui/pagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// interface and lib:
import useFilterStockPicks from "@/lib/useFilterStockPick"
import { useFetchStockPicks } from "@/lib/useFetchStockPick"
import { trimDecimal } from "../utils/functions/format-number"
import { capitalizeFirstLetter } from "../utils/functions/format-text"

export default function StockPicksPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const filter = useFilterStockPicks();
  const fetchStockPicks = useFetchStockPicks({ filter: filter.data });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "budget":
        return "text-xs bg-green-100 text-green-800 border-green-200"
      case "premium":
        return "text-xs bg-blue-100 text-blue-800 border-blue-200"
      case "elite":
        return "text-xs bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "text-xs bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "text-green-600"
      case "medium":
        return "text-yellow-600"
      case "high":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="space-y-8 py-8 p-0">
        <section className="px-2 sm:px-4">
          <div className="sm:container mx-auto text-center space-y-2 sm:space-y-4">
            <h1 className="text-md sm:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-foreground">
              Premium Stock Picks Marketplace
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl mx-auto">
              Purchase individual stock recommendations from our expert analysts. Pay per pick and receive detailed
              analysis via email.
            </p>
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stack type..."
                  className="text-sm pl-10"
                  onChange={(e) => {
                    filter.dispatch({
                      type: filter.ACTION_TYPE.SECTOR,
                      payload: e.target.value,
                    });
                  }}
                />
              </div>
              <div>
                <Select
                  onValueChange={(value) => {
                    filter.dispatch({
                      type: filter.ACTION_TYPE.RISK_LEVEL,
                      payload: value,
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter Risk" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="low">Low risk</SelectItem>
                    <SelectItem value="medium">Medium risk</SelectItem>
                    <SelectItem value="high">High risk</SelectItem>
                  </SelectContent>
                </Select>

              </div>
            </div>
          </div>
        </section>

        <section className="px-2 sm:px-4">
          {fetchStockPicks.loading ?
            <div className="h-11/12 flex justify-center items-center min-h-[40vh]">
              <Loader className="w-6 h-6 animate-spin text-yellow-500" />&nbsp; Loading...
            </div>
            :
            <div className="sm:container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {fetchStockPicks.data.map((stock) => (
                  <Card key={stock.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <CardTitle className="text-md font-bold filter blur-sm select-none">*****</CardTitle>
                          <p className="text-sm text-muted-foreground filter blur-sm select-none">******</p>
                        </div>
                        <Badge className={getCategoryColor(stock.tier_label)}>
                          {capitalizeFirstLetter(stock.tier_label)}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <div className="text-xs text-muted-foreground">Sale price</div>
                          <div className="text-xl font-bold text-primary">${stock.sale_price}</div>
                        </div>
                        <div className="space-y-2">
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">Current</div>
                            <div className="text-xs font-semibold text-muted-foreground">${stock.current_price}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">Target</div>
                            <div className="text-xs font-semibold text-muted-foreground">${stock.target_price}</div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-xs text-muted-foreground leading-relaxed">{stock.description}</p>

                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-3 w-3 text-green-500" />
                          <span className="text-xs">{trimDecimal(stock.expected_return_min_percent)}% - {trimDecimal(stock.expected_return_max_percent)}%</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3 text-blue-500" />
                          <span className="text-xs">{stock.time_horizon_min_months}-{stock.time_horizon_max_months} months</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <Shield className={`h-3 w-3 ${getRiskColor(stock.risk_level)}`} />
                          <span className={getRiskColor(stock.risk_level)}>{capitalizeFirstLetter(stock.risk_level)} Risk</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-3 w-3 text-purple-500" />
                          <span className="text-xs">{stock.sector}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t">
                        <Button
                          className={`text-white w-full ${stock.is_selected ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-primary/90"}`}
                          disabled={stock.is_selected}
                          onClick={() => router.push(`/stock-pick-payment?id=${encodeURIComponent(stock.id)}&price=${encodeURIComponent(stock.sale_price)}`)}
                        >
                          {stock.is_selected ? "Already picked" : "Pick now"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="w-full flex items-center justify-center mb-4">
                <Pagination
                  filter={filter.data}
                  totalPage={Math.ceil(
                    (fetchStockPicks.total ?? 0) / filter.data.limit
                  )}
                  onPageChange={(e) => {
                    filter.dispatch({
                      type: filter.ACTION_TYPE.PAGE,
                      payload: e,
                    });
                  }}
                />
              </div>

              {fetchStockPicks.data.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No stock picks found matching your criteria.</p>
                </div>
              )}
            </div>
          }
        </section>


        {/* How It Works */}
        <section className="py-16 px-2 sm:px-4 bg-muted/30">
          <div className="sm:container mx-auto">
            <h2 className="text-md font-bold text-center mb-4 sm:mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Search className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold mb-2">1. Browse & Select</h3>
                  <p className="text-xs text-muted-foreground">
                    Browse our curated stock picks and select the ones that match your investment strategy.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold mb-2">2. Make Payment</h3>
                  <p className="text-xs text-muted-foreground">
                    Pay for individual stock analysis. Prices range from $25 to $200 based on complexity.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold mb-2">3. Receive Analysis</h3>
                  <p className="text-xs text-muted-foreground">
                    Get detailed stock analysis, entry points, and price targets delivered to your email.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
