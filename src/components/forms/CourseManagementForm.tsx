import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, X, Plus, Edit2 } from "lucide-react";
import { soundManager } from "@/utils/sound";

interface Course {
  id: string;
  name: string;
  instructor: string;
  credits: number;
  description: string;
  status: string;
}

interface CourseManagementFormProps {
  onClose: () => void;
  isStudent?: boolean;
}

export const CourseManagementForm = ({ onClose, isStudent = false }: CourseManagementFormProps) => {
  const [courses] = useState<Course[]>([
    {
      id: "CS101",
      name: "Computer Science Fundamentals",
      instructor: "Dr. Smith",
      credits: 3,
      description: "Introduction to programming and computer science concepts",
      status: "Active"
    },
    {
      id: "MATH201",
      name: "Calculus II",
      instructor: "Prof. Johnson",
      credits: 4,
      description: "Advanced calculus including integration and series",
      status: "Active"
    },
    {
      id: "ENG101",
      name: "English Composition",
      instructor: "Dr. Brown",
      credits: 3,
      description: "Academic writing and communication skills",
      status: "Completed"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCourse, setNewCourse] = useState({
    name: "",
    instructor: "",
    credits: "",
    description: ""
  });

  const handleAddCourse = () => {
    soundManager.play('success');
    console.log('Adding course:', newCourse);
    setShowAddForm(false);
    setNewCourse({ name: "", instructor: "", credits: "", description: "" });
  };

  const handleRegisterCourse = (courseId: string) => {
    soundManager.play('success');
    console.log('Registering for course:', courseId);
  };

  const availableCoursesForStudent = [
    {
      id: "PHY101",
      name: "Physics Fundamentals",
      instructor: "Dr. Wilson",
      credits: 4,
      description: "Basic principles of physics including mechanics and thermodynamics",
      status: "Available"
    },
    {
      id: "CHEM101",
      name: "General Chemistry",
      instructor: "Prof. Davis",
      credits: 3,
      description: "Introduction to chemical principles and laboratory techniques",
      status: "Available"
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-6xl mx-4 shadow-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="gradient-primary text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5" />
              <CardTitle>
                {isStudent ? "Course Registration" : "Course Management"}
              </CardTitle>
            </div>
            <div className="flex items-center space-x-2">
              {!isStudent && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    soundManager.play('click');
                    setShowAddForm(!showAddForm);
                  }}
                  className="text-white hover:bg-white/20"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Course
                </Button>
              )}
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
          </div>
        </CardHeader>
        <CardContent className="p-6 overflow-y-auto">
          <div className="space-y-6">
            {!isStudent && showAddForm && (
              <Card className="border-2 border-dashed border-primary/30">
                <CardHeader>
                  <CardTitle className="text-lg">Add New Course</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="courseName">Course Name</Label>
                      <Input
                        id="courseName"
                        value={newCourse.name}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter course name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="instructor">Instructor</Label>
                      <Input
                        id="instructor"
                        value={newCourse.instructor}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, instructor: e.target.value }))}
                        placeholder="Enter instructor name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="credits">Credits</Label>
                      <Input
                        id="credits"
                        type="number"
                        value={newCourse.credits}
                        onChange={(e) => setNewCourse(prev => ({ ...prev, credits: e.target.value }))}
                        placeholder="Enter credits"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newCourse.description}
                      onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter course description"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                    <Button variant="hero" onClick={handleAddCourse}>
                      Add Course
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-3">
                {isStudent ? "Your Enrolled Courses" : "Current Courses"}
              </h3>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead className="font-semibold">Course ID</TableHead>
                      <TableHead className="font-semibold">Course Name</TableHead>
                      <TableHead className="font-semibold">Instructor</TableHead>
                      <TableHead className="font-semibold">Credits</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      {!isStudent && <TableHead className="font-semibold">Actions</TableHead>}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{course.id}</TableCell>
                        <TableCell>{course.name}</TableCell>
                        <TableCell>{course.instructor}</TableCell>
                        <TableCell>{course.credits}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            course.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {course.status}
                          </span>
                        </TableCell>
                        {!isStudent && (
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                soundManager.play('click');
                                console.log('Editing course:', course.id);
                              }}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        )}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {isStudent && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Available Courses for Registration</h3>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold">Course ID</TableHead>
                        <TableHead className="font-semibold">Course Name</TableHead>
                        <TableHead className="font-semibold">Instructor</TableHead>
                        <TableHead className="font-semibold">Credits</TableHead>
                        <TableHead className="font-semibold">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {availableCoursesForStudent.map((course) => (
                        <TableRow key={course.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">{course.id}</TableCell>
                          <TableCell>{course.name}</TableCell>
                          <TableCell>{course.instructor}</TableCell>
                          <TableCell>{course.credits}</TableCell>
                          <TableCell>
                            <Button 
                              variant="hero"
                              size="sm"
                              onClick={() => handleRegisterCourse(course.id)}
                              onMouseEnter={() => soundManager.play('hover')}
                            >
                              Register
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};