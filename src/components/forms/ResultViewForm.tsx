import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, X } from "lucide-react";
import { soundManager } from "@/utils/sound";

interface ResultViewFormProps {
  onClose: () => void;
  studentId: string;
}

export const ResultViewForm = ({ onClose, studentId }: ResultViewFormProps) => {
  const [resultType, setResultType] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  const sessions = ["2022-23", "2023-24", "2024-25"];
  const terms = ["1-1", "1-2", "2-1", "2-2", "3-1", "3-2", "4-1", "4-2"];
  const courses = ["CSE101", "CSE102", "MAT101", "PHY101", "ENG101"];

  // Mock results data
  const ctResults = [
    { courseId: "CSE101", courseName: "Programming", ct1: 18, ct2: 20, ct3: 19, total: 57, outOf: 60 },
    { courseId: "CSE102", courseName: "Data Structures", ct1: 17, ct2: 19, ct3: 18, total: 54, outOf: 60 },
    { courseId: "MAT101", courseName: "Calculus", ct1: 16, ct2: 18, ct3: 17, total: 51, outOf: 60 }
  ];

  const semesterResults = [
    { courseId: "CSE101", courseName: "Programming Fundamentals", credits: 3, grade: "A", gpa: 4.0, marks: 92 },
    { courseId: "CSE102", courseName: "Data Structures", credits: 3, grade: "A-", gpa: 3.7, marks: 87 },
    { courseId: "MAT101", courseName: "Calculus I", credits: 3, grade: "B+", gpa: 3.3, marks: 83 },
    { courseId: "PHY101", courseName: "Physics I", credits: 3, grade: "A", gpa: 4.0, marks: 90 },
    { courseId: "ENG101", courseName: "English", credits: 2, grade: "A+", gpa: 4.0, marks: 95 }
  ];

  const calculateGPA = () => {
    const totalCredits = semesterResults.reduce((sum, course) => sum + course.credits, 0);
    const totalGradePoints = semesterResults.reduce((sum, course) => sum + (course.gpa * course.credits), 0);
    return (totalGradePoints / totalCredits).toFixed(2);
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const showResults = resultType && selectedSession && selectedTerm;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-4xl mx-4 shadow-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="gradient-primary text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5" />
              <CardTitle>Show Results</CardTitle>
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
            {/* Filter Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Result Type</label>
                <Select value={resultType} onValueChange={setResultType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="ct">CT Result</SelectItem>
                    <SelectItem value="semester">Semester Result</SelectItem>
                  </SelectContent>
                </Select>
              </div>

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

              {resultType === "ct" && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Course (Optional)</label>
                  <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                    <SelectTrigger>
                      <SelectValue placeholder="All courses" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="">All Courses</SelectItem>
                      {courses.map(course => (
                        <SelectItem key={course} value={course}>{course}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            {/* Results Display */}
            {showResults && (
              <div className="space-y-6">
                {resultType === "ct" && (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">CT Results - {selectedSession} ({selectedTerm})</h3>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead>Course ID</TableHead>
                            <TableHead>Course Name</TableHead>
                            <TableHead>CT-1</TableHead>
                            <TableHead>CT-2</TableHead>
                            <TableHead>CT-3</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Percentage</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ctResults
                            .filter(course => !selectedCourse || course.courseId === selectedCourse)
                            .map((course) => (
                            <TableRow key={course.courseId}>
                              <TableCell className="font-medium">{course.courseId}</TableCell>
                              <TableCell>{course.courseName}</TableCell>
                              <TableCell>{course.ct1}/20</TableCell>
                              <TableCell>{course.ct2}/20</TableCell>
                              <TableCell>{course.ct3}/20</TableCell>
                              <TableCell className="font-semibold">{course.total}/{course.outOf}</TableCell>
                              <TableCell>
                                <Badge variant="secondary">
                                  {((course.total / course.outOf) * 100).toFixed(1)}%
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                )}

                {resultType === "semester" && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Semester Results - {selectedSession} ({selectedTerm})</h3>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Term GPA (TGPA)</p>
                        <p className="text-2xl font-bold text-primary">{calculateGPA()}</p>
                      </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-gray-50">
                            <TableHead>Course ID</TableHead>
                            <TableHead>Course Name</TableHead>
                            <TableHead>Credits</TableHead>
                            <TableHead>Marks</TableHead>
                            <TableHead>Grade</TableHead>
                            <TableHead>GPA</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {semesterResults.map((course) => (
                            <TableRow key={course.courseId}>
                              <TableCell className="font-medium">{course.courseId}</TableCell>
                              <TableCell>{course.courseName}</TableCell>
                              <TableCell>{course.credits}</TableCell>
                              <TableCell>{course.marks}</TableCell>
                              <TableCell>
                                <Badge className={getGradeColor(course.grade)}>
                                  {course.grade}
                                </Badge>
                              </TableCell>
                              <TableCell className="font-semibold">{course.gpa.toFixed(1)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>

                    {/* GPA Summary */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-600">Total Credits</p>
                        <p className="text-2xl font-bold text-blue-600">
                          {semesterResults.reduce((sum, course) => sum + course.credits, 0)}
                        </p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-600">Term GPA (TGPA)</p>
                        <p className="text-2xl font-bold text-green-600">{calculateGPA()}</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg text-center">
                        <p className="text-sm text-gray-600">Cumulative GPA (CGPA)</p>
                        <p className="text-2xl font-bold text-purple-600">3.75</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!showResults && (
              <div className="text-center py-12 text-gray-500">
                <GraduationCap className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Please select result type, session and term to view results</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};