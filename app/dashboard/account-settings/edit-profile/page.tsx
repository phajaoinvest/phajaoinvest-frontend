"use client"

import type React from "react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function EditProfilePage() {
   const router = useRouter()
   const [formData, setFormData] = useState({
      firstName: "John",
      lastName: "Smith",
      username: "",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      bio: "Experienced investor with a focus on technology and growth stocks.",
   })

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      })
   }

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      router.push("/dashboard/account-settings")
   }

   return (
      <div className="space-y-6 px-12">
         <div className="flex items-center space-x-4">
            <Link href="/dashboard/account-settings">
               <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
               </Button>
            </Link>
            <div className="space-y-1">
               <h1 className="text-md font-semibold">Edit Profile Information</h1>
               <p className="text-sm text-muted-foreground">Update your personal details and contact information</p>
            </div>
         </div>

         <form onSubmit={handleSubmit} className="space-y-6">
            <div className="border-0 shadow-sm">
               <div>
                  <div className="flex items-center space-x-6">
                     <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" />
                        <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                           <User className="h-12 w-12" />
                        </AvatarFallback>
                     </Avatar>
                     <div className="space-y-2">
                        <Button type="button" variant="outline" size="sm">
                           <Upload className="h-4 w-4 mr-2" />
                           Upload New Photo
                        </Button>
                        <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max size 2MB.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="border-0 shadow-sm">
               <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                           id="firstName"
                           name="firstName"
                           value={formData.firstName}
                           onChange={handleChange}
                           placeholder="Enter your first name"
                        />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                           id="lastName"
                           name="lastName"
                           value={formData.lastName}
                           onChange={handleChange}
                           placeholder="Enter your last name"
                        />
                     </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="firstName">Username</Label>
                        <Input
                           id="username"
                           name="username"
                           value={formData.username}
                           onChange={handleChange}
                           placeholder="Enter your username"
                        />
                     </div>
                     <div className="space-y-2">
                        <Label htmlFor="lastName">Email</Label>
                        <Input
                           id="email"
                           name="email"
                           value={formData.email}
                           onChange={handleChange}
                           placeholder="Enter your email"
                        />
                     </div>
                  </div>
                  <div className="space-y-2">
                     <Label htmlFor="address">Street Address</Label>
                     <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main Street"
                     />
                  </div>
               </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-4">
               <Link href="/dashboard/account-settings">
                  <Button type="button" variant="outline">
                     Cancel
                  </Button>
               </Link>
               <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Save Changes
               </Button>
            </div>
         </form>
      </div>
   )
}
