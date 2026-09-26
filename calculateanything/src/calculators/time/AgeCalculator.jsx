import { useState } from 'react'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import ErrorBanner from '../../components/ErrorBanner'
import { useHistory } from '../../hooks/useHistory'

export default function AgeCalculator() {
  const [dob, setDob] = useState('')
  const [asOf, setAsOf] = useState(new Date().toISOString().slice(0, 10))
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    if (!dob) { setError('Please choose a date of birth.'); setResult(null); return }
    const birth = new Date(dob)
    const ref = new Date(asOf)
    if (birth > ref) { setError('Date of birth cannot be in the future relative to the chosen date.'); setResult(null); return }
    setError(null)

    let years = ref.getFullYear() - birth.getFullYear()
    let months = ref.getMonth() - birth.getMonth()
    let days = ref.getDate() - birth.getDate()
    if (days < 0) {
      months -= 1
      const prevMonth = new Date(ref.getFullYear(), ref.getMonth(), 0)
      days += prevMonth.getDate()
    }
    if (months < 0) { months += 12; years -= 1 }

    let next = new Date(ref.getFullYear(), birth.getMonth(), birth.getDate())
    if (next < ref) next = new Date(ref.getFullYear() + 1, birth.getMonth(), birth.getDate())
    const daysToNext = Math.ceil((next - ref) / 86400000)

    setResult({ years, months, days, daysToNext })
    addEntry('age-calculator', 'Age Calculator', `${years}y ${months}m ${days}d`)
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">Date of birth</span>
            <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="focus-ring w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 dark:border-ink-600 dark:bg-ink-800" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">As of date</span>
            <input type="date" value={asOf} onChange={(e) => setAsOf(e.target.value)} className="focus-ring w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 dark:border-ink-600 dark:bg-ink-800" />
          </label>
        </div>
        <ErrorBanner message={error} />
        <div className="mt-5"><Button onClick={calculate}>Calculate age</Button></div>
      </div>
      {result && (
        <ResultCard
          mainLabel="Age"
          mainValue={`${result.years} years, ${result.months} months, ${result.days} days`}
          rows={[{ label: 'Days to next birthday', value: result.daysToNext }]}
        />
      )}
    </>
  )
}
