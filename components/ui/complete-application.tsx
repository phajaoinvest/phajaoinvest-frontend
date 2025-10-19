import Link from "next/link";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { AlertCircle, FileText } from "lucide-react";

interface IncompleteApplicationViewProps {
   url: string;
}

export function IncompleteApplicationView({ url }: IncompleteApplicationViewProps) {
   return (
      <div className="flex items-center justify-center min-h-[500px]">
         <Card className="w-full border-0 shadow-lg">
            <CardContent className="text-center space-y-3">
               <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2">
                  <FileText className="h-4 w-4 text-amber-600" />
               </div>
               <h2 className="text-md font-bold">" Complete Your Application "</h2>
               <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
                  To start trading international stocks, you need to complete your account application first. This will
                  give you access to global markets and international investment opportunities.
               </p>
               <div className="flex items-start space-x-3 border border-blue-200 rounded-lg p-4 mb-8 text-left max-w-md mx-auto">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-muted-foreground">
                     <p className="font-medium mb-1">What you'll need:</p>
                     <ul className="list-disc list-inside space-y-1">
                        <li>Personal information and identification documents</li>
                        <li>Proof of address</li>
                        <li>Employment and financial information</li>
                        <li>Tax identification number</li>
                     </ul>
                  </div>
               </div>
               <Button size="lg" className="px-8" asChild>
                  {/* <Link href="/dashboard/application/return-invest"> */}
                  <Link href={url}>
                     <FileText className="h-4 w-4 mr-2" />
                     Complete Application Now
                  </Link>
               </Button>
               <p className="text-sm text-muted-foreground mt-4">Application takes approximately 10-15 minutes</p>
            </CardContent>
         </Card>
      </div>
   )
}