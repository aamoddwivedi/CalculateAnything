import { useState } from 'react'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import FormulaCard from '../../components/FormulaCard'
import ErrorBanner from '../../components/ErrorBanner'
import { formatNumber, validatePositive } from '../../utils/format'
import { useHistory } from '../../hooks/useHistory'

export default function PercentageToCgpa() {
  const [percentage, setPercentage] = useState('')
  const [divisor, setDivisor] = useState('9.5')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    const err = validatePositive({ Percentage: percentage, Divisor: divisor })
    if (err) { setError(err); setResult(null); return }
    if (Number(percentage) > 100) { setError('Percentage cannot exceed 100.'); setResult(null); return }
    if (Number(divisor) === 0) { setError('Divisor cannot be zero.'); setResult(null); return }
    setError(null)
    const cgpa = Number(percentage) / Number(divisor)
    setResult(cgpa)
    addEntry('percentage-to-cgpa', 'Percentage to CGPA', `${percentage}% \u2192 ${formatNumber(cgpa)} CGPA`)
  }

  const reset = () => { setPercentage(''); setResult(null); setError(null) }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField label="Percentage" unit="%" type="number" step="0.01" min="0" max="100" value={percentage} onChange={(e) => setPercentage(e.target.value)} placeholder="e.g. 78" />
          <InputField label="Divisor" type="number" step="0.01" value={divisor} onChange={(e) => setDivisor(e.target.value)} />
        </div>
        <ErrorBanner message={error} />
        <div className="mt-5 flex gap-3">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="ghost" onClick={reset}>Reset</Button>
        </div>
      </div>
      {result !== null && <ResultCard mainLabel="Estimated CGPA" mainValue={formatNumber(result)} />}
      <FormulaCard
        formula="CGPA = Percentage \u00f7 Divisor"
        note="The divisor is typically 9.5, but this is an approximation — always check your university's actual policy."
      />
    </>
  )
}
