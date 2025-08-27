import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  UserPlus, Search, Trash2, Edit, Users, FileDown, 
  GraduationCap, BookOpen, LogOut, Database 
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  mobile: string;
  email: string;
}

interface TeacherDashboardProps {
  teacherId: string;
  onLogout: () => void;
}

export const TeacherDashboard = ({ teacherId, onLogout }: TeacherDashboardProps) => {
  const [students] = useState<Student[]>([
    { id: "S001", name: "John Doe", mobile: "+1234567890", email: "john@email.com" },
    { id: "S002", name: "Jane Smith", mobile: "+1234567891", email: "jane@email.com" },
    { id: "S003", name: "Mike Johnson", mobile: "+1234567892", email: "mike@email.com" },
  ]);

  const menuItems = [
    { icon: UserPlus, label: "Add Student", color: "text-green-600", bg: "bg-green-50" },
    { icon: Search, label: "Search Student", color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Trash2, label: "Delete Student", color: "text-red-600", bg: "bg-red-50" },
    { icon: Edit, label: "Update Student", color: "text-orange-600", bg: "bg-orange-50" },
    { icon: Users, label: "Show Student", color: "text-purple-600", bg: "bg-purple-50" },
    { icon: FileDown, label: "Export Data", color: "text-orange-600", bg: "bg-orange-50" },
    { icon: GraduationCap, label: "Update Grade", color: "text-yellow-600", bg: "bg-yellow-50" },
    { icon: BookOpen, label: "Course Update", color: "text-yellow-600", bg: "bg-yellow-50" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 gradient-primary rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">SMS: Teacher Section</h1>
                <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()} | Time: {new Date().toLocaleTimeString()}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Teacher ID: {teacherId}</span>
              <Button variant="outline" onClick={onLogout}>
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
                    <Database className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-2">
                <div className="space-y-2">
                  {menuItems.map((item, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      className={`w-full justify-start h-12 ${item.bg} hover:${item.bg} ${item.color} border-l-4 border-l-transparent hover:border-l-current transition-smooth`}
                    >
                      <item.icon className="w-4 h-4 mr-3" />
                      {item.label}
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
                <CardTitle className="text-xl text-gray-800">Student Database</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-red-600">Id</TableHead>
                        <TableHead className="font-semibold text-red-600">Name</TableHead>
                        <TableHead className="font-semibold text-red-600">Mobile No</TableHead>
                        <TableHead className="font-semibold text-red-600">Email Address</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id} className="hover:bg-gray-50 transition-colors">
                          <TableCell className="font-medium">{student.id}</TableCell>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.mobile}</TableCell>
                          <TableCell>{student.email}</TableCell>
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
    </div>
  );
};