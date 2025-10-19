import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Shield, Bell, CreditCard } from "lucide-react"
import Link from "next/link"

export default function AccountSettingsPage() {
  const settingsItems = [
    {
      id: "profile",
      title: "Profile Information",
      description: "Update your personal details and contact information",
      icon: User,
      status: "Complete",
      isComplete: true,
      editLink: "/dashboard/account-settings/edit-profile",
    },
    {
      id: "security",
      title: "Security Settings",
      description: "Manage your password and two-factor authentication",
      icon: Shield,
      status: "Action Required",
      isComplete: false,
      editLink: "/dashboard/account-settings/security",
    },
    {
      id: "notifications",
      title: "Notification Preferences",
      description: "Control how you receive updates and alerts",
      icon: Bell,
      status: "Complete",
      isComplete: true,
      editLink: "/dashboard/account-settings/notifications",
    },
    {
      id: "billing",
      title: "Billing & Payment",
      description: "Manage your payment methods and billing information",
      icon: CreditCard,
      status: "Complete",
      isComplete: true,
      editLink: "/dashboard/account-settings/billing",
    },
  ]

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-semibold">Account Settings</CardTitle>
            <Button variant="outline" size="sm">
              Save Changes
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {settingsItems.map((setting, index) => {
              const IconComponent = setting.icon
              return (
                <div
                  key={setting.id}
                  className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors border-b last:border-b-0"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{setting.title}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">{setting.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-3">
                      <Badge
                        variant="default"
                        className={
                          setting.isComplete
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                            : "bg-amber-100 text-amber-800 border-amber-200"
                        }
                      >
                        {setting.status}
                      </Badge>
                      {setting.editLink ? (
                        <Link href={setting.editLink}>
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
