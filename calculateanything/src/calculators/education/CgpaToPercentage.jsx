import { useState } from 'react'
import InputField from '../../components/InputField'
import SelectField from '../../components/SelectField'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import FormulaCard from '../../components/FormulaCard'
import ErrorBanner from '../../components/ErrorBanner'
import { formatNumber, validatePositive } from '../../utils/format'
import { useHistory } from '../../hooks/useHistory'

const formulas = {
  standard: { label: 'Standard (\u00d7 9.5)', multiplier: 9.5 },
  aktu: { label: 'AKTU-style (\u00d7 9.5)', multiplier: 9.5 },
  custom: { label: 'Custom multiplier', multiplier: null },
}

export default function CgpaToPercentage() {
  const [cgpa, setCgpa] = useState('')
  const [formula, setFormula] = useState('standard')
  const [multiplier, setMultiplier] = useState('9.5')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    const err = validatePositive({ CGPA: cgpa })
    if (!err && Number(cgpa) > 10) {
      setError('CGPA is usually on a 10-point scale — check the value.')
      setResult(null)
      return
    }
    if (err) { setError(err); setResult(null); return }
    const m = formula === 'custom' ? Number(multiplier) : formulas[formula].multiplier
    if (formula === 'custom' && (isNaN(m) || m <= 0)) {
      setError('Enter a valid custom multiplier.')
      setResult(null)
      return
    }
    setError(null)
    const percentage = Number(cgpa) * m
    setResult({ percentage, multiplierUsed: m })
    addEntry('cgpa-to-percentage', 'CGPA to Percentage', `${cgpa} CGPA \u2192 ${formatNumber(percentage)}%`)
  }

  const reset = () => { setCgpa(''); setResult(null); setError(null) }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField label="CGPA" type="number" step="0.01" min="0" max="10" value={cgpa} onChange={(e) => setCgpa(e.target.value)} placeholder="e.g. 8.2" />
          <SelectField
            label="Conversion formula"
            value={formula}
            onChange={(e) => setFormula(e.target.value)}
            options={Object.entries(formulas).map(([k, v]) => ({ value: k, label: v.label }))}
          />
          {formula === 'custom' && (
            <InputField label="Custom multiplier" type="number" step="0.01" value={multiplier} onChange={(e) => setMultiplier(e.target.value)} />
          )}
        </div>
        <ErrorBanner message={error} />
        <div className="mt-5 flex gap-3">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="ghost" onClick={reset}>Reset</Button>
        </div>
      </div>

      {result && (
        <ResultCard
          mainLabel="Estimated percentage"
          mainValue={`${formatNumber(result.percentage)}%`}
          rows={[{ label: 'Multiplier used', value: result.multiplierUsed }]}
        />
      )}

      <FormulaCard
        formula="Percentage = CGPA \u00d7 Multiplier"
        variables={[{ symbol: 'Multiplier', meaning: 'commonly 9.5, but varies by university' }]}
        note="CGPA-to-percentage conversion factors vary by institution — always confirm your university's official formula before using this for official purposes."
      />
    </>
  )
}
