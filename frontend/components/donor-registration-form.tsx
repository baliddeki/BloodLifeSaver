"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth"
import { donorApi } from "@/lib/api"

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export function DonorRegistrationForm() {
  const router = useRouter()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    blood_type: "",
    last_donation_date: "",
    phone: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // Register user account
      await register(formData.email, formData.password, "donor", formData.name)

      // Register as donor
      await donorApi.register({
        name: formData.name,
        age: parseInt(formData.age),
        blood_type: formData.blood_type,
        last_donation_date: formData.last_donation_date || null,
        phone: formData.phone,
        email: formData.email,
      })

      setIsSubmitted(true)
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (err: any) {
      setError(err.message || "Registration failed")
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
            <h3 className="text-2xl font-bold text-black mb-2">Registration Successful!</h3>
            <p className="text-gray-600">Redirecting to dashboard...</p>
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
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="text-black">Full Name</Label>
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
            <Label htmlFor="email" className="text-black">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
              className="border-gray-300 focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-black">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              required
              minLength={6}
              className="border-gray-300 focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age" className="text-black">Age</Label>
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
            <Label htmlFor="blood_type" className="text-black">Blood Type</Label>
            <Select value={formData.blood_type} onValueChange={(value) => handleChange("blood_type", value)} required>
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
            <Label htmlFor="last_donation_date" className="text-black">Last Donation Date (Optional)</Label>
            <Input
              id="last_donation_date"
              type="date"
              value={formData.last_donation_date}
              onChange={(e) => handleChange("last_donation_date", e.target.value)}
              className="border-gray-300 focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-black">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0700123456"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
              className="border-gray-300 focus:border-black"
            />
          </div>

          <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register as Donor"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
