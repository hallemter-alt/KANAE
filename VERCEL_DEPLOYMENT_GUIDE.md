# Vercel 部署配置 / Vercel Deployment Configuration

## 🎯 部署架构 / Deployment Architecture

```
GitHub Repository
       ↓
   [Push to main]
       ↓
   Vercel (Auto Deploy)
       ↓
   Production URL
```

**说明:** 本项目专为 Vercel 部署优化，不使用 Cloudflare Pages。

---

## ✅ 当前配置 / Current Configuration

### 1. Next.js 配置 (next.config.ts)

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
    // Vercel automatic image optimization
    unoptimized: false,
  },
  // Vercel deployment configuration
  output: 'standalone',
};

export default nextConfig;
```

**特点:**
- ✅ `output: 'standalone'` - Vercel 优化的服务端渲染
- ✅ `unoptimized: false` - 使用 Vercel 自动图片优化
- ✅ 完全支持 API Routes
- ✅ 支持动态路由和 SSR
- ✅ 支持统合买卖系统的所有功能

### 2. Vercel 项目设置

**Framework Preset:** Next.js  
**Build Command:** `npm run build`  
**Output Directory:** `.next`  
**Install Command:** `npm install`  
**Development Command:** `npm run dev`

### 3. 环境变量

在 Vercel Dashboard 设置：

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Next.js (可选)
NODE_VERSION=20
```

---

## 🚀 部署流程 / Deployment Flow

### 自动部署

```bash
# 1. 在本地开发
git add .
git commit -m "feat: your changes"

# 2. 推送到 GitHub
git push origin main

# 3. Vercel 自动检测并部署
# ⏱️ 通常 2-5 分钟完成
```

### 手动触发

```
Vercel Dashboard 
→ 选择项目 
→ Deployments 
→ Redeploy
```

---

## 📊 完全支持的功能 / Fully Supported Features

### ✅ 统合买卖系统

```
/sale 页面
├─ 3 个类别标签（すべて・住宅用・投資用）
├─ 动态筛选器（服务端 + 客户端）
├─ API Routes (/api/properties/unified-search)
├─ 服务端渲染（SSR）
├─ 增量静态再生成（ISR）
└─ 图片优化（Vercel Image Optimization）
```

### ✅ Next.js 15 功能

```
- App Router ✅
- Server Components ✅
- Client Components ✅
- API Routes ✅
- Dynamic Routes ✅
- Middleware ✅
- Image Optimization ✅
- Font Optimization ✅
```

### ✅ 性能优化

```
- 自动代码分割 ✅
- 静态资源优化 ✅
- Edge Caching ✅
- Gzip/Brotli 压缩 ✅
- HTTP/2 推送 ✅
```

---

## 🔧 Vercel 特定配置

### vercel.json (可选)

如需自定义，可创建：

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}
```

### .vercelignore

已配置，排除不必要的文件：

```
node_modules
.next
.env*.local
.DS_Store
*.log
.vercel
```

---

## 🎯 为什么选择 Vercel？

### 优势

```
✅ Next.js 原生支持
   - 由 Next.js 团队开发
   - 完美兼容 Next.js 15
   - 自动优化配置

✅ 完整功能支持
   - API Routes 完全支持
   - SSR/ISR 无缝工作
   - 边缘函数支持
   - 中间件支持

✅ 开发体验
   - 预览部署自动生成
   - 每个 PR 都有独立 URL
   - 实时日志查看
   - 简单的回滚功能

✅ 性能
   - 全球 CDN
   - 边缘网络
   - 自动优化
   - 快速构建

✅ 统合系统需求
   - 动态 API 支持 ✅
   - 实时筛选 ✅
   - 服务端数据获取 ✅
   - 客户端状态管理 ✅
```

### 不适合 Cloudflare 的原因

```
❌ API Routes 限制
   - 需要迁移到 Workers
   - 额外的开发成本

❌ SSR 限制
   - 有限的 Next.js 支持
   - 部分功能不兼容

❌ 统合系统需求
   - 动态筛选需要 API
   - 实时数据需要 SSR
   - 复杂的客户端路由

✅ Vercel 完美支持所有需求
```

---

## 📝 部署检查清单 / Deployment Checklist

### 部署前

```
✅ 代码检查
├─ [ ] 无 TypeScript 错误
├─ [ ] 无 ESLint 警告（重要的）
├─ [ ] 通过本地构建测试
└─ [ ] 环境变量已配置

✅ Git 状态
├─ [ ] 所有更改已提交
├─ [ ] 推送到 GitHub
└─ [ ] 分支已合并到 main

✅ Vercel 设置
├─ [ ] 项目已连接 GitHub
├─ [ ] 环境变量已设置
└─ [ ] Production 分支设为 main
```

### 部署后

```
✅ 功能验证
├─ [ ] 主页加载正常
├─ [ ] /sale 页面正常
├─ [ ] 类别切换工作
├─ [ ] 筛选器工作
├─ [ ] 物件显示正常
└─ [ ] API 调用成功

✅ 性能检查
├─ [ ] Lighthouse Score > 90
├─ [ ] 页面加载 < 2 秒
└─ [ ] 无 Console 错误
```

---

## 🐛 故障排除 / Troubleshooting

### 问题 1: 构建失败

**检查:**
```bash
# 本地测试构建
npm run build

# 查看构建日志
Vercel Dashboard → Deployments → View Function Logs
```

**常见原因:**
- TypeScript 类型错误
- 环境变量未设置
- 依赖包版本冲突

### 问题 2: 页面 404

**检查:**
- 路由配置是否正确
- 文件路径是否正确
- 动态路由是否正确定义

### 问题 3: API 不工作

**检查:**
- 环境变量是否在 Vercel 设置
- API Route 文件位置是否正确
- Supabase 连接是否正常

### 问题 4: 图片不显示

**检查:**
```typescript
// next.config.ts 中
images: {
  domains: ['images.unsplash.com'], // 添加你的图片域名
}
```

---

## 🌐 URL 结构 / URL Structure

### Production

```
https://your-project.vercel.app
https://kanae-real-estate.vercel.app (example)
```

### Preview (PR deployments)

```
https://kanae-git-{branch}-{team}.vercel.app
https://kanae-git-feature-new-page-team.vercel.app (example)
```

### 自定义域名

```
Vercel Dashboard 
→ Settings 
→ Domains 
→ Add Domain
```

---

## 📊 监控和分析 / Monitoring & Analytics

### Vercel Analytics

```
// 添加到 app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 实时日志

```
Vercel Dashboard 
→ Deployments 
→ 选择部署 
→ Runtime Logs
```

---

## 🎯 最佳实践 / Best Practices

### 1. 环境变量管理

```bash
# 开发环境
.env.local

# 生产环境
Vercel Dashboard → Settings → Environment Variables
```

### 2. 分支策略

```
main           → Production (自动部署)
staging        → Staging (预览环境)
feature/*      → Preview (PR 部署)
```

### 3. 性能优化

```typescript
// 使用 Next.js Image 组件
import Image from 'next/image';

// 代码分割
const DynamicComponent = dynamic(() => import('./Component'));

// 静态生成（当可能时）
export const generateStaticParams = async () => {...};
```

### 4. 错误处理

```typescript
// app/error.tsx
'use client';

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>出错了！</h2>
      <button onClick={() => reset()}>重试</button>
    </div>
  );
}
```

---

## 📚 相关文档 / Related Documentation

### Vercel 官方文档
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables](https://vercel.com/docs/environment-variables)

### 项目文档
- `UNIFIED_PROPERTY_SYSTEM.md` - 统合系统架构
- `DEPLOYMENT_VERIFICATION.md` - 部署验证指南
- `VISUAL_CHANGES_GUIDE.md` - 视觉变更指南

---

## ✅ 总结 / Summary

### 当前状态

```
✅ 平台: Vercel（唯一部署平台）
✅ 配置: 完全优化为 Vercel
✅ 功能: 100% 支持统合买卖系统
✅ 性能: 自动优化和 CDN
✅ 维护: 简单的部署和回滚
```

### 不使用 Cloudflare 的原因

```
1. 统合系统需要动态 API Routes
2. 需要完整的 SSR 支持
3. Vercel 提供更好的 Next.js 集成
4. 开发和部署流程更简单
5. 预览部署自动生成
```

### 推荐设置

```
✅ GitHub → Vercel 自动部署
✅ 环境变量在 Vercel Dashboard 设置
✅ 使用 Vercel Analytics 监控
✅ 自定义域名（如需要）
✅ 定期检查 Vercel 日志
```

---

**配置版本**: 2.0.0 (Vercel Only)  
**更新日期**: 2026-02-01  
**状态**: ✅ 生产就绪
