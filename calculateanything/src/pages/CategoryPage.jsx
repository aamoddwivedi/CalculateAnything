import { useParams, Navigate } from 'react-router-dom'
import CalculatorCard from '../components/CalculatorCard'
import { categories } from '../data/categories'
import { getByCategory } from '../data/calculatorRegistry'
import { useFavorites } from '../hooks/useFavorites'

export default function CategoryPage() {
  const { categoryId } = useParams()
  const category = categories.find((c) => c.id === categoryId)
  const { isFavorite, toggleFavorite } = useFavorites()

  if (!category) return <Navigate to="/" replace />
  const calculators = getByCategory(categoryId)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{category.emoji}</span>
        <div>
          <h1 className="text-2xl font-bold">{category.label}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{category.description}</p>
        </div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((c) => (
          <CalculatorCard key={c.id} calculator={c} isFavorite={isFavorite(c.id)} onToggleFavorite={toggleFavorite} />
        ))}
      </div>
    </div>
  )
}
