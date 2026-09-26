import { useState } from 'react'
import InputField from '../../components/InputField'
import SelectField from '../../components/SelectField'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import ErrorBanner from '../../components/ErrorBanner'
import { formatNumber, isBlank } from '../../utils/format'
import { useHistory } from '../../hooks/useHistory'

const modes = [
  { value: 'of', label: 'X% of Y' },
  { value: 'increase', label: 'Percentage increase' },
  { value: 'decrease', label: 'Percentage decrease' },
  { value: 'difference', label: 'Percentage difference' },
]

export default function PercentageCalculator() {
  const [mode, setMode] = useState('of')
  const [x, setX] = useState('')
  const [y, setY] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    if (isBlank(x) || isBlank(y) || isNaN(Number(x)) || isNaN(Number(y))) {
      setError('Enter valid numbers in both fields.'); setResult(null); return
    }
    const a = Number(x), b = Number(y)
    let value, label
    if (mode === 'of') { value = (a / 100) * b; label = `${a}% of ${b}` }
    else if (mode === 'increase') {
      if (a === 0) { setError('First value cannot be zero.'); setResult(null); return }
      value = ((b - a) / a) * 100; label = `Increase from ${a} to ${b}`
    } else if (mode === 'decrease') {
      if (a === 0) { setError('First value cannot be zero.'); setResult(null); return }
      value = ((a - b) / a) * 100; label = `Decrease from ${a} to ${b}`
    } else {
      if (a === 0 && b === 0) { setError('Both values cannot be zero.'); setResult(null); return }
      value = (Math.abs(a - b) / ((a + b) / 2)) * 100; label = `Difference between ${a} and ${b}`
    }
    setError(null)
    setResult({ value, label })
    addEntry('percentage-calculator', 'Percentage Calculator', `${label} = ${formatNumber(value)}${mode === 'of' ? '' : '%'}`)
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <SelectField label="What do you want to find?" value={mode} onChange={(e) => setMode(e.target.value)} options={modes} />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <InputField label={mode === 'of' ? 'X (%)' : 'First value'} type="number" value={x} onChange={(e) => setX(e.target.value)} />
          <InputField label={mode === 'of' ? 'Y' : 'Second value'} type="number" value={y} onChange={(e) => setY(e.target.value)} />
        </div>
        <ErrorBanner message={error} />
        <div className="mt-5"><Button onClick={calculate}>Calculate</Button></div>
      </div>
      {result && (
        <ResultCard mainLabel={result.label} mainValue={`${formatNumber(result.value)}${mode === 'of' ? '' : '%'}`} />
      )}
    </>
  )
}
