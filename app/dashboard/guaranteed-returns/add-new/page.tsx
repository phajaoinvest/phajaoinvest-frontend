"use client"

import * as Yup from "yup"
import { useState } from "react"
import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import { CreditCard, CheckCircle, TrendingUp, Calendar, Upload, Clock, Check, Download, ArrowLeft, ChevronRight, Send, QrCode, Building2, HandCoins, Loader } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// api and utils
import { postAPI } from "@/app/api/api"
import { useToast } from "@/app/utils/toast"
import { uploadFileToBunnyCDN } from "@/app/utils/upload"

export default function GuaranteedReturnsPage() {
  const router = useRouter()
  const { errorMessage, successMessage } = useToast();
  const [currentStep, setCurrentStep] = useState(1)
  const [isDownloading, setIsDownloading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"qr" | "bank">("qr")

  const steps = [
    {
      id: 1,
      title: "Investment Details",
      description: "Investment preferences and goals",
      icon: TrendingUp,
    },
    {
      id: 2,
      title: "Payment Process",
      description: "Payment method and confirmation",
      icon: CreditCard,
    },
    {
      id: 3,
      title: "Successful",
      description: "Payment completed!",
      icon: Check,
    },
  ]

  const billingData = {
    transactionId: "TXN-" + Date.now(),
    applicationDate: new Date().toLocaleDateString(),
    status: "Pending Review",
    investment: {
      amount: "$50,000 - $99,999",
      tier: "Silver",
      expectedReturns: "18%",
      period: "3 Years",
      riskTolerance: "Moderate",
      goals: "Long-term Wealth Building",
    }
  }

  const handleFileUpload = (field: string, file: File | null) => {
    formik.setFieldValue(field, file);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleDownloadPDF = () => {
    setIsDownloading(true)
    setTimeout(() => {
      setIsDownloading(false)
      const element = document.createElement("a")
      element.href =
        "data:text/plain;charset=utf-8," +
        encodeURIComponent("Investment Application Receipt - " + billingData.transactionId)
      element.download = `investment-receipt-${billingData.transactionId}.txt`
      element.click()
    }, 2000)
  }

  const formik = useFormik({
    initialValues: {
      amount: 0,
      investmentPeriod: "",
      riskTolerance: "",
      investmentGoals: "",
      additionalNotes: "",
      payment_slip: null as File | null,
    },
    validationSchema: Yup.object({
      amount: Yup.number().required("Investment amount is required!"),
      investmentPeriod: Yup.string().required("Investment period is required!"),
      riskTolerance: Yup.string().required("Risk tolerance is required!"),
      investmentGoals: Yup.string().required("Investment goals is required!"),
      payment_slip: Yup.mixed<File>()
        .required("Payment slip/voucher is required!")
        .test("fileType", "Only PDF, JPG, or PNG files are allowed", (value) => {
          if (!value) return false;
          return ["application/pdf", "image/jpeg", "image/png"].includes((value as File).type);
        }),
    }),
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const payment_slip = values.payment_slip;
        if (!(payment_slip instanceof File)) {
          throw new Error("Payment slip must be a file.");
        }

        const buffer = Buffer.from(await payment_slip.arrayBuffer());
        const url = await uploadFileToBunnyCDN(buffer, payment_slip.name, payment_slip.type);

        let formattedData;
        formattedData = {
          amount: Number(values.amount),
          requested_investment_period: values.investmentPeriod,
          requested_risk_tolerance: values.riskTolerance,
          requested_investment_goal: values.investmentGoals,
          payment_slip_url: url,
          customer_notes: values.additionalNotes,
        };
        const res = await postAPI({
          url: "/investment-requests",
          body: formattedData,
        });

        if (res?.status_code === 200 && res?.is_error === false) {
          successMessage("Invest application submitted successfully!", 2000);
          resetForm();
          setCurrentStep(3);
        } else {
          errorMessage(res?.message, 2000);
        }
      } catch (err) {
        errorMessage("Submission failed. Please try again.", 2000);
      } finally {
        setSubmitting(false);
      }
    },
  });


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center flex-col p-4 rounded-lg space-y-2">
        <div className="flex items-center justify-start gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
          <h1 className="text-lg font-bold">New Investment Application</h1>
        </div>
        <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
          Start your journey to guaranteed 15%+ annual returns with our professional investment management service
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center justify-center space-x-2">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full border ${currentStep >= step.id
                  ? "bg-primary border-primary text-primary-foreground"
                  : "border-muted-foreground text-muted-foreground"
                  }`}
              >
                {currentStep > step.id ? <CheckCircle className="text-black h-4 w-4" /> : <step.icon className="text-white h-4 w-4" />}
              </div>
              <h2
                className={`text-sm font-normal flex items-center justify-center gap-2 ${currentStep === step.id ? "text-primary font-semibold" : "text-muted-foreground"
                  }`}
              >
                {step.title}
              </h2>
            </div>
          ))}
        </div>
        <Progress value={(currentStep / steps.length) * 100} className="mb-4" />
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-8">
        {currentStep === 1 && (
          <Card>
            <CardContent className="space-y-6 py-8">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="amount">
                    Invest amount <span className="text-rose-500">*</span>
                  </Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    placeholder="Amount...."
                  />
                  <Input
                    type="hidden"
                    name="service_type"
                    value="guaranteed_returns"
                  />
                  {formik.errors.amount && (
                    <label className="text-xs text-red-500">{formik.errors.amount}</label>
                  )}
                </div>
                <div>
                  <Label htmlFor="investmentPeriod">Investment Period <span className="text-rose-500">*</span></Label>
                  <Select
                    name="investmentPeriod"
                    value={formik.values.investmentPeriod}
                    onValueChange={(value) => formik.setFieldValue("investmentPeriod", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select investment period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Year</SelectItem>
                      <SelectItem value="2">2 Years</SelectItem>
                      <SelectItem value="3">3 Years</SelectItem>
                      <SelectItem value="5">5 Years</SelectItem>
                      <SelectItem value="10">10 Years</SelectItem>
                    </SelectContent>
                  </Select>
                  {formik.errors.investmentPeriod && (
                    <label className="text-xs text-red-500">{formik.errors.investmentPeriod}</label>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="riskTolerance">Risk Tolerance <span className="text-rose-500">*</span></Label>
                  <Select
                    name="riskTolerance"
                    value={formik.values.riskTolerance}
                    onValueChange={(value) => formik.setFieldValue("riskTolerance", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk tolerance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="conservative">Conservative (Low Risk)</SelectItem>
                      <SelectItem value="moderate">Moderate (Medium Risk)</SelectItem>
                      <SelectItem value="aggressive">Aggressive (High Risk)</SelectItem>
                    </SelectContent>
                  </Select>
                  {formik.errors.riskTolerance && (
                    <label className="text-xs text-red-500">{formik.errors.riskTolerance}</label>
                  )}
                </div>
                <div>
                  <Label htmlFor="investmentGoals">Investment Goals <span className="text-rose-500">*</span></Label>
                  <Select
                    name="investmentGoals"
                    value={formik.values.investmentGoals}
                    onValueChange={(value) => formik.setFieldValue("investmentGoals", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your primary investment goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wealth-building">Long-term Wealth Building</SelectItem>
                      <SelectItem value="retirement">Retirement Planning</SelectItem>
                      <SelectItem value="income">Regular Income Generation</SelectItem>
                      <SelectItem value="preservation">Capital Preservation</SelectItem>
                      <SelectItem value="education">Education Funding</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {formik.errors.investmentGoals && (
                    <label className="text-xs text-red-500">{formik.errors.investmentGoals}</label>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="additionalNotes">Additional Notes or Requirements</Label>
                <Textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  value={formik.values.additionalNotes}
                  onChange={formik.handleChange}
                  placeholder="Any specific requirements, questions, or additional information..."
                  rows={4}
                />
                {formik.errors.additionalNotes && (
                  <label className="text-xs text-red-500">{formik.errors.additionalNotes}</label>
                )}
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start gap-3">
                  <HandCoins className="h-8 w-8 text-yellow-600 mt-0.5" />
                  <div className="space-y-2">
                    <h4 className="text-md font-semibold text-primary">Investment profit return rates:</h4>
                    <ul className="text-sm text-white space-y-2">
                      <li>1. $10,000 - $49,999 (Bronze - 15% returns)</li>
                      <li>2. $50,000 - $99,999 (Silver - 18% returns)</li>
                      <li>3. $100,000+ (Gold - 20% returns)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 2 && (
          <Card>
            <CardContent className="space-y-6 py-8">
              <div className="grid grid-cols-2 gap-4">
                <Card
                  className={`p-0 cursor-pointer transition-all ${paymentMethod === "qr" ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                  onClick={() => setPaymentMethod("qr")}
                >
                  <CardContent className="py-3 text-center">
                    <QrCode className="w-4 sm:w-5 h-4 sm:h-5 mx-auto text-primary mb-2" />
                    <h3 className="text-xs sm:text-sm font-semibold">QR Code Payment</h3>
                    <p className="hidden sm:block text-xs text-foreground/70">Scan QR code with your banking app</p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all ${paymentMethod === "bank" ? "border-primary bg-primary/5" : "hover:border-primary/50"
                    }`}
                  onClick={() => setPaymentMethod("bank")}
                >
                  <CardContent className="py-3 text-center">
                    <Building2 className="w-4 sm:w-5 h-4 sm:h-5 mx-auto mb-2 text-primary" />
                    <h3 className="text-xs sm:text-sm font-semibold">Bank Transfer</h3>
                    <p className="hidden sm:block text-xs text-foreground/70">Transfer to our bank account</p>
                  </CardContent>
                </Card>
              </div>

              {paymentMethod === "qr" && (
                <div className="text-center p-6 bg-muted/30 rounded-lg">
                  <div className="w-52 h-52 mx-auto mb-4 rounded-lg flex items-center justify-center border">
                    <img src="/images/qr-code.png" alt="" className="rounded-md" />
                  </div>
                  <p className="text-sm mb-2">Scan this QR Code and complete you payment</p>
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="p-6 bg-muted/30 rounded-lg">
                  <h3 className="text-sm font-semibold mb-4">Bank Account Details</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Bank Name:</span>
                      <span className="font-semibold">BCEL Bank</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Account Number:</span>
                      <span className="font-semibold">1234567890123</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Account Name:</span>
                      <span className="font-semibold">PhaJaoInvest Investment Co.</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="paymentProof">Upload Payment Proof *</Label>
                <div className="mt-2">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-5 h-5 mb-4 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground">
                          <span className="font-semibold">Click to upload</span> payment receipt
                        </p>
                        <p className="text-xs text-muted-foreground">PNG, JPG or PDF (MAX. 10MB)</p>
                      </div>
                      <Input
                        id="payment_slip"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFileUpload(
                            "payment_slip",
                            e.target.files?.[0] || null
                          )
                        }
                        className="hidden cursor-pointer"
                      />
                    </label>
                  </div>
                  {formik.errors.payment_slip && (
                    <label className="text-xs text-red-500 mt-6">{formik.errors.payment_slip}</label>
                  )}
                </div>
              </div>


              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-md font-semibold text-blue-900 dark:text-blue-100">Processing Timelines</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                      After submitting your application and payment proof, our team will review and approve your
                      investment within 24 hours. You will receive a confirmation email with your investment details
                      and account access.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <div className="border rounded-md">
            <section className="py-4 px-4 dark:to-emerald-950/20">
              <div className="container mx-auto text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <h1 className="text-sm font-bold text-green-900 dark:text-green-500 mb-2">
                  Application Submitted Successfully!
                </h1>
                <p className="text-sm text-green-700 dark:text-green-400 max-w-2xl mx-auto">
                  Your guaranteed returns investment application has been received and is under review
                </p>
                <Badge
                  variant="secondary"
                  className="mt-4 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                >
                  <Clock className="h-4 w-4 mr-1" />
                  {billingData.status}
                </Badge>
              </div>
            </section>

            <section className="py-12 px-4 space-y-4">
              <div className="space-y-8">
                <div className="flex items-center justify-center gap-2">
                  <Button
                    type="button"
                    onClick={() => router.push("/dashboard/guaranteed-returns")}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft />Back to investment
                  </Button>
                  <Button
                    type="button"
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    {isDownloading ? "Generating PDF..." : "Download Receipt (PDF)"}
                  </Button>
                </div>
              </div>
            </section>
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="flex items-center gap-2 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentStep < 2 ? (
            <Button
              onClick={handleNext} className="flex items-center gap-2"
              disabled={!formik.values.amount || !formik.values.investmentPeriod || !formik.values.riskTolerance || !formik.values.investmentGoals}
            >
              Next
              <ChevronRight />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!formik.values.payment_slip || formik.isSubmitting}
              className="flex items-center gap-2"
            >
              {formik.isSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="h-4 w-4" />}
              {formik.isSubmitting ? "Submitting..." : " Submit Application"}
            </Button>
          )}
        </div>
      </form>
    </div >
  )
}
