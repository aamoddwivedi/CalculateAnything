import { useState } from 'react'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import ErrorBanner from '../../components/ErrorBanner'
import { formatNumber } from '../../utils/format'
import { useHistory } from '../../hooks/useHistory'

export default function AverageCalculator() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    const parts = input.split(',').map((s) => s.trim()).filter(Boolean)
    if (parts.length === 0) { setError('Enter at least one number, separated by commas.'); setResult(null); return }
    const nums = parts.map(Number)
    if (nums.some((n) => isNaN(n))) { setError('All values must be valid numbers.'); setResult(null); return }
    setError(null)

    const mean = nums.reduce((a, b) => a + b, 0) / nums.length
    const sorted = [...nums].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]
    const counts = {}
    nums.forEach((n) => { counts[n] = (counts[n] || 0) + 1 })
    const maxCount = Math.max(...Object.values(counts))
    const modes = Object.keys(counts).filter((k) => counts[k] === maxCount)
    const mode = maxCount === 1 ? 'No repeated value' : modes.join(', ')

    setResult({ mean, median, mode })
    addEntry('average-calculator', 'Average Calculator', `Mean ${formatNumber(mean)}, Median ${formatNumber(median)}`)
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">Numbers (comma separated)</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 4, 8, 8, 15, 16"
            className="num focus-ring w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 dark:border-ink-600 dark:bg-ink-800"
          />
        </label>
        <ErrorBanner message={error} />
        <div className="mt-5"><Button onClick={calculate}>Calculate</Button></div>
      </div>
      {result && (
        <ResultCard
          mainLabel="Mean"
          mainValue={formatNumber(result.mean)}
          rows={[{ label: 'Median', value: formatNumber(result.median) }, { label: 'Mode', value: result.mode }]}
        />
      )}
    </>
  )
}
