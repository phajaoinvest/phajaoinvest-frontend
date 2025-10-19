"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useTranslation } from "@/lib/i18n"
import { TrendingUp, Menu, X, User } from "lucide-react"

// components
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const { t } = useTranslation()
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`uppercase px-2 fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${isScrolled
        ? "border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95"
        : "border-transparent bg-transparent"
        }`}
    >
      <div className="sm:container flex h-14 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="text-lg font-bold text-white">PJ-Invest</span>
        </Link>

        <nav className="hidden md:flex ml-8 space-x-6">
          <Link href="/stock-analysis" className="text-sm font-medium text-white hover:text-primary transition-colors">
            {t("header.tool")}
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-white hover:text-primary transition-colors">
            {t("header.pricing")}
          </Link>
          <Link href="/news" className="text-sm font-medium text-white hover:text-primary transition-colors">
            {t("header.news")}
          </Link>
        </nav>

        <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
          <LanguageSwitcher />

          <div className="hidden md:flex space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 text-white hover:text-primary hover:bg-white/10"
                  >
                    <User className="h-4 w-4" />
                    <span>{t("header.my_account")}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard">{t("header.dashboard")}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>{t("header.sign_out")}</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="text-white hover:text-primary hover:bg-white/10">
                  <Link href="/auth/login">{t("header.login")}</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/auth/register">{t("header.register")}</Link>
                </Button>
              </>
            )}
          </div>

          <Button variant="outline" size="sm" className="md:hidden text-white hover:bg-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="h-[50vh] w-full md:hidden border rounded-md bg-background p-4">
          <nav className="flex flex-col space-y-3">
            <Link href="/stock-analysis" className="text-sm font-medium hover:text-primary">
              {t("header.tool")}
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary">
              {t("header.pricing")}
            </Link>
            <Link href="/news" className="text-sm font-medium hover:text-primary">
              {t("header.news")}
            </Link>
            <div className="flex flex-col space-y-2 pt-2">
              {user ? (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/dashboard">{t("header.dashboard")}</Link>
                  </Button>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    {t("header.sign_out")}
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" asChild className="border border-primary hover:bg-primary">
                    <Link href="/auth/login">{t("header.login")}</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/auth/register">{t("header.register")}</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
