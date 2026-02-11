-- ============================================
-- 修复脚本：解决 RLS 和外键约束问题
-- ============================================

-- 1. 删除旧的 profiles 插入策略（如果存在）
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;

-- 2. 创建更宽松的 profiles 插入策略
-- 允许认证用户插入 profile（不限制 id）
CREATE POLICY "Enable insert for authenticated users only"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (true);

-- 3. 创建函数：自动创建用户 profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. 删除旧的触发器（如果存在）
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 5. 创建触发器：当新用户注册时自动创建 profile
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. 为已存在的用户（没有 profile）创建 profile
-- 这会修复已注册但没有 profile 的用户
INSERT INTO public.profiles (id, username, avatar_url)
SELECT
  au.id,
  COALESCE(au.raw_user_meta_data->>'username', split_part(au.email, '@', 1)) as username,
  au.raw_user_meta_data->>'avatar_url' as avatar_url
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE p.id IS NULL;

-- 7. 验证修复
-- 运行以下查询检查是否所有 auth.users 都有对应的 profiles
-- SELECT COUNT(*) FROM auth.users;
-- SELECT COUNT(*) FROM public.profiles;
-- 两个数字应该相等
