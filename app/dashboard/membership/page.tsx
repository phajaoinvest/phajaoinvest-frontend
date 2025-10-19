"use client"

import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Crown, CreditCard, Calendar, Loader } from "lucide-react"

// components:
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// APIs and Interface:
import { queryData } from "@/app/api/api"
import MemberShipPaymentHistory from "./hooks/useFilter"
import { IPackagesResponse } from "@/interfaces/package"
import { useCustomerStore } from "@/app/store/useCustomerStore"
import { useFetchMemberShipPaymentHistory } from "./hooks/useFetch"
import Pagination from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import EmptyPage from "@/components/ui/empty"

export default function MembershipPage() {
  const router = useRouter()
  const [endDate, setEndDate] = React.useState("")
  const [startDate, setStartDate] = React.useState("")
  const customer = useCustomerStore((state) => state.customer)
  const [packages, setPackages] = React.useState<IPackagesResponse[] | null>(null)

  const filter = MemberShipPaymentHistory()
  const membershipPaymentHistories = useFetchMemberShipPaymentHistory({ filter: filter.data })

  console.log("Member Transactions:::", membershipPaymentHistories)

  useEffect(() => {
    if (!customer) {
      router.push("/auth/login")
    }
  }, [customer, router])

  if (!customer) {
    return <div>Loading...</div>
  }

  const fetchPackages = async () => {
    try {
      const res = await queryData({
        url: "/subscription-packages",
      });

      if (res.data.length > 1) {
        setPackages(res.data);
      }
    } catch (error: any) {
      console.log("Fetch packages failed!", error)
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleSelectPlan = (plan: IPackagesResponse) => {
    if (!plan.is_current) {
      const paymentUrl = `/payment?plan=${encodeURIComponent(plan.service_type)}&price=${encodeURIComponent(plan.price)}&id=${encodeURIComponent(plan.id)}`
      router.push(paymentUrl)
    }
  }

  const handleRenewPlan = (plan: IPackagesResponse) => {
    if (plan.is_current) {
      const paymentUrl = `/payment?plan=${encodeURIComponent(plan.service_type)}&price=${encodeURIComponent(plan.price)}&id=${encodeURIComponent(plan.id)}&renew=true&duration=${encodeURIComponent(plan.duration_months)}`
      router.push(paymentUrl)
    }
  }

  return (
    <div className="space-y-4 sm:space-y-8">
      <Card className="border-0 shadow-sm space-y-6">
        <CardHeader className="p-0">
          <CardTitle className="flex items-center justify-start text-sm sm:text-lg font-semibold"><Crown className="h-5 w-5 mr-2 text-primary" /> Membership Plans</CardTitle>
          <p className="text-xs text-muted-foreground">Upgrade or change your membership plan</p>
        </CardHeader>
        <CardContent className="p-0">
          {packages && packages.length > 0 ?
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-6">
              {packages?.map((plan) => (
                <Card key={plan.id} className={`relative ${plan.is_current ? "ring-2 ring-primary" : ""}`}>
                  {plan.is_current && (
                    <Badge className="absolute -top-2 left-4 bg-primary text-primary-foreground">
                      {plan.days_left !== null ? "Your plan is under review" : <p> Current,&nbsp; <span>Has expired: {plan.days_left} days</span></p>}
                    </Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-sm sm:text-md">{plan.description}</CardTitle>
                    <div className="text-md sm:text-xl font-bold text-primary">{plan.currency === "USD" ? "$" : ""}{plan.price}</div>
                    <p className="text-xs sm:text-sm text-muted-foreground">{plan.duration_months} Months</p>
                  </CardHeader>
                  <CardContent className="px-2 sm:px-4 py-0 pb-4">
                    <ul className="space-y-2 mb-4">
                      {plan?.features && plan?.features.map((feature, featureIndex) => (
                        <li key={featureIndex + 1} className="text-gray-500 text-xs flex items-center">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="text-sm w-full"
                      variant={plan.is_current ? plan?.days_left < 0 ? "secondary" : "outline" : "default"}
                      disabled={plan.is_current && plan.days_left > 0}
                      onClick={() => plan.is_current && plan.days_left < 0 ? handleRenewPlan(plan) : handleSelectPlan(plan)}
                    >
                      {plan.is_current ? plan.days_left < 0 ? "Renew" : "Current Plan" : "Select Plan"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            :
            <EmptyPage
              title="No packages founded"
              description="Sorry! There is no packages available now."
            />
          }
        </CardContent>
      </Card>

      <hr />

      <Card className="border-0 shadow-sm space-y-8">
        <CardHeader className="p-0">
          <div className="w-full flex items-center justify-between ">
            <CardTitle className="text-sm sm:text-md font-semibold flex items-center">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment Histories:
            </CardTitle>
            <div className="w-1/2 flex items-center gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
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
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
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
        </CardHeader>
        <CardContent className="p-0">
          {membershipPaymentHistories.loading &&
            <div className="h-11/12 flex justify-center items-center min-h-[40vh]">
              <Loader className="w-6 h-6 animate-spin text-primary" />&nbsp; Loading....
            </div>
          }
          <div className="space-y-1">
            {membershipPaymentHistories?.data && membershipPaymentHistories?.data.length > 0 ? membershipPaymentHistories?.data.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between py-4 px-0 hover:bg-muted/30 transition-colors border-b last:border-b-0"
              >
                <div className="w-full flex items-center space-x-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Crown className="h-4 w-4 text-primary" />
                  </div>
                  <div className="w-full space-y-1">
                    <div className="w-full flex items-start justify-between space-x-2">
                      <span className="text-xs sm:text-sm font-medium">{payment.plan}</span>
                      <div className="flex sm:hidden items-center space-x-3">
                        <div>
                          <p className="text-sm font-semibold">{payment.currency === "USD" ? "$" : ""}{payment.amount}11</p>
                        </div>
                        <Badge
                          variant={payment.status === "Active" ? "default" : "secondary"}
                          className={
                            payment.status === "Active"
                              ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                              : "bg-gray-100 text-gray-800 border-gray-200"
                          }
                        >
                          {payment.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-full flex items-center space-x-2 text-xs sm:text-sm text-muted-foreground">
                      <span>Start: {payment.date}</span>
                      <span>-</span>
                      <span>Expires: {payment.expiryDate}</span>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:block text-right">
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="text-sm font-semibold">{payment.currency === "USD" ? "$" : ""}{payment.amount}</p>
                    </div>
                    <Badge
                      variant={payment.status === "Active" ? "default" : "secondary"}
                      className={
                        payment.status === "Active"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                          : "bg-gray-100 text-gray-800 border-gray-200"
                      }
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              </div>
            )) :
              <EmptyPage
                title="Not found"
                description="No payment history found! Please subscribe to a membership plan."
              />
            }
          </div>

          <hr />

          <div className="w-full flex items-center justify-end mb-4">
            <Pagination
              filter={filter.data}
              totalPage={Math.ceil(
                (membershipPaymentHistories.total ?? 0) / filter.data.limit
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
  )
}
