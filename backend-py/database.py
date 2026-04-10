"""
database.py - 数据库连接 & 模型定义
对应 Node.js 的：prisma/schema.prisma + utils/prisma.ts

Prisma 用 schema 文件定义模型，Python 用 SQLAlchemy 用类来定义
"""
from datetime import datetime
from sqlalchemy import create_engine, String, Integer, DateTime
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session
from config import settings


# ── 数据库引擎（对应 PrismaClient）───────────────────────────────
# connect_args 用于 SQLite，MySQL 不需要
engine = create_engine(
    settings.database_url,
    echo=True,   # 打印 SQL 日志，对应 Prisma 的 log: ['query']
    pool_pre_ping=True,  # 自动检测断开的连接
)


# ── 基类（所有模型都继承它）──────────────────────────────────────
class Base(DeclarativeBase):
    pass


# ── Photo 模型（对应 Prisma schema 的 model Photo）──────────────
class Photo(Base):
    __tablename__ = "photos"  # 对应 Prisma 的 @@map("photos")

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    oss_key: Mapped[str] = mapped_column(String(512), unique=True, nullable=False)
    url: Mapped[str] = mapped_column(String(1024), nullable=False)
    size: Mapped[int] = mapped_column(Integer, nullable=False)
    mime_type: Mapped[str] = mapped_column(String(100), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime, default=datetime.utcnow, onupdate=datetime.utcnow
    )


# ── 创建所有表（对应 prisma migrate）────────────────────────────
def init_db():
    Base.metadata.create_all(bind=engine)


# ── 获取数据库 Session（对应 Prisma Client 的每次查询）─────────
def get_db():
    """
    FastAPI 的依赖注入函数
    每次请求开始时创建 Session，请求结束时关闭
    对应 Node.js 中 Prisma 自动管理连接池的行为
    """
    with Session(engine) as session:
        yield session
