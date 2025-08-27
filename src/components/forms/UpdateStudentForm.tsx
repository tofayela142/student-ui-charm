import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, X } from "lucide-react";
import { soundManager } from "@/utils/sound";

interface Student {
  id: string;
  name: string;
  mobile: string;
  email: string;
  grade?: string;
}

interface UpdateStudentFormProps {
  onClose: () => void;
  students: Student[];
  onUpdateStudent: (studentId: string, updatedData: Partial<Student>) => void;
}

export const UpdateStudentForm = ({ onClose, students, onUpdateStudent }: UpdateStudentFormProps) => {
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    grade: ""
  });

  const handleStudentSelect = (studentId: string) => {
    setSelectedStudentId(studentId);
    const student = students.find(s => s.id === studentId);
    if (student) {
      setFormData({
        name: student.name,
        mobile: student.mobile,
        email: student.email,
        grade: student.grade || ""
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) return;
    
    soundManager.play('success');
    onUpdateStudent(selectedStudentId, formData);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <CardHeader className="gradient-primary text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Edit className="w-5 h-5" />
              <CardTitle>Update Student</CardTitle>
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
              <Label htmlFor="student" className="text-sm font-medium">Select Student</Label>
              <Select value={selectedStudentId} onValueChange={handleStudentSelect}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose a student to update" />
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

            {selectedStudentId && (
              <>
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Enter student name"
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="mobile" className="text-sm font-medium">Mobile Number</Label>
                  <Input
                    id="mobile"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    placeholder="+1234567890"
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="student@email.com"
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="grade" className="text-sm font-medium">Grade</Label>
                  <Select value={formData.grade} onValueChange={(value) => handleInputChange('grade', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C+">C+</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                      <SelectItem value="F">F</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
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
                disabled={!selectedStudentId}
                onMouseEnter={() => soundManager.play('hover')}
              >
                Update Student
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};