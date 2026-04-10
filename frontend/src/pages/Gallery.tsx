import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

interface Photo {
  id: number
  name: string
  url: string
  size: number
  createdAt: string
}

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchPhotos = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get('/api/photos')
      setPhotos(data.photos || [])
    } catch {
      setError('获取图片失败，请检查后端服务是否启动')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPhotos()
  }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    setUploading(true)
    setError('')
    try {
      await axios.post('/api/photos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      await fetchPhotos()
    } catch {
      setError('上传失败，请检查阿里云 OSS 配置')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('确认删除这张图片吗？')) return
    try {
      await axios.delete(`/api/photos/${id}`)
      setPhotos(prev => prev.filter(p => p.id !== id))
    } catch {
      setError('删除失败')
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">相册</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">图片存储于阿里云 OSS</p>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="px-5 py-2.5 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {uploading ? (
            <>
              <span className="animate-spin">⟳</span> 上传中...
            </>
          ) : (
            <>
              <span>＋</span> 上传图片
            </>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUpload}
        />
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-20 text-gray-400">加载中...</div>
      ) : photos.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🖼️</div>
          <p className="text-gray-500 dark:text-gray-400">暂无图片，点击上传按钮添加第一张图片</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map(photo => (
            <div
              key={photo.id}
              className="group relative rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 aspect-square shadow-sm"
            >
              <img
                src={photo.url}
                alt={photo.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                <div className="w-full p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-white text-xs truncate">{photo.name}</p>
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="mt-1 text-red-300 hover:text-red-100 text-xs"
                  >
                    删除
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
