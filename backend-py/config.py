"""
config.py - 配置管理
对应 Node.js 的：dotenv + process.env.XXX

Python 用 pydantic-settings 从 .env 文件读取配置，
并自动做类型校验（字符串、整数等），比 process.env 更安全
"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # 数据库
    database_url: str

    # 服务端口
    port: int = 3002

    # 阿里云 OSS
    oss_region: str
    oss_access_key_id: str
    oss_access_key_secret: str
    oss_bucket: str
    oss_base_url: str

    # 前端域名（CORS）
    frontend_url: str = "http://localhost:5173"

    # 告诉 pydantic 从 .env 文件读取配置
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")


# 单例：全局使用同一个 settings 对象，对应 Node.js 的 process.env
settings = Settings()
