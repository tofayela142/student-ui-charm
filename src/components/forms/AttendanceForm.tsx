import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, X, Calendar } from "lucide-react";
import { soundManager } from "@/utils/sound";

interface Student {
  id: string;
  name: string;
  mobile: string;
  email: string;
  grade?: string;
}

interface AttendanceRecord {
  studentId: string;
  date: string;
  present: boolean;
}

interface AttendanceFormProps {
  onClose: () => void;
  students: Student[];
  isTeacher?: boolean;
}

export const AttendanceForm = ({ onClose, students, isTeacher = false }: AttendanceFormProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    students.forEach(student => {
      initial[student.id] = true; // Default to present
    });
    return initial;
  });

  // Mock attendance data for student view
  const studentAttendanceData = [
    { date: "2024-01-15", subject: "Computer Science", status: "Present" },
    { date: "2024-01-14", subject: "Mathematics", status: "Present" },
    { date: "2024-01-13", subject: "English", status: "Absent" },
    { date: "2024-01-12", subject: "Physics", status: "Present" },
    { date: "2024-01-11", subject: "Chemistry", status: "Present" },
  ];

  const handleAttendanceChange = (studentId: string, present: boolean) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: present
    }));
  };

  const handleSubmit = () => {
    soundManager.play('success');
    console.log('Attendance submitted:', { date: selectedDate, attendance });
    onClose();
  };

  const getAttendancePercentage = () => {
    const total = studentAttendanceData.length;
    const present = studentAttendanceData.filter(record => record.status === "Present").length;
    return Math.round((present / total) * 100);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-4xl mx-4 shadow-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="gradient-primary text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <CardTitle>
                {isTeacher ? "Attendance Management" : "Attendance Tracker"}
              </CardTitle>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => {
                soundManager.play('click');
                onClose();
              }}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 overflow-y-auto">
          {isTeacher ? (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Calendar className="w-5 h-5 text-gray-600" />
                <div>
                  <label className="text-sm font-medium">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="ml-2 px-3 py-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Student ID</TableHead>
                      <TableHead className="font-semibold">Student Name</TableHead>
                      <TableHead className="font-semibold">Email</TableHead>
                      <TableHead className="font-semibold text-center">Present</TableHead>
                      <TableHead className="font-semibold text-center">Absent</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{student.id}</TableCell>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell className="text-center">
                          <Checkbox
                            checked={attendance[student.id] === true}
                            onCheckedChange={() => handleAttendanceChange(student.id, true)}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox
                            checked={attendance[student.id] === false}
                            onCheckedChange={() => handleAttendanceChange(student.id, false)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    soundManager.play('click');
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  variant="hero"
                  onClick={handleSubmit}
                  onMouseEnter={() => soundManager.play('hover')}
                >
                  Save Attendance
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="gradient-secondary text-white">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">{getAttendancePercentage()}%</div>
                    <div className="text-sm opacity-90">Overall Attendance</div>
                  </CardContent>
                </Card>
                <Card className="gradient-tech">
                  <CardContent className="p-4 text-center text-white">
                    <div className="text-2xl font-bold">
                      {studentAttendanceData.filter(r => r.status === "Present").length}
                    </div>
                    <div className="text-sm opacity-90">Present Days</div>
                  </CardContent>
                </Card>
                <Card className="bg-red-500 text-white">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold">
                      {studentAttendanceData.filter(r => r.status === "Absent").length}
                    </div>
                    <div className="text-sm opacity-90">Absent Days</div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Recent Attendance Record</h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Date</TableHead>
                        <TableHead className="font-semibold">Subject</TableHead>
                        <TableHead className="font-semibold">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {studentAttendanceData.map((record, index) => (
                        <TableRow key={index} className="hover:bg-gray-50">
                          <TableCell>{record.date}</TableCell>
                          <TableCell>{record.subject}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              record.status === 'Present' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {record.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};