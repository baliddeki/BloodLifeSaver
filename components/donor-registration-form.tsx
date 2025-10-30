"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export function DonorRegistrationForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    bloodType: "",
    lastDonationDate: "",
    phone: "",
    email: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Donor registration data:", formData)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        name: "",
        age: "",
        bloodType: "",
        lastDonationDate: "",
        phone: "",
        email: "",
      })
    }, 3000)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <Card className="border-2 border-black bg-white">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <div className="mb-4 flex justify-center">
              <div className="h-16 w-16 rounded-full bg-black flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-black mb-2">Registration Successful!</h3>
            <p className="text-gray-600">Thank you for registering as a blood donor.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-black">Donor Information</CardTitle>
        <CardDescription className="text-gray-600">Please fill in your details to register</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-black">
              Full Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
              className="border-gray-300 focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="text-black">
              Age
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={formData.age}
              onChange={(e) => handleChange("age", e.target.value)}
              required
              min="18"
              max="65"
              className="border-gray-300 focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bloodType" className="text-black">
              Blood Type
            </Label>
            <Select value={formData.bloodType} onValueChange={(value) => handleChange("bloodType", value)} required>
              <SelectTrigger className="border-gray-300 focus:border-black">
                <SelectValue placeholder="Select your blood type" />
              </SelectTrigger>
              <SelectContent>
                {bloodTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastDonationDate" className="text-black">
              Last Donation Date
            </Label>
            <Input
              id="lastDonationDate"
              type="date"
              value={formData.lastDonationDate}
              onChange={(e) => handleChange("lastDonationDate", e.target.value)}
              className="border-gray-300 focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-black">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
              className="border-gray-300 focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-black">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
              className="border-gray-300 focus:border-black"
            />
          </div>

          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
            Register as Donor
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
