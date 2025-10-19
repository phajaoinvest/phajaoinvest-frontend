"use client"

import { ArrowUpRight } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from "recharts"

import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function DashboardPage() {
  const investmentPortfolioData = [
    { month: "Jan", value: 45000, profit: 2000 },
    { month: "Feb", value: 48500, profit: 3500 },
    { month: "Mar", value: 52000, profit: 3500 },
    { month: "Apr", value: 49800, profit: -2200 },
    { month: "May", value: 54200, profit: 4400 },
    { month: "Jun", value: 58900, profit: 4700 },
    { month: "Jul", value: 62300, profit: 3400 },
    { month: "Aug", value: 67500, profit: 5200 },
    { month: "Sep", value: 67500, profit: 5200 },
    { month: "Oct", value: 67500, profit: 5200 },
    { month: "Nov", value: 67500, profit: 5200 },
    { month: "Dec", value: 67500, profit: 5200 },
  ]

  const internationalStockData = [
    { month: "Jan", value: 28000, profit: 1200 },
    { month: "Feb", value: 29500, profit: 1500 },
    { month: "Mar", value: 31200, profit: 1700 },
    { month: "Apr", value: 30100, profit: -1100 },
    { month: "May", value: 33400, profit: 3300 },
    { month: "Jun", value: 36800, profit: 3400 },
    { month: "Jul", value: 39200, profit: 2400 },
    { month: "Aug", value: 42500, profit: 3300 },
    { month: "Sep", value: 67500, profit: 5200 },
    { month: "Oct", value: 67500, profit: 5200 },
    { month: "Nov", value: 67500, profit: 5200 },
    { month: "Dec", value: 67500, profit: 5200 },
  ]

  const investmentGrowth = (
    ((investmentPortfolioData[investmentPortfolioData.length - 1].value - investmentPortfolioData[0].value) /
      investmentPortfolioData[0].value) *
    100
  ).toFixed(2)

  const internationalGrowth = (
    ((internationalStockData[internationalStockData.length - 1].value - internationalStockData[0].value) /
      internationalStockData[0].value) *
    100
  ).toFixed(2)

  return (
    <div className="space-y-6">
      <div className="grid gap-10 md:grid-cols-1">

        <Card className="border-0 shadow-sm space-y-4">
          <CardHeader className="p-0">
            <div className="flex items-start justify-between flex-col space-y-3">
              <div>
                <CardDescription className="mt-1">Investment portfolio performance</CardDescription>
              </div>
              <div className="flex items-center justify-start space-x-3">
                <div className="text-sm font-bold text-foreground">
                  ${investmentPortfolioData[investmentPortfolioData.length - 1].value.toLocaleString()}
                </div>
                <div className="flex items-center justify-end text-sm text-emerald-600">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="font-semibold">+{investmentGrowth}%</span>
                  <span className="text-muted-foreground ml-1">this year</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer
              config={{
                value: {
                  label: "Portfolio Value",
                  color: "hsl(var(--chart-1))",
                },
                profit: {
                  label: "Monthly Profit",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-[300px] sm:w-full"
            >
              <ResponsiveContainer width="100%" height="100%" className="-ml-8 sm:ml-0">
                <AreaChart data={investmentPortfolioData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value, name) => {
                          if (name === "value") {
                            return [`$${Number(value).toLocaleString()}`, "Portfolio Value"]
                          }
                          return [
                            `${Number(value) >= 0 ? "+" : ""}$${Number(value).toLocaleString()}`,
                            "Monthly Profit",
                          ]
                        }}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* International Stock Portfolio Growth Chart */}
        <Card className="border-0 shadow-sm space-y-4">
          <CardHeader className="p-0">
            <div className="flex items-start justify-between flex-col space-y-3">
              <div>
                <CardDescription className="mt-1">Global market investments performance</CardDescription>
              </div>
              <div className="flex items-center justify-start space-x-3">
                <div className="text-sm font-bold text-foreground">
                  ${internationalStockData[internationalStockData.length - 1].value.toLocaleString()}
                </div>
                <div className="flex items-center justify-end text-sm text-emerald-600 mt-1">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span className="font-semibold">+{internationalGrowth}%</span>
                  <span className="text-muted-foreground ml-1">this year</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ChartContainer
              config={{
                value: {
                  label: "Portfolio Value",
                  color: "hsl(var(--chart-3))",
                },
                profit: {
                  label: "Monthly Profit",
                  color: "hsl(var(--chart-4))",
                },
              }}
              className="h-[300px] sm:w-full"
            >
              <ResponsiveContainer width="100%" height="100%" className="-ml-8 sm:ml-0">
                <AreaChart data={internationalStockData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorInternational" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`} />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value, name) => {
                          if (name === "value") {
                            return [`$${Number(value).toLocaleString()}`, "Portfolio Value"]
                          }
                          return [
                            `${Number(value) >= 0 ? "+" : ""}$${Number(value).toLocaleString()}`,
                            "Monthly Profit",
                          ]
                        }}
                      />
                    }
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                    fill="url(#colorInternational)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
