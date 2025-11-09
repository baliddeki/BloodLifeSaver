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
import { Trash2 } from "lucide-react";
import { donorApi } from "@/lib/api";

interface Donor {
  id: string;
  name: string;
  age: number;
  blood_type: string;
  last_donation_date: string | null;
  phone: string;
  email: string;
  created_at: string;
}

export function AdminDonorsList() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      setIsLoading(true);
      const response = await donorApi.getAll();
      setDonors(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      await donorApi.delete(id);
      setDonors(donors.filter((d) => d.id !== id));
    } catch (err: any) {
      alert(`Failed to delete donor: ${err.message}`);
    }
  };

  if (isLoading) {
    return (
      <Card className="border-2 border-gray-200 bg-white">
        <CardHeader>
          <CardTitle className="text-black">Registered Donors</CardTitle>
          <CardDescription className="text-gray-600">
            Loading donors...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded animate-pulse" />
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
          <CardTitle className="text-black">Registered Donors</CardTitle>
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
        <CardTitle className="text-black">Registered Donors</CardTitle>
        <CardDescription className="text-gray-600">
          Manage and view all registered blood donors ({donors.length} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        {donors.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No donors registered yet
          </p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {donors.map((donor) => (
              <div
                key={donor.id}
                className="border border-gray-200 rounded-lg p-3 hover:border-black transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-black">{donor.name}</h4>
                      <Badge className="bg-black text-white">
                        {donor.blood_type}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>Age: {donor.age}</p>
                      <p>
                        Last Donation: {donor.last_donation_date || "Never"}
                      </p>
                      <p>Phone: {donor.phone}</p>
                      <p>Email: {donor.email}</p>
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
        )}
      </CardContent>
    </Card>
  );
}