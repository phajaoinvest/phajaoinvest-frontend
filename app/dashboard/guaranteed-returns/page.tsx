"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowUpRight, Calendar, Plus, ListFilter, DollarSign, Clock, Loader } from "lucide-react"

// components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Pagination from "@/components/ui/pagination"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IncompleteApplicationView } from "@/components/ui/complete-application"

import { useCustomerStore } from "@/app/store/useCustomerStore"
import { useFetchInvestmentCustomerId } from "./hooks/useFetch"
import useFilterMyStockPicks from "../stock-pick-history/hooks/useFilter"
import { Badge } from "@/components/ui/badge"
import EmptyPage from "@/components/ui/empty"
import { queryData } from "@/app/api/api"
import { InvestmentSummaryOverviewResponse } from "@/interfaces/invest"
import { formatMoney } from "@/app/utils/functions/format-number"

export default function InvestmentPortfolioPage() {
   const router = useRouter()
   const customer = useCustomerStore((state) => state.customer);
   const [investmentOverview, setInvestmentOverview] = React.useState<InvestmentSummaryOverviewResponse | null>(null);

   const filter = useFilterMyStockPicks();
   const myInvestments = useFetchInvestmentCustomerId({ filter: filter.data })


   const fetchInvestmentOverview = async () => {
      try {
         const res = await queryData({
            url: "/investment-requests/my-summary",
         });
         if (res.status_code === 200) {
            setInvestmentOverview(res.data);
         }
      } catch (error: any) {
         console.log("Fetch 7 angle failed!", error)
      }
   };

   useEffect(() => {
      fetchInvestmentOverview();
   }, []);

   useEffect(() => {
      if (!customer) {
         router.push("/auth/login")
      }
   }, [customer, router])

   if (!customer) {
      return <div>Loading...</div>
   }

   const handleNewInvestment = () => {
      router.push("/dashboard/guaranteed-returns/add-new")
   }

   const hasInvestAccount = customer?.services?.some(
      service => service.service_type === "guaranteed_returns"
   ) ?? false;

   return (
      <div className="space-y-8">
         {hasInvestAccount ?
            <div className="space-y-4 sm:space-y-6">
               <Card className="border-0 shadow-sm space-y-1 sm:space-y-4">
                  <CardHeader className="px-0">
                     <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold">Investment Portfolio Overview:</CardTitle>
                        <Button variant="outline" size="sm" onClick={handleNewInvestment} className="text-primary border border-primary hover:bg-primary">
                           <Plus />New Investment
                        </Button>
                     </div>
                  </CardHeader>
                  <CardContent className="px-0">
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                        <Card className="border-0 shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20">
                           <CardContent className="p-3 sm:p-6">
                              <div className="flex items-start justify-start flex-col space-y-1">
                                 <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Total Balance</p>
                                 <p className="text-md font-bold text-emerald-900 dark:text-emerald-100">${formatMoney(investmentOverview?.total_current_balance ?? "")}</p>
                              </div>
                           </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
                           <CardContent className="p-3 sm:p-6">
                              <div className="flex items-start justify-start flex-col space-y-1">
                                 <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total invested</p>
                                 <p className="text-md font-bold text-blue-900 dark:text-blue-100">${formatMoney(investmentOverview?.total_original_investment ?? "")}</p>
                              </div>
                           </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                           <CardContent className="p-3 sm:p-6">
                              <div className="flex items-start justify-start flex-col space-y-1">
                                 <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Total profit</p>
                                 <p className="text-md font-bold text-purple-900 dark:text-purple-100">${formatMoney(investmentOverview?.total_interest_earned ?? "")}</p>
                              </div>
                           </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
                           <CardContent className="p-3 sm:p-6">
                              <div className="flex items-start justify-start flex-col space-y-1">
                                 <p className="text-sm font-medium text-orange-700 dark:text-orange-300">Profit (%)</p>
                                 <p className="text-md font-bold text-orange-900 dark:text-orange-100">{investmentOverview?.active_investments} invests</p>
                              </div>
                           </CardContent>
                        </Card>
                     </div>
                  </CardContent>
               </Card>

               <div className="w-full hidden sm:flex flex-col sm:flex-row items-center justify-between">
                  <div className="flex items-center justify-start mb-4 gap-2">
                     <ListFilter size={16} />
                     <h2 className="text-sm font-semibold">Filter your investment by:</h2>
                  </div>
                  <div className="w-1/2 flex items-center gap-4">
                     <div className="flex-1">
                        <div className="relative">
                           <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                           <Input
                              type="date"
                              onChange={(e) => {
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
                              onChange={(e) => {
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
               </div>

               <Card className="border-0 shadow-sm">
                  <CardContent className="p-0">
                     {myInvestments.loading &&
                        <div className="h-11/12 flex justify-center items-center min-h-[40vh]">
                           <Loader className="w-6 h-6 animate-spin text-primary" />&nbsp; Loading....
                        </div>
                     }
                     <div className="grid gap-6">
                        {myInvestments.data && myInvestments.data.length > 0 ? myInvestments.data.map((investment) => (
                           <Card key={investment.id} className="border hover:shadow-md transition-shadow">
                              <CardContent className="p-4 space-y-4">
                                 <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-3 space-y1">
                                       <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                          <DollarSign className="h-5 w-5 text-primary" />
                                       </div>
                                       <div>
                                          <h3 className="font-semibold text-sm">{investment.id}</h3>
                                          <Badge
                                             variant={investment.status === "Completed" ? "default" : "secondary"}
                                             className={
                                                investment.status === "Completed"
                                                   ? "bg-green-100 text-green-800"
                                                   : "bg-blue-100 text-blue-800"
                                             }
                                          >
                                             {investment.status}
                                          </Badge>
                                       </div>
                                    </div>
                                    <div className="text-right space-y-1">
                                       <p className="text-md font-bold">{investment.amountInvested}</p>
                                       <p className="text-sm text-muted-foreground">Amount Invested</p>
                                    </div>
                                 </div>

                                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="flex items-start space-x-2">
                                       <Calendar className="h-4 w-4 text-muted-foreground" />
                                       <div className="space-y-1">
                                          <p className="text-sm font-medium">Investment Date</p>
                                          <p className="text-xs text-muted-foreground">{investment.investDate}</p>
                                       </div>
                                    </div>

                                    <div className="flex items-start space-x-2">
                                       <Clock className="h-4 w-4 text-muted-foreground" />
                                       <div className="space-y-1">
                                          <p className="text-sm font-medium">Duration</p>
                                          <p className="text-sm text-muted-foreground">{investment.duration}</p>
                                       </div>
                                    </div>

                                    <div className="flex items-start space-x-2">
                                       <Calendar className="h-4 w-4 text-muted-foreground" />
                                       <div className="space-y-1">
                                          <p className="text-sm font-medium">Maturity Date</p>
                                          <p className="text-sm text-muted-foreground">{investment.maturityDate}</p>
                                       </div>
                                    </div>

                                    <div className="flex items-start space-x-2">
                                       <ArrowUpRight className="h-4 w-4 text-green-600" />
                                       <div className="space-y-1">
                                          <p className="text-sm font-medium">Total Profit</p>
                                          <div className="flex items-center space-x-1">
                                             <p className="text-sm font-semibold text-green-600">{investment.totalProfit}</p>
                                             <span className="text-xs text-green-600">({investment.returnRate})</span>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </CardContent>
                           </Card>
                        )) :
                           <EmptyPage
                              title="Not found"
                              description="No investment history found! Invest now to see your investments here."
                           />
                        }
                     </div>

                     <div className="w-full flex items-center justify-end mb-4">
                        <Pagination
                           filter={filter.data}
                           totalPage={Math.ceil(
                              (myInvestments.total ?? 0) / filter.data.limit
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
            :
            <IncompleteApplicationView url="/dashboard/application/return-invest" />
         }
      </div>
   )
}
