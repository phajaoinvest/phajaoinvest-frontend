"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Star, Plus, TrendingUp, BarChart3, Building2, Calendar, DollarSign, Newspaper } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Mock stock data
const mockStocks = {
  AAPL: {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 175.43,
    change: 2.34,
    changePercent: 1.35,
    volume: "45.2M",
    marketCap: "2.8T",
    pe: 28.5,
    high52: 198.23,
    low52: 124.17,
    rsi: 54.46,
    support1: 155.5,
    support2: 135.5,
    resistance: 190.0,
  },
  GOOGL: {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 138.21,
    change: -1.23,
    changePercent: -0.88,
    volume: "28.1M",
    marketCap: "1.7T",
    pe: 25.3,
    high52: 151.55,
    low52: 83.34,
    rsi: 45.32,
    support1: 125.0,
    support2: 110.0,
    resistance: 150.0,
  },
  TSLA: {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 248.5,
    change: 12.45,
    changePercent: 5.27,
    volume: "89.3M",
    marketCap: "789B",
    pe: 65.2,
    high52: 299.29,
    low52: 138.8,
    rsi: 67.89,
    support1: 220.0,
    support2: 200.0,
    resistance: 280.0,
  },
  MSFT: {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 378.85,
    change: 4.12,
    changePercent: 1.1,
    volume: "32.7M",
    marketCap: "2.8T",
    pe: 32.1,
    high52: 384.3,
    low52: 213.43,
    rsi: 58.21,
    support1: 350.0,
    support2: 320.0,
    resistance: 390.0,
  },
  PLTR: {
    symbol: "PLTR",
    name: "Palantir Technologies Inc.",
    price: 169.25,
    change: -2.93,
    changePercent: -1.73,
    volume: "52.8M",
    marketCap: "35.2B",
    pe: 45.8,
    high52: 185.5,
    low52: 95.3,
    rsi: 54.46,
    support1: 155.5,
    support2: 135.5,
    resistance: 190.0,
  },
}

export default function StockResultPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedPeriod, setSelectedPeriod] = useState("1M")
  const [activeAnalysis, setActiveAnalysis] = useState("summary")
  const [stockData, setStockData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const symbol = params.symbol as string

  useEffect(() => {
    // Simulate API call to fetch stock data
    const fetchStockData = () => {
      setLoading(true)
      setTimeout(() => {
        const data = mockStocks[symbol?.toUpperCase() as keyof typeof mockStocks]
        setStockData(data || null)
        setLoading(false)
      }, 500)
    }

    if (symbol) {
      fetchStockData()
    }
  }, [symbol])

  const periods = [
    { key: "1M", label: "1M" },
    { key: "6M", label: "6M" },
    { key: "YTD", label: "YTD" },
    { key: "1Y", label: "1Y" },
    { key: "5Y", label: "5Y" },
  ]

  const analysisButtons = [
    { key: "summary", label: "Company Summary", icon: Building2 },
    { key: "quarterly", label: "Quarterly Report", icon: Calendar },
    { key: "financial", label: "Financial Data", icon: DollarSign },
    { key: "returns", label: "Returns Analysis", icon: TrendingUp },
    { key: "news", label: "Latest News", icon: Newspaper },
  ]

  const renderAnalysisContent = () => {
    switch (activeAnalysis) {
      case "summary":
        return (
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-white mb-4">Company Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-slate-400 text-sm">Market Cap</p>
                <p className="text-white font-semibold">{stockData.marketCap}</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-slate-400 text-sm">P/E Ratio</p>
                <p className="text-white font-semibold">{stockData.pe}</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-slate-400 text-sm">52W High</p>
                <p className="text-white font-semibold">${stockData.high52}</p>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <p className="text-slate-400 text-sm">52W Low</p>
                <p className="text-white font-semibold">${stockData.low52}</p>
              </div>
            </div>
          </div>
        )
      case "quarterly":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Quarterly Report</h3>
            <div className="bg-slate-800 p-6 rounded-lg">
              <p className="text-slate-300">Quarterly financial data and earnings reports will be displayed here.</p>
            </div>
          </div>
        )
      case "financial":
        return (
          <div className="space-y-6">
            {/* Header with info icon */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-white">Income Statement</h3>
                <div className="w-5 h-5 rounded-full border border-slate-400 flex items-center justify-center">
                  <span className="text-xs text-slate-400">i</span>
                </div>
              </div>
              <div className="text-slate-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9,18 15,12 9,6"></polyline>
                  <path d="M13,5l5,4-5,4 5,4-5,4"></path>
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                </svg>
              </div>
            </div>

            {/* Financial metric tabs */}
            <div className="flex flex-wrap gap-2 mb-4">
              {["Total Revenue", "Gross Profit", "Operating Income", "Net Income"].map((metric, index) => (
                <button
                  key={metric}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${index === 0
                    ? "bg-slate-700 text-white border border-slate-600"
                    : "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                >
                  {metric}
                </button>
              ))}
            </div>

            {/* Period selector */}
            <div className="flex justify-end mb-6">
              <div className="flex items-center gap-2">
                <span className="text-slate-400 text-sm">Period:</span>
                <select className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-1 text-white text-sm">
                  <option>Quarterly</option>
                  <option>Annual</option>
                </select>
              </div>
            </div>

            {/* Chart container */}
            <div className="bg-transparent border border-slate-600 rounded-xl p-6">
              <div className="relative h-80">
                <svg className="w-full h-full" viewBox="0 0 400 300">
                  <defs>
                    <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.6" />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
                  <g stroke="#374151" strokeWidth="0.5" opacity="0.3">
                    <line x1="60" y1="50" x2="360" y2="50" />
                    <line x1="60" y1="100" x2="360" y2="100" />
                    <line x1="60" y1="150" x2="360" y2="150" />
                    <line x1="60" y1="200" x2="360" y2="200" />
                    <line x1="60" y1="250" x2="360" y2="250" />
                  </g>

                  {/* Revenue bars */}
                  <g>
                    <rect x="80" y="180" width="40" height="70" fill="url(#barGradient)" rx="2" />
                    <rect x="130" y="170" width="40" height="80" fill="url(#barGradient)" rx="2" />
                    <rect x="180" y="160" width="40" height="90" fill="url(#barGradient)" rx="2" />
                    <rect x="230" y="130" width="40" height="120" fill="url(#barGradient)" rx="2" />
                    <rect x="280" y="100" width="40" height="150" fill="url(#barGradient)" rx="2" />
                  </g>

                  {/* YoY growth line */}
                  <g>
                    <polyline
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="3"
                      points="100,200 150,195 200,190 250,160 300,140"
                      strokeLinecap="round"
                    />
                    {/* Data points */}
                    <circle cx="100" cy="200" r="4" fill="#F59E0B" />
                    <circle cx="150" cy="195" r="4" fill="#F59E0B" />
                    <circle cx="200" cy="190" r="4" fill="#F59E0B" />
                    <circle cx="250" cy="160" r="4" fill="#F59E0B" />
                    <circle cx="300" cy="140" r="4" fill="#F59E0B" />
                  </g>

                  {/* X-axis labels */}
                  <g fill="#9CA3AF" fontSize="12" textAnchor="middle">
                    <text x="100" y="275">
                      Q2 2024
                    </text>
                    <text x="150" y="275">
                      Q3 2024
                    </text>
                    <text x="200" y="275">
                      Q4 2024
                    </text>
                    <text x="250" y="275">
                      Q2 2025
                    </text>
                    <text x="300" y="275">
                      Q3 2025
                    </text>
                  </g>

                  {/* Y-axis labels */}
                  <g fill="#9CA3AF" fontSize="10" textAnchor="end">
                    <text x="55" y="55">
                      $1.2B
                    </text>
                    <text x="55" y="105">
                      $1.0B
                    </text>
                    <text x="55" y="155">
                      $800M
                    </text>
                    <text x="55" y="205">
                      $600M
                    </text>
                    <text x="55" y="255">
                      $400M
                    </text>
                  </g>
                </svg>

                {/* Revenue values below bars */}
                <div className="absolute bottom-12 left-0 right-0">
                  <div className="flex justify-center gap-8 text-xs">
                    <div className="text-center">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-white font-medium">$634.34M</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span className="text-green-400">+6.9%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-white font-medium">$678.13M</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span className="text-green-400">+7.0%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-white font-medium">$725.52M</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span className="text-green-400">+21.8%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-white font-medium">$883.86M</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span className="text-green-400">+13.6%</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-white font-medium">$1.00B</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <span className="text-green-400">+13.6%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="absolute bottom-2 left-6">
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-slate-300">Total Revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      <span className="text-slate-300">YoY (%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case "returns":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Returns Analysis</h3>
            <div className="bg-slate-800 p-6 rounded-lg">
              <p className="text-slate-300">Historical returns and performance analysis will be displayed here.</p>
            </div>
          </div>
        )
      case "news":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Latest News</h3>
            <div className="bg-slate-800 p-6 rounded-lg">
              <p className="text-slate-300">Recent news and market updates will be displayed here.</p>
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white mb-4">Select an Analysis</h3>
            <div className="bg-slate-800 p-6 rounded-lg">
              <p className="text-slate-300">
                Choose an analysis option from the left panel to view detailed information.
              </p>
            </div>
          </div>
        )
    }
  }

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto mb-4"></div>
            <p className="text-slate-300">Loading stock data...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!stockData) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Stock Not Found</h1>
            <p className="text-slate-300 mb-6">The stock symbol "{symbol}" was not found.</p>
            <Button onClick={() => router.back()} className="bg-amber-500 hover:bg-amber-600 text-black">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="min-h-screen p-4 mt-16">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-6">
            <Button
              variant="outline"
              onClick={() => router.push("/stock-analysis")}
              className="mb-4 text-white border rounded-md px-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
            <div className="lg:col-span-3">
              <div className="rounded-2xl shadow-2xl p-6 border sticky top-4">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg">
                      <TrendingUp className="h-4 w-4 text-black" />
                    </div>
                    <h1 className="text-lg font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                      Stock Pro Analytics
                    </h1>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm text-slate-300">Stock Info:</span>
                      <span className="text-md font-bold text-blue-500">{stockData.symbol}</span>
                    </div>

                    <div className="text-sm text-slate-300">
                      Price: <span className="font-medium text-amber-400">$500</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {analysisButtons.map((button) => {
                    const IconComponent = button.icon
                    return (
                      <Button
                        key={button.key}
                        variant="outline"
                        onClick={() => {
                          if (button.action) {
                            button.action()
                          } else {
                            setActiveAnalysis(button.key)
                          }
                        }}
                        className={`w-full h-12 justify-start ${activeAnalysis === button.key
                          ? "bg-amber-500 hover:bg-amber-600 text-black border-amber-500"
                          : "bg-transparent hover:bg-slate-800/50 border-slate-600 text-slate-200 hover:border-amber-500"
                          } rounded-xl transition-all duration-200`}
                      >
                        <IconComponent className="h-4 w-4 mr-3" />
                        {button.label}
                      </Button>
                    )
                  })}
                </div>

                <div className="space-y-2 mb-6">
                  <h4 className="text-sm text-slate-300 mb-3">Time Period</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {periods.map((period) => (
                      <Button
                        key={period.key}
                        variant={selectedPeriod === period.key ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedPeriod(period.key)}
                        className={
                          selectedPeriod === period.key
                            ? "bg-amber-500 hover:bg-amber-600 text-black rounded-lg font-medium"
                            : "bg-transparent hover:bg-slate-800/50 text-slate-200 border-slate-600 rounded-lg hover:border-amber-500"
                        }
                      >
                        {period.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    className="w-full bg-transparent hover:bg-slate-800/50 border-slate-600 text-slate-200 font-medium rounded-xl hover:border-amber-500 transition-all duration-200"
                  >
                    <Plus className="h-4 w-4" />
                    Add to favorites
                  </Button>
                  <Button
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium rounded-xl transition-all duration-200"
                    onClick={() => router.push("/favorite-stocks")}
                  >
                    <Star className="h-4 w-4" />
                    My Favorite
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Content - 70% width */}
            <div className="lg:col-span-7">
              <div className="space-y-6">
                {/* Chart Area */}
                <div className="rounded-2xl p-6 border">
                  {/* Price Label */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span className="text-sm font-medium text-white">Closing Price</span>
                  </div>

                  {/* Chart Area */}
                  <div className="relative h-80 rounded-lg border border-slate-600 p-4">
                    <div className="absolute inset-4">
                      {/* Chart simulation */}
                      <svg className="w-full h-full" viewBox="0 0 300 200">
                        <defs>
                          <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.1" />
                          </linearGradient>
                        </defs>

                        {/* Price line */}
                        <polyline
                          fill="none"
                          stroke="#60A5FA"
                          strokeWidth="3"
                          points="0,160 30,140 60,130 90,125 120,115 150,110 180,105 210,100 240,95 270,90 300,85"
                        />

                        {/* Area under curve */}
                        <polygon
                          fill="url(#chartGradient)"
                          points="0,200 0,160 30,140 60,130 90,125 120,115 150,110 180,105 210,100 240,95 270,90 300,85 300,200"
                        />

                        {/* Current price point */}
                        <circle cx="300" cy="85" r="5" fill="#F59E0B" />
                      </svg>

                      {/* Y-axis labels */}
                      <div className="absolute left-0 top-0 text-xs text-slate-400">200</div>
                      <div className="absolute left-0 top-1/2 text-xs text-slate-400">160</div>
                      <div className="absolute left-0 bottom-0 text-xs text-slate-400">80</div>

                      {/* X-axis labels */}
                      <div className="absolute bottom-0 left-0 text-xs text-slate-400">Oct 14</div>
                      <div className="absolute bottom-0 right-0 text-xs text-slate-400">Jan 15</div>
                      <div className="absolute bottom-0 left-1/3 text-xs text-slate-400">Nov 25</div>
                    </div>
                  </div>
                </div>

                {/* Analysis Content */}
                <div className="rounded-2xl p-6 border border-slate-600">{renderAnalysisContent()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
