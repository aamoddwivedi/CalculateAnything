import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import InputField from '../../components/InputField'
import SelectField from '../../components/SelectField'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import FormulaCard from '../../components/FormulaCard'
import ErrorBanner from '../../components/ErrorBanner'
import { formatCurrency, validatePositive } from '../../utils/format'
import { useHistory } from '../../hooks/useHistory'

const freqOptions = [
  { value: '1', label: 'Annually' },
  { value: '2', label: 'Half-yearly' },
  { value: '4', label: 'Quarterly' },
  { value: '12', label: 'Monthly' },
  { value: '365', label: 'Daily' },
]

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState('')
  const [rate, setRate] = useState('')
  const [time, setTime] = useState('')
  const [freq, setFreq] = useState('1')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    const err = validatePositive({ Principal: principal, Rate: rate, Time: time })
    if (err) { setError(err); setResult(null); return }
    setError(null)
    const p = Number(principal), r = Number(rate) / 100, t = Number(time), n = Number(freq)
    const years = Math.max(1, Math.ceil(t))
    const chartData = Array.from({ length: years + 1 }, (_, y) => ({
      year: y,
      value: Math.round(p * Math.pow(1 + r / n, n * Math.min(y, t))),
    }))
    const amount = p * Math.pow(1 + r / n, n * t)
    setResult({ amount, interest: amount - p, chartData })
    addEntry('compound-interest', 'Compound Interest Calculator', `${formatCurrency(p)} \u2192 ${formatCurrency(amount)}`)
  }

  const reset = () => { setPrincipal(''); setRate(''); setTime(''); setResult(null); setError(null) }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InputField label="Principal" unit="\u20b9" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
          <InputField label="Annual rate" unit="%" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
          <InputField label="Time" unit="years" type="number" value={time} onChange={(e) => setTime(e.target.value)} />
          <SelectField label="Compounding" value={freq} onChange={(e) => setFreq(e.target.value)} options={freqOptions} />
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
            mainLabel="Final amount"
            mainValue={formatCurrency(result.amount)}
            rows={[{ label: 'Interest earned', value: formatCurrency(result.interest) }]}
          />
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
            <h3 className="text-base font-semibold">Growth over time</h3>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={result.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3335" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} label={{ value: 'Year', position: 'insideBottom', offset: -3, fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} width={70} tickFormatter={(v) => `\u20b9${Math.round(v / 1000)}k`} />
                  <Tooltip formatter={(v) => formatCurrency(v)} />
                  <Line type="monotone" dataKey="value" stroke="#EDA524" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <FormulaCard
        formula="A = P(1 + r/n)^(nt)"
        variables={[
          { symbol: 'P', meaning: 'Principal' },
          { symbol: 'r', meaning: 'Annual interest rate (decimal)' },
          { symbol: 'n', meaning: 'Compounding frequency per year' },
          { symbol: 't', meaning: 'Time in years' },
        ]}
      />
    </>
  )
}
