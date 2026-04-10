import { Router, Request, Response } from 'express'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import prisma from '../utils/prisma'
import { uploadToOSS, deleteFromOSS } from '../utils/oss'

const router = Router()

// 使用内存存储，文件不落磁盘，直接上传到 OSS
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 最大 10MB
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('只支持 JPG、PNG、GIF、WEBP 格式'))
    }
  },
})

/**
 * GET /api/photos
 * 获取所有图片列表（按创建时间倒序）
 */
router.get('/', async (_req: Request, res: Response) => {
  try {
    const photos = await prisma.photo.findMany({
      orderBy: { createdAt: 'desc' },
    })
    res.json({ photos })
  } catch (error) {
    console.error('获取图片列表失败:', error)
    res.status(500).json({ error: '服务器错误' })
  }
})

/**
 * POST /api/photos/upload
 * 上传图片到阿里云 OSS，并将记录保存到 MySQL
 */
router.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: '请选择要上传的文件' })
    return
  }

  try {
    const ext = path.extname(req.file.originalname).toLowerCase()
    const ossKey = `photos/${new Date().getFullYear()}/${uuidv4()}${ext}`

    // 1. 上传到 OSS
    const url = await uploadToOSS(ossKey, req.file.buffer)

    // 2. 存入 MySQL
    const photo = await prisma.photo.create({
      data: {
        name: req.file.originalname,
        ossKey,
        url,
        size: req.file.size,
        mimeType: req.file.mimetype,
      },
    })

    res.status(201).json({ photo })
  } catch (error) {
    console.error('上传失败:', error)
    res.status(500).json({ error: '上传失败，请检查 OSS 配置' })
  }
})

/**
 * DELETE /api/photos/:id
 * 删除图片：从 OSS 删除文件，并从 MySQL 删除记录
 */
router.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)

  if (isNaN(id)) {
    res.status(400).json({ error: '无效的 ID' })
    return
  }

  try {
    // 1. 查找记录
    const photo = await prisma.photo.findUnique({ where: { id } })
    if (!photo) {
      res.status(404).json({ error: '图片不存在' })
      return
    }

    // 2. 从 OSS 删除文件
    await deleteFromOSS(photo.ossKey)

    // 3. 从 MySQL 删除记录
    await prisma.photo.delete({ where: { id } })

    res.json({ message: '删除成功' })
  } catch (error) {
    console.error('删除失败:', error)
    res.status(500).json({ error: '删除失败' })
  }
})

export default router
