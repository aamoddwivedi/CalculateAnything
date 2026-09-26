import { useState } from 'react'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import FormulaCard from '../../components/FormulaCard'
import ErrorBanner from '../../components/ErrorBanner'
import { formatNumber, validatePositive } from '../../utils/format'
import { useHistory } from '../../hooks/useHistory'

function bmiCategory(bmi) {
  if (bmi < 18.5) return { label: 'Underweight', color: 'bg-blue-400' }
  if (bmi < 25) return { label: 'Normal', color: 'bg-teal-400' }
  if (bmi < 30) return { label: 'Overweight', color: 'bg-amber-400' }
  return { label: 'Obese', color: 'bg-red-400' }
}

export default function BmiCalculator() {
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    const err = validatePositive({ 'Height (cm)': height, 'Weight (kg)': weight })
    if (err) { setError(err); setResult(null); return }
    setError(null)
    const h = Number(height) / 100
    const bmi = Number(weight) / (h * h)
    setResult({ bmi, ...bmiCategory(bmi) })
    addEntry('bmi-calculator', 'BMI Calculator', `BMI ${formatNumber(bmi, 1)} (${bmiCategory(bmi).label})`)
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField label="Height" unit="cm" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
          <InputField label="Weight" unit="kg" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <ErrorBanner message={error} />
        <div className="mt-5"><Button onClick={calculate}>Calculate BMI</Button></div>
      </div>
      {result && (
        <>
          <ResultCard mainLabel="BMI" mainValue={formatNumber(result.bmi, 1)} rows={[{ label: 'Category', value: result.label }]} />
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
            <div className="flex h-3 overflow-hidden rounded-full">
              <div className="w-1/4 bg-blue-400" /><div className="w-1/4 bg-teal-400" /><div className="w-1/4 bg-amber-400" /><div className="w-1/4 bg-red-400" />
            </div>
            <div className="mt-2 flex justify-between text-xs text-slate-500"><span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span></div>
          </div>
        </>
      )}
      <FormulaCard formula="BMI = Weight (kg) \u00f7 Height (m)\u00b2" note="BMI is a general screening tool, not a medical diagnosis. Consult a healthcare professional for personalized advice." />
    </>
  )
}
