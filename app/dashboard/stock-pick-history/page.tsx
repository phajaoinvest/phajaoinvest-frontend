"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

// components:
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Pagination from "@/components/ui/pagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, Search, BarChart3, Loader, Calendar, ListFilter } from "lucide-react"

import useFilterMyStockPicks from "./hooks/useFilter"
import { useCustomerStore } from "@/app/store/useCustomerStore"
import { useFetchStockPickByCustomerId } from "./hooks/useFetch"
import EmptyPage from "@/components/ui/empty"

export default function StockPickHistoryPage() {
  const router = useRouter()
  const [endDate, setEndDate] = React.useState("")
  const [startDate, setStartDate] = React.useState("")
  const customer = useCustomerStore((state) => state.customer)

  const filter = useFilterMyStockPicks();
  const myStockPicks = useFetchStockPickByCustomerId({ filter: filter.data })

  useEffect(() => {
    if (!customer) {
      router.push("/auth/login")
    }
  }, [customer, router])

  if (!customer) {
    return <div>Loading...</div>
  }

  const handleSearchStockPicks = () => {
    router.push("/stock-picks")
  }

  if (myStockPicks.loading) {
    <div className="h-11/12 flex justify-center items-center min-h-[40vh]">
      <Loader className="w-6 h-6 animate-spin text-primary" />&nbsp; Loading...
    </div>
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <CardTitle className="text-lg font-semibold">My Stock Histories:</CardTitle>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
          <CardContent className="p-6">
            <div className="flex items-start justify-start flex-col space-y-1">
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Total Picks</p>
              <p className="text-md font-bold text-emerald-900 dark:text-emerald-100">12 stocks</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
          <CardContent className="p-6">
            <div className="flex items-start justify-start flex-col space-y-1">
              <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Winning Rate</p>
              <p className="text-md font-bold text-blue-900 dark:text-blue-100">75%</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
          <CardContent className="p-6">
            <div className="flex items-start justify-start flex-col space-y-1">
              <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Total Return</p>
              <p className="text-md font-bold text-purple-900 dark:text-purple-100">+$2,450</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
          <CardContent className="p-6">
            <div className="flex items-start justify-start flex-col space-y-1">
              <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Avg. Return</p>
              <p className="text-md font-bold text-orange-900 dark:text-orange-100">+4.2%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-0 shadow-lg">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-normal flex items-center">
              <BarChart3 className="h-4 w-4 mr-3 text-blue-600" />
              My Stock Pick History:
            </CardTitle>
            <div className="flex sm:hidden items-center justify-center gap-6">
              <ListFilter size={20} />
              <Search size={20} onClick={handleSearchStockPicks} />
            </div>
          </div>
          <div className="hidden sm:flex items-center justify-end gap-4">
            <div className="w-1/2 flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      filter.dispatch({
                        type: filter.ACTION_TYPE.START_DATE,
                        payload: e.target.value
                      })
                    }}
                    className="pl-10 border-0 bg-white/70 dark:bg-gray-800/70 shadow-sm"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      filter.dispatch({
                        type: filter.ACTION_TYPE.END_DATE,
                        payload: e.target.value
                      })
                    }}
                    className="pl-10 border-0 bg-white/70 dark:bg-gray-800/70 shadow-sm"
                  />
                </div>
              </div>
            </div>
            {startDate && endDate && <Button
              variant="outline"
              onClick={() => {
                setStartDate("")
                setEndDate("")
              }}
              className="text-sm bg-white/70 dark:bg-gray-800/70"
            >
              Clear
            </Button>}
            <div className="w-1/2 flex items-center justify-end">
              <Button
                onClick={handleSearchStockPicks}
                className="bg-primary shadow-lg text-white"
              >
                <Search className="h-4 w-4" />
                Browse Stock Picks
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {myStockPicks.loading &&
            <div className="h-11/12 flex justify-center items-center min-h-[40vh]">
              <Loader className="w-6 h-6 animate-spin text-primary" />&nbsp; Loading....
            </div>
          }
          <div className="space-y-0">
            {myStockPicks.data && myStockPicks.data.length > 0 ? myStockPicks.data.map((pick) => (
              <div
                key={pick.id}
                className="flex items-center justify-between p-2 sm:p-6 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 dark:hover:from-blue-950/10 dark:hover:to-indigo-950/10 transition-all duration-200 border-b last:border-b-0"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-bold text-sm">{pick.stock ? pick.stock : <span className="blur-sm select-none">Pending</span>}</p>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-xs font-medium text-muted-foreground">[{pick.company}]</span>
                    </div>
                    <div className="text-xs flex items-center space-x-3 text-muted-foreground mt-1">
                      <span>Buy date: &nbsp;{pick.date}</span>
                      <span>•</span>
                      <span className="font-medium">Buy Price: {pick.buyPrice}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-4">
                    <div className="space-y-1">
                      <p className="font-bold text-sm">{pick.currentPrice}</p>
                      <div
                        className={`flex items-center text-xs font-semibold ${pick.isPositive ? "text-emerald-600" : "text-red-500"}`}
                      >
                        {pick.isPositive ? (
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 mr-1" />
                        )}
                        {pick.change}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Badge
                        variant={pick.status === "Approved" ? "default" : "secondary"}
                        className={
                          pick.status === "Approved"
                            ? "text-xs bg-emerald-100 text-emerald-800 border-emerald-200 font-medium"
                            : "text-xs bg-gray-100 text-gray-800 border-gray-200 font-medium"
                        }
                      >
                        {pick.status}
                      </Badge>
                      <Badge variant="outline" className="w-auto text-xs font-medium">
                        {pick.recommendation}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )) :
              <EmptyPage
                title="Not found"
                description="No stock pick founded! Please pick some."
              />
            }
          </div>

          <div className="w-full flex items-center justify-end mb-4">
            <Pagination
              filter={filter.data}
              totalPage={Math.ceil(
                (myStockPicks.total ?? 0) / filter.data.limit
              )}
              onPageChange={(e) => {
                filter.dispatch({
                  type: filter.ACTION_TYPE.PAGE,
                  payload: e,
                });
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
