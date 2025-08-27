import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GraduationCap, User, Lock } from "lucide-react";

interface LoginFormProps {
  onLogin: (userType: "student" | "teacher", id: string) => void;
  onRegister: () => void;
}

export const LoginForm = ({ onLogin, onRegister }: LoginFormProps) => {
  const [userType, setUserType] = useState<"student" | "teacher">("student");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id && password) {
      onLogin(userType, id);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 tech-pattern">
      <div className="absolute inset-0 gradient-primary opacity-90" />
      
      {/* Floating geometric elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-16 h-16 border-2 border-accent/30 rotate-45 animate-pulse" />
        <div className="absolute top-40 right-32 w-8 h-8 bg-secondary/20 rounded-full animate-bounce" />
        <div className="absolute bottom-32 left-32 w-12 h-12 border border-accent/40 rounded-full" />
        <div className="absolute bottom-20 right-20 w-6 h-20 bg-gradient-secondary opacity-30 rotate-12" />
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-glow border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full gradient-primary">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
            STUDENT MANAGEMENT SYSTEM
          </h1>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Label htmlFor="userId" className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" />
                  {userType === "student" ? "Student ID" : "Teacher ID"}
                </Label>
                <Input
                  id="userId"
                  type="text"
                  placeholder={`Enter your ${userType} ID`}
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  className="mt-1 transition-smooth focus:ring-primary"
                  required
                />
              </div>

              <div className="relative">
                <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 transition-smooth focus:ring-primary"
                  required
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Select User Type:</Label>
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
            </div>

            <div className="space-y-3">
              <Button type="submit" variant="hero" className="w-full">
                Login
              </Button>
              
              <Button type="button" variant="outline" onClick={onRegister} className="w-full">
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};