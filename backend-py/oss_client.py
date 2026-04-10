"""
oss_client.py - 阿里云 OSS 工具函数
对应 Node.js 的：utils/oss.ts

逻辑完全一致：上传文件 / 删除文件
"""
import oss2
from config import settings

# 创建 OSS 客户端单例（对应 new OSS({...})）
_auth = oss2.Auth(settings.oss_access_key_id, settings.oss_access_key_secret)
_bucket = oss2.Bucket(_auth, f"https://{settings.oss_region}.aliyuncs.com", settings.oss_bucket)


def upload_to_oss(oss_key: str, file_bytes: bytes) -> str:
    """
    上传文件到 OSS，返回访问 URL
    对应 Node.js 的 uploadToOSS(ossKey, fileBuffer)
    """
    _bucket.put_object(oss_key, file_bytes)
    return f"{settings.oss_base_url}/{oss_key}"


def delete_from_oss(oss_key: str) -> None:
    """
    从 OSS 删除文件
    对应 Node.js 的 deleteFromOSS(ossKey)
    """
    _bucket.delete_object(oss_key)
