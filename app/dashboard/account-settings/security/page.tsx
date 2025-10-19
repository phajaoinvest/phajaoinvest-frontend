"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Shield, Key, Smartphone, Clock } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function SecuritySettingsPage() {
   const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
   const [biometricEnabled, setBiometricEnabled] = useState(true)

   return (
      <div className="space-y-6">
         <div className="flex items-center space-x-4">
            <Link href="/dashboard/account-settings">
               <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
               </Button>
            </Link>
            <div>
               <h1 className="text-2xl font-semibold">Security Settings</h1>
               <p className="text-sm text-muted-foreground">Manage your password and authentication methods</p>
            </div>
         </div>

         {/* Change Password */}
         <Card>
            <CardHeader>
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                     <Key className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                     <CardTitle>Change Password</CardTitle>
                     <CardDescription>Update your password regularly to keep your account secure</CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" placeholder="Enter current password" />
               </div>
               <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" placeholder="Enter new password" />
                  <p className="text-xs text-muted-foreground">
                     Must be at least 8 characters with uppercase, lowercase, and numbers
                  </p>
               </div>
               <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" placeholder="Confirm new password" />
               </div>
               <Button className="w-full sm:w-auto">Update Password</Button>
            </CardContent>
         </Card>

         {/* Two-Factor Authentication */}
         <Card>
            <CardHeader>
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                     <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                     <CardTitle>Two-Factor Authentication</CardTitle>
                     <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent className="space-y-6">
               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">Authenticator App</div>
                     <div className="text-sm text-muted-foreground">
                        Use an authenticator app to generate verification codes
                     </div>
                  </div>
                  <Switch checked={twoFactorEnabled} onCheckedChange={setTwoFactorEnabled} />
               </div>

               {twoFactorEnabled && (
                  <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                     <p className="text-sm font-medium">Setup Instructions:</p>
                     <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                        <li>Download an authenticator app (Google Authenticator, Authy, etc.)</li>
                        <li>Scan the QR code below with your authenticator app</li>
                        <li>Enter the 6-digit code from your app to verify</li>
                     </ol>
                     <div className="flex justify-center py-4">
                        <div className="w-48 h-48 bg-white border-2 rounded-lg flex items-center justify-center">
                           <p className="text-xs text-muted-foreground">QR Code Placeholder</p>
                        </div>
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="verification-code">Verification Code</Label>
                        <Input id="verification-code" placeholder="Enter 6-digit code" maxLength={6} />
                     </div>
                     <Button className="w-full">Verify and Enable</Button>
                  </div>
               )}

               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">SMS Authentication</div>
                     <div className="text-sm text-muted-foreground">Receive verification codes via text message</div>
                  </div>
                  <Switch />
               </div>
            </CardContent>
         </Card>

         {/* Biometric Authentication */}
         <Card>
            <CardHeader>
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                     <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                     <CardTitle>Biometric Authentication</CardTitle>
                     <CardDescription>Use fingerprint or face recognition for quick access</CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent>
               <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                     <div className="font-medium">Enable Biometric Login</div>
                     <div className="text-sm text-muted-foreground">Use your device's biometric features to log in</div>
                  </div>
                  <Switch checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
               </div>
            </CardContent>
         </Card>

         {/* Login History */}
         <Card>
            <CardHeader>
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                     <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                     <CardTitle>Recent Login Activity</CardTitle>
                     <CardDescription>Monitor your account access history</CardDescription>
                  </div>
               </div>
            </CardHeader>
            <CardContent>
               <div className="space-y-3">
                  {[
                     { device: "Chrome on Windows", location: "New York, USA", time: "2 hours ago", current: true },
                     { device: "Safari on iPhone", location: "New York, USA", time: "1 day ago", current: false },
                     { device: "Chrome on MacOS", location: "Los Angeles, USA", time: "3 days ago", current: false },
                  ].map((login, index) => (
                     <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                           <div className="font-medium flex items-center space-x-2">
                              <span>{login.device}</span>
                              {login.current && (
                                 <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Current</span>
                              )}
                           </div>
                           <div className="text-sm text-muted-foreground">
                              {login.location} • {login.time}
                           </div>
                        </div>
                        {!login.current && (
                           <Button variant="ghost" size="sm" className="text-destructive">
                              Revoke
                           </Button>
                        )}
                     </div>
                  ))}
               </div>
            </CardContent>
         </Card>

         <div className="flex justify-end space-x-3">
            <Link href="/dashboard/account-settings">
               <Button variant="outline">Cancel</Button>
            </Link>
            <Button>Save Changes</Button>
         </div>
      </div>
   )
}
