import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Droplet, ArrowLeft } from "lucide-react"
import { HospitalRequestForm } from "@/components/hospital-request-form"
import { HospitalRequestsList } from "@/components/hospital-requests-list"

export default function HospitalPage() {
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
            <Link href="/">
              <Button variant="outline" className="border-black text-black hover:bg-gray-100 bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-black mb-2">Hospital Dashboard</h2>
            <p className="text-gray-600">Request blood types and manage your requests</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <HospitalRequestForm />
            <HospitalRequestsList />
          </div>
        </div>
      </main>
    </div>
  )
}
