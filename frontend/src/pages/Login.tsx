import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../contexts/AuthContext'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '' })

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username || !password) { setError('请填写用户名和密码'); return }
    setLoading(true)
    setError('')
    try {
      const { data } = await api.post('/api/auth/login', { username, password })
      login(data.token, data.username)
      navigate('/gallery')
    } catch (err: any) {
      setError(err.response?.data?.error || '请求失败，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-[#080809] text-white flex items-center justify-center overflow-hidden">

      {/* 背景 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right,#ffffff08 1px,transparent 1px),linear-gradient(to bottom,#ffffff08 1px,transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%,#000 50%,transparent 100%)',
        }}
      />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-purple-600/15 blur-[100px]" />

      {/* 卡片 */}
      <div className="relative w-full max-w-sm mx-4">
        <div className="p-8 rounded-2xl border border-white/8 bg-white/[0.03] backdrop-blur-sm">

          {/* 标题 */}
          <div className="mb-8 text-center">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-gray-500 mb-2">Gallery</p>
            <h1 className="text-2xl font-bold text-white">登录</h1>
            <p className="text-sm text-gray-500 mt-1">登录后访问相册</p>
          </div>

          {/* 表单 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">用户名</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="输入用户名"
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">密码</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="输入密码"
                className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-purple-500/50 focus:bg-white/8 transition-all"
              />
            </div>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                ⚠️ {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-white text-black rounded-lg text-sm font-semibold hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 mt-2"
            >
              {loading ? '请稍候...' : '登录'}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}