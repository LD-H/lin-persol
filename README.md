# Lin's Personal Website

基于 **React + Node.js + MySQL + 阿里云 OSS** 搭建的个人网站。

## 📁 项目结构

```
lin-persol/
├── frontend/          # React + Vite + TypeScript + TailwindCSS
└── backend/           # Express + Prisma + MySQL + 阿里云 OSS
```

## 🚀 快速开始

### 1. 配置后端环境变量

```bash
cd backend
cp .env.example .env
# 编辑 .env，填写 MySQL 和 OSS 配置
```

### 2. 初始化数据库

确保本地 MySQL 已启动，并创建数据库：

```sql
CREATE DATABASE personal_site CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

然后运行 Prisma 迁移：

```bash
cd backend
npm run db:migrate   # 生成并执行迁移
npm run db:generate  # 生成 Prisma Client
```

### 3. 启动后端

```bash
cd backend
npm run dev
# 服务运行在 http://localhost:3001
```

### 4. 启动前端

```bash
cd frontend
npm run dev
# 访问 http://localhost:5173
```

## 📦 前端打包

```bash
cd frontend
npm run build       # 打包到 frontend/dist/
npm run preview     # 预览打包结果
```

## ☁️ 阿里云 OSS 配置指南

1. 登录 [阿里云控制台](https://oss.console.aliyun.com/)
2. 创建 Bucket（读写权限设为**公共读**）
3. 获取 AccessKey ID 和 Secret
4. 填入 `backend/.env` 对应字段

## 🛠 API 接口

| 方法   | 路径                  | 说明         |
|--------|----------------------|------------|
| GET    | /api/photos          | 获取图片列表   |
| POST   | /api/photos/upload   | 上传图片到 OSS |
| DELETE | /api/photos/:id      | 删除图片      |
| GET    | /api/health          | 健康检查      |
