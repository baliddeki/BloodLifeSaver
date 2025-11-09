"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X } from "lucide-react";
import { requestApi } from "@/lib/api";

interface BloodRequest {
  id: string;
  hospital_name: string;
  blood_type: string;
  units: number;
  urgency: string;
  status: string;
  reason: string | null;
  contact_person: string;
  phone: string;
  created_at: string;
}

const getUrgencyColor = (urgency: string) => {
  switch (urgency) {
    case "Critical":
      return "bg-black text-white";
    case "High":
      return "bg-gray-700 text-white";
    case "Medium":
      return "bg-gray-400 text-white";
    case "Low":
      return "bg-gray-200 text-black";
    default:
      return "bg-gray-200 text-black";
  }
};

export function AdminRequestsList() {
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const response = await requestApi.getAll();
      setRequests(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string, hospitalName: string) => {
    try {
      await requestApi.updateStatus(id, "Approved");
      setRequests(
        requests.map((r) => (r.id === id ? { ...r, status: "Approved" } : r))
      );
    } catch (err: any) {
      alert(`Failed to approve request: ${err.message}`);
    }
  };

  const handleReject = async (id: string, hospitalName: string) => {
    if (
      !confirm(
        `Are you sure you want to reject this request from ${hospitalName}?`
      )
    )
      return;

    try {
      await requestApi.updateStatus(id, "Rejected");
      setRequests(
        requests.map((r) => (r.id === id ? { ...r, status: "Rejected" } : r))
      );
    } catch (err: any) {
      alert(`Failed to reject request: ${err.message}`);
    }
  };

  if (isLoading) {
    return (
      <Card className="border-2 border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-black">Blood Requests</CardTitle>
          <CardDescription className="text-gray-600">
            Loading requests...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-2 border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-black">Blood Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-600">Error: {error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-gray-200 bg-white">
      <CardHeader>
        <CardTitle className="text-black">Blood Requests</CardTitle>
        <CardDescription className="text-gray-600">
          Review and manage hospital blood requests ({requests.length} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {requests.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No requests yet</p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {requests.map((request) => (
              <div
                key={request.id}
                className="border border-gray-200 rounded-lg p-3 hover:border-black transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-black">
                        {request.hospital_name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {request.contact_person}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(request.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getUrgencyColor(request.urgency)}>
                      {request.urgency}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Blood Type</p>
                      <p className="font-medium text-black">
                        {request.blood_type}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Units</p>
                      <p className="font-medium text-black">{request.units}</p>
                    </div>
                  </div>

                  {request.reason && (
                    <div>
                      <p className="text-xs text-gray-500">Reason</p>
                      <p className="text-sm text-gray-700">{request.reason}</p>
                    </div>
                  )}

                  {request.status === "Pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="flex-1 bg-black text-white hover:bg-gray-800"
                        onClick={() =>
                          handleApprove(request.id, request.hospital_name)
                        }
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-black text-black hover:bg-gray-100 bg-transparent"
                        onClick={() =>
                          handleReject(request.id, request.hospital_name)
                        }
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}

                  {request.status === "Approved" && (
                    <Badge className="bg-black text-white w-full justify-center">
                      Approved
                    </Badge>
                  )}

                  {request.status === "Rejected" && (
                    <Badge className="bg-gray-500 text-white w-full justify-center">
                      Rejected
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
