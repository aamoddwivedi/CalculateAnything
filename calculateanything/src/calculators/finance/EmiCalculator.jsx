import { useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import FormulaCard from '../../components/FormulaCard'
import ErrorBanner from '../../components/ErrorBanner'
import { formatCurrency, validatePositive } from '../../utils/format'
import { useHistory } from '../../hooks/useHistory'

const COLORS = ['#EDA524', '#22B8A6']

export default function EmiCalculator() {
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')
  const [years, setYears] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    const err = validatePositive({ 'Loan amount': amount, 'Interest rate': rate, 'Tenure (years)': years })
    if (err) { setError(err); setResult(null); return }
    setError(null)
    const p = Number(amount)
    const monthlyRate = Number(rate) / 12 / 100
    const n = Number(years) * 12
    const emi = monthlyRate === 0 ? p / n : (p * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
    const totalPayment = emi * n
    const totalInterest = totalPayment - p
    setResult({ emi, totalPayment, totalInterest, p })
    addEntry('emi-calculator', 'EMI Calculator', `${formatCurrency(emi)}/month on ${formatCurrency(p)}`)
  }

  const reset = () => { setAmount(''); setRate(''); setYears(''); setResult(null); setError(null) }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="grid gap-4 sm:grid-cols-3">
          <InputField label="Loan amount" unit="\u20b9" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <InputField label="Interest rate" unit="% p.a." type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
          <InputField label="Tenure" unit="years" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
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
            mainLabel="Monthly EMI"
            mainValue={formatCurrency(result.emi)}
            rows={[
              { label: 'Total interest', value: formatCurrency(result.totalInterest) },
              { label: 'Total payment', value: formatCurrency(result.totalPayment) },
            ]}
          />
          <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
            <h3 className="text-base font-semibold">Principal vs interest</h3>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[{ name: 'Principal', value: result.p }, { name: 'Interest', value: result.totalInterest }]}
                    dataKey="value" nameKey="name" innerRadius={60} outerRadius={90} paddingAngle={2}
                  >
                    {COLORS.map((c, i) => <Cell key={i} fill={c} />)}
                  </Pie>
                  <Tooltip formatter={(v) => formatCurrency(v)} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      <FormulaCard
        formula="EMI = [P \u00d7 r \u00d7 (1+r)^n] \u00f7 [(1+r)^n \u2212 1]"
        variables={[
          { symbol: 'P', meaning: 'Loan principal' },
          { symbol: 'r', meaning: 'Monthly interest rate' },
          { symbol: 'n', meaning: 'Number of monthly installments' },
        ]}
      />
    </>
  )
}
