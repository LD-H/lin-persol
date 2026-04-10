"""
main.py - 应用入口
对应 Node.js 的：src/index.ts

Express app   →  FastAPI app
app.use(cors) →  CORSMiddleware
app.use(router) →  app.include_router
app.listen    →  uvicorn.run
"""
from datetime import datetime, timezone

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from database import init_db
from routes.photos import router as photos_router

# ── 创建 FastAPI 实例（对应 const app = express()）──────────────
app = FastAPI(
    title="个人网站 API",
    description="基于 FastAPI + SQLAlchemy + 阿里云 OSS 的个人网站后端（Python 版）",
    version="1.0.0",
    # FastAPI 自带 Swagger 文档，访问 http://localhost:3002/docs 即可查看所有接口
)

# ── CORS 中间件（对应 app.use(cors({...}))）─────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── 注册路由（对应 app.use('/api/photos', photosRouter)）─────────
app.include_router(photos_router, prefix="/api/photos", tags=["photos"])


# ── 健康检查（对应 app.get('/api/health', ...)）──────────────────
@app.get("/api/health", tags=["system"])
def health_check():
    return {"status": "ok", "time": datetime.now(timezone.utc).isoformat()}


# ── 启动事件：初始化数据库表（对应 Prisma 的 migrate）────────────
@app.on_event("startup")
def on_startup():
    init_db()
    print(f"🚀 后端服务运行在 http://localhost:{settings.port}")
    print(f"📦 数据库：{settings.database_url.split('@')[-1]}")
    print(f"☁️  OSS Bucket：{settings.oss_bucket}")
    print(f"📖 API 文档：http://localhost:{settings.port}/docs")


# ── 程序入口──────────────────────────────────────────────────────
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=settings.port,
        reload=True,   # 热重载，对应 nodemon / ts-node-dev
    )
