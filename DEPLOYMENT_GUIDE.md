# Vercel 部署指南

按照以下步骤将你的旅行回忆网站部署到 Vercel。

## 📋 前置准备

在开始之前，请确保：
- ✅ 项目代码已完成
- ✅ Supabase 已配置完成
- ✅ 本地测试运行正常
- ✅ 有 GitHub 账号（推荐）或 GitLab/Bitbucket 账号

---

## 第一步：准备 Git 仓库

### 1.1 初始化 Git（如果还没有）

在项目根目录打开终端，运行：

```bash
git init
```

### 1.2 添加所有文件到 Git

```bash
git add .
```

### 1.3 创建第一个提交

```bash
git commit -m "Initial commit: Travel Memories App"
```

### 1.4 在 GitHub 上创建仓库

1. 访问 [https://github.com/new](https://github.com/new)
2. 仓库名称：`travel-memories`（或任何你喜欢的名字）
3. 选择 **Private**（私有，推荐）或 **Public**（公开）
4. **不要**勾选 "Initialize this repository with a README"
5. 点击 **Create repository**

### 1.5 将本地代码推送到 GitHub

复制 GitHub 页面上显示的命令，应该类似于：

```bash
git remote add origin https://github.com/你的用户名/travel-memories.git
git branch -M main
git push -u origin main
```

**重要提示：** 确保 `.env.local` 文件在 `.gitignore` 中，不会被推送到 GitHub！

---

## 第二步：连接 Vercel

### 2.1 访问 Vercel

1. 打开 [https://vercel.com](https://vercel.com)
2. 点击 **Sign Up**（如果没有账号）或 **Log In**（如果已有账号）
3. 推荐使用 **Continue with GitHub** 登录，这样可以直接访问你的仓库

### 2.2 导入项目

1. 登录后，点击右上角的 **Add New...**
2. 选择 **Project**
3. 你会看到 GitHub 仓库列表
4. 找到 `travel-memories` 仓库，点击 **Import**

---

## 第三步：配置项目

### 3.1 项目设置

Vercel 会自动检测到这是一个 Next.js 项目，默认设置通常是正确的：

- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `next build`
- **Output Directory**: `.next`

**不需要修改这些设置！**

### 3.2 配置环境变量（重要！）

在部署之前，需要添加环境变量：

1. 在 Vercel 导入页面，找到 **Environment Variables** 部分
2. 添加以下两个变量：

**变量 1：**
- **Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Value**: 你的 Supabase URL（从 `.env.local` 复制）
- 点击 **Add**

**变量 2：**
- **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Value**: 你的 Supabase Anon Key（从 `.env.local` 复制）
- 点击 **Add**

**如何获取这些值：**
1. 打开本地的 `.env.local` 文件
2. 复制 `NEXT_PUBLIC_SUPABASE_URL=` 后面的内容
3. 复制 `NEXT_PUBLIC_SUPABASE_ANON_KEY=` 后面的内容

### 3.3 开始部署

1. 确认环境变量已添加
2. 点击底部的 **Deploy** 按钮
3. 等待部署完成（通常 2-3 分钟）

---

## 第四步：配置 Supabase（重要！）

部署成功后，你会获得一个 Vercel 域名，类似：
```
https://travel-memories-xxx.vercel.app
```

需要将这个域名添加到 Supabase 的允许列表中：

### 4.1 更新 Supabase 认证设置

1. 登录 [Supabase 仪表板](https://supabase.com)
2. 选择你的项目
3. 点击左侧菜单的 **Authentication**
4. 点击 **URL Configuration**
5. 在 **Site URL** 中填入你的 Vercel 域名：
   ```
   https://travel-memories-xxx.vercel.app
   ```
6. 在 **Redirect URLs** 中添加：
   ```
   https://travel-memories-xxx.vercel.app/**
   ```
7. 点击 **Save**

---

## 第五步：测试部署

### 5.1 访问网站

1. 点击 Vercel 提供的域名链接
2. 应该能看到你的网站登录页面

### 5.2 测试功能

测试以下功能是否正常：
- ✅ 用户注册
- ✅ 用户登录
- ✅ 添加回忆
- ✅ 上传照片
- ✅ 查看回忆列表
- ✅ 编辑用户资料
- ✅ 上传头像

### 5.3 常见问题

**问题 1：登录后跳转失败**
- 检查 Supabase 的 Site URL 和 Redirect URLs 是否正确配置

**问题 2：图片无法上传**
- 检查 Supabase Storage bucket 是否设为 public
- 检查 Storage 策略是否正确配置

**问题 3：环境变量错误**
- 在 Vercel 项目设置中检查环境变量
- 确保没有多余的空格或引号

---

## 第六步：绑定自定义域名（可选）

如果你有自己的域名：

### 6.1 添加域名

1. 在 Vercel 项目页面，点击 **Settings**
2. 点击左侧的 **Domains**
3. 输入你的域名（如 `travel.yourdomain.com`）
4. 点击 **Add**

### 6.2 配置 DNS

Vercel 会提供 DNS 配置说明：
- 通常是添加一个 CNAME 记录
- 指向 `cname.vercel-dns.com`

### 6.3 更新 Supabase

在 Supabase 的 URL Configuration 中，将 Site URL 更新为你的自定义域名。

---

## 第七步：后续更新

### 7.1 更新代码

当你修改代码后，只需：

```bash
git add .
git commit -m "描述你的更改"
git push
```

Vercel 会自动检测到 GitHub 的更新，并自动重新部署！

### 7.2 查看部署状态

1. 访问 [Vercel Dashboard](https://vercel.com/dashboard)
2. 点击你的项目
3. 查看 **Deployments** 标签，可以看到所有部署历史

---

## 📊 部署检查清单

部署前检查：
- [ ] 代码已推送到 GitHub
- [ ] `.env.local` 在 `.gitignore` 中
- [ ] Supabase 数据库和 Storage 已配置
- [ ] 本地测试无误

Vercel 配置：
- [ ] 项目已成功导入
- [ ] 环境变量已添加（2个）
- [ ] 部署成功，无错误

Supabase 配置：
- [ ] Site URL 已更新为 Vercel 域名
- [ ] Redirect URLs 已添加

功能测试：
- [ ] 可以注册/登录
- [ ] 可以添加回忆
- [ ] 可以上传图片
- [ ] 可以查看回忆列表
- [ ] 可以编辑资料

---

## 🎉 完成！

恭喜！你的旅行回忆网站已成功部署到 Vercel。

你的网站现在可以：
- ✅ 通过 HTTPS 安全访问
- ✅ 自动获得 CDN 加速
- ✅ 代码更新后自动重新部署
- ✅ 免费托管（Vercel 免费计划）

### 重要提示

1. **保护环境变量**：不要将 `.env.local` 提交到 Git
2. **定期备份**：定期备份 Supabase 数据
3. **监控使用**：注意 Vercel 和 Supabase 的免费额度

### 需要帮助？

- Vercel 文档：https://vercel.com/docs
- Supabase 文档：https://supabase.com/docs
- Next.js 文档：https://nextjs.org/docs

祝你使用愉快！✨
