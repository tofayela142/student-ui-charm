import { useState } from "react";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { TeacherDashboard } from "@/components/dashboard/TeacherDashboard";
import { StudentDashboard } from "@/components/dashboard/StudentDashboard";
import { useToast } from "@/hooks/use-toast";

type ViewState = "login" | "register" | "teacher-dashboard" | "student-dashboard";

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewState>("login");
  const [currentUser, setCurrentUser] = useState<{ type: "student" | "teacher"; id: string } | null>(null);
  const { toast } = useToast();

  const handleLogin = (userType: "student" | "teacher", id: string) => {
    setCurrentUser({ type: userType, id });
    setCurrentView(userType === "teacher" ? "teacher-dashboard" : "student-dashboard");
    toast({
      title: "Login Successful",
      description: `Welcome back, ${userType}!`,
    });
  };

  const handleRegister = (userType: "student" | "teacher", data: { id: string; name: string; password: string }) => {
    // In a real app, this would make an API call
    toast({
      title: "Registration Successful",
      description: `Account created for ${data.name}`,
    });
    setCurrentView("login");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView("login");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  switch (currentView) {
    case "login":
      return (
        <LoginForm
          onLogin={handleLogin}
          onRegister={() => setCurrentView("register")}
        />
      );
    case "register":
      return (
        <RegisterForm
          onBack={() => setCurrentView("login")}
          onRegister={handleRegister}
        />
      );
    case "teacher-dashboard":
      return currentUser ? (
        <TeacherDashboard
          teacherId={currentUser.id}
          onLogout={handleLogout}
        />
      ) : null;
    case "student-dashboard":
      return currentUser ? (
        <StudentDashboard
          studentId={currentUser.id}
          onLogout={handleLogout}
        />
      ) : null;
    default:
      return null;
  }
};

export default Index;
