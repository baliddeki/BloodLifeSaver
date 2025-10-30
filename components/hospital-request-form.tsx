"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
const urgencyLevels = ["Low", "Medium", "High", "Critical"]

export function HospitalRequestForm() {
  const [formData, setFormData] = useState({
    hospitalName: "",
    bloodType: "",
    units: "",
    urgency: "",
    reason: "",
    contactPerson: "",
    phone: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Hospital request data:", formData)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        hospitalName: "",
        bloodType: "",
        units: "",
        urgency: "",
        reason: "",
        contactPerson: "",
        phone: "",
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
            <h3 className="text-2xl font-bold text-black mb-2">Request Submitted!</h3>
            <p className="text-gray-600">Your blood request has been sent to the admin for approval.</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-black">New Blood Request</CardTitle>
        <CardDescription className="text-gray-600">Submit a request for blood units</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hospitalName" className="text-black">
              Hospital Name
            </Label>
            <Input
              id="hospitalName"
              placeholder="Enter hospital name"
              value={formData.hospitalName}
              onChange={(e) => handleChange("hospitalName", e.target.value)}
              required
              className="border-gray-300 focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bloodType" className="text-black">
              Blood Type Needed
            </Label>
            <Select value={formData.bloodType} onValueChange={(value) => handleChange("bloodType", value)} required>
              <SelectTrigger className="border-gray-300 focus:border-black">
                <SelectValue placeholder="Select blood type" />
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
            <Label htmlFor="units" className="text-black">
              Number of Units
            </Label>
            <Input
              id="units"
              type="number"
              placeholder="Enter number of units"
              value={formData.units}
              onChange={(e) => handleChange("units", e.target.value)}
              required
              min="1"
              className="border-gray-300 focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="urgency" className="text-black">
              Urgency Level
            </Label>
            <Select value={formData.urgency} onValueChange={(value) => handleChange("urgency", value)} required>
              <SelectTrigger className="border-gray-300 focus:border-black">
                <SelectValue placeholder="Select urgency level" />
              </SelectTrigger>
              <SelectContent>
                {urgencyLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason" className="text-black">
              Reason for Request
            </Label>
            <Textarea
              id="reason"
              placeholder="Describe the reason for this request"
              value={formData.reason}
              onChange={(e) => handleChange("reason", e.target.value)}
              required
              className="border-gray-300 focus:border-black min-h-20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPerson" className="text-black">
              Contact Person
            </Label>
            <Input
              id="contactPerson"
              placeholder="Enter contact person name"
              value={formData.contactPerson}
              onChange={(e) => handleChange("contactPerson", e.target.value)}
              required
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
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
              className="border-gray-300 focus:border-black"
            />
          </div>

          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
            Submit Request
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
