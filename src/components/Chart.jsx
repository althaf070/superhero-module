import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
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
        <div style={{ width: "100%", height: "300px" }}>
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="count" 
                fill="#2ECC71" 
                radius={[5, 5, 0, 0]} 
                name="Grievances" 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing grievance counts by type
        </div>
      </CardFooter>
    </Card>
  );
}
