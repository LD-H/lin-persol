# Python 学习大纲（面向已有 Node.js 经验的开发者）

> 本大纲结合 `backend-py/` 项目实践，帮助你用「Node.js 对比」的方式快速上手 Python 后端开发。

---

## 阶段一：Python 基础语法（对比 JavaScript）

> 目标：能看懂 Python 代码，理解与 JS 的核心差异

### 1.1 语法差异速览
- 缩进代替花括号 `{}`
- 无需 `;` 结尾
- 变量无需 `const` / `let`，直接赋值
- `None` 对应 JS 的 `null` / `undefined`
- `True / False`（首字母大写）对应 `true / false`

### 1.2 数据类型
- `str / int / float / bool`
- `list` → 对应 JS 的 `Array`
- `dict` → 对应 JS 的 `Object / Map`
- `tuple` → 不可变的列表
- `set` → 对应 JS 的 `Set`

### 1.3 函数
```python
# 普通函数
def add(a: int, b: int) -> int:
    return a + b

# 默认参数（同 JS）
def greet(name: str = "Lin") -> str:
    return f"Hello, {name}"   # f-string 对应 JS 的模板字符串

# *args / **kwargs（对应 JS 的 ...rest）
def log(*args, **kwargs):
    print(args, kwargs)
```

### 1.4 类与面向对象
```python
class Animal:
    def __init__(self, name: str):   # 构造函数，对应 JS 的 constructor
        self.name = name             # 实例属性，对应 JS 的 this.name

    def speak(self) -> str:
        return f"{self.name} speaking"

class Dog(Animal):                   # 继承，对应 JS 的 extends
    def speak(self) -> str:
        return f"{self.name}: Woof!"
```

### 1.5 类型注解（Type Hints）
- Python 是动态类型，但支持类型注解（对应 TypeScript）
- `str / int / float / bool / list[str] / dict[str, int]`
- `Optional[str]` → 对应 TS 的 `string | null`
- `Union[str, int]` → 对应 TS 的 `string | number`

### 1.6 推导式（Python 特色）
```python
# 列表推导式（对应 JS 的 .map）
doubled = [x * 2 for x in [1, 2, 3]]

# 条件过滤（对应 JS 的 .filter）
evens = [x for x in range(10) if x % 2 == 0]

# 字典推导式（对应 JS 的 Object.fromEntries + map）
squares = {x: x**2 for x in range(5)}
```

---

## 阶段二：Python 异步编程（对比 Node.js async/await）

> 目标：理解 Python 的异步模型，会写 async/await

### 2.1 基本概念对比
| Node.js | Python |
|---|---|
| Event Loop（单线程） | asyncio Event Loop |
| `async function` | `async def` |
| `await` | `await` |
| `Promise` | `Coroutine / asyncio.Future` |
| `Promise.all` | `asyncio.gather` |

### 2.2 async/await 写法
```python
import asyncio

async def fetch_data(url: str) -> str:
    await asyncio.sleep(1)   # 模拟 IO 等待
    return f"data from {url}"

async def main():
    # 并发执行（对应 Promise.all）
    results = await asyncio.gather(
        fetch_data("url1"),
        fetch_data("url2"),
    )
    print(results)

asyncio.run(main())
```

### 2.3 FastAPI 中的同步 vs 异步
```python
# 同步路由（CPU 密集型或同步 ORM）
@router.get("/sync")
def sync_route():
    return {"msg": "sync"}

# 异步路由（IO 密集型，如文件上传、外部 API）
@router.post("/async")
async def async_route(file: UploadFile):
    content = await file.read()   # 必须用 await
    return {"size": len(content)}
```

---

## 阶段三：Web 框架 FastAPI（对比 Express）

> 目标：能独立写 RESTful API，理解 FastAPI 核心机制

### 3.1 框架对比
| Express (Node.js) | FastAPI (Python) |
|---|---|
| `express()` | `FastAPI()` |
| `app.use(cors())` | `CORSMiddleware` |
| `Router()` | `APIRouter()` |
| `req.params.id` | 路径参数 `photo_id: int` |
| `req.body` | Pydantic 模型 / `Body()` |
| `req.file` | `UploadFile` |
| `res.json({})` | 直接 `return {}` |
| `res.status(404).json()` | `raise HTTPException(404)` |
| 手写类型，无文档 | 自动生成 Swagger 文档 |

### 3.2 依赖注入（FastAPI 独特亮点）
```python
# 对应 Node.js 中手动调用 prisma / 传参的方式
# FastAPI 用 Depends() 自动注入，让代码更解耦

from fastapi import Depends

def get_db():
    with Session(engine) as session:
        yield session

@router.get("/photos")
def get_photos(db: Session = Depends(get_db)):
    # db 自动被注入，不需要手动创建
    return db.query(Photo).all()
```

### 3.3 Pydantic 数据校验
```python
from pydantic import BaseModel, Field

class CreatePhotoRequest(BaseModel):
    name: str = Field(min_length=1, max_length=255)
    description: str | None = None

# FastAPI 自动校验请求体，类型错误直接返回 422
@router.post("/photos")
def create_photo(body: CreatePhotoRequest):
    ...
```

### 3.4 自动文档
- 启动后访问 `http://localhost:3002/docs` → Swagger UI
- `http://localhost:3002/redoc` → ReDoc 文档
- 完全自动生成，无需额外配置

---

## 阶段四：数据库操作 SQLAlchemy（对比 Prisma）

> 目标：能用 SQLAlchemy 做 CRUD，理解 ORM 核心概念

### 4.1 对比
| Prisma (Node.js) | SQLAlchemy (Python) |
|---|---|
| `schema.prisma` 定义模型 | Python 类定义模型 |
| `prisma migrate` | `alembic upgrade head` |
| `prisma.photo.findMany()` | `db.query(Photo).all()` |
| `prisma.photo.create()` | `db.add(photo); db.commit()` |
| `prisma.photo.delete()` | `db.delete(photo); db.commit()` |

### 4.2 常用查询
```python
# 查所有（对应 findMany）
photos = db.query(Photo).all()

# 条件查询（对应 where）
photo = db.query(Photo).filter(Photo.id == 1).first()

# 也可以用新式写法（SQLAlchemy 2.0）
from sqlalchemy import select
stmt = select(Photo).where(Photo.id == 1)
photo = db.scalar(stmt)

# 排序
photos = db.query(Photo).order_by(Photo.created_at.desc()).all()

# 创建
photo = Photo(name="test.jpg", ...)
db.add(photo)
db.commit()
db.refresh(photo)   # 获取数据库生成的字段（id、created_at 等）

# 删除
db.delete(photo)
db.commit()
```

### 4.3 数据库迁移（Alembic）
```bash
# 初始化
alembic init alembic

# 生成迁移文件（对应 prisma migrate dev）
alembic revision --autogenerate -m "add photos table"

# 执行迁移（对应 prisma migrate deploy）
alembic upgrade head

# 回滚（Prisma 不支持，Alembic 支持）
alembic downgrade -1
```

---

## 阶段五：Python 工程化

> 目标：像管理 Node.js 项目一样管理 Python 项目

### 5.1 包管理
| Node.js | Python |
|---|---|
| `package.json` | `requirements.txt` / `pyproject.toml` |
| `npm install` | `pip install -r requirements.txt` |
| `node_modules/` | 虚拟环境 `venv/` |
| `npx` | `pipx` |
| `package-lock.json` | `pip freeze > requirements.txt` |

### 5.2 虚拟环境（必学！）
```bash
# 创建虚拟环境（对应 node_modules 的隔离概念）
python3 -m venv venv

# 激活（Mac/Linux）
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 退出虚拟环境
deactivate
```

### 5.3 代码质量工具
| Node.js | Python |
|---|---|
| ESLint | `ruff` / `flake8` |
| Prettier | `black` / `ruff format` |
| TypeScript | `mypy`（类型检查） |

### 5.4 启动命令
```bash
# 开发模式（热重载，对应 nodemon）
uvicorn main:app --reload --port 3002

# 生产模式（多 worker）
uvicorn main:app --workers 4 --port 3002
```

---

## 阶段六：实践项目（结合本仓库）

> 用 `backend-py/` 做练习，每个阶段对应一个任务

| 任务 | 对应知识点 |
|---|---|
| ✅ 读懂 `config.py` | 阶段一：类、类型注解 |
| ✅ 读懂 `database.py` | 阶段四：SQLAlchemy 模型定义 |
| ✅ 读懂 `oss_client.py` | 阶段一：函数、模块导入 |
| ✅ 读懂 `routes/photos.py` | 阶段三：FastAPI 路由、依赖注入 |
| 🔲 给图片加「描述」字段 | 阶段四：Alembic 迁移 |
| 🔲 给接口加分页 | 阶段三：Query 参数 |
| 🔲 给上传接口加并发限制 | 阶段二：异步编程 |
| 🔲 写单元测试 | `pytest` + `TestClient` |
| 🔲 写 Python 版 CI | GitHub Actions + Python |

---

## 推荐学习资源

| 资源 | 说明 |
|---|---|
| [FastAPI 官方文档](https://fastapi.tiangolo.com/zh/) | 中文文档，质量极高 |
| [SQLAlchemy 2.0 文档](https://docs.sqlalchemy.org/en/20/) | ORM 官方文档 |
| [Python 类型注解指南](https://mypy.readthedocs.io/) | 对 TS 开发者友好 |
| [Real Python](https://realpython.com/) | 高质量 Python 教程 |
