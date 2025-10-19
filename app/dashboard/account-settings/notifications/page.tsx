"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Bell, Mail, Smartphone, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function NotificationPreferencesPage() {
   const [emailNotifications, setEmailNotifications] = useState({
      transactions: true,
      portfolio: true,
      news: false,
      promotions: false,
   })

   const [pushNotifications, setPushNotifications] = useState({
      priceAlerts: true,
      trades: true,
      news: true,
      system: true,
   })

   const [smsNotifications, setSmsNotifications] = useState({
      security: true,
      trades: false,
   })

   return (
      <div className="space-y-6">
         <div className="flex items-center space-x-4">
            <Link href="/dashboard/account-settings">
               <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
               </Button>
            </Link>
            <div>
               <h1 className="text-2xl font-semibold">Notification Preferences</h1>
               <p className="text-sm text-muted-foreground">Control how you receive updates and alerts</p>
            </div>
         </div>

         {/* Email Notifications */}
         <Card>
            <CardHeader>
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                     <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                     <CardTitle>Email Notifications</CardTitle>
                     <CardDescription>Receive updates and alerts via email</CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">Transaction Confirmations</div>
                     <div className="text-sm text-muted-foreground">Get notified when you buy or sell stocks</div>
                  </div>
                  <Switch
                     checked={emailNotifications.transactions}
                     onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, transactions: checked })}
                  />
               </div>

               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">Portfolio Updates</div>
                     <div className="text-sm text-muted-foreground">Daily summary of your portfolio performance</div>
                  </div>
                  <Switch
                     checked={emailNotifications.portfolio}
                     onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, portfolio: checked })}
                  />
               </div>

               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">Market News & Insights</div>
                     <div className="text-sm text-muted-foreground">Weekly market analysis and stock recommendations</div>
                  </div>
                  <Switch
                     checked={emailNotifications.news}
                     onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, news: checked })}
                  />
               </div>

               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">Promotions & Offers</div>
                     <div className="text-sm text-muted-foreground">Special offers and promotional content</div>
                  </div>
                  <Switch
                     checked={emailNotifications.promotions}
                     onCheckedChange={(checked) => setEmailNotifications({ ...emailNotifications, promotions: checked })}
                  />
               </div>
            </CardContent>
         </Card>

         {/* Push Notifications */}
         <Card>
            <CardHeader>
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                     <Bell className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                     <CardTitle>Push Notifications</CardTitle>
                     <CardDescription>Real-time alerts on your device</CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">Price Alerts</div>
                     <div className="text-sm text-muted-foreground">Get notified when stocks reach your target price</div>
                  </div>
                  <Switch
                     checked={pushNotifications.priceAlerts}
                     onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, priceAlerts: checked })}
                  />
               </div>

               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">Trade Executions</div>
                     <div className="text-sm text-muted-foreground">Instant notifications when your trades are executed</div>
                  </div>
                  <Switch
                     checked={pushNotifications.trades}
                     onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, trades: checked })}
                  />
               </div>

               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">Breaking News</div>
                     <div className="text-sm text-muted-foreground">Important market news and updates</div>
                  </div>
                  <Switch
                     checked={pushNotifications.news}
                     onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, news: checked })}
                  />
               </div>

               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">System Notifications</div>
                     <div className="text-sm text-muted-foreground">Account updates and security alerts</div>
                  </div>
                  <Switch
                     checked={pushNotifications.system}
                     onCheckedChange={(checked) => setPushNotifications({ ...pushNotifications, system: checked })}
                  />
               </div>
            </CardContent>
         </Card>

         {/* SMS Notifications */}
         <Card>
            <CardHeader>
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                     <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                     <CardTitle>SMS Notifications</CardTitle>
                     <CardDescription>Text message alerts for critical updates</CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">Security Alerts</div>
                     <div className="text-sm text-muted-foreground">Login attempts and security-related notifications</div>
                  </div>
                  <Switch
                     checked={smsNotifications.security}
                     onCheckedChange={(checked) => setSmsNotifications({ ...smsNotifications, security: checked })}
                  />
               </div>

               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">Large Trades</div>
                     <div className="text-sm text-muted-foreground">Notifications for trades above $10,000</div>
                  </div>
                  <Switch
                     checked={smsNotifications.trades}
                     onCheckedChange={(checked) => setSmsNotifications({ ...smsNotifications, trades: checked })}
                  />
               </div>
            </CardContent>
         </Card>

         {/* Notification Schedule */}
         <Card>
            <CardHeader>
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                     <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                     <CardTitle>Quiet Hours</CardTitle>
                     <CardDescription>Set times when you don't want to receive notifications</CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">Enable Quiet Hours</div>
                     <div className="text-sm text-muted-foreground">Pause non-critical notifications during set hours</div>
                  </div>
                  <Switch />
               </div>
            </CardContent>
         </Card>

         <div className="flex justify-end space-x-3">
            <Link href="/dashboard/account-settings">
               <Button variant="outline">Cancel</Button>
            </Link>
            <Button>Save Preferences</Button>
         </div>
      </div>
   )
}
