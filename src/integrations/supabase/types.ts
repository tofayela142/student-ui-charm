export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          attendance_id: number
          class_date: string
          created_at: string | null
          offering_id: number | null
          status: string
          student_id: string | null
        }
        Insert: {
          attendance_id?: number
          class_date: string
          created_at?: string | null
          offering_id?: number | null
          status: string
          student_id?: string | null
        }
        Update: {
          attendance_id?: number
          class_date?: string
          created_at?: string | null
          offering_id?: number | null
          status?: string
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_offering_id_fkey"
            columns: ["offering_id"]
            isOneToOne: false
            referencedRelation: "course_offerings"
            referencedColumns: ["offering_id"]
          },
          {
            foreignKeyName: "attendance_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
        ]
      }
      broadcasts: {
        Row: {
          broadcast_id: number
          created_at: string | null
          department: string | null
          message: string
          session: string | null
          teacher_id: string | null
          term: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          broadcast_id?: number
          created_at?: string | null
          department?: string | null
          message: string
          session?: string | null
          teacher_id?: string | null
          term?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          broadcast_id?: number
          created_at?: string | null
          department?: string | null
          message?: string
          session?: string | null
          teacher_id?: string | null
          term?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "broadcasts_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["teacher_id"]
          },
        ]
      }
      course_offerings: {
        Row: {
          course_id: string | null
          created_at: string | null
          max_capacity: number | null
          offering_id: number
          teacher_id: string | null
          term_id: number | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          max_capacity?: number | null
          offering_id?: number
          teacher_id?: string | null
          term_id?: number | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          max_capacity?: number | null
          offering_id?: number
          teacher_id?: string | null
          term_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "course_offerings_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["course_id"]
          },
          {
            foreignKeyName: "course_offerings_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["teacher_id"]
          },
          {
            foreignKeyName: "course_offerings_term_id_fkey"
            columns: ["term_id"]
            isOneToOne: false
            referencedRelation: "terms"
            referencedColumns: ["term_id"]
          },
        ]
      }
      course_registrations: {
        Row: {
          offering_id: number | null
          registration_date: string | null
          registration_id: number
          status: string | null
          student_id: string | null
        }
        Insert: {
          offering_id?: number | null
          registration_date?: string | null
          registration_id?: number
          status?: string | null
          student_id?: string | null
        }
        Update: {
          offering_id?: number | null
          registration_date?: string | null
          registration_id?: number
          status?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_registrations_offering_id_fkey"
            columns: ["offering_id"]
            isOneToOne: false
            referencedRelation: "course_offerings"
            referencedColumns: ["offering_id"]
          },
          {
            foreignKeyName: "course_registrations_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
        ]
      }
      courses: {
        Row: {
          course_id: string
          course_name: string
          created_at: string | null
          credits: number
          description: string | null
        }
        Insert: {
          course_id: string
          course_name: string
          created_at?: string | null
          credits: number
          description?: string | null
        }
        Update: {
          course_id?: string
          course_name?: string
          created_at?: string | null
          credits?: number
          description?: string | null
        }
        Relationships: []
      }
      ct_results: {
        Row: {
          created_at: string | null
          ct_id: number
          ct_number: number | null
          marks_obtained: number | null
          offering_id: number | null
          student_id: string | null
          total_marks: number | null
        }
        Insert: {
          created_at?: string | null
          ct_id?: number
          ct_number?: number | null
          marks_obtained?: number | null
          offering_id?: number | null
          student_id?: string | null
          total_marks?: number | null
        }
        Update: {
          created_at?: string | null
          ct_id?: number
          ct_number?: number | null
          marks_obtained?: number | null
          offering_id?: number | null
          student_id?: string | null
          total_marks?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "ct_results_offering_id_fkey"
            columns: ["offering_id"]
            isOneToOne: false
            referencedRelation: "course_offerings"
            referencedColumns: ["offering_id"]
          },
          {
            foreignKeyName: "ct_results_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          department: string | null
          id: number
          is_read: boolean | null
          message: string
          sender: string
          session: string | null
          term: string | null
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          id?: number
          is_read?: boolean | null
          message: string
          sender: string
          session?: string | null
          term?: string | null
          title: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          department?: string | null
          id?: number
          is_read?: boolean | null
          message?: string
          sender?: string
          session?: string | null
          term?: string | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      personal_info: {
        Row: {
          address: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string | null
          full_name: string
          phone: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name: string
          phone?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string | null
          full_name?: string
          phone?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "personal_info_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      semester_results: {
        Row: {
          created_at: string | null
          grade: string | null
          grade_point: number | null
          offering_id: number | null
          result_id: number
          status: string | null
          student_id: string | null
        }
        Insert: {
          created_at?: string | null
          grade?: string | null
          grade_point?: number | null
          offering_id?: number | null
          result_id?: number
          status?: string | null
          student_id?: string | null
        }
        Update: {
          created_at?: string | null
          grade?: string | null
          grade_point?: number | null
          offering_id?: number | null
          result_id?: number
          status?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "semester_results_offering_id_fkey"
            columns: ["offering_id"]
            isOneToOne: false
            referencedRelation: "course_offerings"
            referencedColumns: ["offering_id"]
          },
          {
            foreignKeyName: "semester_results_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_id"]
          },
        ]
      }
      sessions: {
        Row: {
          created_at: string | null
          end_date: string | null
          session_id: number
          session_name: string
          start_date: string | null
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          session_id?: number
          session_name: string
          start_date?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          session_id?: number
          session_name?: string
          start_date?: string | null
        }
        Relationships: []
      }
      students: {
        Row: {
          created_at: string | null
          current_semester: number | null
          department: string | null
          enrollment_date: string | null
          session: string | null
          student_id: string
        }
        Insert: {
          created_at?: string | null
          current_semester?: number | null
          department?: string | null
          enrollment_date?: string | null
          session?: string | null
          student_id: string
        }
        Update: {
          created_at?: string | null
          current_semester?: number | null
          department?: string | null
          enrollment_date?: string | null
          session?: string | null
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "students_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      teachers: {
        Row: {
          created_at: string | null
          department: string | null
          designation: string | null
          teacher_id: string
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          designation?: string | null
          teacher_id: string
        }
        Update: {
          created_at?: string | null
          department?: string | null
          designation?: string | null
          teacher_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "teachers_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["user_id"]
          },
        ]
      }
      terms: {
        Row: {
          created_at: string | null
          end_date: string | null
          session_id: number | null
          start_date: string | null
          term_id: number
          term_name: string
          term_number: number | null
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          session_id?: number | null
          start_date?: string | null
          term_id?: number
          term_name: string
          term_number?: number | null
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          session_id?: number | null
          start_date?: string | null
          term_id?: number
          term_name?: string
          term_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "terms_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["session_id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          password: string | null
          user_id: string
          user_type: string
        }
        Insert: {
          created_at?: string | null
          password?: string | null
          user_id: string
          user_type: string
        }
        Update: {
          created_at?: string | null
          password?: string | null
          user_id?: string
          user_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
