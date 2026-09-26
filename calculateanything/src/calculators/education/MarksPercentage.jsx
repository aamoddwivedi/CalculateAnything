import { useState } from 'react'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import FormulaCard from '../../components/FormulaCard'
import ErrorBanner from '../../components/ErrorBanner'
import { formatNumber, validatePositive } from '../../utils/format'
import { useHistory } from '../../hooks/useHistory'

export default function MarksPercentage() {
  const [obtained, setObtained] = useState('')
  const [maximum, setMaximum] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    const err = validatePositive({ 'Marks obtained': obtained, 'Maximum marks': maximum })
    if (err) { setError(err); setResult(null); return }
    if (Number(maximum) === 0) { setError('Maximum marks cannot be zero.'); setResult(null); return }
    if (Number(obtained) > Number(maximum)) { setError('Marks obtained cannot exceed maximum marks.'); setResult(null); return }
    setError(null)
    const percentage = (Number(obtained) / Number(maximum)) * 100
    setResult({ percentage, remaining: Number(maximum) - Number(obtained) })
    addEntry('marks-percentage', 'Marks Percentage Calculator', `${obtained}/${maximum} \u2192 ${formatNumber(percentage)}%`)
  }

  const reset = () => { setObtained(''); setMaximum(''); setResult(null); setError(null) }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField label="Marks obtained" type="number" value={obtained} onChange={(e) => setObtained(e.target.value)} />
          <InputField label="Maximum marks" type="number" value={maximum} onChange={(e) => setMaximum(e.target.value)} />
        </div>
        <ErrorBanner message={error} />
        <div className="mt-5 flex gap-3">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="ghost" onClick={reset}>Reset</Button>
        </div>
      </div>
      {result && (
        <ResultCard
          mainLabel="Percentage"
          mainValue={`${formatNumber(result.percentage)}%`}
          rows={[{ label: 'Marks remaining', value: result.remaining }]}
        />
      )}
      <FormulaCard formula="Percentage = (Obtained \u00f7 Maximum) \u00d7 100" />
    </>
  )
}
