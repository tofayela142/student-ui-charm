import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Database, Search, Users, Trophy, 
  BookOpen, GraduationCap, LogOut, User, Clock, ArrowLeft
} from "lucide-react";
import { soundManager } from "@/utils/sound";
import { AttendanceForm } from "@/components/forms/AttendanceForm";
import { CourseManagementForm } from "@/components/forms/CourseManagementForm";
import { useToast } from "@/hooks/use-toast";

interface Course {
  id: string;
  name: string;
  instructor: string;
  credits: number;
  status: string;
}

interface StudentDashboardProps {
  studentId: string;
  onLogout: () => void;
  onBack?: () => void;
}

export const StudentDashboard = ({ studentId, onLogout, onBack }: StudentDashboardProps) => {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([
    { id: "CS101", name: "Computer Science Fundamentals", instructor: "Dr. Smith", credits: 3, status: "Enrolled" },
    { id: "MATH201", name: "Calculus II", instructor: "Prof. Johnson", credits: 4, status: "Enrolled" },
    { id: "ENG101", name: "English Composition", instructor: "Dr. Brown", credits: 3, status: "Completed" },
  ]);

  const [activeModal, setActiveModal] = useState<string | null>(null);
  
  // Mock student data for forms
  const studentData = { 
    id: studentId, 
    name: "Current Student", 
    mobile: "+1234567890", 
    email: "student@email.com" 
  };

  const menuItems = [
    { icon: Database, label: "Connect to Database", color: "text-green-600", bg: "bg-green-50", gradient: "from-green-400 to-emerald-500" },
    { icon: Search, label: "Search Student", color: "text-blue-600", bg: "bg-blue-50", gradient: "from-blue-400 to-cyan-500" },
    { icon: Users, label: "Show Student", color: "text-purple-600", bg: "bg-purple-50", gradient: "from-purple-400 to-pink-500" },
    { icon: Clock, label: "Attendance Tracker", color: "text-orange-600", bg: "bg-orange-50", gradient: "from-orange-400 to-red-500" },
    { icon: Trophy, label: "Show Result", color: "text-yellow-600", bg: "bg-yellow-50", gradient: "from-yellow-400 to-orange-500" },
    { icon: BookOpen, label: "Course Registration", color: "text-indigo-600", bg: "bg-indigo-50", gradient: "from-indigo-400 to-purple-500" },
    { icon: GraduationCap, label: "Your Allocated Course", color: "text-purple-600", bg: "bg-purple-50", gradient: "from-purple-400 to-pink-500" },
  ];

  const handleButtonClick = (label: string) => {
    soundManager.play('click');
    
    if (label === "Connect to Database") {
      toast({
        title: "Database Connected",
        description: "Successfully connected to the student database.",
      });
    } else if (label === "Show Result") {
      toast({
        title: "Academic Results",
        description: "Overall GPA: 3.8/4.0 | Current Semester: 3.9/4.0",
      });
    } else {
      setActiveModal(label);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 gradient-secondary rounded-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SMS: Student Section</h1>
                <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()} | Time: {new Date().toLocaleTimeString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Student ID: {studentId}</span>
              {onBack && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    soundManager.play('click');
                    onBack();
                  }}
                  className="hover:bg-primary/10 hover:border-primary transition-smooth"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={() => {
                  soundManager.play('click');
                  onLogout();
                }}
                className="hover:bg-destructive/10 hover:border-destructive hover:text-destructive transition-smooth"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Exit
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Menu */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 gradient-tech rounded-lg">
                    <BookOpen className="w-5 h-5 text-secondary" />
                  </div>
                  <CardTitle className="text-lg">Student Portal</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-2">
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      onClick={() => handleButtonClick(item.label)}
                      onMouseEnter={() => soundManager.play('hover')}
                      className={`w-full justify-start h-14 group relative overflow-hidden ${item.bg} hover:${item.bg} ${item.color} border-l-4 border-l-transparent hover:border-l-current transition-smooth hover:scale-105 hover:shadow-lg animate-fade-in`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      <item.icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-200" />
                      <span className="font-medium">{item.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Your Enrolled Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-red-600">Course ID</TableHead>
                        <TableHead className="font-semibold text-red-600">Course Name</TableHead>
                        <TableHead className="font-semibold text-red-600">Instructor</TableHead>
                        <TableHead className="font-semibold text-red-600">Credits</TableHead>
                        <TableHead className="font-semibold text-red-600">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {courses.map((course) => (
                        <TableRow key={course.id} className="hover:bg-gray-50 transition-colors">
                          <TableCell className="font-medium">{course.id}</TableCell>
                          <TableCell>{course.name}</TableCell>
                          <TableCell>{course.instructor}</TableCell>
                          <TableCell>{course.credits}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              course.status === 'Enrolled' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {course.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeModal === "Attendance Tracker" && (
        <AttendanceForm
          onClose={closeModal}
          students={[studentData]}
          isTeacher={false}
        />
      )}
      
      {(activeModal === "Course Registration" || activeModal === "Your Allocated Course") && (
        <CourseManagementForm
          onClose={closeModal}
          isStudent={true}
        />
      )}
      
      {(activeModal === "Search Student" || activeModal === "Show Student") && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <Card className="w-full max-w-md mx-4 shadow-2xl">
            <CardHeader className="gradient-secondary text-white">
              <div className="flex items-center justify-between">
                <CardTitle>Student Information</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={closeModal}
                  className="text-white hover:bg-white/20"
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <strong>Student ID:</strong> {studentId}
                </div>
                <div>
                  <strong>Name:</strong> Current Student
                </div>
                <div>
                  <strong>Email:</strong> student@email.com
                </div>
                <div>
                  <strong>Enrolled Courses:</strong> {courses.length}
                </div>
                <div>
                  <strong>Current GPA:</strong> 3.8/4.0
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};