-- 创建 profiles 表
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 创建 memories 表
CREATE TABLE IF NOT EXISTS public.memories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  memory_date DATE NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 启用 Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;

-- Profiles 表的 RLS 策略
-- 所有人可以查看所有 profiles
CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING (true);

-- 用户只能插入自己的 profile
CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

-- 用户只能更新自己的 profile
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Memories 表的 RLS 策略
-- 所有人可以查看所有 memories（共享回忆墙）
CREATE POLICY "Memories are viewable by everyone"
ON public.memories FOR SELECT
USING (true);

-- 认证用户可以插入 memories
CREATE POLICY "Authenticated users can insert memories"
ON public.memories FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- 用户只能更新自己的 memories
CREATE POLICY "Users can update own memories"
ON public.memories FOR UPDATE
USING (auth.uid() = user_id);

-- 用户只能删除自己的 memories
CREATE POLICY "Users can delete own memories"
ON public.memories FOR DELETE
USING (auth.uid() = user_id);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS memories_user_id_idx ON public.memories(user_id);
CREATE INDEX IF NOT EXISTS memories_created_at_idx ON public.memories(created_at DESC);
CREATE INDEX IF NOT EXISTS memories_memory_date_idx ON public.memories(memory_date DESC);
