"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Droplet } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (!isLoading && user) {
      // Route to role-specific dashboards
      if (user.role === "hospital") {
        router.push("/hospital/dashboard")
      } else if (user.role === "admin") {
        router.push("/admin")
      }
      // Donors stay on this page
    }
  }, [user, isLoading, router])

  if (isLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Droplet className="h-8 w-8 text-black" />
              <h1 className="text-2xl font-bold text-black">BloodLifeSaver</h1>
            </Link>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-black text-black hover:bg-gray-100"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">Welcome, {user.name}!</h2>
            <p className="text-gray-600">Role: {user.role.toUpperCase()}</p>
          </div>

          {/* Donor-specific content */}
          {user.role === "donor" && (
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
                <h3 className="text-xl font-semibold mb-2 text-black">Your Donor Profile</h3>
                <p className="text-gray-600 mb-4">Thank you for being a blood donor! Your contributions save lives.</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Status:</strong> Active Donor</p>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-lg border-2 border-gray-200">
                <h3 className="text-xl font-semibold mb-2 text-black">How It Works</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Your information is stored in our donor database</li>
                  <li>Hospitals can view available donors by blood type</li>
                  <li>When there's a match, hospitals will contact you directly</li>
                  <li>You decide when you're available to donate</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}