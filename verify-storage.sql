-- 验证 Storage 配置
-- 在 Supabase SQL Editor 中运行此脚本

-- 1. 检查 avatars bucket 是否存在
SELECT
  id,
  name,
  public,
  created_at
FROM storage.buckets
WHERE name = 'avatars';

-- 如果上面的查询返回空结果，说明 bucket 还没有创建
-- 你需要在 Storage 界面手动创建

-- 2. 检查 avatars bucket 的策略
SELECT
  id,
  name,
  definition,
  bucket_id
FROM storage.policies
WHERE bucket_id = (SELECT id FROM storage.buckets WHERE name = 'avatars');

-- 应该能看到至少 3 个策略：
-- - Users can upload and update avatars (INSERT, UPDATE)
-- - Public access to avatars (SELECT)
-- - Users can delete own avatars (DELETE)

-- 3. 如果没有策略，可以用以下 SQL 创建（或在 UI 中创建）
-- 注意：这些策略需要在 Storage UI 中创建，不能直接用 SQL

-- 结果说明：
-- - 如果第 1 步没有结果：需要创建 avatars bucket
-- - 如果第 2 步没有结果或少于 3 个策略：需要配置策略
-- - 如果都有结果：配置正确，问题可能是网络连接
