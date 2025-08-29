-- Drop existing tables to rebuild with proper schema
DROP TABLE IF EXISTS public.notifications CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.courses CASCADE;

-- Create Users table (using auth.users as base)
CREATE TABLE public.users (
    user_id TEXT PRIMARY KEY,
    password TEXT,
    user_type TEXT CHECK (user_type IN ('student', 'teacher')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create PersonalInfo table
CREATE TABLE public.personal_info (
    user_id TEXT PRIMARY KEY REFERENCES public.users(user_id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    address TEXT,
    date_of_birth DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.personal_info ENABLE ROW LEVEL SECURITY;

-- Create Teachers table
CREATE TABLE public.teachers (
    teacher_id TEXT PRIMARY KEY REFERENCES public.users(user_id) ON DELETE CASCADE,
    department TEXT,
    designation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.teachers ENABLE ROW LEVEL SECURITY;

-- Create Students table
CREATE TABLE public.students (
    student_id TEXT PRIMARY KEY REFERENCES public.users(user_id) ON DELETE CASCADE,
    enrollment_date DATE,
    current_semester INTEGER,
    department TEXT,
    session TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Create Sessions table
CREATE TABLE public.sessions (
    session_id SERIAL PRIMARY KEY,
    session_name TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- Create Terms table
CREATE TABLE public.terms (
    term_id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES public.sessions(session_id) ON DELETE CASCADE,
    term_name TEXT NOT NULL,
    term_number INTEGER,
    start_date DATE,
    end_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.terms ENABLE ROW LEVEL SECURITY;

-- Create Courses table
CREATE TABLE public.courses (
    course_id TEXT PRIMARY KEY,
    course_name TEXT NOT NULL,
    credits INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Create CourseOfferings table
CREATE TABLE public.course_offerings (
    offering_id SERIAL PRIMARY KEY,
    course_id TEXT REFERENCES public.courses(course_id) ON DELETE CASCADE,
    term_id INTEGER REFERENCES public.terms(term_id) ON DELETE CASCADE,
    teacher_id TEXT REFERENCES public.teachers(teacher_id) ON DELETE SET NULL,
    max_capacity INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.course_offerings ENABLE ROW LEVEL SECURITY;

-- Create CourseRegistrations table
CREATE TABLE public.course_registrations (
    registration_id SERIAL PRIMARY KEY,
    student_id TEXT REFERENCES public.students(student_id) ON DELETE CASCADE,
    offering_id INTEGER REFERENCES public.course_offerings(offering_id) ON DELETE CASCADE,
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
    status TEXT CHECK (status IN ('Active', 'Completed', 'Dropped')) DEFAULT 'Active'
);

ALTER TABLE public.course_registrations ENABLE ROW LEVEL SECURITY;

-- Create Attendance table
CREATE TABLE public.attendance (
    attendance_id SERIAL PRIMARY KEY,
    student_id TEXT REFERENCES public.students(student_id) ON DELETE CASCADE,
    offering_id INTEGER REFERENCES public.course_offerings(offering_id) ON DELETE CASCADE,
    class_date DATE NOT NULL,
    status TEXT CHECK (status IN ('Present', 'Absent')) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;

-- Create CTResults table
CREATE TABLE public.ct_results (
    ct_id SERIAL PRIMARY KEY,
    student_id TEXT REFERENCES public.students(student_id) ON DELETE CASCADE,
    offering_id INTEGER REFERENCES public.course_offerings(offering_id) ON DELETE CASCADE,
    ct_number INTEGER,
    marks_obtained DECIMAL(5,2),
    total_marks DECIMAL(5,2) DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.ct_results ENABLE ROW LEVEL SECURITY;

-- Create SemesterResults table
CREATE TABLE public.semester_results (
    result_id SERIAL PRIMARY KEY,
    student_id TEXT REFERENCES public.students(student_id) ON DELETE CASCADE,
    offering_id INTEGER REFERENCES public.course_offerings(offering_id) ON DELETE CASCADE,
    grade TEXT,
    grade_point DECIMAL(3,2),
    status TEXT CHECK (status IN ('Pass', 'Fail')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.semester_results ENABLE ROW LEVEL SECURITY;

-- Create Broadcasts table for teacher announcements
CREATE TABLE public.broadcasts (
    broadcast_id SERIAL PRIMARY KEY,
    teacher_id TEXT REFERENCES public.teachers(teacher_id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    department TEXT,
    session TEXT,
    term TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.broadcasts ENABLE ROW LEVEL SECURITY;

-- Create Notifications table for real-time updates
CREATE TABLE public.notifications (
    id SERIAL PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT CHECK (type IN ('grade', 'exam', 'announcement', 'attendance', 'broadcast')) NOT NULL,
    sender TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    department TEXT,
    session TEXT,
    term TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can manage their own data" ON public.users
FOR ALL USING (user_id = current_user);

CREATE POLICY "Personal info access" ON public.personal_info
FOR ALL USING (user_id = current_user);

CREATE POLICY "Teachers access" ON public.teachers
FOR ALL USING (teacher_id = current_user);

CREATE POLICY "Students access" ON public.students
FOR ALL USING (student_id = current_user);

CREATE POLICY "Public read sessions" ON public.sessions
FOR SELECT USING (true);

CREATE POLICY "Public read terms" ON public.terms
FOR SELECT USING (true);

CREATE POLICY "Public read courses" ON public.courses
FOR SELECT USING (true);

CREATE POLICY "Course offerings access" ON public.course_offerings
FOR SELECT USING (true);

CREATE POLICY "Students can view their registrations" ON public.course_registrations
FOR SELECT USING (student_id = current_user);

CREATE POLICY "Students can insert their registrations" ON public.course_registrations
FOR INSERT WITH CHECK (student_id = current_user);

CREATE POLICY "Students can view their attendance" ON public.attendance
FOR SELECT USING (student_id = current_user);

CREATE POLICY "Students can view their CT results" ON public.ct_results
FOR SELECT USING (student_id = current_user);

CREATE POLICY "Students can view their semester results" ON public.semester_results
FOR SELECT USING (student_id = current_user);

CREATE POLICY "Teachers can manage broadcasts" ON public.broadcasts
FOR ALL USING (teacher_id = current_user);

CREATE POLICY "Students can view relevant broadcasts" ON public.broadcasts
FOR SELECT USING (true);

CREATE POLICY "Users can view their notifications" ON public.notifications
FOR SELECT USING (user_id = current_user);

CREATE POLICY "Users can update their notifications" ON public.notifications
FOR UPDATE USING (user_id = current_user);

-- Insert sample data
INSERT INTO public.sessions (session_name, start_date, end_date) VALUES
('2023-24', '2023-07-01', '2024-06-30'),
('2024-25', '2024-07-01', '2025-06-30');

INSERT INTO public.terms (session_id, term_name, term_number, start_date, end_date) VALUES
(1, 'Fall 2023', 1, '2023-07-01', '2023-12-31'),
(1, 'Spring 2024', 2, '2024-01-01', '2024-06-30'),
(2, 'Fall 2024', 1, '2024-07-01', '2024-12-31');

INSERT INTO public.courses (course_id, course_name, credits, description) VALUES
('CSE101', 'Programming Fundamentals', 3, 'Introduction to programming concepts'),
('MAT101', 'Calculus I', 3, 'Differential and integral calculus'),
('PHY101', 'Physics I', 3, 'Mechanics and thermodynamics'),
('CSE102', 'Data Structures', 3, 'Linear and non-linear data structures');

-- Enable realtime
ALTER TABLE public.broadcasts REPLICA IDENTITY FULL;
ALTER TABLE public.notifications REPLICA IDENTITY FULL;