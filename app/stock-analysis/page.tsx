"use client"

import {
  Star,
  User,
  Mail,
  Users,
  Crown,
  Search,
  Shield,
  Rocket,
  Calendar,
  BarChart3,
  TrendingUp,
  TrendingDown,
  GraduationCap,
  AlertTriangle,
  // Lock,
  // ArrowRight,
} from "lucide-react"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { useCustomerStore } from "../store/useCustomerStore"
import { useTranslation } from "@/lib/i18n"

export default function StockAnalysisPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const customer = useCustomerStore((state) => state.customer);
  console.log("Customer:::", customer)
  const [userData] = useState({
    id: "1343",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    joinDate: "2024-01-15",
    subscriptionType: "Premium",
    subscriptionExpiry: "2024-12-15",
    membershipStatus: "Active",
  })
  const [stockSymbol, setStockSymbol] = useState("")

  const handleSearch = () => {
    if (stockSymbol.trim()) {
      router.push(`/stock-result/${stockSymbol.toUpperCase()}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  // if (!customer || customer === null) {
  //   return (
  //     <div className="min-h-screen flex flex-col">
  //       <Header />
  //       <main className="flex-1 bg-background flex items-center justify-center py-20 px-4">
  //         <div className="max-w-5xl w-full space-y-8">
  //           <div className="text-center space-y-2">
  //             <div className="inline-flex items-center justify-center w-10 h-10 rounded-2xl bg-yellow-500/10 relative">
  //               <div className="absolute inset-0 rounded-2xl bg-yellow-500/20 animate-pulse" />
  //               <Lock className="h-5 w-5 text-primary relative z-10" />
  //             </div>
  //             <h1 className="text-lg sm:text-xl font-bold mb-4 tracking-tight">{t("stock.analysis.success_title")}</h1>
  //             <p className="text-xs sm:text-sm text-muted-foreground mx-auto">
  //               {t("stock.analysis.success_description")}
  //             </p>
  //           </div>

  //           <Card className="border text-primary">
  //             <CardContent className="p-8 text-center">
  //               <h2 className="text-md sm:text-xl font-bold mb-3">{t("stock.analysis.ready_start")}</h2>
  //               <p className="text-xs sm:text-sm text-muted-foreground mb-8 max-w-xl mx-auto">
  //                 {t("stock.analysis.join_invest")}
  //               </p>
  //               <div className="flex gap-4 justify-center">
  //                 <Button
  //                   className="text-primary text-sm text-black font-semibold px-4 sm:px-8 h-10 group"
  //                   onClick={() => router.push("/auth/login")}
  //                 >
  //                   {t("news.sigin_to_continue")}
  //                   <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
  //                 </Button>
  //                 <Button
  //                   variant="outline"
  //                   className="h-10 px-4 sm:px-8 text-sm border-2 hover:bg-primary"
  //                   onClick={() => router.push("/auth/register")}
  //                 >
  //                   {t("news.create_account")}
  //                 </Button>
  //               </div>
  //             </CardContent>
  //           </Card>
  //         </div>
  //       </main>
  //       <Footer />
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-gradient-to-br from-background via-muted/20 to-primary/5 py-8 mt-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-start mb-12 border-b">
            <div className="flex items-center justify-start gap-3 mb-6">
              <div className="p-3 bg-primary/10 rounded-full">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-foreground">
                  {t("stock.stock_tool")}
                </h1>
                <p className="text-sm text-light text-muted-foreground mt-1">{t("stock.stock_tool_des")}</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-4 sm:gap-8">
            <div className="hidden sm:block lg:col-span-1 space-y-6">
              <Card className="sticky top-12 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-sm text-light">
                    <User className="h-4 w-4" />
                    {t('stock.user_profile')}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-md">
                      {userData.firstName} {userData.lastName}
                    </h3>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground truncate">{userData.email}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {t("stock.joined")}: {new Date(userData.joinDate).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Crown className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium text-yellow-600">{userData.subscriptionType} {t("stock.member")}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-green-500" />
                      <span className="text-green-600">{userData.membershipStatus}</span>
                    </div>

                    <div className="pt-2 border-t space-y-2">
                      <p className="text-xs text-muted-foreground">{t("stock.sub_expiry")}</p>
                      <p className="text-sm font-medium">
                        {new Date(userData.subscriptionExpiry).toLocaleDateString()}
                      </p>
                    </div>

                    {/* <div className="pt-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-2 h-11 bg-transparent"
                        onClick={() => router.push("/favorite-stocks")}
                      >
                        <Star className="h-4 w-4 text-yellow-500" />
                        {t("stock.favourite_stock")}
                      </Button>
                    </div> */}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3 space-y-2 sm:space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-md">
                    <Search className="h-4 w-4" />
                    {t("stock.stock_search")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Input
                      placeholder={t("stock.search_placeholder")}
                      value={stockSymbol}
                      onChange={(e) => setStockSymbol(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 h-10 text-lg"
                    />
                    <Button className="h-10 px-4" onClick={handleSearch}>
                      <Search className="h-4 w-4" />
                      {t("stock.search")}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-md">
                      <BarChart3 className="h-6 w-6 text-blue-500" />
                      {t("stock.market_overview")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3 h-16 text-left hover:border hover:border-primary hover:bg-transparent"
                      onClick={() => router.push("/top-gainers-losers")}
                    >
                      <BarChart3 className="h-5 w-5 text-green-500" />
                      <div className="space-y-2">
                        <div className="font-medium">{t("stock.gainer_loser")}11</div>
                        <div className="text-xs text-muted-foreground">{t("stock.gainer_loser_des")}</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3  h-16 text-left hover:border hover:border-primary hover:bg-transparent"
                      onClick={() => router.push("/rsi-analysis")}
                    >
                      <TrendingUp className="h-5 w-5 text-red-500" />
                      <div className="space-y-2">
                        <div className="font-medium">{t("stock.stock_rsi")}</div>
                        <div className="text-xs text-muted-foreground">{t("stock.stock_rsi_des")}</div>
                      </div>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3  h-16 text-left hover:border hover:border-primary hover:bg-transparent"
                      onClick={() => router.push("/low-support-pricing")}
                    >
                      <TrendingDown className="h-5 w-5 text-purple-500" />
                      <div className="space-y-2">
                        <div className="font-medium">{t("stock.support_pricing")}</div>
                        <div className="text-xs text-muted-foreground">{t("stock.support_pricing_des")}</div>
                      </div>
                    </Button>
                  </CardContent>
                </Card>

                {/* Other Services */}
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-md">
                      <Users className="h-6 w-6 text-green-500" />
                      {t("stock.another_service")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      variant="outline"
                      onClick={() => router.push("https://chat.whatsapp.com/CB4YHE60pvo2ySRGoMXP4R?mode=wwt")}
                      className="w-full justify-start gap-3 h-16 text-left hover:border hover:border-primary hover:bg-transparent"
                    >
                      <Users className="h-5 w-5 text-green-600" />
                      <div className="space-y-2">
                        <div className="font-medium">{t("stock.comunity")}</div>
                        <div className="text-xs text-muted-foreground">{t("stock.comunity_des")}</div>
                      </div>
                    </Button>
                    <div className="relative w-full">
                      <Button
                        variant="outline"
                        disabled
                        className="w-full justify-start gap-3 h-16 text-left 
                        opacity-60 blur-[1px] cursor-not-allowed 
                        hover:opacity-60 hover:blur-[1px] hover:border hover:border-transparent"
                      >
                        <GraduationCap className="h-5 w-5 text-orange-500" />
                        <div className="space-y-2">
                          <div className="font-medium">{t("stock.study_course")}</div>
                          <div className="text-xs text-muted-foreground">
                            {t("stock.study_course_des")}
                          </div>
                        </div>
                      </Button>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="bg-black/60 text-primary text-sm px-3 py-1 rounded-full animate-pulse">
                          Coming Soon....
                        </span>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              </div>

              {/* Warning Message */}
              <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-800 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                      <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">{t("stock.warning_title")}</h3>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 leading-relaxed">
                        {t("stock.warning_des")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
