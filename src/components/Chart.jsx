/* eslint-disable react/prop-types */
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function BarChartComponent({ data }) {
 
  const chartData = data.labels.map((label, index) => ({
    category: label, 
    count: data.values[index], 
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grievance Types</CardTitle>
        <CardDescription>Distribution of grievances by type</CardDescription>
      </CardHeader>
      <CardContent>
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#2ECC71" radius={[5, 5, 0, 0]} name="Grievances" />
        </BarChart>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing grievance counts by type
        </div>
      </CardFooter>
    </Card>
  );
}
