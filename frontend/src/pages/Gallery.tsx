import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
})

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
      const { data } = await api.get('/api/photos')
      setPhotos(data.photos || [])
    } catch {
      setError('获取图片失败，请检查后端服务是否启动')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPhotos() }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)
    setUploading(true)
    setError('')
    try {
      await api.post('/api/photos/upload', formData, {
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
      await api.delete(`/api/photos/${id}`)
      setPhotos(prev => prev.filter(p => p.id !== id))
    } catch {
      setError('删除失败')
    }
  }

  return (
    <div className="relative min-h-screen bg-[#080809] text-white overflow-hidden">

      {/* 背景网格 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right,#ffffff08 1px,transparent 1px),linear-gradient(to bottom,#ffffff08 1px,transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 80% 40% at 50% 0%,#000 60%,transparent 100%)',
        }}
      />
      <div className="pointer-events-none absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[280px] rounded-full bg-purple-600/15 blur-[100px]" />

      <div className="relative max-w-5xl mx-auto px-6 py-24">

        {/* ── Header ── */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">Gallery</p>
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">相册</h1>
            <p className="text-sm text-gray-500">图片存储于阿里云 OSS</p>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
          >
            {uploading ? (
              <>
                <span className="inline-block animate-spin">↻</span>
                上传中...
              </>
            ) : (
              <>
                <span className="text-base leading-none">+</span>
                上传图片
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

        {/* ── 错误提示 ── */}
        {error && (
          <div className="mb-8 p-4 rounded-xl border border-red-500/20 bg-red-500/8 text-sm text-red-400">
            ⚠️ {error}
          </div>
        )}

        {/* ── 内容区 ── */}
        {loading ? (
          <div className="flex items-center justify-center py-32 text-gray-600 text-sm">
            <span className="inline-block animate-spin mr-2">↻</span>
            加载中...
          </div>
        ) : photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4">
            <div className="w-16 h-16 rounded-2xl border border-white/8 bg-white/[0.03] flex items-center justify-center text-3xl">
              🖼️
            </div>
            <p className="text-sm text-gray-500">暂无图片，点击右上角上传第一张</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map(photo => (
              <div
                key={photo.id}
                className="group relative rounded-xl overflow-hidden border border-white/8 bg-white/[0.03] aspect-square"
              >
                <img
                  src={photo.url}
                  alt={photo.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col justify-end p-3 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                  <p className="text-white text-xs truncate mb-1.5">{photo.name}</p>
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="self-start text-xs px-2 py-1 rounded-md bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-colors"
                  >
                    删除
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}