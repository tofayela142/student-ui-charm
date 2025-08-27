import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, X } from "lucide-react";
import { soundManager } from "@/utils/sound";

interface AddStudentFormProps {
  onClose: () => void;
  onAddStudent: (student: { id: string; name: string; mobile: string; email: string; grade?: string }) => void;
}

export const AddStudentForm = ({ onClose, onAddStudent }: AddStudentFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    grade: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.play('success');
    
    // Generate student ID
    const studentId = `S${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;
    
    onAddStudent({
      id: studentId,
      ...formData
    });
    
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
              <UserPlus className="w-5 h-5" />
              <CardTitle>Add New Student</CardTitle>
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
              <Label htmlFor="grade" className="text-sm font-medium">Grade (Optional)</Label>
              <Input
                id="grade"
                value={formData.grade}
                onChange={(e) => handleInputChange('grade', e.target.value)}
                placeholder="A, B, C, etc."
                className="mt-1"
              />
            </div>
            
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
                onMouseEnter={() => soundManager.play('hover')}
              >
                Add Student
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};