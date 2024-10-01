import React from 'react';
import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const description = "Average Breath rate per minute trend for the last 7 days";

const chartData = [
  { day: "Monday", breathRate: 17.8 },
  { day: "Tuesday", breathRate: 25.4 },
  { day: "Wednesday", breathRate: 23.7 },
  { day: "Thursday", breathRate: 17.3 },
  { day: "Friday", breathRate: 20.9 },
  { day: "Saturday", breathRate: 21.4 },
  { day: "Sunday", breathRate: 19.6 },
];

export function BreathChart() {
  const minRate = Math.min(...chartData.map(item => item.breathRate));
  const maxRate = Math.max(...chartData.map(item => item.breathRate));
  const avgRate = (chartData.reduce((sum, item) => sum + item.breathRate, 0) / chartData.length).toFixed(1);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Breath Rate Analysis</CardTitle>
        <CardDescription>Last 7 Days</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="day" 
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis 
              label={{ value: 'Breaths per minute', angle: -90, position: 'insideLeft' }}
              domain={[Math.floor(minRate) - 1, Math.ceil(maxRate) + 1]}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="breathRate"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          <TrendingUp className="h-4 w-4" />
          Average: {avgRate} breaths/min
        </div>
        <div className="leading-none text-muted-foreground">
          Range: {minRate.toFixed(1)} - {maxRate.toFixed(1)} breaths/min
        </div>
      </CardFooter>
    </Card>
  );
}