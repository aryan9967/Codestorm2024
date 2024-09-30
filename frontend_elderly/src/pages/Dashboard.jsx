import {
  Activity,
  ArrowUpRight,
  CircleUser,
  CloudRain,
  Leaf,
  BarChart,
  Menu,
  Heart,
  ShieldCheck,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import { CheckCircle, XCircle } from 'lucide-react';
import { Calendar, Clock, User } from 'lucide-react';
import { Pill,Bell } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';


export default function Dashboard() {
  const [todos, setTodos] = useState([
    { id: 1, description: "Complete project proposal", isCompleted: false },
    { id: 2, description: "Review code changes", isCompleted: true },
    { id: 3, description: "Prepare presentation slides", isCompleted: false },
    { id: 4, description: "Send progress report", isCompleted: true },
  ]);

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  //Appointments
  const [appointments, setAppointments] = useState([
    { id: 1, doctor: "Dr. Smith", date: "2024-10-05", time: "14:30", specialization: "Cardiologist" },
    { id: 2, doctor: "Dr. Johnson", date: "2024-10-03", time: "10:00", specialization: "Dermatologist" },
    { id: 3, doctor: "Dr. Williams", date: "2024-10-07", time: "16:15", specialization: "Neurologist" },
    { id: 4, doctor: "Dr. Brown", date: "2024-10-01", time: "09:45", specialization: "Pediatrician" },
  ]);

  // Sort appointments by date, latest first
  const sortedAppointments = [...appointments].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Medications
  const [medications, setMedications] = useState([
    { id: 1, name: "Aspirin", time: "17:53", taken: false },
    { id: 2, name: "Lisinopril", time: "17:46", taken: false },
    { id: 3, name: "Metformin", time: "18:00", taken: false },
    { id: 4, name: "Simvastatin", time: "21:00", taken: false },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeAlert, setActiveAlert] = useState(null);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second for more precise notifications

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const checkMedications = () => {
      const currentTimeString = currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
      const medicationDue = medications.find(med => med.time === currentTimeString && !med.taken);
      
      if (medicationDue && !activeAlert) {
        setActiveAlert(medicationDue.id);
        if (audioRef.current) {
          audioRef.current.play();
        }
        // Set a timeout to clear the alert after 1 minute
        setTimeout(() => {
          setActiveAlert(null);
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
          }
        }, 60000);
      }
    };

    checkMedications();
  }, [currentTime, medications, activeAlert]);

  const toggleMedication = (id) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
    if (activeAlert === id) {
      setActiveAlert(null);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  };

  // Sort medications by time
  const sortedMedications = [...medications].sort((a, b) => a.time.localeCompare(b.time));
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex justify-center h-full">
        <main className="w-[75%]  flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-3xl font-serif">Overview</h1>
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
            <h1 className="font-bold text-3xl font-serif">Reminders</h1>
            {/* <h1 className="font-bold text-3xl font-serif">Medications</h1> */}
          </div>
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">

            
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader className="bg-gray-100">
                <CardTitle className="text-2xl font-bold">Todo List</CardTitle>
                <CardDescription className="text-gray-500">Keep track of your tasks and mark them as completed.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader >
                    <TableRow>
                      <TableHead className="w-[50%]">Task</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Toggle</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {todos.map((todo) => (
                      <TableRow key={todo.id} className={todo.isCompleted ? 'bg-green-50' : 'bg-red-50'}>
                        <TableCell className="font-medium">{todo.description}</TableCell>
                        <TableCell>
                          {todo.isCompleted ? (
                            <span className="flex items-center text-green-600">
                              <CheckCircle className="mr-2" size={18} />
                              Completed
                            </span>
                          ) : (
                            <span className="flex items-center text-red-600">
                              <XCircle className="mr-2" size={18} />
                              Pending
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Switch
                            checked={todo.isCompleted}
                            onCheckedChange={() => toggleTodo(todo.id)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card className="w-full max-w-2xl mx-auto  shadow-lg">
              <CardHeader className="bg-gray-100 text-black">
                <CardTitle className="text-2xl font-bold">Upcoming Appointments</CardTitle>
                <CardDescription className="text-gray-500">Your scheduled medical visits</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader >
                    <TableRow>
                      <TableHead className="text-black">Doctor</TableHead>
                      <TableHead className="text-black">Date & Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedAppointments.map((appointment, index) => (
                      <TableRow
                        key={appointment.id}
                        className={`${index % 2 === 0 ? 'bg-purple-50' : 'bg-white'} hover:bg-purple-100 transition-colors`}
                      >
                        <TableCell className="py-4">
                          <div className="flex items-center space-x-2">
                            <User className="text-purple-500" size={18} />
                            <div>
                              <p className="font-medium text-black">{appointment.doctor}</p>
                              <p className="text-sm text-black">{appointment.specialization}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="py-4">
                          <div className="flex flex-col space-y-1">
                            <div className="flex items-center space-x-2 text-black">
                              <Calendar size={18} className="text-purple-600" />
                              <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center space-x-2 ">
                              <Clock size={18} className="text-purple-600" />
                              <span>{appointment.time}</span>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>



            <Chatbot />
          </div>
        </main>
        <div className="w-[25%] h-full flex flex-col justify-start items-start mt-8 py-4">
          <div className="mb-4">
            <h1 className="font-bold text-3xl font-serif">Medications</h1>
            {/* <h1 className="font-bold text-3xl font-serif">Medications</h1> */}
          </div>
          <Card className="w-full max-w-2xl mx-auto bg-purple-100 shadow-lg">
      <CardHeader className="bg-gray-100 text-black">
        <CardTitle className="text-2xl font-bold">Daily Medications</CardTitle>
        <CardDescription className="text-gray-500">Track your medication schedule</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader >
            <TableRow>
              <TableHead className="text-black">Medication</TableHead>
              <TableHead className="text-black">Time</TableHead>
              <TableHead className="text-black text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedMedications.map((medication) => (
              <TableRow 
                key={medication.id} 
                className={`
                  ${medication.id % 2 === 0 ? 'bg-purple-50' : 'bg-white'} 
                  hover:bg-purple-100 transition-colors
                  ${activeAlert === medication.id ? 'animate-pulse bg-yellow-200' : ''}
                `}
              >
                <TableCell className="py-4">
                  <div className="flex items-center space-x-2">
                    <Pill className="text-purple-500" size={18} />
                    <span className="font-medium text-black">{medication.name}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center space-x-2 text-purple-600">
                    <Clock size={18} />
                    <span className="text-black">{medication.time}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <span className={`text-sm ${medication.taken ? 'text-green-500' : 'text-red-500'}`}>
                      {medication.taken ? 'Taken' : 'Not taken'}
                    </span>
                    <Checkbox
                      checked={medication.taken}
                      onCheckedChange={() => toggleMedication(medication.id)}
                      className="data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <audio ref={audioRef} src="/frontend_elderly/public/alarm.mp3" loop /> 
    </Card>
        </div>
      </div>
    </div>
  );
}
