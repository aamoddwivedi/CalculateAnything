import { useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import FormulaCard from '../../components/FormulaCard'
import ErrorBanner from '../../components/ErrorBanner'
import { formatCurrency, validatePositive } from '../../utils/format'
import { useHistory } from '../../hooks/useHistory'

export default function SipCalculator() {
  const [monthly, setMonthly] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    const err = validatePositive({ 'Monthly investment': monthly, 'Expected return': rate, 'Duration (years)': years })
    if (err) { setError(err); setResult(null); return }
    setError(null)
    const m = Number(monthly), i = Number(rate) / 100 / 12, n = Number(years) * 12
    const chartData = []
    let value = 0
    for (let month = 1; month <= n; month++) {
      value = (value + m) * (1 + i)
      if (month % 12 === 0) chartData.push({ year: month / 12, value: Math.round(value) })
    }
    const invested = m * n
    setResult({ futureValue: value, invested, returns: value - invested, chartData })
    addEntry('sip-calculator', 'SIP Calculator', `${formatCurrency(m)}/mo \u2192 ${formatCurrency(value)}`)
  }

  const reset = () => { setMonthly(''); setRate(''); setYears(''); setResult(null); setError(null) }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="grid gap-4 sm:grid-cols-3">
          <InputField label="Monthly investment" unit="\u20b9" type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
          <InputField label="Expected annual return" unit="%" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
          <InputField label="Duration" unit="years" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
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
            mainLabel="Estimated value"
            mainValue={formatCurrency(result.futureValue)}
            rows={[
              { label: 'Invested amount', value: formatCurrency(result.invested) },
              { label: 'Estimated returns', value: formatCurrency(result.returns) },
            ]}
          />
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
            <h3 className="text-base font-semibold">Growth over time</h3>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#3335" />
                  <XAxis dataKey="year" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} width={70} tickFormatter={(v) => `\u20b9${Math.round(v / 1000)}k`} />
                  <Tooltip formatter={(v) => formatCurrency(v)} />
                  <Area type="monotone" dataKey="value" stroke="#3ED9C4" fill="#3ED9C433" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <FormulaCard
        formula="FV = SIP \u00d7 [((1+i)^n \u2212 1) / i] \u00d7 (1+i)"
        variables={[
          { symbol: 'i', meaning: 'Monthly rate of return' },
          { symbol: 'n', meaning: 'Number of monthly installments' },
        ]}
        note="Actual mutual fund returns fluctuate — this is a projection assuming a constant rate."
      />
    </>
  )
}
