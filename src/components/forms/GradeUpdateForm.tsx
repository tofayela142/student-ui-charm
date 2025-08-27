import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, X } from "lucide-react";
import { soundManager } from "@/utils/sound";

interface Student {
  id: string;
  name: string;
  mobile: string;
  email: string;
  grade?: string;
}

interface GradeUpdateFormProps {
  onClose: () => void;
  students: Student[];
  onUpdateGrade: (studentId: string, subject: string, grade: string, marks: number) => void;
}

export const GradeUpdateForm = ({ onClose, students, onUpdateGrade }: GradeUpdateFormProps) => {
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [marks, setMarks] = useState("");

  const subjects = [
    "Computer Science",
    "Mathematics",
    "Physics",
    "Chemistry",
    "English",
    "Biology",
    "History",
    "Geography"
  ];

  const grades = ["A+", "A", "B+", "B", "C+", "C", "D", "F"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId || !subject || !grade || !marks) return;
    
    soundManager.play('success');
    onUpdateGrade(selectedStudentId, subject, grade, parseInt(marks));
    onClose();
  };

  const getGradeFromMarks = (marks: number) => {
    if (marks >= 97) return "A+";
    if (marks >= 93) return "A";
    if (marks >= 90) return "A-";
    if (marks >= 87) return "B+";
    if (marks >= 83) return "B";
    if (marks >= 80) return "B-";
    if (marks >= 77) return "C+";
    if (marks >= 73) return "C";
    if (marks >= 70) return "C-";
    if (marks >= 67) return "D+";
    if (marks >= 65) return "D";
    return "F";
  };

  const handleMarksChange = (value: string) => {
    setMarks(value);
    const marksNum = parseInt(value);
    if (!isNaN(marksNum) && marksNum >= 0 && marksNum <= 100) {
      setGrade(getGradeFromMarks(marksNum));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <CardHeader className="gradient-primary text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-5 h-5" />
              <CardTitle>Update Student Grade</CardTitle>
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
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Select Student</Label>
              <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose a student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student.id} value={student.id}>
                      {student.id} - {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Subject</Label>
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subj) => (
                    <SelectItem key={subj} value={subj}>
                      {subj}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="marks" className="text-sm font-medium">Marks (0-100)</Label>
              <Input
                id="marks"
                type="number"
                min="0"
                max="100"
                value={marks}
                onChange={(e) => handleMarksChange(e.target.value)}
                placeholder="Enter marks"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Grade</Label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Grade will be auto-calculated" />
                </SelectTrigger>
                <SelectContent>
                  {grades.map((gr) => (
                    <SelectItem key={gr} value={gr}>
                      {gr}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {marks && grade && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm text-blue-800">
                  <strong>Preview:</strong> {marks} marks = {grade} grade
                </div>
              </div>
            )}
            
            <div className="flex space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  soundManager.play('click');
                  onClose();
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="hero"
                className="flex-1"
                disabled={!selectedStudentId || !subject || !grade || !marks}
                onMouseEnter={() => soundManager.play('hover')}
              >
                Update Grade
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};