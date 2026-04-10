import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: '首页' },
  { path: '/gallery', label: '相册' },
  { path: '/about', label: '关于我' },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800">
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-purple-600 dark:text-purple-400">
          Lin's Space
        </Link>
        <ul className="flex gap-6">
          {navItems.map(({ path, label }) => (
            <li key={path}>
              <Link
                to={path}
                className={`text-sm font-medium transition-colors hover:text-purple-600 dark:hover:text-purple-400 ${
                  location.pathname === path
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
