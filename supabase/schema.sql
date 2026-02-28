-- Profiles: Extends Supabase Auth users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  level_name TEXT DEFAULT 'Graine',
  is_premium BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Modules Completion: Tracks progress through the 5 levels
CREATE TABLE IF NOT EXISTS public.module_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL, -- e.g. "0.1", "1.1"
  status TEXT DEFAULT 'locked' CHECK (status IN ('locked', 'unlocked', 'in_progress', 'completed')),
  unlocked_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, module_id)
);

-- Submissions: Uploaded photos for exercises
CREATE TABLE IF NOT EXISTS public.submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  description TEXT,
  
  -- AI Analysis (n8n/Grok integration)
  ai_feedback JSONB, -- Stores JSON from AI analysis
  ai_score DECIMAL(5,2), -- 0-100
  
  -- Human Correction
  human_feedback TEXT,
  human_score DECIMAL(5,2),
  corrected_by UUID REFERENCES public.profiles(id),
  
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Badges
CREATE TABLE IF NOT EXISTS public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User Badges: Junction table
CREATE TABLE IF NOT EXISTS public.user_badges (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY(user_id, badge_id)
);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

-- Policies (Simplified for prototype)
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can view their own progress" ON public.module_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view their own submissions" ON public.submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upload their own submissions" ON public.submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
