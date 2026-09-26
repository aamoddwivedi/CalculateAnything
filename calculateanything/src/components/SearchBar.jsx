import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { searchCalculators } from '../data/calculatorRegistry'

export default function SearchBar({ autoFocus = false, onNavigate }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const results = searchCalculators(query).slice(0, 8)
  const navigate = useNavigate()
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const go = (id) => {
    setQuery('')
    setOpen(false)
    navigate(`/calculators/${id}`)
    onNavigate?.()
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          autoFocus={autoFocus}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder="Search 20+ calculators — try 'compound' or 'college'"
          className="focus-ring w-full rounded-xl border border-slate-300 bg-white py-3 pl-11 pr-10 text-sm dark:border-ink-600 dark:bg-ink-800"
          aria-label="Search calculators"
        />
        {query && (
          <button onClick={() => setQuery('')} aria-label="Clear search" className="focus-ring absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        )}
      </div>
      {open && query && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl dark:border-ink-700 dark:bg-ink-900">
          {results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-slate-500">No calculators match "{query}".</p>
          ) : (
            results.map((r) => (
              <button
                key={r.id}
                onClick={() => go(r.id)}
                className="focus-ring block w-full px-4 py-2.5 text-left text-sm hover:bg-slate-50 dark:hover:bg-ink-800"
              >
                <span className="font-medium">{r.name}</span>
                <span className="ml-2 text-xs text-slate-400">{r.category}</span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  )
}
