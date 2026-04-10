import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/gallery', label: 'Gallery' },
  { path: '/about', label: 'About' },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 backdrop-blur-md bg-[#080809]/80">
      <nav className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="text-sm font-semibold text-white tracking-tight hover:text-purple-300 transition-colors">
          Lin's Space
        </Link>
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
      </nav>
    </header>
  )
}