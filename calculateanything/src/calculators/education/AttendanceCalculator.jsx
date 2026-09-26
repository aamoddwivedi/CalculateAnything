import { useState } from 'react'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import FormulaCard from '../../components/FormulaCard'
import ErrorBanner from '../../components/ErrorBanner'
import { formatNumber, validatePositive } from '../../utils/format'
import { useHistory } from '../../hooks/useHistory'

export default function AttendanceCalculator() {
  const [total, setTotal] = useState('')
  const [attended, setAttended] = useState('')
  const [target, setTarget] = useState('75')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    const err = validatePositive({ 'Total classes': total, 'Classes attended': attended, 'Target %': target })
    if (err) { setError(err); setResult(null); return }
    if (Number(attended) > Number(total)) { setError('Classes attended cannot exceed total classes.'); setResult(null); return }
    if (Number(target) > 100) { setError('Target attendance cannot exceed 100%.'); setResult(null); return }
    setError(null)

    const t = Number(total), a = Number(attended), req = Number(target) / 100
    const current = (a / t) * 100

    let classesNeeded = 0
    if (current < Number(target)) {
      // find smallest x such that (a + x) / (t + x) >= req
      classesNeeded = Math.max(0, Math.ceil((req * t - a) / (1 - req)))
    }
    let canMiss = 0
    if (current >= Number(target)) {
      // find largest x such that a / (t + x) >= req
      canMiss = Math.max(0, Math.floor(a / req - t))
    }

    setResult({ current, classesNeeded, canMiss })
    addEntry('attendance-calculator', 'Attendance Calculator', `${formatNumber(current, 1)}% current attendance`)
  }

  const reset = () => { setTotal(''); setAttended(''); setResult(null); setError(null) }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="grid gap-4 sm:grid-cols-3">
          <InputField label="Total classes held" type="number" value={total} onChange={(e) => setTotal(e.target.value)} />
          <InputField label="Classes attended" type="number" value={attended} onChange={(e) => setAttended(e.target.value)} />
          <InputField label="Required attendance" unit="%" type="number" value={target} onChange={(e) => setTarget(e.target.value)} />
        </div>
        <ErrorBanner message={error} />
        <div className="mt-5 flex gap-3">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="ghost" onClick={reset}>Reset</Button>
        </div>
      </div>

      {result && (
        <ResultCard
          mainLabel="Current attendance"
          mainValue={`${formatNumber(result.current, 1)}%`}
          rows={[
            result.classesNeeded > 0
              ? { label: 'Classes needed to reach target', value: result.classesNeeded }
              : { label: 'Classes you can still miss', value: result.canMiss },
          ]}
        />
      )}

      <FormulaCard
        formula="Attendance % = (Attended \u00f7 Total) \u00d7 100"
        note="Assumes future classes are attended (for the 'needed' figure) or missed (for the 'can miss' figure) consistently."
      />
    </>
  )
}
