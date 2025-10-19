import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/lib/auth-context"
import { TranslationProvider } from "@/lib/i18n"
import ToastProvider from "@/components/toastProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PhaJaoInvest - Advanced Stock Trading Platform",
  description: "Professional stock trading platform with real-time data, portfolio management, and advanced analytics.",
  generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <TranslationProvider>{children}</TranslationProvider>
            <ToastProvider />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
