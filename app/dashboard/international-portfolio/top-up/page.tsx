"use client"

import * as Yup from "yup"
import Link from "next/link"
import { useState } from "react"
import { useFormik } from "formik"
import { useRouter } from "next/navigation"
import { useToast } from "@/app/utils/toast"
import { ArrowLeft, Building2, CheckCircle2, Loader, Plus, QrCode, Send, Upload } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { uploadFileToBunnyCDN } from "@/app/utils/upload"
import { postAPI } from "@/app/api/api"

export default function TopUpPage() {
   const router = useRouter()
   const { errorMessage, successMessage } = useToast();
   const [isUpload, setIsUpload] = useState<boolean>(true);
   const [isSuccess, setIsSuccess] = useState<boolean>(false);
   const [paymentMethod, setPaymentMethod] = useState<string>("qr");
   const quickAmounts = [100, 500, 1000, 5000, 10000]

   const formik = useFormik({
      initialValues: {
         payment_amount: 0,
         payment_slip_url: null as File | null,
      },
      validationSchema: Yup.object({
         payment_amount: Yup.string().required("Amount is required!"),
         payment_slip_url: Yup.mixed<File>()
            .required("Payment voucher is required")
            .test("fileType", "Only PDF, JPG, or PNG files are allowed", (value) => {
               if (!value) return false;
               return ["application/pdf", "image/jpeg", "image/png"].includes((value as File).type);
            }),
      }),
      onSubmit: async (values, { resetForm, setSubmitting }) => {
         try {
            const payment_slip_url = values.payment_slip_url;
            if (!(payment_slip_url instanceof File)) {
               throw new Error("Files are not valid");
            }

            const buffer = Buffer.from(await payment_slip_url.arrayBuffer());
            const url = await uploadFileToBunnyCDN(buffer, payment_slip_url.name, payment_slip_url.type);

            let formattedData;
            formattedData = {
               amount: Number(values.payment_amount),
               payment_slip: url,
            };

            console.log("Amount::", values.payment_amount);
            console.log("Payment voucher:::", url);

            const res = await postAPI({
               url: "/wallets/topup",
               body: formattedData,
            });

            if (res?.status_code === 200 && res?.is_error === false) {
               successMessage("Your balance submitted successfully!", 2000);
               resetForm();
               setIsSuccess(true)
            } else {
               errorMessage("Something went wrong", 2000);
            }

         } catch (err) {
            errorMessage("Submission failed. Please try again.", 2000);
         } finally {
            setSubmitting(false);
         }
      },
   });

   const handleFileUpload = (field: string, file: File | null) => {
      formik.setFieldValue(field, file);
   };

   if (isSuccess) {
      return (
         <div className="flex items-center justify-center min-h-[500px]">
            <Card className="max-w-3xl w-full border-0 shadow-lg">
               <CardContent className="p-12 text-center space-y-4 border">
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center mx-auto">
                     <CheckCircle2 className="h-6 w-6 text-yellow-600" />
                  </div>
                  <h2 className="text-md font-bold">Add fund successful!</h2>
                  <div>
                     <p className="text-sm text-muted-foreground mb-2">
                        Thank you! We have received your payment. Your funds will be active in your stock account within 24 hours.
                     </p>
                     <p className="text-sm text-muted-foreground mb-2">
                        If there is any problem, we will contact you directly.
                     </p>
                  </div>

                  <div className="flex items-center justify-center gap-4">
                     <Button
                        size="lg"
                        variant="outline"
                        type="button"
                        className="border border-primary hover:bg-primary"
                        onClick={() => router.push("/dashboard/international-portfolio")}
                     >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to stock account
                     </Button>
                     <Button
                        size="lg"
                        type="button"
                        variant="default"
                        onClick={() => setIsSuccess(false)}
                     >
                        <Plus className="h-4 w-4 mr-1" />
                        Add More Funds
                     </Button>
                  </div>
               </CardContent>
            </Card>
         </div>
      )
   }

   return (
      <form onSubmit={formik.handleSubmit} className="max-w-3xl mx-auto">
         <div className="hidden sm:block mb-6">
            <Button variant="ghost" size="sm" asChild>
               <Link href="/dashboard/international-portfolio">
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back to Portfolio
               </Link>
            </Button>
         </div>

         <Card className="border-0 shadow-sm">
            <CardHeader className="p-0">
               <CardTitle className="text-sm sm:text-md">Top Up International Account</CardTitle>
               <p className="text-xs sm:text-sm text-muted-foreground">Add funds to your international broker account</p>
            </CardHeader>
            <CardContent className="p-0 space-y-6">
               <div className="space-y-2">
                  <Label htmlFor="amount">Amount (USD) <span className="text-rose-500">*</span></Label>
                  <Input
                     id="amount"
                     type="string"
                     placeholder="Enter amount...."
                     value={formik.values.payment_amount}
                     onChange={formik.handleChange}
                     className="text-lg"
                  />
                  {formik.errors.payment_amount && (
                     <label className="text-xs text-red-500">{formik.errors.payment_amount}</label>
                  )}
               </div>
               <div className="flex gap-2 my-4">
                  {quickAmounts.map((quickAmount) => {
                     const isActive = formik.values.payment_amount === quickAmount;

                     return (
                        <Button
                           key={quickAmount}
                           size="sm"
                           type="button"
                           variant={isActive ? "default" : "outline"}
                           className={`flex-1 border ${isActive
                              ? "bg-primary text-white border-primary"
                              : "border-primary text-primary hover:bg-primary/10"
                              }`}
                           onClick={() => formik.setFieldValue("payment_amount", quickAmount)}
                        >
                           ${quickAmount}
                        </Button>
                     );
                  })}
               </div>

               {!isUpload ?
                  <Card>
                     <CardHeader>
                        <CardTitle className="text-sm font-light flex items-center gap-2">
                           <Upload className="w-5 h-5" />
                           Upload Payment Proof
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-6">
                        <div className="space-y-4">
                           <div className="space-y-1">
                              <Label htmlFor="payment_slip_url">
                                 Payment slip or voucher <span className="text-rose-500">*</span>
                              </Label>
                              <Input
                                 id="payment_slip_url"
                                 type="file"
                                 accept=".pdf,.jpg,.jpeg,.png"
                                 onChange={(e) =>
                                    handleFileUpload(
                                       "payment_slip_url",
                                       e.target.files?.[0] || null
                                    )
                                 }
                                 className="cursor-pointer"
                              />
                              <p className="text-xs text-muted-foreground mt-1">
                                 Upload your payment slip or voucher as (PDF, JPG, PNG)
                              </p>
                              {formik.errors.payment_slip_url && (
                                 <label className="text-xs text-red-500">{formik.errors.payment_slip_url}</label>
                              )}
                           </div>
                        </div>
                     </CardContent>
                  </Card>
                  :
                  <div>
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
                           <p className="text-sm text-muted-foreground">
                              Total amount: <span className="font-semibold text-primary">${formik.values.payment_amount}</span>
                           </p>
                           <p className="text-sm text-muted-foreground">
                              Fee: <span className="font-semibold text-primary">$6</span>
                           </p>
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
                              <div className="flex justify-between">
                                 <span className="text-sm text-muted-foreground">Amount:</span>
                                 <span className="font-semibold text-primary">${formik.values.payment_amount}</span>
                              </div>
                              <div className="flex justify-between">
                                 <span className="text-sm text-muted-foreground">Fee:</span>
                                 <span className="font-semibold text-primary">$6</span>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
               }

               <div className="flex items-center justify-end">
                  {isUpload && <Button
                     onClick={() => setIsUpload(false)}
                     disabled={!formik.values.payment_amount}
                     size="lg"
                  >
                     Upload Payment Proof
                  </Button>
                  }
                  {!isUpload &&
                     <Button
                        type="submit"
                        disabled={!formik.values.payment_amount
                           || !formik.values.payment_slip_url || formik.isSubmitting}
                        size="lg"
                        className="flex text-white"
                     >
                        {formik.isSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="h-4 w-4" />}
                        {formik.isSubmitting ? "Submitting..." : " Submit"}
                     </Button>
                  }
               </div>
            </CardContent>
         </Card>
      </form>
   )
}
