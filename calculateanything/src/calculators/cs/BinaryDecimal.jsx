import { useState } from 'react'
import SelectField from '../../components/SelectField'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import ErrorBanner from '../../components/ErrorBanner'
import { useHistory } from '../../hooks/useHistory'

const bases = [
  { value: '2', label: 'Binary' },
  { value: '8', label: 'Octal' },
  { value: '10', label: 'Decimal' },
  { value: '16', label: 'Hexadecimal' },
]

export default function BinaryDecimal() {
  const [value, setValue] = useState('')
  const [fromBase, setFromBase] = useState('10')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    if (!value.trim()) { setError('Enter a value to convert.'); setResult(null); return }
    const decimal = parseInt(value.trim(), Number(fromBase))
    if (isNaN(decimal) || decimal < 0) {
      setError(`"${value}" is not a valid ${bases.find((b) => b.value === fromBase).label.toLowerCase()} number.`)
      setResult(null); return
    }
    setError(null)
    setResult({
      binary: decimal.toString(2),
      octal: decimal.toString(8),
      decimal: decimal.toString(10),
      hex: decimal.toString(16).toUpperCase(),
    })
    addEntry('binary-decimal', 'Binary / Decimal Converter', `${value} (base ${fromBase}) \u2192 ${decimal.toString(10)} decimal`)
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">Value</span>
            <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g. 1010 or FF" className="num focus-ring w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 dark:border-ink-600 dark:bg-ink-800" />
          </label>
          <SelectField label="From base" value={fromBase} onChange={(e) => setFromBase(e.target.value)} options={bases} />
        </div>
        <ErrorBanner message={error} />
        <div className="mt-5"><Button onClick={calculate}>Convert</Button></div>
      </div>
      {result && (
        <ResultCard
          mainLabel="Decimal"
          mainValue={result.decimal}
          rows={[
            { label: 'Binary', value: result.binary },
            { label: 'Octal', value: result.octal },
            { label: 'Hexadecimal', value: result.hex },
          ]}
        />
      )}
    </>
  )
}
