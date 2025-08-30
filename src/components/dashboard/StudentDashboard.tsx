import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, Search, Clock, GraduationCap, 
  BookOpen, LogOut, Bell, ArrowLeft
} from "lucide-react";
import { soundManager } from "@/utils/sound";
import { SearchStudentForm } from "@/components/forms/SearchStudentForm";
import { StudentProfileForm } from "@/components/forms/StudentProfileForm";
import { AttendanceTrackerForm } from "@/components/forms/AttendanceTrackerForm";
import { ResultViewForm } from "@/components/forms/ResultViewForm";
import { CourseRegistrationForm } from "@/components/forms/CourseRegistrationForm";
import { NotificationForm } from "@/components/forms/NotificationForm";
import { Badge } from "@/components/ui/badge";

interface StudentDashboardProps {
  studentId: string;
  onLogout: () => void;
  onBack?: () => void;
}

export const StudentDashboard = ({ studentId, onLogout, onBack }: StudentDashboardProps) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const unreadNotifications = 3;

  const menuItems = [
    { icon: User, label: "Student Profile", color: "text-blue-600", bg: "bg-blue-50", gradient: "from-blue-400 to-cyan-500" },
    { icon: Search, label: "Search Student", color: "text-green-600", bg: "bg-green-50", gradient: "from-green-400 to-emerald-500" },
    { icon: Clock, label: "Attendance Tracker", color: "text-orange-600", bg: "bg-orange-50", gradient: "from-orange-400 to-yellow-500" },
    { icon: GraduationCap, label: "Show Result", color: "text-purple-600", bg: "bg-purple-50", gradient: "from-purple-400 to-pink-500" },
    { icon: BookOpen, label: "Course Registration", color: "text-teal-600", bg: "bg-teal-50", gradient: "from-teal-400 to-green-500" },
  ];

  const handleButtonClick = (label: string) => {
    soundManager.play('click');
    setActiveModal(label);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 gradient-primary rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SMS: Student Section</h1>
                <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()} | Time: {new Date().toLocaleTimeString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Student ID: {studentId}</span>
              
              <Button 
                variant="outline"
                onClick={() => {
                  soundManager.play('click');
                  setActiveModal('Notifications');
                }}
                className="relative hover:bg-blue-50 hover:border-blue-300 transition-smooth"
                onMouseEnter={() => soundManager.play('hover')}
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
                {unreadNotifications > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center">
                    {unreadNotifications}
                  </Badge>
                )}
              </Button>

              {onBack && (
                <Button variant="outline" onClick={() => { soundManager.play('click'); onBack(); }} className="hover:bg-primary/10 hover:border-primary transition-smooth">
                  <ArrowLeft className="w-4 h-4 mr-2" />Back
                </Button>
              )}
              <Button variant="outline" onClick={() => { soundManager.play('click'); onLogout(); }} className="hover:bg-destructive/10 hover:border-destructive hover:text-destructive transition-smooth">
                <LogOut className="w-4 h-4 mr-2" />Exit
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden" onClick={() => handleButtonClick(item.label)} onMouseEnter={() => soundManager.play('hover')}>
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              <CardHeader className={`${item.bg} group-hover:bg-opacity-80 transition-colors duration-300`}>
                <div className="flex items-center space-x-3">
                  <div className={`p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform duration-200`}>
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                  </div>
                  <CardTitle className="text-lg text-gray-800 group-hover:text-gray-900">{item.label}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                  {item.label === "Student Profile" && "View and edit your personal information"}
                  {item.label === "Search Student" && "Search for any registered student in the database"}
                  {item.label === "Attendance Tracker" && "Track your attendance percentage across all courses"}
                  {item.label === "Show Result" && "View your CT and semester results with CGPA"}
                  {item.label === "Course Registration" && "Register for new courses and view enrolled courses"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modals */}
      {activeModal === "Student Profile" && <StudentProfileForm onClose={() => setActiveModal(null)} studentId={studentId} />}
      {activeModal === "Search Student" && <SearchStudentForm onClose={() => setActiveModal(null)} />}
      {activeModal === "Attendance Tracker" && <AttendanceTrackerForm onClose={() => setActiveModal(null)} studentId={studentId} />}
      {activeModal === "Show Result" && <ResultViewForm onClose={() => setActiveModal(null)} studentId={studentId} />}
      {activeModal === "Course Registration" && <CourseRegistrationForm onClose={() => setActiveModal(null)} studentId={studentId} />}
      {activeModal === "Notifications" && <NotificationForm onClose={() => setActiveModal(null)} studentId={studentId} />}
    </div>
  );
};