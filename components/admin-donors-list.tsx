"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2 } from "lucide-react"

// Mock data for demonstration
const mockDonors = [
  {
    id: 1,
    name: "John Doe",
    age: 28,
    bloodType: "O+",
    lastDonation: "2024-12-15",
    phone: "+256 700 123 456",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 32,
    bloodType: "AB-",
    lastDonation: "2025-01-10",
    phone: "+256 700 234 567",
  },
  {
    id: 3,
    name: "Michael Johnson",
    age: 45,
    bloodType: "B+",
    lastDonation: "2024-11-20",
    phone: "+256 700 345 678",
  },
  {
    id: 4,
    name: "Sarah Williams",
    age: 26,
    bloodType: "A+",
    lastDonation: "2025-01-05",
    phone: "+256 700 456 789",
  },
]

export function AdminDonorsList() {
  const handleDelete = (id: number, name: string) => {
    console.log(`[v0] Deleting donor ${id}: ${name}`)
  }

  return (
    <Card className="border-2 border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-black">Registered Donors</CardTitle>
        <CardDescription className="text-gray-600">Manage and view all registered blood donors</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {mockDonors.map((donor) => (
            <div key={donor.id} className="border border-gray-200 rounded-lg p-3 hover:border-black transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-black">{donor.name}</h4>
                    <Badge className="bg-black text-white">{donor.bloodType}</Badge>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>Age: {donor.age}</p>
                    <p>Last Donation: {donor.lastDonation}</p>
                    <p>Phone: {donor.phone}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-gray-300 hover:border-black hover:bg-gray-100 bg-transparent"
                  onClick={() => handleDelete(donor.id, donor.name)}
                >
                  <Trash2 className="h-4 w-4 text-gray-600" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
