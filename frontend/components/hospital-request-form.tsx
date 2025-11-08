"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/contexts/auth"
import { requestApi } from "@/lib/api"

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
const urgencyLevels = ["Low", "Medium", "High", "Critical"]

export function HospitalRequestForm() {
  const router = useRouter()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    hospital_name: "",
    blood_type: "",
    units: "",
    urgency: "",
    reason: "",
    contact_person: "",
    phone: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await requestApi.create({
        hospital_name: formData.hospital_name,
        blood_type: formData.blood_type,
        units: parseInt(formData.units),
        urgency: formData.urgency,
        reason: formData.reason,
        contact_person: formData.contact_person,
        phone: formData.phone,
      })

      setIsSubmitted(true)
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Failed to submit request")
    } finally {
      setIsLoading(false)
    }
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
            <p className="text-gray-600">Redirecting to dashboard...</p>
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
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="hospital_name" className="text-black">Hospital Name</Label>
            <Input
              id="hospital_name"
              placeholder="Enter hospital name"
              value={formData.hospital_name}
              onChange={(e) => handleChange("hospital_name", e.target.value)}
              required
              className="border-gray-300 focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="blood_type" className="text-black">Blood Type Needed</Label>
            <Select value={formData.blood_type} onValueChange={(value) => handleChange("blood_type", value)} required>
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
            <Label htmlFor="units" className="text-black">Units Required</Label>
            <Input
              id="units"
              type="number"
              placeholder="Number of units"
              value={formData.units}
              onChange={(e) => handleChange("units", e.target.value)}
              required
              min="1"
              className="border-gray-300 focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="urgency" className="text-black">Urgency Level</Label>
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
            <Label htmlFor="reason" className="text-black">Reason (Optional)</Label>
            <Textarea
              id="reason"
              placeholder="Brief description of the need"
              value={formData.reason}
              onChange={(e) => handleChange("reason", e.target.value)}
              className="border-gray-300 focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact_person" className="text-black">Contact Person</Label>
            <Input
              id="contact_person"
              placeholder="Name of contact person"
              value={formData.contact_person}
              onChange={(e) => handleChange("contact_person", e.target.value)}
              required
              className="border-gray-300 focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-black">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Contact phone number"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
              className="border-gray-300 focus:border-black"
            />
          </div>

          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
