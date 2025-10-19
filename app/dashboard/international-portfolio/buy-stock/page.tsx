"use client"

import * as Yup from "yup"
import { useFormik } from "formik";
import { useEffect, useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import EmptyPage from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import {
   ArrowLeft,
   Search,
   TrendingUp,
   TrendingDown,
   DollarSign,
   AlertCircle,
   CheckCircle2,
   Building2,
   Loader,
   Send,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/app/utils/toast";
import { postAPI, queryData } from "@/app/api/api"
import { IStockReponse } from "@/interfaces/stock"
import { formatMoney } from "@/app/utils/functions/format-number"

export default function BuyStockPage() {
   const { errorMessage, successMessage } = useToast();
   const [accountBalance] = useState<number>(5000)
   const [loading, setLoading] = useState<boolean>(false)
   const [searchQuery, setSearchQuery] = useState<string>("")
   const [isSuccess, setIsSuccess] = useState<boolean>(false)
   const [selectedStock, setSelectedStock] = useState<IStockReponse | null>(null)
   const [searchStock, setSearchStock] = useState<IStockReponse[]>([])
   const [sevenAngleStock, setSevenAngleStock] = useState<IStockReponse[]>([])

   const fetchSevenAngleStocks = async () => {
      try {
         const res = await queryData({
            url: "/stocks/good-7",
         });
         if (res.data.length > 1) {
            setSevenAngleStock(res.data);
         }
      } catch (error: any) {
         console.log("Fetch 7 angle failed!", error)
      }
   };

   useEffect(() => {
      fetchSevenAngleStocks();
   }, []);

   const formik = useFormik({
      initialValues: {
         stock_id: selectedStock?.id || "",
         quantity: 0,
         buy_price: selectedStock?.price || 0,
      },
      validationSchema: Yup.object({
         // stock_id: Yup.string().required("Stock id is required!"),
         buy_price: Yup.number().required("Stock price is required!"),
         quantity: Yup.number().required("Quantity price is required!"),
      }),
      onSubmit: async (values, { resetForm, setSubmitting }) => {
         try {
            let formattedData;
            formattedData = {
               stock_id: values.stock_id,
               quantity: Number(values.quantity),
               buy_price: Number(values.buy_price),
            };
            const res = await postAPI({
               url: "/stocks/buy",
               body: formattedData,
            });

            if (res?.status_code === 200 && res?.is_error === false) {
               setIsSuccess(true);
               successMessage("Stock is bought successfully!", 2000);
               resetForm();
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

   const handleSearchStock = async () => {
      try {
         setLoading(true);
         const res = await queryData({
            url: `/stocks/quote/${searchQuery}`,
         });

         if (res?.status_code === 200 && res?.is_error === false) {
            console.log("Search stock result:", res.data);
            setLoading(false);
            setSearchStock(res.data);
         } else {
            errorMessage(res?.message, 2000);
         }
      } catch (err) {
         errorMessage("Search failed! Try again later.", 2000);
      } finally {
         setLoading(false);
      }
   }

   const totalCost = selectedStock && formik.values.quantity ? Number(selectedStock?.price) * formik.values.quantity : 0
   const hasInsufficientFunds = totalCost > accountBalance

   if (isSuccess) {
      return (
         <div className="flex items-center justify-center min-h-[500px]">
            <Card className="max-w-md w-full border-0 shadow-lg">
               <CardContent className="p-12 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                     <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Purchase Successful!</h2>
                  <p className="text-muted-foreground mb-2">
                     You have successfully purchased {formik.values.quantity} shares of {selectedStock?.symbol}.
                  </p>
                  <p className="text-sm text-muted-foreground">Redirecting you back to your portfolio...</p>
               </CardContent>
            </Card>
         </div>
      )
   }

   return (
      <div className="max-w-8xl mx-auto">
         <div className="mb-6">
            <Button variant="ghost" size="sm" asChild>
               <Link href="/dashboard/international-portfolio">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Portfolio
               </Link>
            </Button>
         </div>

         <form className="grid grid-cols-1 lg:grid-cols-3 gap-4" onSubmit={formik.handleSubmit}>
            <div className="lg:col-span-2 space-y-4">
               <Card className="border-0 shadow-sm">
                  <CardHeader>
                     <CardTitle className="text-md">Buy International Stocks</CardTitle>
                     <p className="text-sm text-muted-foreground">Search and purchase stocks from global markets</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex items-center justify-between gap-2">
                        <div className="w-full relative">
                           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                           <Input
                              placeholder="Search by symbol or company name..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-10"
                           />
                        </div>
                        <div className="flex items-center justify-center gap-1">
                           {searchStock && searchStock.length > 0 &&
                              <Button
                                 type="button"
                                 onClick={() => setSearchStock([])}
                                 className="w-auto bg-gray-300 hover:bg-gray-400 text-black"
                              >
                                 Clear
                              </Button>}
                           <Button
                              type="button"
                              onClick={handleSearchStock}
                              className="w-auto"
                           >
                              {loading ? <p className="flex items-center justify-center"><Loader className="w-6 h-6 animate-spin text-black" />Searching....</p> : "Search"}
                           </Button>
                        </div>
                     </div>

                     {searchStock && searchStock.length > 0 ?
                        <div className="space-y-3">
                           {searchStock[0].price === 0 ?
                              <EmptyPage
                                 title="No stock found!"
                                 description="Please check your stock symbol and try again."
                              />
                              :
                              searchStock.map((stock) => (
                                 <div
                                    key={stock.symbol}
                                    onClick={() => {
                                       setSelectedStock(stock);
                                       formik.setFieldValue("stock_id", stock.id);
                                       formik.setFieldValue("buy_price", stock.price);
                                    }}
                                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${selectedStock?.symbol === stock.symbol ? "border-2 border-primary" : ""
                                       }`}
                                 >
                                    <div className="flex items-center justify-between">
                                       <div className="flex items-center space-x-4">
                                          <div className="space-y-2">
                                             <div className="flex items-center space-x-2">
                                                <span className="font-bold text-sm">{stock.symbol}</span>
                                                <Badge variant="outline" className="text-xs">
                                                   NASDAQ
                                                </Badge>
                                             </div>
                                             <p className="text-xs text-muted-foreground">{stock.name}</p>
                                          </div>
                                       </div>
                                       <div className="text-right space-y-2">
                                          <p className="text-sm font-bold">${formatMoney(stock.price)}</p>
                                          <div
                                             className={`flex items-center justify-end text-sm ${stock.change >= 0 ? "text-green-600" : "text-red-600"
                                                }`}
                                          >
                                             {stock.change >= 0 ? (
                                                <TrendingUp className="h-3 w-3 mr-1" />
                                             ) : (
                                                <TrendingDown className="h-3 w-3 mr-1" />
                                             )}
                                             {stock.changePercent >= 0 ? "+" : ""}
                                             {stock.changePercent}%
                                          </div>
                                       </div>
                                    </div>
                                    {selectedStock?.symbol === stock.symbol && (
                                       <div className="mt-4 pt-2 border-t grid grid-cols-3 gap-4 text-sm">
                                          <div className="text-xs space-y-1">
                                             <p className="text-muted-foreground">Market Cap</p>
                                             <p className="font-medium">${2222}</p>
                                          </div>
                                          <div className="text-xs space-y-1">
                                             <p className="text-muted-foreground">P/E Ratio</p>
                                             <p className="font-medium">{22}</p>
                                          </div>
                                          <div className="text-xs space-y-1">
                                             <p className="text-muted-foreground">Volume</p>
                                             <p className="font-medium">{22222}</p>
                                          </div>
                                       </div>
                                    )}
                                 </div>
                              ))}
                        </div>
                        :
                        <div className="space-y-3">
                           {sevenAngleStock && sevenAngleStock.length > 0 && sevenAngleStock.map((stock) => (
                              <div
                                 key={stock.symbol}
                                 onClick={() => {
                                    setSelectedStock(stock);
                                    formik.setFieldValue("stock_id", stock.id);
                                    formik.setFieldValue("buy_price", stock.price);
                                 }}
                                 className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${selectedStock?.symbol === stock.symbol ? "border-2 border-primary" : ""
                                    }`}
                              >
                                 <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                       <div className="space-y-2">
                                          <div className="flex items-center space-x-2">
                                             <span className="font-bold text-sm">{stock.symbol}</span>
                                             <Badge variant="outline" className="text-xs">
                                                NASDAQ
                                             </Badge>
                                          </div>
                                          <p className="text-xs text-muted-foreground">{stock.name}</p>
                                       </div>
                                    </div>
                                    <div className="text-right space-y-2">
                                       <p className="text-sm font-bold">${formatMoney(stock.price)}</p>
                                       <div
                                          className={`flex items-center justify-end text-sm ${stock.change >= 0 ? "text-green-600" : "text-red-600"
                                             }`}
                                       >
                                          {stock.change >= 0 ? (
                                             <TrendingUp className="h-3 w-3 mr-1" />
                                          ) : (
                                             <TrendingDown className="h-3 w-3 mr-1" />
                                          )}
                                          {stock.changePercent >= 0 ? "+" : ""}
                                          {stock.changePercent}%
                                       </div>
                                    </div>
                                 </div>
                                 {selectedStock?.symbol === stock.symbol && (
                                    <div className="mt-4 pt-2 border-t grid grid-cols-3 gap-4 text-sm">
                                       <div className="text-xs space-y-1">
                                          <p className="text-muted-foreground">Market Cap</p>
                                          <p className="font-medium">${2222}</p>
                                       </div>
                                       <div className="text-xs space-y-1">
                                          <p className="text-muted-foreground">P/E Ratio</p>
                                          <p className="font-medium">{22}</p>
                                       </div>
                                       <div className="text-xs space-y-1">
                                          <p className="text-muted-foreground">Volume</p>
                                          <p className="font-medium">{22222}</p>
                                       </div>
                                    </div>
                                 )}
                              </div>
                           ))}
                        </div>
                     }
                  </CardContent>
               </Card>
            </div>

            <div className="lg:col-span-1">
               <Card className="border-0 shadow-sm sticky top-6 space-y-4">
                  <CardHeader className="p-0">
                     <CardTitle className="text-md">Order Summary:</CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                     <div className="space-y-4">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start space-x-2">
                           <DollarSign className="h-4 w-4 text-blue-600 mt-0.5" />
                           <div className="text-sm">
                              <p className="font-medium text-blue-900">Account Balance</p>
                              <p className="text-blue-700 font-bold">${accountBalance}</p>
                           </div>
                        </div>

                        {selectedStock ? (
                           <>
                              <div className="space-y-2">
                                 <Label>Selected Stock <span className="text-rose-500">*</span></Label>
                                 <div className="border rounded-lg p-3 space-y-2">
                                    <p className="font-bold text-sm">{selectedStock.symbol}</p>
                                    <p className="text-sm text-muted-foreground">{selectedStock.name}</p>
                                    <p className="text-sm font-semibold mt-1">${selectedStock.price}</p>
                                 </div>
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor="quantity">Quantity <span className="text-rose-500">*</span></Label>
                                 <Input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    placeholder="Enter shares"
                                    value={formik.values.quantity}
                                    onChange={formik.handleChange}
                                 />
                                 {formik.errors.quantity && (
                                    <label className="text-xs text-red-500">{formik.errors.quantity}11</label>
                                 )}
                                 {formik.errors.buy_price && (
                                    <label className="text-xs text-red-500">{formik.errors.buy_price}</label>
                                 )}
                                 {formik.errors.stock_id && (
                                    <label className="text-xs text-red-500">{formik.errors.stock_id}</label>
                                 )}
                              </div>

                              {formik.values.quantity && (
                                 <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                       <span className="text-muted-foreground">Price per share</span>
                                       <span className="font-medium">${selectedStock.price}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                       <span className="text-muted-foreground">Quantity</span>
                                       <span className="text-sm font-medium">{formik.values.quantity}</span>
                                    </div>
                                    <div className="border-t pt-2 flex justify-between">
                                       <span className="font-medium text-sm">Total Cost</span>
                                       <span className="font-bold text-sm">${totalCost}</span>
                                    </div>
                                 </div>
                              )}

                              {hasInsufficientFunds && formik.values.quantity && (
                                 <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                                    <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                    <div className="text-sm">
                                       <p className="font-medium text-red-900">Insufficient Funds</p>
                                       <p className="text-red-700">
                                          You need ${(totalCost - accountBalance)} more to complete this purchase.
                                       </p>
                                       <Button variant="link" size="sm" className="text-red-700 p-0 h-auto mt-1" asChild>
                                          <Link href="/dashboard/international-portfolio/top-up">Top up your account</Link>
                                       </Button>
                                    </div>
                                 </div>
                              )}

                              <Button
                                 type="submit"
                                 disabled={!formik.values.quantity || formik.values.quantity <= 0 || hasInsufficientFunds}
                                 className="flex items-center gap-2 w-full"
                              >
                                 {formik.isSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="h-4 w-4" />}
                                 {formik.isSubmitting ? "Buying..." : "Buy Now"}
                              </Button>
                           </>
                        ) : (
                           <div className="text-center py-8 text-muted-foreground">
                              <Building2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                              <p className="text-sm">Select a stock to continue</p>
                           </div>
                        )}
                     </div>
                  </CardContent>
               </Card>
            </div>
         </form>
      </div >
   )
}
