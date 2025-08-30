import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Megaphone, X, Send } from "lucide-react";
import { soundManager } from "@/utils/sound";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface BroadcastFormProps {
  onClose: () => void;
  teacherId: string;
}

interface Session {
  session_id: number;
  session_name: string;
}

interface Term {
  term_id: number;
  term_name: string;
  session_id: number;
}

export const BroadcastForm = ({ onClose, teacherId }: BroadcastFormProps) => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedSession, setSelectedSession] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [terms, setTerms] = useState<Term[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const departments = [
    "Computer Science",
    "Electrical Engineering", 
    "Mechanical Engineering",
    "Civil Engineering",
    "Business Administration"
  ];

  useEffect(() => {
    fetchSessions();
  }, []);

  useEffect(() => {
    if (selectedSession) {
      fetchTerms();
    }
  }, [selectedSession]);

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('sessions')
        .select('*')
        .order('session_name', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const fetchTerms = async () => {
    try {
      const { data, error } = await supabase
        .from('terms')
        .select('*')
        .eq('session_id', parseInt(selectedSession))
        .order('term_number');

      if (error) throw error;
      setTerms(data || []);
    } catch (error) {
      console.error('Error fetching terms:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Insert broadcast
      const { data: broadcast, error: broadcastError } = await supabase
        .from('broadcasts')
        .insert([{
          teacher_id: teacherId,
          title: title.trim(),
          message: message.trim(),
          department: department || null,
          session: selectedSession || null,
          term: selectedTerm || null
        }])
        .select()
        .single();

      if (broadcastError) throw broadcastError;

      // Create notifications for matching students
      let students: any[] = [];
      
      // Get students based on filters
      if (department) {
        const { data: deptStudents, error: studentsError } = await supabase
          .from('students')
          .select('student_id, department, session')
          .eq('department', department);
        
        if (studentsError) throw studentsError;
        students = deptStudents || [];
      } else {
        const { data: allStudents } = await supabase
          .from('students')
          .select('student_id, department, session');
        students = allStudents || [];
      }

      // Filter students based on criteria
      const filteredStudents = students.filter(student => {
        const deptMatch = !department || student.department === department;
        const sessionMatch = !selectedSession || student.session === selectedSession;
        return deptMatch && sessionMatch;
      });

      // Create notifications for each matching student
      if (filteredStudents.length > 0) {
        const notifications = filteredStudents.map(student => ({
          user_id: student.student_id,
          title: `📢 ${title}`,
          message: message.trim(),
          type: 'broadcast' as const,
          sender: `Teacher ${teacherId}`,
          department: department || null,
          session: selectedSession || null,
          term: selectedTerm || null
        }));

        const { error: notificationError } = await supabase
          .from('notifications')
          .insert(notifications);

        if (notificationError) throw notificationError;
      }

      toast({
        title: "Success",
        description: `Broadcast sent to ${filteredStudents.length} students`,
      });

      soundManager.play('success');
      onClose();
    } catch (error) {
      console.error('Error sending broadcast:', error);
      toast({
        title: "Error",
        description: "Failed to send broadcast",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-2xl mx-4 shadow-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="gradient-primary text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Megaphone className="w-5 h-5" />
              <CardTitle>Broadcast Announcement</CardTitle>
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
        <CardContent className="p-6 overflow-y-auto max-h-[70vh]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                Announcement Title *
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter announcement title"
                className="mt-1"
                required
              />
            </div>

            {/* Message */}
            <div>
              <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                Message *
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your announcement message here..."
                className="mt-1 min-h-[120px]"
                required
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Department */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Department (Optional)
                </Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="All Departments" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Session */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Session (Optional)
                </Label>
                <Select value={selectedSession} onValueChange={setSelectedSession}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="All Sessions" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sessions</SelectItem>
                    {sessions.map((session) => (
                      <SelectItem key={session.session_id} value={session.session_id.toString()}>
                        {session.session_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Term */}
              <div>
                <Label className="text-sm font-medium text-gray-700">
                  Term (Optional)
                </Label>
                <Select 
                  value={selectedTerm} 
                  onValueChange={setSelectedTerm}
                  disabled={!selectedSession}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="All Terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Terms</SelectItem>
                    {terms.map((term) => (
                      <SelectItem key={term.term_id} value={term.term_id.toString()}>
                        {term.term_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Preview */}
            <div className="bg-gray-50 p-4 rounded-lg border">
              <h4 className="font-medium text-gray-800 mb-2">Preview:</h4>
              <div className="text-sm text-gray-600">
                <p><strong>To:</strong> {
                  department || selectedSession || selectedTerm 
                    ? `${department || 'All Departments'}${selectedSession ? ` • ${sessions.find(s => s.session_id.toString() === selectedSession)?.session_name || 'Selected Session'}` : ''}${selectedTerm ? ` • ${terms.find(t => t.term_id.toString() === selectedTerm)?.term_name || 'Selected Term'}` : ''}`
                    : 'All Students'
                }</p>
                <p><strong>Title:</strong> {title || 'Enter title above'}</p>
                <p><strong>Message:</strong> {message || 'Enter message above'}</p>
              </div>
            </div>

            {/* Buttons */}
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
                disabled={isSubmitting || !title.trim() || !message.trim()}
                className="flex-1"
                onMouseEnter={() => soundManager.play('hover')}
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Sending...' : 'Send Broadcast'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};