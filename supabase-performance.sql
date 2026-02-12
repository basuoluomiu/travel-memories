-- 性能优化 SQL 脚本
-- 在 Supabase SQL Editor 中运行此脚本以提升性能

-- 1. 确保索引存在（如果已存在会跳过）
CREATE INDEX IF NOT EXISTS memories_user_id_idx ON public.memories(user_id);
CREATE INDEX IF NOT EXISTS memories_created_at_idx ON public.memories(created_at DESC);
CREATE INDEX IF NOT EXISTS memories_memory_date_idx ON public.memories(memory_date DESC);
CREATE INDEX IF NOT EXISTS profiles_username_idx ON public.profiles(username);

-- 2. 为 is_public 字段添加索引（如果存在）
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'memories'
        AND column_name = 'is_public'
    ) THEN
        CREATE INDEX IF NOT EXISTS memories_is_public_idx ON public.memories(is_public);
    END IF;
END $$;

-- 3. 分析表以更新统计信息
ANALYZE public.memories;
ANALYZE public.profiles;

-- 4. 验证索引是否创建成功
SELECT
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
AND tablename IN ('memories', 'profiles')
ORDER BY tablename, indexname;
