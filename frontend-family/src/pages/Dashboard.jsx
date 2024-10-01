import {
    Activity,
    Heart,
    ShieldCheck,
  } from "lucide-react";
  import { Switch } from '@/components/ui/switch';
  import { Checkbox } from '@/components/ui/checkbox';
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
  import Navbar from "../components/Navbar";
  import { CheckCircle, XCircle } from 'lucide-react';
  import { Calendar, Clock, User } from 'lucide-react';
  import { Pill, Bell } from 'lucide-react';
  import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
  import { Phone, Mail, Video, PhoneCall } from 'lucide-react';
  import { Button } from "@/components/ui/button";
  import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import HeartRateChart from "@/components/LineChart/HeartChart";
import { useEffect, useState } from "react";
  
  
  export default function Dashboard() {
    const [appointments,setAppointments] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/upcoming_appointments').then((res) => {
           return res.json();
        }).then((result) => {
            setAppointments(result.upcoming_appointments)
        }).catch((err) => {
            console.log(err);            
        })
    },[appointments])

    return (
      <div className="main_container">
        <div className="main_screen">
          <div className="flex justify-center h-full">
            <main className="w-[75%]  flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-3xl font-sans">Overview</h1>
                {/* <h1 className="font-bold text-3xl font-serif">Medications</h1> */}
              </div>
              <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                <Card className="bg-gray-100 shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-md font-medium">Heart Rate</CardTitle>
                    {/* <img
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/7524c582986207.5d2e5b8c470e2.gif"
                    alt="Heart Rate Animation"
                    className="w-20 h-20 mt-2" // Adjust width and height as needed
                  /> */}
                    <Heart className="rounded-full bg-purple-500 p-1 text-white w-8 h-8" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">60</div>
                    <p className="text-xs text-muted-foreground">
                      5%+ from previous week
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-100 shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Breathing Rate</CardTitle>
                    <Activity className="rounded-full bg-purple-500 p-1 text-white w-8 h-8" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">17.8</div>
                    <p className="text-xs text-muted-foreground">
                      +20.1% from yesterday
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-gray-100 shadow-md">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">spO2 Levels</CardTitle>
                    <ShieldCheck className="rounded-full bg-purple-500 p-1 text-white w-8 h-8" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">98.2</div>
                    <p className="text-xs text-muted-foreground">
                      -14% from last week
                    </p>
                  </CardContent>
                </Card>
  
              </div>
              <div className="flex justify-between items-center">
                <h1 className="font-bold text-3xl font-sans">Analytics</h1>
                {/* <h1 className="font-bold text-3xl font-serif">Medications</h1> */}
              </div>
              <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
  
  
              <Card className="w-full max-w-2xl mx-auto">
                <CardHeader className="bg-gray-100">
                    <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-bold">Appointments</CardTitle>
                  <Button className = "border-2 border-purple-400 bg-white text-purple-800 hover:text-white hover:bg-purple-400">Add New</Button>
                  </div>
                  <CardDescription className="text-gray-500">Keep track of appointments of your loved ones.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        {/* <TableHead className="text-right">Status</TableHead> */}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments.map((appointment) => (
                        <TableRow key={appointment.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <User className="mr-2 h-4 w-4" />
                              {appointment.doctor_name}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4" />
                              {appointment.date}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4" />
                              {appointment.time}
                            </div>
                          </TableCell>
                          
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
                <HeartRateChart />
               
                
                
  
              </div>
            </main>
            
          </div>
        </div>
      </div>
    );
  }
  