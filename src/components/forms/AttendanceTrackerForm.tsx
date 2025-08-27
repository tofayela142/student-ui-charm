import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, X } from "lucide-react";
import { soundManager } from "@/utils/sound";

interface AttendanceTrackerFormProps {
  onClose: () => void;
  studentId: string;
}

export const AttendanceTrackerForm = ({ onClose, studentId }: AttendanceTrackerFormProps) => {
  // Mock attendance data - would come from database
  const attendanceData = [
    { courseId: "CSE101", courseName: "Programming Fundamentals", present: 26, total: 32, percentage: 81.25 },
    { courseId: "CSE102", courseName: "Data Structures", present: 24, total: 30, percentage: 80.00 },
    { courseId: "MAT101", courseName: "Calculus I", present: 22, total: 28, percentage: 78.57 },
    { courseId: "PHY101", courseName: "Physics I", present: 25, total: 30, percentage: 83.33 },
    { courseId: "ENG101", courseName: "English", present: 28, total: 32, percentage: 87.50 }
  ];

  const totalPresent = attendanceData.reduce((sum, course) => sum + course.present, 0);
  const totalClasses = attendanceData.reduce((sum, course) => sum + course.total, 0);
  const overallPercentage = (totalPresent / totalClasses) * 100;

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 85) return "text-green-600";
    if (percentage >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 85) return "bg-green-500";
    if (percentage >= 75) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-2xl mx-4 shadow-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="gradient-primary text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <CardTitle>Attendance Tracker</CardTitle>
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
            {/* Overall Attendance */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Overall Attendance</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Total: {totalPresent}/{totalClasses}</span>
                <span className={`text-lg font-bold ${getPercentageColor(overallPercentage)}`}>
                  {overallPercentage.toFixed(2)}%
                </span>
              </div>
              <Progress value={overallPercentage} className="h-3" />
            </div>

            {/* Course-wise Attendance */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Course-wise Attendance</h3>
              <div className="space-y-4">
                {attendanceData.map((course) => (
                  <div key={course.courseId} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-800">{course.courseId}</h4>
                        <p className="text-sm text-gray-600">{course.courseName}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-lg font-bold ${getPercentageColor(course.percentage)}`}>
                          {course.percentage.toFixed(2)}%
                        </span>
                        <p className="text-sm text-gray-600">{course.present}/{course.total}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress value={course.percentage} className="h-2" />
                      <div 
                        className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-300 ${getProgressColor(course.percentage)}`}
                        style={{ width: `${course.percentage}%` }}
                      />
                    </div>
                    
                    {/* Attendance Status */}
                    <div className="mt-2 flex justify-between text-xs">
                      <span className="text-gray-500">
                        {course.percentage >= 75 ? "✅ Good Standing" : "⚠️ Below Required"}
                      </span>
                      <span className="text-gray-500">
                        Required: 75%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Attendance Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Attendance Summary</h4>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {attendanceData.filter(course => course.percentage >= 85).length}
                  </p>
                  <p className="text-xs text-gray-600">Excellent (≥85%)</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-yellow-600">
                    {attendanceData.filter(course => course.percentage >= 75 && course.percentage < 85).length}
                  </p>
                  <p className="text-xs text-gray-600">Good (75-84%)</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {attendanceData.filter(course => course.percentage < 75).length}
                  </p>
                  <p className="text-xs text-gray-600">Low (&lt;75%)</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};