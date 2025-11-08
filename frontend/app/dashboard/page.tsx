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

          {/* Role-specific content */}
          {user.role === "donor" && (
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Your Donor Profile</h3>
                <p className="text-gray-600">Thank you for being a blood donor! Your contributions save lives.</p>
              </div>
            </div>
          )}

          {user.role === "hospital" && (
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Hospital Dashboard</h3>
                <p className="text-gray-600 mb-4">Manage your blood requests and view available donors.</p>
                <Link href="/hospital">
                  <Button className="bg-black text-white hover:bg-gray-800">
                    Create New Request
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {user.role === "admin" && (
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Admin Dashboard</h3>
                <p className="text-gray-600 mb-4">Manage all donors, requests, and system operations.</p>
                <Link href="/admin">
                  <Button className="bg-black text-white hover:bg-gray-800">
                    Go to Admin Panel
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
