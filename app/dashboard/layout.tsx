"use client"

import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Crown, TrendingUp, DollarSign, Settings, LogOut, Wallet, Target } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/lib/auth-context"
import { usePathname } from "next/navigation"
import { useCustomerStore } from "../store/useCustomerStore"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const { logout } = useAuth()
  const pathname = usePathname()
  const clearCustomer = useCustomerStore((state) => state.clearCustomer);
  const customer = useCustomerStore((state) => state.customer);

  if (!customer) {
    return <div>Loading...</div>
  }

  const sidebarItems = [
    { icon: User, label: "Dashboard", href: "/dashboard" },
    { icon: Crown, label: "Membership", href: "/dashboard/membership" },
    { icon: TrendingUp, label: "My investment", href: "/dashboard/guaranteed-returns" },
    { icon: DollarSign, label: "My stock", href: "/dashboard/international-portfolio" },
    { icon: Target, label: "Stock pick history", href: "/dashboard/stock-pick-history" },
  ]

  const mobileSidebarItems = [
    { icon: User, label: "Home", href: "/dashboard" },
    { icon: Crown, label: "Member", href: "/dashboard/membership" },
    { icon: TrendingUp, label: "Investment", href: "/dashboard/guaranteed-returns" },
    { icon: DollarSign, label: "Stock Portfolio", href: "/dashboard/international-portfolio" },
    { icon: Target, label: "Stock Picks", href: "/dashboard/stock-pick-history" },
  ]

  const handleSignOut = () => {
    logout()
    clearCustomer()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-2 sm:px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0 sm:gap-8">
          <div className="lg:col-span-1 space-y-0 sm:space-y-6">
            <div className="sticky top-4">
              <Card className="hidden lg:block border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <Avatar className="h-16 w-16 mx-auto mb-4 ring-4 ring-primary/20">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" alt={customer.username} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                        {customer.username
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">{customer.username}</h3>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                  </div>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full bg-primary" size="sm" asChild>
                      <Link href="/dashboard/account-settings">
                        <Settings className="h-4 w-4 mr-2" />
                        Account Settings
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-0">
                  <nav className="hidden lg:block space-y-1">
                    {sidebarItems.map((item, index) => {
                      const IconComponent = item.icon
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={index}
                          href={item.href}
                          className={`flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 border-l-4 ${isActive
                            ? "bg-slate-100 border-slate-600 text-slate-900 font-medium"
                            : "border-transparent hover:bg-muted/50 hover:border-muted-foreground/20"
                            }`}
                        >
                          <IconComponent className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      )
                    })}
                    <button
                      onClick={handleSignOut}
                      className="flex items-center space-x-3 px-4 py-3 text-sm transition-all duration-200 border-l-4 border-transparent hover:bg-muted/50 hover:border-muted-foreground/20 w-full text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </button>
                  </nav>

                  {/* Bottom navigation (visible only on small screens) */}
                  <nav className="fixed bottom-0 left-0 right-0 z-50 flex lg:hidden justify-around items-center bg-white border-t border-gray-200 shadow-lg py-2 md:py-4">
                    {mobileSidebarItems.map((item, index) => {
                      const IconComponent = item.icon
                      const isActive = pathname === item.href
                      return (
                        <Link
                          key={index}
                          href={item.href}
                          className={`flex flex-col items-center justify-center text-xs md:space-y-2 ${isActive ? "text-rose-600 font-medium" : "text-gray-500 hover:text-gray-800"
                            }`}
                        >
                          <IconComponent className="h-3 w-3 md:h-5 md:w-5 mb-0.5" />
                          <span className="text-[10px] md:text-[16px]">{item.label}</span>

                        </Link>
                      )
                    })}
                  </nav>
                </CardContent>
              </Card>

            </div>
          </div>

          <div className="col-span-4 sm:col-span-3 flex items-start justify-center mb-10 sm:mb-0">
            <div className="w-full sm:w-10/12 px-2 sm:px-0">
              {children}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
