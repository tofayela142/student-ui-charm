import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowLeft, User, Lock, IdCard } from "lucide-react";

interface RegisterFormProps {
  onBack: () => void;
  onRegister: (userType: "student" | "teacher", data: { id: string; name: string; password: string }) => void;
}

export const RegisterForm = ({ onBack, onRegister }: RegisterFormProps) => {
  const [userType, setUserType] = useState<"student" | "teacher">("student");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id && name && password) {
      onRegister(userType, { id, name, password });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 tech-pattern">
      <div className="absolute inset-0 gradient-secondary opacity-90" />
      
      <Card className="w-full max-w-md relative z-10 shadow-glow border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={onBack} className="p-2">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold">Register New User</h1>
            <div className="w-9" />
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">Select User Type</Label>
              <RadioGroup value={userType} onValueChange={(value: "student" | "teacher") => setUserType(value)}>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student" className="cursor-pointer">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="teacher" id="teacher" />
                    <Label htmlFor="teacher" className="cursor-pointer">Teacher</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="userId" className="text-sm font-medium flex items-center gap-2">
                  <IdCard className="w-4 h-4 text-primary" />
                  {userType === "student" ? "StudentID" : "TeacherID"}
                </Label>
                <Input
                  id="userId"
                  type="text"
                  placeholder={`Enter ${userType} ID`}
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="mt-1 transition-smooth focus:ring-primary"
                  required
                />
              </div>

              <div>
                <Label htmlFor="name" className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  Name
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 transition-smooth focus:ring-primary"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 transition-smooth focus:ring-primary"
                  required
                />
              </div>
            </div>

            <Button type="submit" variant="hero" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};