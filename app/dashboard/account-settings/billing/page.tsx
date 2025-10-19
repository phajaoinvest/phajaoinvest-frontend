"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, Plus, Download, Calendar } from "lucide-react"
import Link from "next/link"

export default function BillingPaymentPage() {
   const paymentMethods = [
      {
         id: 1,
         type: "Visa",
         last4: "4242",
         expiry: "12/25",
         isDefault: true,
      },
      {
         id: 2,
         type: "Mastercard",
         last4: "8888",
         expiry: "08/26",
         isDefault: false,
      },
   ]

   const billingHistory = [
      {
         id: "INV-2024-001",
         date: "Jan 15, 2024",
         description: "Premium Membership - Monthly",
         amount: "$29.99",
         status: "Paid",
      },
      {
         id: "INV-2023-012",
         date: "Dec 15, 2023",
         description: "Premium Membership - Monthly",
         amount: "$29.99",
         status: "Paid",
      },
      {
         id: "INV-2023-011",
         date: "Nov 15, 2023",
         description: "Premium Membership - Monthly",
         amount: "$29.99",
         status: "Paid",
      },
      {
         id: "INV-2023-010",
         date: "Oct 15, 2023",
         description: "Stock Analysis Report",
         amount: "$49.99",
         status: "Paid",
      },
   ]

   return (
      <div className="space-y-6">
         <div className="flex items-center space-x-4">
            <Link href="/dashboard/account-settings">
               <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
               </Button>
            </Link>
            <div>
               <h1 className="text-2xl font-semibold">Billing & Payment</h1>
               <p className="text-sm text-muted-foreground">Manage your payment methods and billing information</p>
            </div>
         </div>

         {/* Current Plan */}
         <Card>
            <CardHeader>
               <div className="flex items-center justify-between">
                  <div>
                     <CardTitle>Current Plan</CardTitle>
                     <CardDescription>Your subscription details</CardDescription>
                  </div>
                  <Badge className="bg-primary/10 text-primary border-primary/20">Active</Badge>
               </div>
            </CardHeader>
            <CardContent>
               <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                     <div>
                        <div className="font-semibold text-lg">Premium Membership</div>
                        <div className="text-sm text-muted-foreground">Billed monthly</div>
                     </div>
                     <div className="text-right">
                        <div className="font-semibold text-2xl">$29.99</div>
                        <div className="text-sm text-muted-foreground">per month</div>
                     </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                     <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Next billing date: February 15, 2024</span>
                     </div>
                     <Button variant="outline" size="sm">
                        Change Plan
                     </Button>
                  </div>
               </div>
            </CardContent>
         </Card>

         {/* Payment Methods */}
         <Card>
            <CardHeader>
               <div className="flex items-center justify-between">
                  <div>
                     <CardTitle>Payment Methods</CardTitle>
                     <CardDescription>Manage your saved payment methods</CardDescription>
                  </div>
                  <Button size="sm">
                     <Plus className="h-4 w-4 mr-2" />
                     Add New
                  </Button>
               </div>
            </CardHeader>
            <CardContent className="space-y-3">
               {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                     <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                           <CreditCard className="h-6 w-6 text-white" />
                        </div>
                        <div>
                           <div className="font-medium flex items-center space-x-2">
                              <span>
                                 {method.type} •••• {method.last4}
                              </span>
                              {method.isDefault && (
                                 <Badge variant="outline" className="text-xs">
                                    Default
                                 </Badge>
                              )}
                           </div>
                           <div className="text-sm text-muted-foreground">Expires {method.expiry}</div>
                        </div>
                     </div>
                     <div className="flex items-center space-x-2">
                        {!method.isDefault && (
                           <Button variant="ghost" size="sm">
                              Set Default
                           </Button>
                        )}
                        <Button variant="ghost" size="sm" className="text-destructive">
                           Remove
                        </Button>
                     </div>
                  </div>
               ))}
            </CardContent>
         </Card>

         {/* Billing History */}
         <Card>
            <CardHeader>
               <CardTitle>Billing History</CardTitle>
               <CardDescription>View and download your past invoices</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="space-y-3">
                  {billingHistory.map((invoice) => (
                     <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                           <div className="font-medium">{invoice.description}</div>
                           <div className="text-sm text-muted-foreground">
                              {invoice.date} • {invoice.id}
                           </div>
                        </div>
                        <div className="flex items-center space-x-4">
                           <div className="text-right">
                              <div className="font-semibold">{invoice.amount}</div>
                              <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                                 {invoice.status}
                              </Badge>
                           </div>
                           <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                           </Button>
                        </div>
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         {/* Billing Address */}
         <Card>
            <CardHeader>
               <CardTitle>Billing Address</CardTitle>
               <CardDescription>Address used for billing and invoices</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="p-4 border rounded-lg space-y-1">
                  <div className="font-medium">John Smith</div>
                  <div className="text-sm text-muted-foreground">123 Main Street</div>
                  <div className="text-sm text-muted-foreground">New York, NY 10001</div>
                  <div className="text-sm text-muted-foreground">United States</div>
               </div>
               <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                  Update Address
               </Button>
            </CardContent>
         </Card>

         <div className="flex justify-end space-x-3">
            <Link href="/dashboard/account-settings">
               <Button variant="outline">Back to Settings</Button>
            </Link>
         </div>
      </div>
   )
}
