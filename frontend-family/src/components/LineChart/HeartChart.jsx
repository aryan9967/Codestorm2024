import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

const HeartRateChart = () => {
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeartRateData = async () => {
      const ACCESS_TOKEN = import.meta.env.VITE_FITBIT_ACCESS_TOKEN;
      console.log(ACCESS_TOKEN);
      
      const url = 'https://api.fitbit.com/1/user/-/activities/heart/date/today/7d.json';
      const headers = { Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyM1JTMlYiLCJzdWIiOiJCWTVSRkIiLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcm94eSBycHJvIHJudXQgcnNsZSByYWN0IHJyZXMgcmxvYyByd2VpIHJociBydGVtIiwiZXhwIjoxNzI3NzY3MzQzLCJpYXQiOjE3Mjc3Mzg1NDN9.A_YPjuSv2PemA7aBrZ0uQtthK2dhfLfwmvmhgEGf5u0` };

      try {
        console.log("Hello");
        
        const response = await axios.get(url, { headers });
        if (response.status === 200) {
          const formattedData = response.data['activities-heart'].map(item => ({
            date: item.dateTime,
            heartRate: item.value.restingHeartRate || 0
          }));
          setChartData(formattedData);
        } else {
          setError(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
      }
    };

    fetchHeartRateData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle>Heart Rate Analysis</CardTitle>
        <CardDescription>Last 7 Days</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Line type="monotone" dataKey="heartRate" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter>
        <div className="flex items-center">
          <TrendingUp className="mr-2 h-4 w-4 text-muted-foreground text-purple-500" />
          <span className='text-purple-500'>Average heart rate trend for the last 7 days</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default HeartRateChart;