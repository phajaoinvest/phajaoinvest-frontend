"use client"

import Link from "next/link"
import { useState } from "react"

// components
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import EmptyPage from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import Pagination from "@/components/ui/pagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Globe,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Plus,
  File,
  Loader,
} from "lucide-react"
import { useCustomerStore } from "@/app/store/useCustomerStore"
import { IncompleteApplicationView } from "@/components/ui/complete-application"
import useFilterMyStockPicks from "../stock-pick-history/hooks/useFilter"
import { useFetchMyStockById } from "./hooks/useFetch"
import { useFetchMyStockTransactionById } from "./hooks/useFetchTransaction"
import { capitalizeFirstLetter } from "@/app/utils/functions/format-text"
import { formatDateDDMMYYYY } from "@/app/utils/functions/format-date"
import { formatMoney } from "@/app/utils/functions/format-number"

export default function InternationalStockPortfolioPage() {
  const [quantity, setQuantity] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedStock, setSelectedStock] = useState<any>(null)
  const [actionType, setActionType] = useState<"buy" | "sell">("buy")

  const customer = useCustomerStore((state) => state.customer);
  const filter = useFilterMyStockPicks();
  const myStocks = useFetchMyStockById({ filter: filter.data })
  const myStockTransactions = useFetchMyStockTransactionById({ filter: filter.data })

  console.log("My Stocks:::", myStocks);
  // console.log("My Stock Transactions:::", myStockTransactions);


  const portfolioOverview = {
    totalValue: "€19,036.75",
    totalInvested: "€18,500.00",
    totalProfit: "€536.75",
    profitPercentage: "+2.9%",
  }

  const handleAction = (stock: any, type: "buy" | "sell") => {
    setSelectedStock(stock)
    setActionType(type)
    setIsDialogOpen(true)
  }

  const handleSubmitAction = () => {
    setIsDialogOpen(false)
    setQuantity("")
  }

  const OverviewCards = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
        <CardContent className="p-3 sm:p-6">
          <div className="flex items-start justify-start flex-col space-y-1">
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Total Balance</p>
            <p className="text-md font-bold text-emerald-900 dark:text-emerald-100">{portfolioOverview.totalValue}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
        <CardContent className="p-3 sm:p-6">
          <div className="flex items-start justify-start flex-col space-y-1">
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total invested</p>
            <p className="text-md font-bold text-blue-900 dark:text-blue-100">{portfolioOverview.totalInvested}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
        <CardContent className="p-3 sm:p-6">
          <div className="flex items-start justify-start flex-col space-y-1">
            <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Total profit</p>
            <p className="text-md font-bold text-purple-900 dark:text-purple-100">{portfolioOverview.totalProfit}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
        <CardContent className="p-3 sm:p-6">
          <div className="flex items-start justify-start flex-col space-y-1">
            <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Profit (%)</p>
            <p className="text-md font-bold text-orange-900 dark:text-orange-100">{portfolioOverview.profitPercentage}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const hasStockAccount = customer?.services?.some(
    service => service.service_type === "international_stock_account"
  ) ?? false;

  return (
    <div className="space-y-8">
      {hasStockAccount ?
        <Card className="border-0 shadow-sm p-0 space-y-6">
          <CardHeader className="pb-4 p-0">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">My Stock Portfolio</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard/international-portfolio/top-up">
                    <Wallet className="h-4 w-4 mr-2" />
                    Add fund
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/dashboard/international-portfolio/buy-stock">
                    <Plus className="h-4 w-4" />
                    Buy Stock
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0 space-y-8">
            <OverviewCards />

            <Tabs defaultValue="holdings" className="w-full space-y-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="holdings">Holding Stock</TabsTrigger>
                <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
              </TabsList>

              <TabsContent value="holdings" className="space-y-4">
                {myStocks.loading &&
                  <div className="h-11/12 flex justify-center items-center min-h-[40vh]">
                    <Loader className="w-6 h-6 animate-spin text-primary" />&nbsp; Loading....
                  </div>
                }
                <div className="space-y-3">
                  {myStocks.data && myStocks.data.length > 0 ? myStocks.data.map((stock) => (
                    <div
                      key={stock.id}
                      className="flex flex-col sm:flex-row items-center gap-4 justify-between p-2 sm:p-6 hover:bg-muted/30 transition-colors border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Globe className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{stock.id}</span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{stock.name}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <span>Buy at: 11/10/2025</span>
                            <span>•</span>
                            <span>
                              {stock.shares} shares at {stock.currentPrice}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right space-y-1">
                          <p className="text-sm font-semibold">{stock.totalValue}</p>
                          <div
                            className={`flex items-center text-sm ${stock.isPositive ? "text-emerald-600" : "text-red-500"}`}
                          >
                            {stock.isPositive ? (
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3 mr-1" />
                            )}
                            {stock.change}
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                            onClick={() => handleAction(stock, "buy")}
                          >
                            BUY
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                            onClick={() => handleAction(stock, "sell")}
                          >
                            SELL
                          </Button>
                        </div>
                      </div>
                    </div>
                  )) :
                    <EmptyPage
                      title="Not found"
                      description="No holding stocks founded! Try to buy some please!"
                    />
                  }
                </div>
                <div className="w-full flex items-center justify-center sm:justify-end mb-4">
                  <Pagination
                    filter={filter.data}
                    totalPage={Math.ceil(
                      (myStocks.total ?? 0) / filter.data.limit
                    )}
                    onPageChange={(e) => {
                      filter.dispatch({
                        type: filter.ACTION_TYPE.PAGE,
                        payload: e,
                      });
                    }}
                  />
                </div>
              </TabsContent>

              <TabsContent value="transactions" className="space-y-4">
                {myStockTransactions.loading &&
                  <div className="h-11/12 flex justify-center items-center min-h-[40vh]">
                    <Loader className="w-6 h-6 animate-spin text-primary" />&nbsp; Loading....
                  </div>
                }
                <div className="space-y-3">
                  {myStockTransactions?.data && myStockTransactions?.data.length > 0 ? myStockTransactions?.data.map((transaction) => (
                    <Card key={transaction.id} className="border-0 shadow-sm">
                      <CardContent className="p-2 sm:p-4 border rounded-md">
                        <div className="flex flex-col sm:flex-row items-center justify-start sm:justify-between space-y-4">
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-10 h-5 rounded-full flex items-center justify-center`}
                            >
                              {transaction.payment_slip ?
                                <img src={transaction.payment_slip} alt={transaction.identify} />
                                :
                                <File />
                              }
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">
                                  {capitalizeFirstLetter(transaction.identify)}
                                </span>
                                <span>•</span>
                                <p className="text-xs text-muted-foreground">
                                  Created at:&nbsp;${formatDateDDMMYYYY(transaction.created_at)}
                                </p>
                              </div>
                              <Badge variant={transaction.status === "Aprroved" ? "default" : "secondary"} className="text-xs">
                                {capitalizeFirstLetter(transaction.status)}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-center sm:text-right space-y-2">
                            <p className="text-sm font-semibold">${formatMoney(transaction.amount)}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              Approved at:&nbsp;
                              <Calendar className="h-3 w-3 mr-1" />
                              {formatDateDDMMYYYY(transaction.updated_at)}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )) :
                    <EmptyPage
                      title="Not found"
                      description="No transaction history found! Please top up your wallet to buy stock!"
                    />
                  }
                </div>

                <div className="w-full flex items-center justify-center sm:justify-end mb-4">
                  <Pagination
                    filter={filter.data}
                    totalPage={Math.ceil(
                      (myStockTransactions.total ?? 0) / filter.data.limit
                    )}
                    onPageChange={(e) => {
                      filter.dispatch({
                        type: filter.ACTION_TYPE.PAGE,
                        payload: e,
                      });
                    }}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {actionType === "buy" ? "Buy More" : "Sell"} {selectedStock?.id}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Enter number of shares"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Current Price</Label>
                    <p className="text-lg font-semibold">{selectedStock?.currentPrice}</p>
                  </div>
                  {quantity && (
                    <div className="space-y-2">
                      <Label>Estimated Total</Label>
                      <p className="text-lg font-semibold">
                        {selectedStock?.currentPrice?.includes("€")
                          ? `€${(Number.parseFloat(selectedStock.currentPrice.replace("€", "")) * Number.parseInt(quantity)).toFixed(2)}`
                          : `$${(Number.parseFloat(selectedStock.currentPrice.replace("$", "")) * Number.parseInt(quantity)).toFixed(2)}`}
                      </p>
                    </div>
                  )}
                  <div className="flex space-x-2">
                    <Button onClick={handleSubmitAction} className="flex-1">
                      Submit {actionType === "buy" ? "Buy" : "Sell"} Request
                    </Button>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        :
        <IncompleteApplicationView url="/dashboard/application/stock-account" />
      }
    </div>
  )
}
