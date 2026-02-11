# 旅行回忆 - Travel Memories

一个美观的旅行回忆记录网站，采用 iOS 液态玻璃风格设计，支持多用户共享回忆墙。

## ✨ 功能特性

- 🔐 **用户系统**：注册/登录、个人主页、资料编辑
- 📸 **回忆管理**：添加回忆（照片、标题、日期、地点、描述）
- 🎨 **精美界面**：iOS 液态玻璃风格、瀑布流布局
- 👥 **多用户协作**：共享回忆墙、可见性控制
- 📱 **响应式设计**：完美适配桌面和移动端
- 🖼️ **图片管理**：智能缩放、保持比例
- 🗓️ **日期选择**：美观的中文日历组件

## 🛠️ 技术栈

- **Next.js 14** - React 框架（App Router）
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **Framer Motion** - 动画效果
- **Supabase** - 后端服务（PostgreSQL + Storage + Auth）
- **React DatePicker** - 日期选择组件

## 快速开始

### 1. 安装依赖

```bash
npm install
# 或
yarn install
# 或
pnpm install
```

### 2. 配置 Supabase

详细配置步骤见下方 "Supabase 配置指南"

### 3. 配置环境变量

复制 `.env.local.example` 为 `.env.local`：

```bash
cp .env.local.example .env.local
```

然后填入你的 Supabase 配置：

```env
NEXT_PUBLIC_SUPABASE_URL=你的项目URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的匿名密钥
```

### 4. 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看网站。

## Supabase 配置指南

### 步骤 1: 创建 Supabase 项目

1. 访问 [https://supabase.com](https://supabase.com)
2. 登录或注册账户
3. 点击 "New Project" 创建新项目
4. 填写项目名称、数据库密码、选择区域
5. 等待项目创建完成（约 2 分钟）

### 步骤 2: 获取 API 密钥

1. 在项目仪表板，点击左侧菜单的 "Project Settings"（设置图标）
2. 点击 "API" 标签
3. 复制以下信息到 `.env.local`：
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 步骤 3: 创建数据库表

1. 在 Supabase 仪表板，点击左侧菜单的 "SQL Editor"
2. 点击 "New query"
3. 复制 `supabase-setup.sql` 文件中的所有 SQL 代码
4. 粘贴到 SQL 编辑器中
5. 点击 "Run" 执行 SQL

这将创建：
- `profiles` 表（用户资料）
- `memories` 表（旅行回忆）
- 相关的 RLS（行级安全）策略
- 性能优化索引

### 步骤 4: 创建 Storage Bucket

1. 在 Supabase 仪表板，点击左侧菜单的 "Storage"
2. 点击 "Create a new bucket"
3. Bucket 名称填写：`memories`
4. **重要**: 将 "Public bucket" 选项打开（设为公开）
5. 点击 "Create bucket"

### 步骤 5: 配置 Storage 策略

1. 点击刚创建的 `memories` bucket
2. 点击 "Policies" 标签
3. 点击 "New policy"
4. 创建以下策略：

**上传策略（INSERT）：**
- Policy name: `Authenticated users can upload`
- Target roles: `authenticated`
- Policy definition:
  ```sql
  (auth.role() = 'authenticated'::text)
  ```

**读取策略（SELECT）：**
- Policy name: `Public can view all images`
- Target roles: `public`
- Policy definition:
  ```sql
  true
  ```

### 步骤 6: 配置认证（可选）

1. 在 Supabase 仪表板，点击 "Authentication" → "Providers"
2. 确保 Email 认证已启用
3. 可以根据需要配置其他认证方式（Google、GitHub 等）

## 项目结构

```
├── app/
│   ├── auth/          # 登录/注册页面
│   ├── add/           # 添加回忆页面
│   ├── layout.tsx     # 根布局
│   ├── page.tsx       # 主页（瀑布流）
│   └── globals.css    # 全局样式
├── components/
│   ├── ui/            # UI 组件（按钮、输入框等）
│   ├── memory-card.tsx  # 回忆卡片组件
│   └── navbar.tsx     # 导航栏
├── lib/
│   ├── supabase/      # Supabase 客户端配置
│   └── utils.ts       # 工具函数
└── supabase-setup.sql # 数据库初始化 SQL
```

## 🚀 快速部署

### 方式一：快速部署（5 分钟）

查看 [`QUICK_DEPLOY.md`](./QUICK_DEPLOY.md) 快速上手指南。

### 方式二：详细部署

查看 [`DEPLOYMENT_GUIDE.md`](./DEPLOYMENT_GUIDE.md) 完整部署文档。

### 一键部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/你的用户名/travel-memories)

**注意**：部署前需要先配置 Supabase！

## 📋 配置文档

- 🗄️ **Supabase 初始配置**：[`SETUP_GUIDE.md`](./SETUP_GUIDE.md)
- 👤 **用户功能配置**：[`USER_FEATURE_SETUP.md`](./USER_FEATURE_SETUP.md)
- 💾 **Storage 配置**：[`STORAGE_SETUP_DETAILED.md`](./STORAGE_SETUP_DETAILED.md)

## ⚠️ 注意事项

- 首次运行前必须完成 Supabase 配置
- 确保 `.env.local` 文件已正确配置
- Storage bucket 必须设为 public 才能访问图片
- 数据库表必须启用 RLS 策略以确保安全
- 部署前确保 `.env.local` 在 `.gitignore` 中

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可

MIT License
