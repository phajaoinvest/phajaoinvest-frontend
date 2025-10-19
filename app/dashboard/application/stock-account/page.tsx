"use client";

import { useEffect, useState } from "react";
import {
   Globe,
   User,
   CheckCircle,
   ArrowRight,
   ArrowLeft,
   MapPin,
   Building,
   FileText,
   PlusIcon,
   Loader,
} from "lucide-react";
import * as Yup from "yup";
import { useFormik } from "formik";

// components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

import { useCustomerStore } from "@/app/store/useCustomerStore";
import { useToast } from "@/app/utils/toast";
import { postAPI, queryData } from "@/app/api/api";
import { ICountriesResponse, IDistrictsResponse, IProvincesResponse } from "@/interfaces/location";
import { Textarea } from "@/components/ui/textarea";
import { uploadFileToBunnyCDN } from "@/app/utils/upload";
import { useRouter } from "next/navigation";

const steps = [
   { step: 1, title: "Personal Info", icon: User },
   { step: 2, title: "Contact Details", icon: MapPin },
   { step: 3, title: "Employment", icon: Building },
   { step: 4, title: "Review & Submit", icon: CheckCircle },
];

export default function InternationalAccountPage() {
   const router = useRouter();
   const customer = useCustomerStore((state) => state.customer);
   const { errorMessage, successMessage } = useToast();
   const [countryId, setCountryId] = useState<string>("");
   const [provinceId, setProvinceId] = useState<string>("");
   const [currentStep, setCurrentStep] = useState<number>(1);
   const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
   const [countries, setCountries] = useState<ICountriesResponse[] | null>(null);
   const [provinces, setProvinces] = useState<IProvincesResponse[] | null>(null);
   const [districts, setDistricts] = useState<IDistrictsResponse[] | null>(null);

   const fetchCountries = async () => {
      try {
         const res = await queryData({
            url: "/countries",
         });
         if (res.length > 1) {
            setCountries(res);
         }
      } catch (error: any) {
         console.log("Fetch countries failed!", error)
      }
   };

   useEffect(() => {
      fetchCountries();
   }, []);

   const fetchProvinces = async (countryId: string) => {
      try {
         const res = await queryData({
            url: `/provinces?country_id=${countryId}`,
         });
         if (res.length > 0) {
            setProvinces(res);
         }
      } catch (error) {
         console.log("Fetch provinces failed!", error);
      }
   };

   useEffect(() => {
      if (countryId) {
         fetchProvinces(countryId);
      }
   }, [countryId]);

   const fetchDistricts = async (provinceId: string) => {
      try {
         const res = await queryData({
            url: `/districts?province_id=${provinceId}`,
         });
         if (res.length > 0) {
            setDistricts(res);
         }
      } catch (error) {
         console.log("Fetch districts failed!", error);
      }
   };

   useEffect(() => {
      if (provinceId) {
         fetchDistricts(provinceId);
      }
   }, [provinceId]);

   const handleFileUpload = (field: string, file: File | null) => {
      formik.setFieldValue(field, file);
   };

   const nextStep = () => {
      if (currentStep < 4) setCurrentStep(currentStep + 1);
   };

   const prevStep = () => {
      if (currentStep > 1) setCurrentStep(currentStep - 1);
   };

   const hasServices =
      (customer?.services?.length ?? 0) > 0 &&
      customer?.services.some(service =>
         ["international_stock_account", "guaranteed_returns"].includes(service.service_type)
      );


   const getValidationSchema = (hasServices: boolean) => {
      if (hasServices) {
         return Yup.object({
            service_type: Yup.string().required("Account type is required"),
            passport: Yup.mixed<File>()
               .required("Passport is required")
               .test("fileType", "Only PDF, JPG, or PNG files are allowed", (value) => {
                  if (!value) return false;
                  return ["application/pdf", "image/jpeg", "image/png"].includes((value as File).type);
               }),
            bankStatement: Yup.mixed<File>()
               .required("Bank statement is required")
               .test("fileType", "Only PDF, JPG, or PNG files are allowed", (value) => {
                  if (!value) return false;
                  return ["application/pdf", "image/jpeg", "image/png"].includes((value as File).type);
               }),
         });
      }

      return Yup.object({
         service_type: Yup.string().required("Account type is required"),
         first_name: Yup.string().required("First name is required"),
         last_name: Yup.string().required("Last name is required"),
         dob: Yup.string().required("Date of birth is required"),
         nationality: Yup.string().required("Nationality is required"),
         tax_id: Yup.string().required("Tax ID is required"),
         marital_status: Yup.string().required("Marital status is required"),
         passport: Yup.mixed<File>()
            .required("Passport is required")
            .test("fileType", "Only PDF, JPG, or PNG files are allowed", (value) => {
               if (!value) return false;
               return ["application/pdf", "image/jpeg", "image/png"].includes((value as File).type);
            }),
         bankStatement: Yup.mixed<File>()
            .required("Bank statement is required")
            .test("fileType", "Only PDF, JPG, or PNG files are allowed", (value) => {
               if (!value) return false;
               return ["application/pdf", "image/jpeg", "image/png"].includes((value as File).type);
            }),
         email: Yup.string().email("Invalid email").required("Email is required"),
         phone: Yup.string().required("Phone number is required"),
         address: Yup.string().required("Address is required"),
         city: Yup.string().required("City is required"),
         state: Yup.string().required("State is required"),
         postalCode: Yup.string().required("Postal code is required"),
         country: Yup.string().required("Country is required"),
         employmentStatus: Yup.string().required("Employment status is required"),
         employer: Yup.string().required("Employer is required"),
         occupation: Yup.string().required("Occupation is required"),
         annualIncome: Yup.string().required("Annual income is required"),
         investment_experience: Yup.string().required("Investment experience count is required"),
         termsAccepted: Yup.boolean().oneOf([true], "You must accept the terms").required(),
         privacyAccepted: Yup.boolean().oneOf([true], "You must accept the privacy").required(),
      });
   };

   const formik = useFormik({
      initialValues: {
         service_type: "international_stock_account",

         // Personal Info
         first_name: "",
         last_name: "",
         dob: "",
         nationality: "",
         tax_id: "",

         // Contact Info
         email: customer?.email || "",
         phone: customer?.phone_number || "",
         address: "",
         city: "",
         state: "",
         postalCode: "",
         country: "",
         village: "",

         // Employment Info
         employmentStatus: "",
         employer: "",
         occupation: "",
         annualIncome: "",

         // Additional Info
         marital_status: "",
         investment_experience: 0,

         // Documents
         passport: null as File | null,
         bankStatement: null as File | null,

         // Agreements
         termsAccepted: false,
         privacyAccepted: false,
      },
      validationSchema: getValidationSchema(hasServices || false),

      validateOnMount: true,

      onSubmit: async (values, { resetForm, setSubmitting }) => {
         try {
            const passportFile = values.passport;
            const bankStatement = values.bankStatement;

            if (!(passportFile instanceof File) || !(bankStatement instanceof File)) {
               throw new Error("Files are not valid");
            }

            const buffer = Buffer.from(await passportFile.arrayBuffer());
            const url = await uploadFileToBunnyCDN(buffer, passportFile.name, passportFile.type);

            const buffer1 = Buffer.from(await bankStatement.arrayBuffer());
            const url1 = await uploadFileToBunnyCDN(buffer1, bankStatement.name, bankStatement.type);

            const documents = [
               { doc_type: "passport", storage_ref: url },
               { doc_type: "bank_statement", storage_ref: url1 },
            ];

            let formattedData;
            if (hasServices) {
               formattedData = {
                  service_type: "international_stock_account",
                  documents,
               };
            } else {
               formattedData = {
                  service_type: "international_stock_account",
                  documents,
                  kyc: {
                     dob: values.dob,
                     nationality: values.nationality,
                     marital_status: values.marital_status,
                     employment_status: values.employmentStatus,
                     annual_income: values.annualIncome,
                     employer_name: values.employer,
                     occupation: values.occupation,
                     investment_experience: values.investment_experience,
                     tax_id: values.tax_id,
                     fatca_status: "non_us_person",
                  },
                  address: {
                     country_id: values.country,
                     province_id: values.state,
                     district_id: values.city,
                     village: values.village,
                     address_line: values.address,
                     postal_code: values.postalCode,
                  },
               };
            }
            const res = await postAPI({
               url: "/customers/services/apply",
               body: formattedData,
            });

            if (res?.status_code === 201 || 200) {
               successMessage("Application submitted successfully!", 2000);
               resetForm();
               setCurrentStep(1);
               setSubmitSuccess(true);
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

   if (submitSuccess) {
      return (
         <div className="h-auto flex items-center justify-center p-4">
            <div className="max-w-2xl w-full border rounded-lg">
               <div className="rounded-2xl shadow-xl p-8 md:p-12 text-center space-y-4">
                  <div className="flex justify-center">
                     <div className="relative">
                        <div className="absolute inset-0 bg-green-400 rounded-full opacity-20"></div>
                        <div className="relative bg-green-500 rounded-full p-4">
                           <CheckCircle className="w-6 h-6 text-white" />
                        </div>
                     </div>
                  </div>

                  <h1 className="text-md font-bold">
                     Application Submitted Successfully!
                  </h1>

                  <p className="text-sm max-w-lg mx-auto">
                     Your international stock account application has been received. We'll review your documents and get back to you within 2-3 business days.
                  </p>

                  <div className="border rounded-lg p-6 text-left">
                     <h3 className="text-sm font-semibold mb-3 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-blue-600" />
                        What happens next?
                     </h3>
                     <ul className="text-xs space-y-2">
                        <li className="flex items-start">
                           <span className="text-blue-600 mr-2">•</span>
                           <span>Our team will verify your submitted documents</span>
                        </li>
                        <li className="flex items-start">
                           <span className="text-blue-600 mr-2">•</span>
                           <span>You'll receive an email confirmation once approved</span>
                        </li>
                        <li className="flex items-start">
                           <span className="text-blue-600 mr-2">•</span>
                           <span>You can track your application status in your dashboard</span>
                        </li>
                     </ul>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <Button
                        variant="outline"
                        onClick={() => router.push("/international-portfolio")}
                        className="text-xs flex items-center gap-2 bg-primary hover:bg-primary"
                     >
                        <ArrowLeft />
                        Return to Dashboard
                     </Button>
                  </div>
                  <hr />
                  <div>
                     <p className="text-sm">
                        Need help? Contact our support team at{' '}&nbsp;
                        <a href="mailto:support@example.com" className="text-blue-600 hover:text-blue-700 font-medium">
                           support@example.com
                        </a>
                     </p>
                  </div>
               </div>
            </div>
         </div>
      )
   }


   return (
      <div className="space-y-2">
         <div className="text-center py-8 rounded-lg space-y-2">
            <div className="flex items-center justify-center gap-3">
               <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Globe className="h-4 w-4 text-primary" />
               </div>
               <h1 className="text-md font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-foreground">
                  Your Account Application
               </h1>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
               Complete your personal information to open an international stock account
            </p>
         </div>

         {hasServices ?
            <div className="space-y-8">
               <Card>
                  <CardContent className="space-y-6">
                     <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div className="space-y-4 pt-6 border-t">
                           <h3 className="text-md font-semibold flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary" />
                              Required Documents
                           </h3>

                           <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                 <Label htmlFor="passport">
                                    Passport Copy <span className="text-rose-500">*</span>
                                 </Label>
                                 <Input
                                    id="passport"
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) =>
                                       handleFileUpload(
                                          "passport",
                                          e.target.files?.[0] || null
                                       )
                                    }
                                    className="cursor-pointer"
                                 />
                                 <p className="text-xs text-muted-foreground mt-1">
                                    Upload a clear copy of your passport (PDF, JPG, PNG)
                                 </p>
                                 {formik.errors.passport && (
                                    <label className="text-xs text-red-500">{formik.errors.passport}</label>
                                 )}
                              </div>

                              <div className="space-y-1">
                                 <Label htmlFor="bankStatement">
                                    Bank Statement{" "}
                                    <span className="text-rose-500">*</span>
                                 </Label>
                                 <Input
                                    id="bankStatement"
                                    type="file"
                                    accept=".pdf,.jpg,.jpeg,.png"
                                    onChange={(e) =>
                                       handleFileUpload(
                                          "bankStatement",
                                          e.target.files?.[0] || null
                                       )
                                    }
                                    className="cursor-pointer"
                                 />
                                 <p className="text-xs text-muted-foreground mt-1">
                                    Bank statement from last 2 months (in English)
                                 </p>
                                 {formik.errors.bankStatement && (
                                    <label className="text-xs text-red-500">{formik.errors.bankStatement}</label>
                                 )}
                              </div>
                           </div>
                        </div>
                        <div className="flex items-end justify-end">
                           <Button
                              type="submit"
                              disabled={formik.isSubmitting}
                              className="flex items-center gap-2"
                              onClick={() => console.log("Button clicked", formik.errors)}
                           >
                              {formik.isSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : <PlusIcon className="h-4 w-4" />}
                              {formik.isSubmitting ? "Submitting..." : " Submit Application"}
                           </Button>
                        </div>
                     </form>
                  </CardContent>
               </Card>
            </div>
            :
            <div className="max-w-4xl mx-auto space-y-4">
               <div className="space-y-6">
                  <div className="flex justify-between items-center">
                     {steps.map((item) => (
                        <div key={item.step} className="flex items-center">
                           <div className="flex flex-col items-center">
                              <div
                                 className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= item.step
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                    }`}
                              >
                                 {item.icon && <item.icon className="h-4 w-4" />}
                              </div>
                              <span className="text-sm mt-2 text-center">{item.title}</span>
                           </div>
                        </div>
                     ))}
                  </div>
                  <Progress
                     value={(currentStep / steps.length) * 100}
                     className="mb-4"
                  />
               </div>

               <div className="space-y-8">
                  <Card>
                     <CardHeader>
                        <CardTitle className="text-md flex items-center gap-2">
                           {(() => {
                              const IconComponent = steps[currentStep - 1].icon;
                              return IconComponent ? (
                                 <IconComponent className="h-4 w-4 text-primary" />
                              ) : null;
                           })()}
                           Step {currentStep}: {steps[currentStep - 1].title}
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="space-y-6">
                        <form onSubmit={formik.handleSubmit}>
                           {currentStep === 1 && (
                              <div className="space-y-4">
                                 <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                       <Label htmlFor="first_name">
                                          First Name <span className="text-rose-500">*</span>
                                       </Label>
                                       <Input
                                          id="first_name"
                                          name="first_name"
                                          value={formik.values.first_name}
                                          onChange={formik.handleChange}
                                          placeholder="Enter your first name"
                                       />
                                       <Input
                                          type="hidden"
                                          name="service_type"
                                          value="international_stock_account"
                                       />
                                       {formik.errors.first_name && (
                                          <label className="text-xs text-red-500">{formik.errors.first_name}</label>
                                       )}
                                    </div>
                                    <div className="space-y-1">
                                       <Label htmlFor="last_name">
                                          Last Name <span className="text-rose-500">*</span>
                                       </Label>
                                       <Input
                                          id="last_name"
                                          value={formik.values.last_name}
                                          onChange={formik.handleChange}
                                          placeholder="Enter your last name"
                                       />
                                       {formik.errors.last_name && (
                                          <label className="text-xs text-red-500">{formik.errors.last_name}</label>
                                       )}
                                    </div>
                                 </div>

                                 <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                       <Label htmlFor="dob">
                                          Date of Birth <span className="text-rose-500">*</span>
                                       </Label>
                                       <Input
                                          id="dob"
                                          name="dob"
                                          type="date"
                                          value={formik.values.dob}
                                          onChange={formik.handleChange}
                                       />
                                       {formik.errors.dob && (
                                          <label className="text-xs text-red-500">{formik.errors.dob}</label>
                                       )}
                                    </div>
                                    <div className="space-y-1">
                                       <Label htmlFor="nationality">
                                          Nationality <span className="text-rose-500">*</span>
                                       </Label>
                                       <Select
                                          name="nationality"
                                          value={formik.values.nationality}
                                          onValueChange={(value) => formik.setFieldValue("nationality", value)}
                                       >
                                          <SelectTrigger>
                                             <SelectValue placeholder="Select nationality" />
                                          </SelectTrigger>
                                          <SelectContent>
                                             <SelectItem value="us">United States</SelectItem>
                                             <SelectItem value="la">Laos</SelectItem>
                                             <SelectItem value="th">Thailand</SelectItem>
                                             <SelectItem value="vn">Vietnam</SelectItem>
                                             <SelectItem value="other">Other</SelectItem>
                                          </SelectContent>
                                       </Select>

                                       {formik.errors.nationality && (
                                          <label className="text-xs text-red-500">{formik.errors.nationality}</label>
                                       )}
                                    </div>

                                 </div>

                                 <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                       <Label htmlFor="tax_id">
                                          Tax ID / SSN <span className="text-rose-500">*</span>
                                       </Label>
                                       <Input
                                          id="tax_id"
                                          value={formik.values.tax_id}
                                          onChange={formik.handleChange}
                                          placeholder="Enter your tax identification number"
                                       />
                                       {formik.errors.tax_id && (
                                          <label className="text-xs text-red-500">{formik.errors.tax_id}</label>
                                       )}
                                    </div>
                                    <div className="space-y-1">
                                       <Label htmlFor="marital_status">Marital Status <span className="text-rose-500">*</span></Label>
                                       <Select
                                          name="marital_status"
                                          value={formik.values.marital_status}
                                          onValueChange={(value) => formik.setFieldValue("marital_status", value)}
                                       >
                                          <SelectTrigger>
                                             <SelectValue placeholder="Select marital status" />
                                          </SelectTrigger>
                                          <SelectContent>
                                             <SelectItem value="single">Single</SelectItem>
                                             <SelectItem value="married">Married</SelectItem>
                                             <SelectItem value="divorced">Divorced</SelectItem>
                                             <SelectItem value="widowed">Widowed</SelectItem>
                                             <SelectItem value="other">Other</SelectItem>
                                          </SelectContent>
                                       </Select>
                                       {formik.errors.marital_status && (
                                          <label className="text-xs text-red-500">{formik.errors.marital_status}</label>
                                       )}
                                    </div>
                                 </div>

                                 {/* Documents */}
                                 <div className="space-y-4 pt-6 border-t">
                                    <h3 className="text-md font-semibold flex items-center gap-2">
                                       <FileText className="h-4 w-4 text-primary" />
                                       Required Documents
                                    </h3>

                                    <div className="grid md:grid-cols-2 gap-4">
                                       <div className="space-y-1">
                                          <Label htmlFor="passport">
                                             Passport Copy <span className="text-rose-500">*</span>
                                          </Label>
                                          <Input
                                             id="passport"
                                             type="file"
                                             accept=".pdf,.jpg,.jpeg,.png"
                                             onChange={(e) =>
                                                handleFileUpload(
                                                   "passport",
                                                   e.target.files?.[0] || null
                                                )
                                             }
                                             className="cursor-pointer"
                                          />
                                          <p className="text-xs text-muted-foreground mt-1">
                                             Upload a clear copy of your passport (PDF, JPG, PNG)
                                          </p>
                                          {formik.errors.passport && (
                                             <label className="text-xs text-red-500">{formik.errors.passport}</label>
                                          )}
                                       </div>

                                       <div className="space-y-1">
                                          <Label htmlFor="bankStatement">
                                             Bank Statement{" "}
                                             <span className="text-rose-500">*</span>
                                          </Label>
                                          <Input
                                             id="bankStatement"
                                             type="file"
                                             accept=".pdf,.jpg,.jpeg,.png"
                                             onChange={(e) =>
                                                handleFileUpload(
                                                   "bankStatement",
                                                   e.target.files?.[0] || null
                                                )
                                             }
                                             className="cursor-pointer"
                                          />
                                          <p className="text-xs text-muted-foreground mt-1">
                                             Bank statement from last 2 months (in English)
                                          </p>
                                          {formik.errors.bankStatement && (
                                             <label className="text-xs text-red-500">{formik.errors.bankStatement}</label>
                                          )}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           )}

                           {/* Step 2: Contact Information */}
                           {currentStep === 2 && (
                              <div className="space-y-4">
                                 <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                       <Label htmlFor="email">
                                          Email Address <span className="text-rose-500">*</span>
                                       </Label>
                                       <Input
                                          id="email"
                                          type="email"
                                          name="email"
                                          value={formik.values.email}
                                          onChange={formik.handleChange}
                                          placeholder="Enter your email address"
                                       />
                                       {formik.errors.email && (
                                          <label className="text-xs text-red-500">{formik.errors.email}</label>
                                       )}
                                    </div>
                                    <div className="space-y-1">
                                       <Label htmlFor="phone">
                                          Phone Number <span className="text-rose-500">*</span>
                                       </Label>
                                       <Input
                                          id="phone"
                                          name="phone"
                                          value={formik.values.phone}
                                          onChange={formik.handleChange}
                                          placeholder="Enter your phone number"
                                       />
                                       {formik.errors.phone && (
                                          <label className="text-xs text-red-500">{formik.errors.phone}</label>
                                       )}
                                    </div>
                                 </div>

                                 <div className="grid md:grid-cols-3 gap-4">
                                    <div className="space-y-1">
                                       <Label htmlFor="country">
                                          Country <span className="text-rose-500">*</span>
                                       </Label>
                                       <Select
                                          name="country"
                                          value={formik.values.country}
                                          onValueChange={(value) => {
                                             formik.setFieldValue("country", value);
                                             setCountryId(value);
                                          }}
                                       >
                                          <SelectTrigger>
                                             <SelectValue placeholder="Select country" />
                                          </SelectTrigger>
                                          <SelectContent>
                                             {countries?.map((country) => (
                                                <SelectItem key={country.id} value={country.id}>{country.name}</SelectItem>
                                             ))}
                                          </SelectContent>
                                       </Select>
                                       {formik.errors.country && (
                                          <label className="text-xs text-red-500">{formik.errors.country}</label>
                                       )}
                                    </div>
                                    <div className="space-y-1">
                                       <Label htmlFor="state">
                                          State / Province <span className="text-rose-500">*</span>
                                       </Label>
                                       <Select
                                          name="state"
                                          value={formik.values.state}
                                          onValueChange={(value) => {
                                             formik.setFieldValue("state", value);
                                             setProvinceId(value);
                                          }}
                                       >
                                          <SelectTrigger>
                                             <SelectValue placeholder="Select province" />
                                          </SelectTrigger>
                                          <SelectContent>
                                             {provinces && provinces?.map((province) => (
                                                <SelectItem key={province.id} value={province.id}>{province.name}</SelectItem>
                                             ))}
                                          </SelectContent>
                                       </Select>
                                       {formik.errors.state && (
                                          <label className="text-xs text-red-500">{formik.errors.state}</label>
                                       )}
                                    </div>
                                    <div className="space-y-1">
                                       <Label htmlFor="state">
                                          City / District <span className="text-rose-500">*</span>
                                       </Label>
                                       <Select
                                          name="state"
                                          value={formik.values.city}
                                          onValueChange={(value) => formik.setFieldValue("city", value)}
                                       >
                                          <SelectTrigger>
                                             <SelectValue placeholder="Select district" />
                                          </SelectTrigger>
                                          <SelectContent>
                                             {districts && districts?.map((district) => (
                                                <SelectItem key={district.id} value={district.id}>{district.name}</SelectItem>
                                             ))}
                                          </SelectContent>
                                       </Select>
                                       {formik.errors.city && (
                                          <label className="text-xs text-red-500">{formik.errors.city}</label>
                                       )}
                                    </div>
                                 </div>
                                 <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                       <Label htmlFor="village">
                                          Village <span className="text-rose-500">*</span>
                                       </Label>
                                       <Input
                                          id="village"
                                          name="village"
                                          value={formik.values.village}
                                          onChange={formik.handleChange}
                                          placeholder="Enter postal code"
                                       />
                                       {formik.errors.village && (
                                          <label className="text-xs text-red-500">{formik.errors.village}</label>
                                       )}
                                    </div>
                                    <div className="space-y-1">
                                       <Label htmlFor="postalCode">
                                          Postal Code <span className="text-rose-500">*</span>
                                       </Label>
                                       <Input
                                          id="postalCode"
                                          name="postalCode"
                                          value={formik.values.postalCode}
                                          onChange={formik.handleChange}
                                          placeholder="Enter postal code"
                                       />
                                       {formik.errors.postalCode && (
                                          <label className="text-xs text-red-500">{formik.errors.postalCode}</label>
                                       )}
                                    </div>
                                 </div>

                                 <div className="space-y-1">
                                    <Label htmlFor="address">
                                       Address <span className="text-rose-500">*</span>
                                    </Label>
                                    <Textarea
                                       id="address"
                                       name="address"
                                       value={formik.values.address}
                                       onChange={formik.handleChange}
                                       placeholder="Enter your address"
                                    />
                                    {formik.errors.address && (
                                       <label className="text-xs text-red-500">{formik.errors.address}</label>
                                    )}
                                 </div>
                              </div>
                           )}

                           {/* Step 3: Employment Information */}
                           {currentStep === 3 && (
                              <div className="space-y-4">
                                 <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                       <Label htmlFor="employmentStatus">
                                          Employment Status{" "}
                                          <span className="text-rose-500">*</span>
                                       </Label>
                                       <Select
                                          name="employmentStatus"
                                          value={formik.values.employmentStatus}
                                          onValueChange={(value) => formik.setFieldValue("employmentStatus", value)}
                                       >
                                          <SelectTrigger>
                                             <SelectValue placeholder="Select employment status" />
                                          </SelectTrigger>
                                          <SelectContent>
                                             <SelectItem value="employed">Employed</SelectItem>
                                             <SelectItem value="self-employed">
                                                Self-Employed
                                             </SelectItem>
                                             <SelectItem value="unemployed">Unemployed</SelectItem>
                                             <SelectItem value="retired">Retired</SelectItem>
                                             <SelectItem value="student">Student</SelectItem>
                                          </SelectContent>
                                       </Select>
                                       {formik.errors.employmentStatus && (
                                          <label className="text-xs text-red-500">{formik.errors.employmentStatus}</label>
                                       )}
                                    </div>
                                    <div className="space-y-1">
                                       <Label htmlFor="annualIncome">
                                          Annual Income (USD){" "}
                                          <span className="text-rose-500">*</span>
                                       </Label>
                                       <Select
                                          name="annualIncome"
                                          value={formik.values.annualIncome}
                                          onValueChange={(value) => formik.setFieldValue("annualIncome", value)}
                                       >
                                          <SelectTrigger>
                                             <SelectValue placeholder="Select income range" />
                                          </SelectTrigger>
                                          <SelectContent>
                                             <SelectItem value="under-25k">
                                                Under $25,000
                                             </SelectItem>
                                             <SelectItem value="25k-50k">
                                                $25,000 - $50,000
                                             </SelectItem>
                                             <SelectItem value="50k-100k">
                                                $50,000 - $100,000
                                             </SelectItem>
                                             <SelectItem value="100k-250k">
                                                $100,000 - $250,000
                                             </SelectItem>
                                             <SelectItem value="over-250k">
                                                Over $250,000
                                             </SelectItem>
                                          </SelectContent>
                                       </Select>
                                       {formik.errors.annualIncome && (
                                          <label className="text-xs text-red-500">{formik.errors.annualIncome}</label>
                                       )}
                                    </div>
                                 </div>

                                 <div className="space-y-1">
                                    <Label htmlFor="employer">
                                       Employer Name <span className="text-rose-500">*</span>
                                    </Label>
                                    <Input
                                       required
                                       name="employer"
                                       id="employer"
                                       value={formik.values.employer}
                                       onChange={formik.handleChange}
                                       placeholder="Enter your employer name"
                                    />
                                 </div>

                                 <div className="space-y-1">
                                    <Label htmlFor="occupation">
                                       Occupation <span className="text-rose-500">*</span>
                                    </Label>
                                    <Input
                                       required
                                       id="occupation"
                                       name="occupation"
                                       value={formik.values.occupation}
                                       onChange={formik.handleChange}
                                       placeholder="Enter your occupation"
                                    />
                                 </div>

                                 <div className="space-y-1">
                                    <Label htmlFor="investment_experience">
                                       Investment Experience{" "}
                                       <span className="text-rose-500">*</span>
                                    </Label>
                                    <Select
                                       required
                                       name="investment_experience"
                                       value={String(formik.values.investment_experience ?? "")}
                                       onValueChange={(value) => formik.setFieldValue("investment_experience", Number(value))}
                                    >
                                       <SelectTrigger>
                                          <SelectValue placeholder="Select number of dependents" />
                                       </SelectTrigger>
                                       <SelectContent>
                                          {[...Array(11).keys()].slice(1).map((num) => (
                                             <SelectItem key={num} value={String(num)}>
                                                {num} Years
                                             </SelectItem>
                                          ))}
                                       </SelectContent>
                                    </Select>
                                 </div>
                              </div>
                           )}

                           {/* Step 4: Review & Submit */}
                           {currentStep === 4 && (
                              <div className="space-y-6">
                                 <div>
                                    <h3 className="text-md font-semibold mb-4">
                                       Review Your Information
                                    </h3>
                                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                                       <div>
                                          <h4 className="text-sm font-medium mb-2">
                                             Personal Information
                                          </h4>
                                          <p>
                                             Name: {formik.values.first_name} {formik.values.last_name}
                                          </p>
                                          <p>Date of Birth: {formik.values.dob}</p>
                                          <p>Nationality: {formik.values.nationality}</p>
                                          <p>Tax ID: {formik.values.tax_id}</p>
                                       </div>
                                       <div>
                                          <h4 className="text-sm font-medium mb-2">
                                             Contact Information
                                          </h4>
                                          <p>Email: {formik.values.email}</p>
                                          <p>Phone: {formik.values.phone}</p>
                                          <p>
                                             Address: {formik.values.address}, {formik.values.city}
                                          </p>
                                          <p>Country: {formik.values.country}</p>
                                       </div>
                                    </div>

                                    {/* Document Review Section */}
                                    <div className="mt-6">
                                       <h4 className="text-md font-medium mb-2">
                                          Documents Uploaded
                                       </h4>
                                       <div className="space-y-2 text-sm">
                                          <p className="text-sm flex items-center gap-2">
                                             <FileText className="h-4 w-4" />
                                             Passport:{" "}
                                             {formik.values.passport
                                                ? formik.values.passport.name
                                                : "Not uploaded"}
                                          </p>
                                          <p className="text-sm flex items-center gap-2">
                                             <FileText className="h-4 w-4" />
                                             Bank Statement:{" "}
                                             {formik.values.bankStatement
                                                ? formik.values.bankStatement.name
                                                : "Not uploaded"}
                                          </p>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                       <Checkbox
                                          id="terms"
                                          name="termsAccepted"
                                          checked={formik.values.termsAccepted}
                                          onCheckedChange={(checked) => {
                                             console.log("Terms checked:", checked);
                                             formik.setFieldValue("termsAccepted", checked);
                                          }}
                                       />
                                       <Label htmlFor="terms" className="text-xs">
                                          I agree to the Terms of Service and Account Agreement *
                                       </Label>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                       <Checkbox
                                          id="privacy"
                                          name="privacyAccepted"
                                          checked={formik.values.privacyAccepted}
                                          onCheckedChange={(checked) => formik.setFieldValue("privacyAccepted", checked)}
                                       />
                                       <Label htmlFor="privacy" className="text-xs">
                                          I agree to the Privacy Policy and data processing *
                                       </Label>
                                    </div>
                                 </div>


                                 <div className="bg-muted p-4 rounded-lg">
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                       By submitting this application, you acknowledge that all
                                       information provided is accurate and complete. IBKR will
                                       review your application and may request additional
                                       documentation. Account approval typically takes 2-3
                                       business days.
                                    </p>
                                 </div>
                              </div>
                           )}

                           <div className="flex justify-between pt-6">
                              <Button
                                 variant="outline"
                                 onClick={prevStep}
                                 disabled={currentStep === 1}
                                 className="flex items-center gap-2 bg-transparent"
                              >
                                 <ArrowLeft className="h-4 w-4" />
                                 Previous
                              </Button>

                              {currentStep < 4 ? (
                                 currentStep === 1 ? (
                                    <Button
                                       type="button"
                                       onClick={nextStep}
                                       className="flex items-center gap-2"
                                       disabled={
                                          !formik.values.first_name || !formik.values.last_name || !formik.values.dob
                                          || !formik.values.nationality || !formik.values.tax_id || !formik.values.marital_status
                                          || !formik.values.passport || !formik.values.bankStatement
                                       }
                                    >
                                       Next
                                       <ArrowRight className="h-4 w-4" />
                                    </Button>
                                 ) : currentStep === 2 ? (
                                    <Button
                                       type="button"
                                       onClick={nextStep}
                                       disabled={
                                          !formik.values.first_name || !formik.values.last_name || !formik.values.dob
                                          || !formik.values.nationality || !formik.values.tax_id || !formik.values.marital_status
                                          || !formik.values.passport || !formik.values.bankStatement
                                          || !formik.values.email || !formik.values.phone || !formik.values.address || !formik.values.city
                                          || !formik.values.state || !formik.values.country || !formik.values.postalCode
                                       }
                                       className="flex items-center gap-2"
                                    >
                                       Next
                                       <ArrowRight className="h-4 w-4" />
                                    </Button>
                                 ) : (
                                    <Button
                                       type="button"
                                       onClick={nextStep}
                                       className="flex items-center gap-2"
                                       disabled={
                                          !formik.values.first_name || !formik.values.last_name || !formik.values.dob
                                          || !formik.values.nationality || !formik.values.tax_id || !formik.values.marital_status
                                          || !formik.values.passport || !formik.values.bankStatement
                                          || !formik.values.email || !formik.values.phone || !formik.values.address || !formik.values.city
                                          || !formik.values.state || !formik.values.country || !formik.values.postalCode
                                          || !formik.values.employmentStatus || !formik.values.employer || !formik.values.occupation
                                          || !formik.values.investment_experience || !formik.values.annualIncome
                                       }
                                    >
                                       Next
                                       <ArrowRight className="h-4 w-4" />
                                    </Button>
                                 )
                              ) : (
                                 <Button
                                    type="submit"
                                    disabled={formik.isSubmitting || !formik.values.privacyAccepted || !formik.values.termsAccepted}
                                    className="flex items-center gap-2"
                                    onClick={() => console.log("Button clicked", formik.errors)}
                                 >
                                    {formik.isSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : <PlusIcon className="h-4 w-4" />}
                                    {formik.isSubmitting ? "Submitting..." : " Submit Application"}
                                 </Button>
                              )}
                           </div>
                        </form>
                     </CardContent>
                  </Card>
               </div>
            </div>
         }
      </div >
   );
}
