import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'

export default function CalculatorCard({ calculator, isFavorite, onToggleFavorite }) {
  return (
    <div className="group relative rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-amber-400/60 dark:border-ink-700 dark:bg-ink-900">
      <button
        onClick={() => onToggleFavorite(calculator.id)}
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        aria-pressed={isFavorite}
        className="focus-ring absolute right-4 top-4 rounded-full p-1 text-slate-300 hover:text-amber-400 dark:text-ink-600"
      >
        <Star size={18} fill={isFavorite ? 'currentColor' : 'none'} className={isFavorite ? 'text-amber-400' : ''} />
      </button>
      <Link to={`/calculators/${calculator.id}`} className="focus-ring block">
        <h3 className="pr-6 text-base font-semibold">{calculator.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{calculator.description}</p>
      </Link>
    </div>
  )
}
