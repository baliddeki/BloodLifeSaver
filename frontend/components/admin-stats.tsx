"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2, CheckCircle, Clock } from "lucide-react";
import { adminApi } from "@/lib/api";

interface Stats {
  total_donors: number;
  active_hospitals: number;
  approved_requests: number;
  pending_requests: number;
}

export function AdminStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const response = await adminApi.getStats();
      setStats(response.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-2 border-gray-200 bg-white">
            <CardContent className="pt-6">
              <div className="h-16 animate-pulse bg-gray-200 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center p-4">
        Error loading stats: {error}
      </div>
    );
  }

  if (!stats) return null;

  const statsData = [
    {
      title: "Total Donors",
      value: stats.total_donors.toString(),
      icon: Users,
    },
    {
      title: "Active Hospitals",
      value: stats.active_hospitals.toString(),
      icon: Building2,
    },
    {
      title: "Approved Requests",
      value: stats.approved_requests.toString(),
      icon: CheckCircle,
    },
    {
      title: "Pending Requests",
      value: stats.pending_requests.toString(),
      icon: Clock,
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat) => (
        <Card
          key={stat.title}
          className="border-2 border-gray-200 bg-white hover:border-black transition-colors"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-black">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
