import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import SearchBar from '../components/SearchBar'
import CategoryCard from '../components/CategoryCard'
import CalculatorCard from '../components/CalculatorCard'
import { categories } from '../data/categories'
import { calculatorRegistry, getCalculator } from '../data/calculatorRegistry'
import { useFavorites } from '../hooks/useFavorites'
import { useHistory } from '../hooks/useHistory'

const popularIds = ['compound-interest', 'emi-calculator', 'cgpa-to-percentage', 'bmi-calculator', 'age-calculator', 'percentage-calculator']

export default function Home() {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { history } = useHistory()

  const recent = [...new Set(history.map((h) => h.calculatorId))]
    .map((id) => getCalculator(id))
    .filter(Boolean)
    .slice(0, 3)

  return (
    <div>
      <section className="border-b border-slate-200 bg-gradient-to-b from-amber-400/10 to-transparent dark:border-ink-700">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">CalculateAnything</h1>
          <p className="num mt-3 text-lg font-medium text-amber-500">One place. Every calculation.</p>
          <p className="mx-auto mt-5 max-w-2xl text-slate-600 dark:text-slate-300">
            From CGPA and EMI to BMI and subnets — {calculatorRegistry.length} calculators covering education, finance,
            math, health, project management and computer science, all in one fast tool.
          </p>
          <div className="mx-auto mt-8 max-w-xl">
            <SearchBar />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/category/education" className="focus-ring inline-flex items-center gap-1.5 rounded-xl bg-amber-400 px-5 py-2.5 text-sm font-semibold text-ink-950 hover:bg-amber-500">
              Explore calculators <ArrowRight size={16} />
            </Link>
            <Link to="/calculators/compound-interest" className="focus-ring inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold dark:border-ink-600">
              Try Compound Interest
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-xl font-bold">Categories</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => <CategoryCard key={c.id} category={c} />)}
        </div>
      </section>

      {recent.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
          <h2 className="text-xl font-bold">Recently used</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((c) => (
              <CalculatorCard key={c.id} calculator={c} isFavorite={isFavorite(c.id)} onToggleFavorite={toggleFavorite} />
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <h2 className="text-xl font-bold">Popular calculators</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {popularIds.map(getCalculator).filter(Boolean).map((c) => (
            <CalculatorCard key={c.id} calculator={c} isFavorite={isFavorite(c.id)} onToggleFavorite={toggleFavorite} />
          ))}
        </div>
      </section>
    </div>
  )
}
