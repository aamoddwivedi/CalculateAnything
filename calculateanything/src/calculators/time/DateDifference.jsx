import { useState } from 'react'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import ErrorBanner from '../../components/ErrorBanner'
import { useHistory } from '../../hooks/useHistory'

export default function DateDifference() {
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    if (!start || !end) { setError('Choose both dates.'); setResult(null); return }
    const s = new Date(start), e = new Date(end)
    if (isNaN(s) || isNaN(e)) { setError('Invalid date.'); setResult(null); return }
    setError(null)
    const diffMs = Math.abs(e - s)
    const days = Math.round(diffMs / 86400000)
    setResult({ days, weeks: Math.floor(days / 7), months: Math.floor(days / 30.44), years: Math.floor(days / 365.25) })
    addEntry('date-difference', 'Date Difference Calculator', `${days} days between dates`)
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">Start date</span>
            <input type="date" value={start} onChange={(e) => setStart(e.target.value)} className="focus-ring w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 dark:border-ink-600 dark:bg-ink-800" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">End date</span>
            <input type="date" value={end} onChange={(e) => setEnd(e.target.value)} className="focus-ring w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 dark:border-ink-600 dark:bg-ink-800" />
          </label>
        </div>
        <ErrorBanner message={error} />
        <div className="mt-5"><Button onClick={calculate}>Calculate</Button></div>
      </div>
      {result && (
        <ResultCard
          mainLabel="Days between"
          mainValue={result.days}
          rows={[
            { label: 'Weeks', value: result.weeks },
            { label: 'Months (approx.)', value: result.months },
            { label: 'Years (approx.)', value: result.years },
          ]}
        />
      )}
    </>
  )
}
