"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { requestApi } from "@/lib/api"
import { useAuth } from "@/contexts/auth"

interface BloodRequest {
  id: string
  hospital_name: string
  blood_type: string
  units: number
  urgency: string
  status: string
  reason: string | null
  contact_person: string
  phone: string
  created_at: string
}

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
      return "bg-green-600 text-white"
    case "Pending":
      return "bg-yellow-500 text-black"
    case "Rejected":
      return "bg-red-600 text-white"
    default:
      return "bg-gray-200 text-black"
  }
}

export function HospitalRequestsList() {
  const { user } = useAuth()
  const [requests, setRequests] = useState<BloodRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      setIsLoading(true)
      const response = await requestApi.getAll()
      
      // Filter requests to show only this hospital's requests
      const hospitalRequests = response.data.filter(
        (request: BloodRequest) => request.hospital_name === user?.name
      )
      
      setRequests(hospitalRequests)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="border-2 border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-black">Your Blood Requests</CardTitle>
          <CardDescription className="text-gray-600">Loading requests...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="border-2 border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-black">Your Blood Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-600">Error: {error}</div>
          <button 
            onClick={fetchRequests}
            className="mt-4 text-black underline"
          >
            Try again
          </button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-2 border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-black">Your Blood Requests</CardTitle>
        <CardDescription className="text-gray-600">
          View and track your blood requests ({requests.length} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No requests submitted yet</p>
            <p className="text-sm text-gray-400">Click "New Request" to create your first blood request</p>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((request) => (
              <div
                key={request.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-black transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-black text-lg">{request.hospital_name}</h4>
                    <p className="text-sm text-gray-600">
                      Submitted: {new Date(request.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </div>

                {request.reason && (
                  <div className="mb-3 p-3 bg-gray-50 rounded">
                    <p className="text-xs text-gray-500 mb-1">Reason</p>
                    <p className="text-sm text-gray-700">{request.reason}</p>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Blood Type</p>
                    <p className="font-medium text-black text-lg">{request.blood_type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Units Needed</p>
                    <p className="font-medium text-black text-lg">{request.units}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Urgency</p>
                    <Badge className={getUrgencyColor(request.urgency)}>{request.urgency}</Badge>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Contact: {request.contact_person}</span>
                    <span>Phone: {request.phone}</span>
                  </div>
                </div>

                {/* Status explanation */}
                {request.status === "Pending" && (
                  <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800">
                    ⏳ This request is awaiting admin approval
                  </div>
                )}
                {request.status === "Approved" && (
                  <div className="mt-3 p-2 bg-green-50 border border-green-200 rounded text-sm text-green-800">
                    ✓ This request has been approved
                  </div>
                )}
                {request.status === "Rejected" && (
                  <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-800">
                    ✗ This request was rejected by admin
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}