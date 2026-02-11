# 🚀 快速部署指南

5 分钟内将你的网站部署到 Vercel！

## 准备工作（1 分钟）

### 获取 Supabase 信息

1. 打开 `.env.local` 文件
2. 复制以下内容到记事本（等会要用）：
   ```
   NEXT_PUBLIC_SUPABASE_URL=你的URL
   NEXT_PUBLIC_SUPABASE_ANON_KEY=你的KEY
   ```

---

## 步骤 1：推送到 GitHub（2 分钟）

### 在项目目录打开终端，依次运行：

```bash
# 初始化 Git
git init

# 添加所有文件
git add .

# 创建提交
git commit -m "Initial commit"
```

### 在 GitHub 创建仓库

1. 访问 https://github.com/new
2. 仓库名：`travel-memories`
3. 选择 **Private**
4. 点击 **Create repository**

### 推送代码

复制 GitHub 显示的命令（类似）：

```bash
git remote add origin https://github.com/你的用户名/travel-memories.git
git branch -M main
git push -u origin main
```

---

## 步骤 2：部署到 Vercel（2 分钟）

### 2.1 导入项目

1. 访问 https://vercel.com
2. 用 GitHub 账号登录
3. 点击 **Add New... → Project**
4. 选择 `travel-memories` 仓库
5. 点击 **Import**

### 2.2 添加环境变量

在 **Environment Variables** 部分：

**第一个变量：**
- Name: `NEXT_PUBLIC_SUPABASE_URL`
- Value: 粘贴你的 Supabase URL
- 点击 **Add**

**第二个变量：**
- Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Value: 粘贴你的 Supabase Key
- 点击 **Add**

### 2.3 开始部署

点击 **Deploy** 按钮，等待 2-3 分钟。

---

## 步骤 3：配置 Supabase（1 分钟）

### 部署成功后，复制 Vercel 给的域名

例如：`https://travel-memories-xxx.vercel.app`

### 更新 Supabase 设置

1. 打开 https://supabase.com
2. 进入你的项目
3. **Authentication → URL Configuration**
4. **Site URL** 填入：
   ```
   https://travel-memories-xxx.vercel.app
   ```
5. **Redirect URLs** 添加：
   ```
   https://travel-memories-xxx.vercel.app/**
   ```
6. 点击 **Save**

---

## ✅ 完成！

现在访问你的 Vercel 域名，网站应该可以正常使用了！

### 测试功能

- 注册/登录 ✓
- 添加回忆 ✓
- 上传照片 ✓
- 编辑资料 ✓

---

## ⚠️ 如果遇到问题

### 问题 1：登录失败
**解决**：检查 Supabase 的 Site URL 是否正确

### 问题 2：图片上传失败
**解决**：检查 Storage bucket 是否为 public

### 问题 3：页面空白
**解决**：检查浏览器控制台（F12）查看错误

---

## 🔄 如何更新网站

以后修改代码后，只需：

```bash
git add .
git commit -m "更新说明"
git push
```

Vercel 会自动重新部署！

---

## 📚 详细文档

需要更多帮助？查看 `DEPLOYMENT_GUIDE.md` 完整指南。
