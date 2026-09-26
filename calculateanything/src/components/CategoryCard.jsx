import { Link } from 'react-router-dom'
import { getByCategory } from '../data/calculatorRegistry'

export default function CategoryCard({ category }) {
  const count = getByCategory(category.id).length
  return (
    <Link
      to={`/category/${category.id}`}
      className="focus-ring group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-amber-400/60 hover:shadow-glow dark:border-ink-700 dark:bg-ink-900"
    >
      <span className="text-3xl">{category.emoji}</span>
      <h3 className="mt-3 text-lg font-semibold">{category.label}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{category.description}</p>
      <p className="num mt-3 text-xs font-medium text-amber-500">{count} calculators</p>
    </Link>
  )
}
