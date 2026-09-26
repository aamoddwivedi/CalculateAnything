import { useState } from 'react'
import InputField from '../../components/InputField'
import SelectField from '../../components/SelectField'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import FormulaCard from '../../components/FormulaCard'
import ErrorBanner from '../../components/ErrorBanner'
import { formatNumber, validatePositive } from '../../utils/format'
import { useHistory } from '../../hooks/useHistory'

export default function BmrCalculator() {
  const [age, setAge] = useState('')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [gender, setGender] = useState('male')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    const err = validatePositive({ Age: age, 'Height (cm)': height, 'Weight (kg)': weight })
    if (err) { setError(err); setResult(null); return }
    setError(null)
    const a = Number(age), h = Number(height), w = Number(weight)
    // Mifflin-St Jeor equation
    const bmr = gender === 'male' ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161
    setResult(bmr)
    addEntry('bmr-calculator', 'BMR Calculator', `Estimated BMR ${formatNumber(bmr, 0)} kcal/day`)
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InputField label="Age" unit="years" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
          <InputField label="Height" unit="cm" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
          <InputField label="Weight" unit="kg" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
          <SelectField label="Gender" value={gender} onChange={(e) => setGender(e.target.value)} options={[{ value: 'male', label: 'Male' }, { value: 'female', label: 'Female' }]} />
        </div>
        <ErrorBanner message={error} />
        <div className="mt-5"><Button onClick={calculate}>Calculate BMR</Button></div>
      </div>
      {result !== null && <ResultCard mainLabel="Estimated BMR" mainValue={`${formatNumber(result, 0)} kcal/day`} />}
      <FormulaCard
        title="Mifflin-St Jeor formula"
        note="This is an estimate of calories burned at complete rest — actual needs vary by individual and activity level."
      />
    </>
  )
}
