import {
    Activity,
    ArrowUpRight,
    CircleUser,
    CloudRain,
    Leaf,
    BarChart,
    Menu,
  } from "lucide-react";
  
  import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar";
  import { Badge } from "@/components/ui/badge";
  import { Button } from "@/components/ui/button";
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { NavLink } from "react-router-dom";
  import Navbar from "@/components/Navbar";
  import Chatbot from "@/components/Chatbot";
  import { AreaChart, Area, XAxis, CartesianGrid } from "recharts";
  
  const chartData = [
    { date: "2024-04-01", value: 222 },
    { date: "2024-04-02", value: 97 },
    { date: "2024-04-03", value: 167 },
    { date: "2024-04-01", value: 222 },
    { date: "2024-04-02", value: 97 },
    { date: "2024-04-03", value: 167 },
    { date: "2024-04-01", value: 222 },
    { date: "2024-04-02", value: 97 },
    { date: "2024-04-03", value: 167 },
    
    // Add more data points as needed
  ];
  
  export default function Dashboard() {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <Navbar />
  
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Crop Health</CardTitle>
                <Leaf className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">
                  Healthy crop growth observed
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Soil Health</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">70%</div>
                <p className="text-xs text-muted-foreground">
                  Nutrient levels are optimal
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Rainfall</CardTitle>
                <CloudRain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1200 mm</div>
                <p className="text-xs text-muted-foreground">
                  Rainfall in the last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Environmental Data</CardTitle>
                <BarChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Moderate</div>
                <p className="text-xs text-muted-foreground">
                  Air quality index is acceptable
                </p>
              </CardContent>
            </Card>
          </div>
  
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Recent Data Updates</CardTitle>
                  <CardDescription>
                    Latest updates on crop and soil health.
                  </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <NavLink href="#">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </NavLink>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data Point</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Crop Growth</TableCell>
                      <TableCell>
                        <Badge className="text-xs" variant="outline">
                          Healthy
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">2023-09-19</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Soil Nutrient Levels</TableCell>
                      <TableCell>
                        <Badge className="text-xs" variant="outline">
                          Optimal
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">2023-09-18</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Rainfall Measurement</TableCell>
                      <TableCell>
                        <Badge className="text-xs" variant="outline">
                          Normal
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">2023-09-17</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Environmental Quality</TableCell>
                      <TableCell>
                        <Badge className="text-xs" variant="outline">
                          Acceptable
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">2023-09-16</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
  
            <Card>
              <CardHeader>
                <CardTitle>Recent Purchases</CardTitle>
                <CardDescription>Overview of recent purchases made.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Fertilizer A</TableCell>
                      <TableCell>10 kg</TableCell>
                      <TableCell className="text-right">2023-09-18</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Seed Variety X</TableCell>
                      <TableCell>200 seeds</TableCell>
                      <TableCell className="text-right">2023-09-17</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Pesticide B</TableCell>
                      <TableCell>5 L</TableCell>
                      <TableCell className="text-right">2023-09-16</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Organic Compost</TableCell>
                      <TableCell>50 kg</TableCell>
                      <TableCell className="text-right">2023-09-15</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
  
            <Card style={{ width: '1470px' }}>
              <CardHeader>
                <CardTitle>Production</CardTitle>
                <CardDescription>Visual representation of production trends over time.</CardDescription>
              </CardHeader>
              <CardContent>
                <AreaChart
                  width={1440}
                  height={300}
                  data={chartData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={0.3} fill="#8884d8" />
                </AreaChart>
              </CardContent>
            </Card>

            <Chatbot />
          </div>
        </main>
      </div>
    );
  }
  