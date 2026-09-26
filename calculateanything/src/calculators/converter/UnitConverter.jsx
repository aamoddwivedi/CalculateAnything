import { useState, useMemo } from 'react'
import SelectField from '../../components/SelectField'
import ResultCard from '../../components/ResultCard'
import ErrorBanner from '../../components/ErrorBanner'
import { unitCategories, convertUnit, convertTemperature } from '../../utils/conversionEngine'
import { formatNumber } from '../../utils/format'

const temperatureUnits = { celsius: 'Celsius', fahrenheit: 'Fahrenheit', kelvin: 'Kelvin' }
const categoryOptions = [
  ...Object.entries(unitCategories).map(([id, def]) => ({ value: id, label: def.label })),
  { value: 'temperature', label: 'Temperature' },
]

export default function UnitConverter() {
  const [category, setCategory] = useState('length')
  const [value, setValue] = useState('1')
  const [fromUnit, setFromUnit] = useState('')
  const [toUnit, setToUnit] = useState('')
  const [error, setError] = useState(null)

  const unitOptions = useMemo(() => {
    if (category === 'temperature') return Object.entries(temperatureUnits).map(([v, label]) => ({ value: v, label }))
    return Object.keys(unitCategories[category].units).map((u) => ({ value: u, label: u }))
  }, [category])

  const effectiveFrom = fromUnit && unitOptions.some((o) => o.value === fromUnit) ? fromUnit : unitOptions[0]?.value
  const effectiveTo = toUnit && unitOptions.some((o) => o.value === toUnit) ? toUnit : unitOptions[1]?.value || unitOptions[0]?.value

  const result = useMemo(() => {
    if (value === '' || isNaN(Number(value))) return null
    try {
      const num = Number(value)
      const converted = category === 'temperature'
        ? convertTemperature(num, effectiveFrom, effectiveTo)
        : convertUnit(category, num, effectiveFrom, effectiveTo)
      return converted
    } catch {
      return null
    }
  }, [category, value, effectiveFrom, effectiveTo])

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
    setFromUnit('')
    setToUnit('')
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <SelectField label="Category" value={category} onChange={handleCategoryChange} options={categoryOptions} />
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">Value</span>
            <input
              type="number"
              value={value}
              onChange={(e) => { setValue(e.target.value); if (Number(e.target.value) < 0 && category !== 'temperature') setError('Enter a non-negative value.'); else setError(null) }}
              className="num focus-ring w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 dark:border-ink-600 dark:bg-ink-800"
            />
          </label>
          <SelectField label="From" value={effectiveFrom} onChange={(e) => setFromUnit(e.target.value)} options={unitOptions} />
          <SelectField label="To" value={effectiveTo} onChange={(e) => setToUnit(e.target.value)} options={unitOptions} />
        </div>
        <ErrorBanner message={error} />
      </div>

      {result !== null && (
        <ResultCard
          mainLabel={`${value} ${effectiveFrom} equals`}
          mainValue={`${formatNumber(result, 4)} ${effectiveTo}`}
        />
      )}
    </>
  )
}
