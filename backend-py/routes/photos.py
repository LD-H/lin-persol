"""
routes/photos.py - 图片相关路由
对应 Node.js 的：routes/photos.ts

Express Router  →  FastAPI APIRouter
multer          →  FastAPI UploadFile
Prisma ORM      →  SQLAlchemy Session
"""
import os
import uuid
from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import Photo, get_db
from oss_client import upload_to_oss, delete_from_oss

router = APIRouter()

# 允许的文件类型（对应 Node.js 的 fileFilter）
ALLOWED_MIME_TYPES = {"image/jpeg", "image/png", "image/gif", "image/webp"}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB


# ── Pydantic 响应模型（对应 TypeScript 的接口类型定义）──────────
class PhotoResponse(BaseModel):
    id: int
    name: str
    oss_key: str
    url: str
    size: int
    mime_type: str
    created_at: datetime
    updated_at: datetime

    # 告诉 Pydantic 从 SQLAlchemy 模型对象读取属性（而不是字典）
    model_config = {"from_attributes": True}


# ── GET /api/photos ──────────────────────────────────────────────
@router.get("/", response_model=dict)
def get_photos(db: Annotated[Session, Depends(get_db)]):
    """
    获取所有图片（按创建时间倒序）
    对应 Node.js 的：prisma.photo.findMany({ orderBy: { createdAt: 'desc' } })
    """
    photos = db.query(Photo).order_by(Photo.created_at.desc()).all()
    return {"photos": [PhotoResponse.model_validate(p) for p in photos]}


# ── POST /api/photos/upload ──────────────────────────────────────
@router.post("/upload", status_code=201, response_model=dict)
async def upload_photo(
    file: Annotated[UploadFile, File(description="图片文件，最大 10MB")],
    db: Annotated[Session, Depends(get_db)],
):
    """
    上传图片到阿里云 OSS，并将记录存入 MySQL
    对应 Node.js 的：router.post('/upload', upload.single('file'), ...)
    """
    # 1. 校验文件类型（对应 multer 的 fileFilter）
    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(status_code=400, detail="只支持 JPG、PNG、GIF、WEBP 格式")

    # 2. 读取文件内容
    file_bytes = await file.read()

    # 3. 校验文件大小（对应 multer 的 limits）
    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="文件大小不能超过 10MB")

    # 4. 生成 OSS Key（对应 Node.js 的 uuidv4 + path.extname）
    ext = os.path.splitext(file.filename or "file")[1].lower()
    oss_key = f"photos/{datetime.now().year}/{uuid.uuid4()}{ext}"

    try:
        # 5. 上传到 OSS
        url = upload_to_oss(oss_key, file_bytes)

        # 6. 存入 MySQL（对应 prisma.photo.create）
        photo = Photo(
            name=file.filename or "unknown",
            oss_key=oss_key,
            url=url,
            size=len(file_bytes),
            mime_type=file.content_type or "image/jpeg",
        )
        db.add(photo)
        db.commit()
        db.refresh(photo)  # 刷新，拿到数据库生成的 id / created_at 等

        return {"photo": PhotoResponse.model_validate(photo)}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"上传失败，请检查 OSS 配置: {e}")


# ── DELETE /api/photos/{id} ──────────────────────────────────────
@router.delete("/{photo_id}", response_model=dict)
def delete_photo(
    photo_id: int,
    db: Annotated[Session, Depends(get_db)],
):
    """
    删除图片：从 OSS 删除文件，并从 MySQL 删除记录
    对应 Node.js 的：router.delete('/:id', ...)
    """
    # 1. 查找记录（对应 prisma.photo.findUnique）
    photo = db.get(Photo, photo_id)
    if not photo:
        raise HTTPException(status_code=404, detail="图片不存在")

    try:
        # 2. 从 OSS 删除文件
        delete_from_oss(photo.oss_key)

        # 3. 从 MySQL 删除记录（对应 prisma.photo.delete）
        db.delete(photo)
        db.commit()

        return {"message": "删除成功"}

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"删除失败: {e}")
