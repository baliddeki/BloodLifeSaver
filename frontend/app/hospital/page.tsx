"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Droplet, Plus } from "lucide-react"
import { useAuth } from "@/contexts/auth"
import { HospitalRequestsList } from "@/components/hospital-requests-list"

export default function HospitalDashboardPage() {
  const router = useRouter()
  const { user, logout, isLoading } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    } else if (!isLoading && user && user.role !== "hospital") {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (isLoading || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (user.role !== "hospital") {
    return null
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
        <div className="max-w-5xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-black mb-2">Welcome, {user.name}!</h2>
                <p className="text-gray-600">Manage your blood requests</p>
              </div>
              <Link href="/hospital">
                <Button className="bg-black text-white hover:bg-gray-800">
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </Link>
            </div>
          </div>

          {/* Requests List */}
          <HospitalRequestsList />
        </div>
      </main>
    </div>
  )
}