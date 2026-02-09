-- 1. Create ENUM types
CREATE TYPE public.belt_level AS ENUM ('bianca', 'blu', 'viola', 'marrone', 'nera');
CREATE TYPE public.app_role AS ENUM ('practitioner', 'coach');
CREATE TYPE public.difficulty_level AS ENUM ('beginner', 'intermediate', 'advanced');
CREATE TYPE public.training_mode AS ENUM ('gi', 'nogi', 'both');
CREATE TYPE public.training_type AS ENUM ('technique', 'sparring', 'drill', 'conditioning');
CREATE TYPE public.goal_status AS ENUM ('active', 'completed', 'paused');
CREATE TYPE public.goal_priority AS ENUM ('low', 'medium', 'high');

-- 2. Create user_roles table (separate from profiles as required for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'practitioner',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- 3. Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  belt belt_level NOT NULL DEFAULT 'bianca',
  stripes INTEGER NOT NULL DEFAULT 0 CHECK (stripes >= 0 AND stripes <= 4),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Create techniques table (31 categories from user list)
CREATE TABLE public.techniques (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  difficulty difficulty_level NOT NULL DEFAULT 'beginner',
  mode training_mode NOT NULL DEFAULT 'both',
  min_belt belt_level NOT NULL DEFAULT 'bianca',
  video_url TEXT,
  created_by UUID REFERENCES auth.users(id),
  is_global BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Create user_techniques table (personal progress)
CREATE TABLE public.user_techniques (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  technique_id UUID REFERENCES public.techniques(id) ON DELETE CASCADE NOT NULL,
  mastery_level INTEGER NOT NULL DEFAULT 0 CHECK (mastery_level >= 0 AND mastery_level <= 10),
  learned_at DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, technique_id)
);

-- 6. Create training_sessions table
CREATE TABLE public.training_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  session_date DATE NOT NULL DEFAULT CURRENT_DATE,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  intensity INTEGER NOT NULL DEFAULT 3 CHECK (intensity >= 1 AND intensity <= 5),
  training_type training_type NOT NULL DEFAULT 'technique',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Create session_techniques table (link sessions to techniques with ratings)
CREATE TABLE public.session_techniques (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES public.training_sessions(id) ON DELETE CASCADE NOT NULL,
  technique_id UUID REFERENCES public.techniques(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 0 AND rating <= 10),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (session_id, technique_id)
);

-- 8. Create goals table
CREATE TABLE public.goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  assigned_by UUID REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  status goal_status NOT NULL DEFAULT 'active',
  priority goal_priority NOT NULL DEFAULT 'medium',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 9. Create goal_techniques table (link goals to techniques)
CREATE TABLE public.goal_techniques (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID REFERENCES public.goals(id) ON DELETE CASCADE NOT NULL,
  technique_id UUID REFERENCES public.techniques(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (goal_id, technique_id)
);

-- 10. Create coach_students table (coach-student relationships)
CREATE TABLE public.coach_students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coach_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (coach_id, student_id),
  CHECK (coach_id != student_id)
);

-- 11. Create security definer function to check role
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- 12. Create security definer function to check if coach manages student
CREATE OR REPLACE FUNCTION public.is_coach_of(_coach_id UUID, _student_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.coach_students
    WHERE coach_id = _coach_id
      AND student_id = _student_id
  )
$$;

-- 13. Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 14. Add update triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_techniques_updated_at BEFORE UPDATE ON public.techniques FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_user_techniques_updated_at BEFORE UPDATE ON public.user_techniques FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_training_sessions_updated_at BEFORE UPDATE ON public.training_sessions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_goals_updated_at BEFORE UPDATE ON public.goals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- 15. Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.techniques ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_techniques ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.session_techniques ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goal_techniques ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coach_students ENABLE ROW LEVEL SECURITY;

-- 16. RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own role on signup" ON public.user_roles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 17. RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Coaches can view their students profiles" ON public.profiles FOR SELECT USING (public.has_role(auth.uid(), 'coach') AND public.is_coach_of(auth.uid(), user_id));
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);

-- 18. RLS Policies for techniques (globally readable by authenticated users)
CREATE POLICY "Authenticated users can view all techniques" ON public.techniques FOR SELECT TO authenticated USING (true);
CREATE POLICY "Coaches can insert techniques" ON public.techniques FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'coach'));
CREATE POLICY "Coaches can update their techniques" ON public.techniques FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'coach') AND (created_by = auth.uid() OR is_global = true));
CREATE POLICY "Coaches can delete their techniques" ON public.techniques FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'coach') AND created_by = auth.uid() AND is_global = false);

-- 19. RLS Policies for user_techniques
CREATE POLICY "Users can view their own techniques" ON public.user_techniques FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Coaches can view their students techniques" ON public.user_techniques FOR SELECT USING (public.has_role(auth.uid(), 'coach') AND public.is_coach_of(auth.uid(), user_id));
CREATE POLICY "Users can insert their own techniques" ON public.user_techniques FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own techniques" ON public.user_techniques FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own techniques" ON public.user_techniques FOR DELETE USING (auth.uid() = user_id);

-- 20. RLS Policies for training_sessions
CREATE POLICY "Users can view their own sessions" ON public.training_sessions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Coaches can view their students sessions" ON public.training_sessions FOR SELECT USING (public.has_role(auth.uid(), 'coach') AND public.is_coach_of(auth.uid(), user_id));
CREATE POLICY "Users can insert their own sessions" ON public.training_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own sessions" ON public.training_sessions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own sessions" ON public.training_sessions FOR DELETE USING (auth.uid() = user_id);

-- 21. RLS Policies for session_techniques (based on session ownership)
CREATE POLICY "Users can view their own session techniques" ON public.session_techniques FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.training_sessions ts WHERE ts.id = session_id AND ts.user_id = auth.uid())
);
CREATE POLICY "Coaches can view their students session techniques" ON public.session_techniques FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.training_sessions ts WHERE ts.id = session_id AND public.has_role(auth.uid(), 'coach') AND public.is_coach_of(auth.uid(), ts.user_id))
);
CREATE POLICY "Users can insert their own session techniques" ON public.session_techniques FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.training_sessions ts WHERE ts.id = session_id AND ts.user_id = auth.uid())
);
CREATE POLICY "Users can update their own session techniques" ON public.session_techniques FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.training_sessions ts WHERE ts.id = session_id AND ts.user_id = auth.uid())
);
CREATE POLICY "Users can delete their own session techniques" ON public.session_techniques FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.training_sessions ts WHERE ts.id = session_id AND ts.user_id = auth.uid())
);

-- 22. RLS Policies for goals
CREATE POLICY "Users can view their own goals" ON public.goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Coaches can view goals they assigned" ON public.goals FOR SELECT USING (auth.uid() = assigned_by);
CREATE POLICY "Users can insert their own goals" ON public.goals FOR INSERT WITH CHECK (auth.uid() = user_id AND assigned_by IS NULL);
CREATE POLICY "Coaches can assign goals to students" ON public.goals FOR INSERT WITH CHECK (
  public.has_role(auth.uid(), 'coach') AND public.is_coach_of(auth.uid(), user_id) AND assigned_by = auth.uid()
);
CREATE POLICY "Users can update their own goals" ON public.goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Coaches can update goals they assigned" ON public.goals FOR UPDATE USING (auth.uid() = assigned_by);
CREATE POLICY "Users can delete their own goals" ON public.goals FOR DELETE USING (auth.uid() = user_id AND assigned_by IS NULL);
CREATE POLICY "Coaches can delete goals they assigned" ON public.goals FOR DELETE USING (auth.uid() = assigned_by);

-- 23. RLS Policies for goal_techniques
CREATE POLICY "Users can view their own goal techniques" ON public.goal_techniques FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.goals g WHERE g.id = goal_id AND g.user_id = auth.uid())
);
CREATE POLICY "Users can insert their own goal techniques" ON public.goal_techniques FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.goals g WHERE g.id = goal_id AND g.user_id = auth.uid())
);
CREATE POLICY "Users can delete their own goal techniques" ON public.goal_techniques FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.goals g WHERE g.id = goal_id AND g.user_id = auth.uid())
);

-- 24. RLS Policies for coach_students
CREATE POLICY "Coaches can view their own relationships" ON public.coach_students FOR SELECT USING (auth.uid() = coach_id);
CREATE POLICY "Students can view their coach relationships" ON public.coach_students FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Coaches can create relationships" ON public.coach_students FOR INSERT WITH CHECK (
  public.has_role(auth.uid(), 'coach') AND auth.uid() = coach_id
);
CREATE POLICY "Coaches can delete their relationships" ON public.coach_students FOR DELETE USING (auth.uid() = coach_id);

-- 25. Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (
    NEW.id,
    COALESCE((NEW.raw_user_meta_data->>'role')::app_role, 'practitioner')
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- 26. Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();