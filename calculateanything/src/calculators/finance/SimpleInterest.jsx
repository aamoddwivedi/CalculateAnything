import { useState } from 'react'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import FormulaCard from '../../components/FormulaCard'
import StepsCard from '../../components/StepsCard'
import ErrorBanner from '../../components/ErrorBanner'
import { formatCurrency, formatNumber, validatePositive } from '../../utils/format'
import { useHistory } from '../../hooks/useHistory'

export default function SimpleInterest() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [time, setTime] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    const err = validatePositive({ Principal: principal, Rate: rate, Time: time })
    if (err) { setError(err); setResult(null); return }
    setError(null)
    const p = Number(principal), r = Number(rate), t = Number(time)
    const interest = (p * r * t) / 100
    setResult({ interest, total: p + interest, p, r, t })
    addEntry('simple-interest', 'Simple Interest Calculator', `${formatCurrency(interest)} interest on ${formatCurrency(p)}`)
  }

  const reset = () => { setPrincipal(''); setRate(''); setTime(''); setResult(null); setError(null) }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="grid gap-4 sm:grid-cols-3">
          <InputField label="Principal" unit="\u20b9" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
          <InputField label="Rate (annual)" unit="%" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
          <InputField label="Time" unit="years" type="number" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <ErrorBanner message={error} />
        <div className="mt-5 flex gap-3">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="ghost" onClick={reset}>Reset</Button>
        </div>
      </div>

      {result && (
        <>
          <ResultCard
            mainLabel="Total amount"
            mainValue={formatCurrency(result.total)}
            rows={[{ label: 'Interest earned', value: formatCurrency(result.interest) }]}
          />
          <StepsCard steps={[
            `SI = (${formatNumber(result.p)} \u00d7 ${result.r} \u00d7 ${result.t}) \u00f7 100`,
            `SI = ${formatCurrency(result.interest)}`,
            `Total = ${formatCurrency(result.p)} + ${formatCurrency(result.interest)} = ${formatCurrency(result.total)}`,
          ]} />
        </>
      )}

      <FormulaCard
        formula="SI = P \u00d7 R \u00d7 T \u00f7 100"
        variables={[
          { symbol: 'P', meaning: 'Principal amount' },
          { symbol: 'R', meaning: 'Annual interest rate (%)' },
          { symbol: 'T', meaning: 'Time in years' },
        ]}
      />
    </>
  )
}
