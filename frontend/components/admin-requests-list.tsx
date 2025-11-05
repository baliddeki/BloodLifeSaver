"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"

// Mock data for demonstration
const mockRequests = [
  {
    id: 1,
    hospitalName: "City General Hospital",
    bloodType: "O+",
    units: 5,
    urgency: "High",
    status: "Pending",
    date: "2025-01-28",
    contactPerson: "Dr. Smith",
  },
  {
    id: 2,
    hospitalName: "St. Mary's Medical Center",
    bloodType: "AB-",
    units: 2,
    urgency: "Critical",
    status: "Pending",
    date: "2025-01-27",
    contactPerson: "Dr. Johnson",
  },
  {
    id: 3,
    hospitalName: "Regional Health Clinic",
    bloodType: "B+",
    units: 3,
    urgency: "Medium",
    status: "Approved",
    date: "2025-01-26",
    contactPerson: "Dr. Williams",
  },
]

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case "Critical":
      return "bg-black text-white"
    case "High":
      return "bg-gray-700 text-white"
    case "Medium":
      return "bg-gray-400 text-white"
    case "Low":
      return "bg-gray-200 text-black"
    default:
      return "bg-gray-200 text-black"
  }
}

export function AdminRequestsList() {
  const handleApprove = (id: number, hospitalName: string) => {
    console.log(`[v0] Approving request ${id} from ${hospitalName}`)
  }

  const handleReject = (id: number, hospitalName: string) => {
    console.log(`[v0] Rejecting request ${id} from ${hospitalName}`)
  }

  return (
    <Card className="border-2 border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-black">Blood Requests</CardTitle>
        <CardDescription className="text-gray-600">Review and manage hospital blood requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {mockRequests.map((request) => (
            <div
              key={request.id}
              className="border border-gray-200 rounded-lg p-3 hover:border-black transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-black">{request.hospitalName}</h4>
                    <p className="text-sm text-gray-600">{request.contactPerson}</p>
                    <p className="text-xs text-gray-500">{request.date}</p>
                  </div>
                  <Badge className={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Blood Type</p>
                    <p className="font-medium text-black">{request.bloodType}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Units</p>
                    <p className="font-medium text-black">{request.units}</p>
                  </div>
                </div>

                {request.status === "Pending" && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-black text-white hover:bg-gray-800"
                      onClick={() => handleApprove(request.id, request.hospitalName)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-black text-black hover:bg-gray-100 bg-transparent"
                      onClick={() => handleReject(request.id, request.hospitalName)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                )}

                {request.status === "Approved" && (
                  <Badge className="bg-black text-white w-full justify-center">Approved</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
