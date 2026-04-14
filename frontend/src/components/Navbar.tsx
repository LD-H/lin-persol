import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/about', label: 'About' },
  { path: '/resume', label: 'Resume' },
]

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { isLoggedIn, username, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 backdrop-blur-md bg-[#080809]/80">
      <nav className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="text-sm font-semibold text-white tracking-tight hover:text-purple-300 transition-colors">
          Lin's Space
        </Link>
        <div className="flex items-center gap-1">
          <ul className="flex items-center gap-1">
            {navItems.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`px-3 py-1.5 rounded-md text-sm transition-all duration-200 ${
                    location.pathname === path
                      ? 'text-white bg-white/8'
                      : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* 登录状态 */}
          {isLoggedIn ? (
            <div className="flex items-center gap-2 ml-3 pl-3 border-l border-white/8">
              <span className="text-xs text-gray-500">{username}</span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-md text-xs text-gray-500 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
              >
                退出
              </button>
            </div>
          ) : (
            <div className="ml-3 pl-3 border-l border-white/8">
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-md text-xs text-gray-500 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                登录
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}