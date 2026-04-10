import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import photosRouter from './routes/photos'

const app = express()
const PORT = process.env.PORT || 3001

// ── 中间件 ──────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── 路由 ────────────────────────────────────────────
app.use('/api/photos', photosRouter)

// 健康检查
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
