import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Upload, X } from "lucide-react";
import { soundManager } from "@/utils/sound";

interface StudentProfileFormProps {
  onClose: () => void;
  studentId: string;
}

export const StudentProfileForm = ({ onClose, studentId }: StudentProfileFormProps) => {
  const [profilePic, setProfilePic] = useState<string>("");
  
  // Mock student data - would come from database
  const studentData = {
    id: studentId,
    name: "John Doe",
    email: "john@email.com",
    mobile: "+1234567890",
    session: "2023-24",
    bloodGroup: "A+",
    department: "Computer Science"
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      soundManager.play('success');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-md mx-4 shadow-2xl">
        <CardHeader className="gradient-primary text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5" />
              <CardTitle>Student Profile</CardTitle>
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
          <div className="space-y-6">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profilePic} />
                <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                  {studentData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="profile-upload"
                />
                <Label htmlFor="profile-upload">
                  <Button 
                    variant="outline" 
                    className="cursor-pointer"
                    onClick={() => soundManager.play('click')}
                    asChild
                  >
                    <span>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Picture
                    </span>
                  </Button>
                </Label>
              </div>
            </div>

            {/* Student Details */}
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Student ID</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                  <span className="font-semibold text-primary">{studentData.id}</span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Full Name</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">{studentData.name}</span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Email</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                  <span>{studentData.email}</span>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Mobile</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                  <span>{studentData.mobile}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-600">Session</Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-blue-600">{studentData.session}</span>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-600">Blood Group</Label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-red-600">{studentData.bloodGroup}</span>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-600">Department</Label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-purple-600">{studentData.department}</span>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => {
                soundManager.play('click');
                onClose();
              }}
              variant="hero"
              className="w-full"
              onMouseEnter={() => soundManager.play('hover')}
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};