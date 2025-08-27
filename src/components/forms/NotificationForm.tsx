import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, X, Clock, Check } from "lucide-react";
import { soundManager } from "@/utils/sound";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "grade" | "exam" | "announcement" | "attendance";
  timestamp: string;
  isRead: boolean;
  sender: string;
}

interface NotificationFormProps {
  onClose: () => void;
  studentId: string;
}

export const NotificationForm = ({ onClose, studentId }: NotificationFormProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "CT Marks Published",
      message: "Your CSE101 CT-2 marks have been published. Score: 18/20",
      type: "grade",
      timestamp: "2024-01-15 14:30",
      isRead: false,
      sender: "Dr. Ahmad"
    },
    {
      id: "2", 
      title: "Exam Schedule Updated",
      message: "Final exam for MAT101 has been rescheduled to January 25, 2024 at 10:00 AM",
      type: "exam",
      timestamp: "2024-01-14 09:15",
      isRead: false,
      sender: "Exam Controller"
    },
    {
      id: "3",
      title: "Low Attendance Warning",
      message: "Your attendance in PHY101 is below 75%. Current: 72%. Please attend regularly.",
      type: "attendance", 
      timestamp: "2024-01-13 16:45",
      isRead: true,
      sender: "System"
    },
    {
      id: "4",
      title: "Assignment Deadline",
      message: "CSE102 Assignment 3 deadline is approaching. Due: January 20, 2024",
      type: "announcement",
      timestamp: "2024-01-12 11:20",
      isRead: false,
      sender: "Prof. Rahman"
    },
    {
      id: "5",
      title: "Semester Results",
      message: "Fall 2023 semester results have been published. Check your result section.",
      type: "grade",
      timestamp: "2024-01-10 13:00",
      isRead: true,
      sender: "Academic Office"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getTypeColor = (type: string) => {
    switch (type) {
      case "grade": return "bg-green-100 text-green-800";
      case "exam": return "bg-red-100 text-red-800";
      case "announcement": return "bg-blue-100 text-blue-800";
      case "attendance": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "grade": return "📊";
      case "exam": return "📝";
      case "announcement": return "📢";
      case "attendance": return "📅";
      default: return "📄";
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
    soundManager.play('click');
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    soundManager.play('success');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <Card className="w-full max-w-2xl mx-4 shadow-2xl max-h-[90vh] overflow-hidden">
        <CardHeader className="gradient-primary text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <CardTitle>Notifications</CardTitle>
              {unreadCount > 0 && (
                <Badge className="bg-red-500 text-white">
                  {unreadCount}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <Button 
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-white hover:bg-white/20"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Mark All Read
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
        <CardContent className="p-0 overflow-y-auto max-h-[70vh]">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Bell className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.isRead ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="text-2xl mt-1">
                        {getTypeIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`font-semibold text-gray-900 ${
                            !notification.isRead ? 'font-bold' : ''
                          }`}>
                            {notification.title}
                          </h4>
                          <Badge className={getTypeColor(notification.type)}>
                            {notification.type}
                          </Badge>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-gray-700 text-sm mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTime(notification.timestamp)}
                          </span>
                          <span>From: {notification.sender}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};