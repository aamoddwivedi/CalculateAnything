import { useState } from 'react'
import InputField from '../../components/InputField'
import SelectField from '../../components/SelectField'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import FormulaCard from '../../components/FormulaCard'
import ErrorBanner from '../../components/ErrorBanner'
import { formatCurrency, validatePositive } from '../../utils/format'
import { useHistory } from '../../hooks/useHistory'

export default function GstCalculator() {
  const [amount, setAmount] = useState('')
  const [gstRate, setGstRate] = useState('18')
  const [mode, setMode] = useState('add')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    const err = validatePositive({ Amount: amount, 'GST %': gstRate })
    if (err) { setError(err); setResult(null); return }
    setError(null)
    const a = Number(amount), r = Number(gstRate)
    let gstAmount, finalAmount, baseAmount
    if (mode === 'add') {
      gstAmount = (a * r) / 100
      finalAmount = a + gstAmount
      baseAmount = a
    } else {
      baseAmount = (a * 100) / (100 + r)
      gstAmount = a - baseAmount
      finalAmount = a
    }
    setResult({ gstAmount, finalAmount, baseAmount })
    addEntry('gst-calculator', 'GST Calculator', `GST ${formatCurrency(gstAmount)} on ${formatCurrency(a)}`)
  }

  const reset = () => { setAmount(''); setResult(null); setError(null) }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="grid gap-4 sm:grid-cols-3">
          <InputField label={mode === 'add' ? 'Amount (excl. GST)' : 'Amount (incl. GST)'} unit="\u20b9" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <InputField label="GST rate" unit="%" type="number" value={gstRate} onChange={(e) => setGstRate(e.target.value)} />
          <SelectField label="Mode" value={mode} onChange={(e) => setMode(e.target.value)} options={[{ value: 'add', label: 'Add GST' }, { value: 'remove', label: 'Remove GST' }]} />
        </div>
        <ErrorBanner message={error} />
        <div className="mt-5 flex gap-3">
          <Button onClick={calculate}>Calculate</Button>
          <Button variant="ghost" onClick={reset}>Reset</Button>
        </div>
      </div>
      {result && (
        <ResultCard
          mainLabel="Final amount"
          mainValue={formatCurrency(result.finalAmount)}
          rows={[
            { label: 'GST amount', value: formatCurrency(result.gstAmount) },
            { label: 'Base amount', value: formatCurrency(result.baseAmount) },
          ]}
        />
      )}
      <FormulaCard formula={mode === 'add' ? 'GST = Amount \u00d7 Rate \u00f7 100' : 'Base = Amount \u00d7 100 \u00f7 (100 + Rate)'} />
    </>
  )
}
