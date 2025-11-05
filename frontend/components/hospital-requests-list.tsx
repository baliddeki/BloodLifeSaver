"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
  },
  {
    id: 2,
    hospitalName: "St. Mary's Medical Center",
    bloodType: "AB-",
    units: 2,
    urgency: "Critical",
    status: "Approved",
    date: "2025-01-27",
  },
  {
    id: 3,
    hospitalName: "Regional Health Clinic",
    bloodType: "B+",
    units: 3,
    urgency: "Medium",
    status: "Pending",
    date: "2025-01-26",
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

const getStatusColor = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-black text-white"
    case "Pending":
      return "bg-gray-300 text-black"
    case "Rejected":
      return "bg-gray-500 text-white"
    default:
      return "bg-gray-200 text-black"
  }
}

export function HospitalRequestsList() {
  return (
    <Card className="border-2 border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-black">Your Requests</CardTitle>
        <CardDescription className="text-gray-600">View and track your blood requests</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockRequests.map((request) => (
            <div
              key={request.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-black transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-black">{request.hospitalName}</h4>
                  <p className="text-sm text-gray-600">{request.date}</p>
                </div>
                <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div>
                  <p className="text-xs text-gray-500">Blood Type</p>
                  <p className="font-medium text-black">{request.bloodType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Units</p>
                  <p className="font-medium text-black">{request.units}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Urgency</p>
                  <Badge className={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
