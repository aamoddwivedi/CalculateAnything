import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Calculator, Menu, Moon, Star, Sun, X, Clock } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import SearchBar from './SearchBar'

const navLinks = [
  { to: '/favorites', label: 'Favorites', icon: Star },
  { to: '/history', label: 'History', icon: Clock },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-slate-50/90 backdrop-blur dark:border-ink-700 dark:bg-ink-950/90">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="focus-ring flex items-center gap-2 shrink-0">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-amber-400 text-ink-950">
            <Calculator size={18} strokeWidth={2.5} />
          </span>
          <span className="hidden text-lg font-bold tracking-tight sm:inline">CalculateAnything</span>
        </Link>

        <div className="hidden flex-1 md:block">
          <SearchBar />
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `focus-ring flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-amber-400/15 text-amber-500' : 'hover:bg-slate-100 dark:hover:bg-ink-800'
                }`
              }
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="focus-ring ml-1 rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-ink-800"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          className="focus-ring ml-auto rounded-lg p-2 md:hidden"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-slate-200 px-4 py-4 dark:border-ink-700 md:hidden">
          <SearchBar autoFocus onNavigate={() => setMobileOpen(false)} />
          <div className="mt-4 flex flex-col gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className="focus-ring flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-slate-100 dark:hover:bg-ink-800"
              >
                <Icon size={16} /> {label}
              </NavLink>
            ))}
            <button
              onClick={toggleTheme}
              className="focus-ring flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium hover:bg-slate-100 dark:hover:bg-ink-800"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />} Toggle theme
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
