# 📋 部署前检查清单

在部署到 Vercel 之前，请确保完成以下所有检查项。

## ✅ 本地环境检查

### 代码和依赖
- [ ] 所有依赖已安装（`npm install` 运行成功）
- [ ] 项目可以本地运行（`npm run dev` 无错误）
- [ ] 所有功能本地测试通过

### 环境变量
- [ ] `.env.local` 文件存在
- [ ] `.env.local` 包含以下变量：
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] 已复制环境变量到安全的地方（部署时需要）

### Git 配置
- [ ] `.gitignore` 文件存在
- [ ] `.env.local` 在 `.gitignore` 中
- [ ] `.env` 在 `.gitignore` 中

---

## ✅ Supabase 配置检查

### 数据库
- [ ] `profiles` 表已创建
- [ ] `memories` 表已创建
- [ ] 已执行 `supabase-setup.sql`
- [ ] 已执行 `supabase-user-feature.sql`
- [ ] RLS 策略已启用并配置正确

### Storage - memories bucket
- [ ] `memories` bucket 已创建
- [ ] bucket 设置为 **Public**
- [ ] 上传策略已配置（INSERT）
- [ ] 读取策略已配置（SELECT）

### Storage - avatars bucket
- [ ] `avatars` bucket 已创建
- [ ] bucket 设置为 **Public**
- [ ] 上传和更新策略已配置（INSERT + UPDATE）
- [ ] 读取策略已配置（SELECT）
- [ ] 删除策略已配置（DELETE）

### 数据库函数和触发器
- [ ] `handle_new_user()` 函数已创建
- [ ] `on_auth_user_created` 触发器已创建

---

## ✅ 功能测试检查

### 认证功能
- [ ] 可以注册新用户
- [ ] 可以登录
- [ ] 可以登出
- [ ] 注册后自动创建 profile

### 回忆功能
- [ ] 可以添加回忆
- [ ] 可以上传照片
- [ ] 照片正确显示
- [ ] 可以选择日期
- [ ] 回忆显示在主页
- [ ] 可以点击查看详情

### 用户功能
- [ ] 可以访问个人主页
- [ ] 可以编辑资料
- [ ] 可以上传头像
- [ ] 可以管理回忆（设置可见性、删除）

---

## ✅ 代码质量检查

### 代码清理
- [ ] 没有 `console.log` 调试代码（或已清理）
- [ ] 没有注释掉的代码
- [ ] 没有未使用的导入

### 配置文件
- [ ] `next.config.js` 配置正确
- [ ] `tailwind.config.ts` 配置正确
- [ ] `package.json` 依赖完整

---

## ✅ 准备部署

### GitHub
- [ ] GitHub 账号已准备好
- [ ] 已决定仓库名称
- [ ] 已决定仓库可见性（Public/Private）

### Vercel
- [ ] Vercel 账号已准备好（或准备用 GitHub 登录）
- [ ] 已复制 Supabase 环境变量

### Supabase 配置（部署后）
- [ ] 准备好在部署后更新 Site URL
- [ ] 准备好在部署后更新 Redirect URLs

---

## 🚀 准备就绪！

如果以上所有项目都已勾选，你可以开始部署了！

### 下一步

选择部署方式：
1. **快速部署**：查看 [`QUICK_DEPLOY.md`](./QUICK_DEPLOY.md)
2. **详细部署**：查看 [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md)

---

## ⚠️ 重要提醒

### 部署前必做
1. 确保 `.env.local` 不会被提交到 Git
2. 复制环境变量到安全的地方
3. 本地测试所有功能

### 部署后必做
1. 更新 Supabase 的 Site URL
2. 更新 Supabase 的 Redirect URLs
3. 测试线上所有功能

### 安全提示
- 🔒 不要在代码中硬编码敏感信息
- 🔒 不要将环境变量提交到 Git
- 🔒 定期更新密钥
- 🔒 定期备份数据库

---

祝部署顺利！🎉
