import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { BookOpen, X, CreditCard } from "lucide-react";
import { soundManager } from "@/utils/sound";
import { useToast } from "@/hooks/use-toast";

interface CourseRegistrationFormProps {
  onClose: () => void;
  studentId: string;
}

export const CourseRegistrationForm = ({ onClose, studentId }: CourseRegistrationFormProps) => {
  const { toast } = useToast();
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

  const sessions = ["2023-24", "2024-25"];
  const terms = ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];

  // Mock enrolled courses
  const enrolledCourses = [
    { courseId: "CSE101", courseName: "Programming Fundamentals", credits: 3, status: "active", resultPublished: false },
    { courseId: "CSE102", courseName: "Data Structures", credits: 3, status: "completed", resultPublished: true },
    { courseId: "MAT101", courseName: "Calculus I", credits: 3, status: "active", resultPublished: false },
  ];

  // Mock available courses for registration
  const availableCourses = [
    { courseId: "CSE201", courseName: "Object Oriented Programming", credits: 3, fee: 5000 },
    { courseId: "CSE202", courseName: "Database Systems", credits: 3, fee: 5000 },
    { courseId: "MAT201", courseName: "Calculus II", credits: 3, fee: 4500 },
    { courseId: "PHY201", courseName: "Physics II", credits: 3, fee: 4500 },
    { courseId: "ENG201", courseName: "Technical Writing", credits: 2, fee: 3000 },
  ];

  const getStatusColor = (status: string, resultPublished: boolean) => {
    if (status === "completed") return "bg-green-100 text-green-800";
    if (status === "active" && !resultPublished) return "bg-blue-100 text-blue-800";
    return "bg-gray-100 text-gray-800";
  };

  const getStatusText = (status: string, resultPublished: boolean) => {
    if (status === "completed") return "Completed";
    if (status === "active" && !resultPublished) return "Active";
    return "Inactive";
  };

  const handleCourseSelection = (courseId: string, checked: boolean) => {
    if (checked) {
      setSelectedCourses(prev => [...prev, courseId]);
    } else {
      setSelectedCourses(prev => prev.filter(id => id !== courseId));
    }
    soundManager.play('click');
  };

  const calculateTotalFee = () => {
    return selectedCourses.reduce((total, courseId) => {
      const course = availableCourses.find(c => c.courseId === courseId);
      return total + (course?.fee || 0);
    }, 0);
  };

  const handlePayment = () => {
    soundManager.play('success');
    toast({
      title: "Payment Successful!",
      description: `Registration completed for ${selectedCourses.length} courses. Total paid: ৳${calculateTotalFee()}`,
    });
    setSelectedCourses([]);
  };

  const showRegistration = selectedSession && selectedTerm;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-5xl mx-4 shadow-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="gradient-primary text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <CardTitle>Course Registration</CardTitle>
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
          <div className="space-y-6">
            {/* Enrolled Courses */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Your Enrolled Courses</h3>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Course ID</TableHead>
                      <TableHead>Course Name</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {enrolledCourses.map((course) => (
                      <TableRow key={course.courseId}>
                        <TableCell className="font-medium">{course.courseId}</TableCell>
                        <TableCell>{course.courseName}</TableCell>
                        <TableCell>{course.credits}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(course.status, course.resultPublished)}>
                            {getStatusText(course.status, course.resultPublished)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* New Registration Section */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">Register for New Term</h3>
              
              {/* Session and Term Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Session</label>
                  <Select value={selectedSession} onValueChange={setSelectedSession}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select session" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {sessions.map(session => (
                        <SelectItem key={session} value={session}>{session}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Term</label>
                  <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {terms.map(term => (
                        <SelectItem key={term} value={term}>{term}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Available Courses */}
              {showRegistration && (
                <div>
                  <h4 className="font-semibold mb-4">Available Courses for {selectedSession} - {selectedTerm}</h4>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-gray-50">
                          <TableHead className="w-12">Select</TableHead>
                          <TableHead>Course ID</TableHead>
                          <TableHead>Course Name</TableHead>
                          <TableHead>Credits</TableHead>
                          <TableHead>Fee (৳)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {availableCourses.map((course) => (
                          <TableRow key={course.courseId}>
                            <TableCell>
                              <Checkbox
                                checked={selectedCourses.includes(course.courseId)}
                                onCheckedChange={(checked) => 
                                  handleCourseSelection(course.courseId, checked as boolean)
                                }
                              />
                            </TableCell>
                            <TableCell className="font-medium">{course.courseId}</TableCell>
                            <TableCell>{course.courseName}</TableCell>
                            <TableCell>{course.credits}</TableCell>
                            <TableCell>{course.fee.toLocaleString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Payment Section */}
                  {selectedCourses.length > 0 && (
                    <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
                      <h4 className="font-semibold mb-4">Payment Summary</h4>
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between">
                          <span>Selected Courses:</span>
                          <span className="font-medium">{selectedCourses.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Total Credits:</span>
                          <span className="font-medium">
                            {selectedCourses.reduce((total, courseId) => {
                              const course = availableCourses.find(c => c.courseId === courseId);
                              return total + (course?.credits || 0);
                            }, 0)}
                          </span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t pt-2">
                          <span>Total Fee:</span>
                          <span className="text-green-600">৳{calculateTotalFee().toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <Button 
                        onClick={handlePayment}
                        variant="hero"
                        className="w-full"
                        onMouseEnter={() => soundManager.play('hover')}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay Now & Complete Registration
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {!showRegistration && (
                <div className="text-center py-12 text-gray-500">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Please select session and term to view available courses</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};