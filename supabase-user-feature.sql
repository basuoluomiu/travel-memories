-- ============================================
-- 用户页功能：数据库更新脚本
-- ============================================

-- 1. 为 profiles 表添加个人简介字段
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS bio TEXT;

-- 2. 为 memories 表添加可见性字段（默认公开）
ALTER TABLE public.memories
ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT true;

-- 3. 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS memories_is_public_idx ON public.memories(is_public);
CREATE INDEX IF NOT EXISTS memories_user_id_created_at_idx ON public.memories(user_id, created_at DESC);

-- 4. 更新 RLS 策略：只显示公开的回忆（除非是自己的）
DROP POLICY IF EXISTS "Memories are viewable by everyone" ON public.memories;

CREATE POLICY "Public memories are viewable by everyone"
ON public.memories FOR SELECT
USING (
  is_public = true
  OR auth.uid() = user_id
);

-- 5. 更新 profiles 表的 UPDATE 策略（确保支持更新所有字段）
-- 删除旧策略并重新创建
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile avatar" ON public.profiles;

CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 6. Storage bucket 策略：允许用户上传和更新自己的头像
-- 注意：这需要在 Supabase 仪表板的 Storage 部分手动配置
-- Bucket: avatars (如果还没创建，需要创建)
-- Policy for INSERT: (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1])
-- Policy for UPDATE: (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1])
-- Policy for SELECT: true (公开访问)
-- Policy for DELETE: (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1])

-- 7. 验证数据
SELECT 'Database updated successfully!' as status;
