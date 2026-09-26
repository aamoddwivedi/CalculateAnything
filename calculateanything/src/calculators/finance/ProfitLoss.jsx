import { useState } from 'react'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import FormulaCard from '../../components/FormulaCard'
import ErrorBanner from '../../components/ErrorBanner'
import { formatCurrency, formatNumber, validatePositive } from '../../utils/format'
import { useHistory } from '../../hooks/useHistory'

export default function ProfitLoss() {
  const [cost, setCost] = useState('')
  const [selling, setSelling] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    const err = validatePositive({ 'Cost price': cost, 'Selling price': selling })
    if (err) { setError(err); setResult(null); return }
    if (Number(cost) === 0) { setError('Cost price cannot be zero.'); setResult(null); return }
    setError(null)
    const c = Number(cost), s = Number(selling)
    const diff = s - c
    const isProfit = diff >= 0
    const percentage = (Math.abs(diff) / c) * 100
    setResult({ isProfit, amount: Math.abs(diff), percentage })
    addEntry('profit-loss', 'Profit & Loss Calculator', `${isProfit ? 'Profit' : 'Loss'} of ${formatCurrency(Math.abs(diff))}`)
  }

  const reset = () => { setCost(''); setSelling(''); setResult(null); setError(null) }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField label="Cost price" unit="\u20b9" type="number" value={cost} onChange={(e) => setCost(e.target.value)} />
          <InputField label="Selling price" unit="\u20b9" type="number" value={selling} onChange={(e) => setSelling(e.target.value)} />
        </div>
        <ErrorBanner message={error} />
        <div className="mt-5 flex gap-3">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="ghost" onClick={reset}>Reset</Button>
        </div>
      </div>
      {result && (
        <ResultCard
          mainLabel={result.isProfit ? 'Profit' : 'Loss'}
          mainValue={formatCurrency(result.amount)}
          rows={[{ label: `${result.isProfit ? 'Profit' : 'Loss'} %`, value: `${formatNumber(result.percentage)}%` }]}
        />
      )}
      <FormulaCard formula="Profit/Loss % = |Selling \u2212 Cost| \u00f7 Cost \u00d7 100" />
    </>
  )
}
