import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { getRelated } from '../data/calculatorRegistry'
import { useFavorites } from '../hooks/useFavorites'

export default function CalculatorLayout({ calculator, children }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const related = getRelated(calculator)
  const fav = isFavorite(calculator.id)

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{calculator.name}</h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">{calculator.description}</p>
        </div>
        <button
          onClick={() => toggleFavorite(calculator.id)}
          aria-pressed={fav}
          aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
          className="focus-ring shrink-0 rounded-full border border-slate-300 p-2.5 text-slate-400 hover:text-amber-400 dark:border-ink-600"
        >
          <Star size={18} fill={fav ? 'currentColor' : 'none'} className={fav ? 'text-amber-400' : ''} />
        </button>
      </div>

      <div className="mt-8 space-y-6">{children}</div>

      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="text-lg font-semibold">Related calculators</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/calculators/${r.id}`}
                className="focus-ring rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium hover:border-amber-400/60 dark:border-ink-700 dark:bg-ink-900"
              >
                {r.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
