import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, X } from "lucide-react";
import { soundManager } from "@/utils/sound";

interface AddStudentFormProps {
  onClose: () => void;
  onAddStudent: (student: { id: string; name: string; mobile: string; email: string; session: string; bloodGroup: string }) => void;
}

export const AddStudentForm = ({ onClose, onAddStudent }: AddStudentFormProps) => {
  const [formData, setFormData] = useState({
    studentId: "",
    name: "",
    mobile: "",
    email: "",
    session: "",
    bloodGroup: ""
  });

  const sessions = [
    "2006-07", "2007-08", "2008-09", "2009-10", "2010-11", "2011-12", "2012-13", "2013-14", 
    "2014-15", "2015-16", "2016-17", "2017-18", "2018-19", "2019-20", "2020-21", "2021-22", 
    "2022-23", "2023-24", "2024-25", "2025-26"
  ];

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentId || !formData.name || !formData.mobile || !formData.email || !formData.session) return;
    
    soundManager.play('success');
    onAddStudent({
      id: formData.studentId,
      name: formData.name,
      mobile: formData.mobile,
      email: formData.email,
      session: formData.session,
      bloodGroup: formData.bloodGroup
    });
    onClose();
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
              <Label htmlFor="studentId" className="text-sm font-medium">Student ID</Label>
              <Input
                id="studentId"
                value={formData.studentId}
                onChange={(e) => setFormData(prev => ({ ...prev, studentId: e.target.value }))}
                placeholder="Enter student ID (e.g., S001)"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
                onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
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
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="student@email.com"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-medium">Session</Label>
              <Select value={formData.session} onValueChange={(value) => setFormData(prev => ({ ...prev, session: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select session" />
                </SelectTrigger>
                <SelectContent className="max-h-40 overflow-y-auto bg-white">
                  {sessions.map((session) => (
                    <SelectItem key={session} value={session}>{session}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-medium">Blood Group</Label>
              <Select value={formData.bloodGroup} onValueChange={(value) => setFormData(prev => ({ ...prev, bloodGroup: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select blood group (optional)" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {bloodGroups.map((group) => (
                    <SelectItem key={group} value={group}>{group}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                disabled={!formData.studentId || !formData.name || !formData.mobile || !formData.email || !formData.session}
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