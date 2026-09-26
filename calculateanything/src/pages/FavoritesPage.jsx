import CalculatorCard from '../components/CalculatorCard'
import { getCalculator } from '../data/calculatorRegistry'
import { useFavorites } from '../hooks/useFavorites'

export default function FavoritesPage() {
  const { favorites, isFavorite, toggleFavorite } = useFavorites()
  const calculators = favorites.map(getCalculator).filter(Boolean)

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="text-2xl font-bold">My Favorites</h1>
      {calculators.length === 0 ? (
        <p className="mt-4 text-slate-500 dark:text-slate-400">
          Nothing here yet — tap the star on any calculator to save it for quick access.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {calculators.map((c) => (
            <CalculatorCard key={c.id} calculator={c} isFavorite={isFavorite(c.id)} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      )}
    </div>
  )
}
