import { useState } from 'react'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import FormulaCard from '../../components/FormulaCard'
import ErrorBanner from '../../components/ErrorBanner'
import { formatCurrency, validatePositive } from '../../utils/format'
import { useHistory } from '../../hooks/useHistory'

export default function DiscountCalculator() {
  const [price, setPrice] = useState('')
  const [discount, setDiscount] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    const err = validatePositive({ 'Original price': price, 'Discount %': discount })
    if (err) { setError(err); setResult(null); return }
    if (Number(discount) > 100) { setError('Discount cannot exceed 100%.'); setResult(null); return }
    setError(null)
    const p = Number(price), d = Number(discount)
    const discountAmount = (p * d) / 100
    setResult({ discountAmount, finalPrice: p - discountAmount })
    addEntry('discount-calculator', 'Discount Calculator', `${d}% off ${formatCurrency(p)} \u2192 ${formatCurrency(p - discountAmount)}`)
  }

  const reset = () => { setPrice(''); setDiscount(''); setResult(null); setError(null) }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField label="Original price" unit="\u20b9" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
          <InputField label="Discount" unit="%" type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        </div>
        <ErrorBanner message={error} />
        <div className="mt-5 flex gap-3">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="ghost" onClick={reset}>Reset</Button>
        </div>
      </div>
      {result && (
        <ResultCard mainLabel="Final price" mainValue={formatCurrency(result.finalPrice)} rows={[{ label: 'You save', value: formatCurrency(result.discountAmount) }]} />
      )}
      <FormulaCard formula="Final price = Original \u2212 (Original \u00d7 Discount \u00f7 100)" />
    </>
  )
}
