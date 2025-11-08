import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building2, CheckCircle, Clock } from "lucide-react"

const stats = [
  {
    title: "Total Donors",
    value: "1,234",
    icon: Users,
  },
  {
    title: "Active Hospitals",
    value: "45",
    icon: Building2,
  },
  {
    title: "Approved Requests",
    value: "89",
    icon: CheckCircle,
  },
  {
    title: "Pending Requests",
    value: "12",
    icon: Clock,
  },
]

export function AdminStats() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-2 border-gray-200 bg-white hover:border-black transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-black">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
