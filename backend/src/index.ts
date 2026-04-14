import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import photosRouter from './routes/photos'
import authRouter from './routes/auth'
import { authMiddleware } from './middleware/auth'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── 路由 ────────────────────────────────────────────
app.use('/api/auth', authRouter)                         // 公开：登录/注册
app.use('/api/photos', authMiddleware, photosRouter)     // 🔒 需要登录

// ── 健康检查 ─────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() })
})

// ── 启动 ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 后端服务运行在 http://localhost:${PORT}`)
  console.log(`📦 数据库：${process.env.DATABASE_URL?.split('@')[1] ?? '未配置'}`)
  console.log(`☁️  OSS Bucket：${process.env.OSS_BUCKET ?? '未配置'}`)
})

export default app