import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplet, Building2, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Droplet className="h-8 w-8 text-black" />
              <h1 className="text-2xl font-bold text-black">BloodLifeSaver</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Connecting Donors, Hospitals, and Lives</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            A platform designed to simplify blood donation management by connecting blood donors with hospitals in need.
          </p>
        </div>

        {/* Module Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Donor Card */}
          <Card className="border-2 border-gray-200 bg-white hover:border-black transition-colors">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <Droplet className="h-8 w-8 text-black" />
                </div>
              </div>
              <CardTitle className="text-center text-black">Donor Portal</CardTitle>
              <CardDescription className="text-center text-gray-600">
                Register as a blood donor and help save lives
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link href="/donor">
                <Button className="bg-black text-white hover:bg-gray-800">Register as Donor</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Hospital Card */}
          <Card className="border-2 border-gray-200 bg-white hover:border-black transition-colors">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <Building2 className="h-8 w-8 text-black" />
                </div>
              </div>
              <CardTitle className="text-center text-black">Hospital Portal</CardTitle>
              <CardDescription className="text-center text-gray-600">
                Request blood types and manage your needs
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link href="/hospital">
                <Button className="bg-black text-white hover:bg-gray-800">Hospital Dashboard</Button>
              </Link>
            </CardContent>
          </Card>

          {/* Admin Card */}
          <Card className="border-2 border-gray-200 bg-white hover:border-black transition-colors">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gray-100 rounded-full">
                  <Shield className="h-8 w-8 text-black" />
                </div>
              </div>
              <CardTitle className="text-center text-black">Admin Portal</CardTitle>
              <CardDescription className="text-center text-gray-600">
                Manage donors, requests, and system operations
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Link href="/admin">
                <Button className="bg-black text-white hover:bg-gray-800">Admin Dashboard</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-gray-600">BloodLifeSaver - Connecting donors with hospitals to save lives</p>
        </div>
      </footer>
    </div>
  )
}
