import { useState } from 'react'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import FormulaCard from '../../components/FormulaCard'
import ErrorBanner from '../../components/ErrorBanner'
import { useHistory } from '../../hooks/useHistory'

function gcd(a, b) { return b === 0 ? a : gcd(b, a % b) }
function lcm(a, b) { return (a * b) / gcd(a, b) }

export default function LcmHcf() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    const parts = input.split(',').map((s) => s.trim()).filter(Boolean)
    if (parts.length < 2) { setError('Enter at least two numbers, separated by commas.'); setResult(null); return }
    const nums = parts.map(Number)
    if (nums.some((n) => isNaN(n) || !Number.isInteger(n) || n <= 0)) {
      setError('All values must be positive whole numbers.'); setResult(null); return
    }
    setError(null)
    const hcf = nums.reduce((a, b) => gcd(a, b))
    const lcmResult = nums.reduce((a, b) => lcm(a, b))
    setResult({ hcf, lcm: lcmResult })
    addEntry('lcm-hcf', 'LCM & HCF Calculator', `${input} \u2192 LCM ${lcmResult}, HCF ${hcf}`)
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">Numbers (comma separated)</span>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 12, 18, 24"
            className="num focus-ring w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 dark:border-ink-600 dark:bg-ink-800"
          />
        </label>
        <ErrorBanner message={error} />
        <div className="mt-5"><Button onClick={calculate}>Calculate</Button></div>
      </div>
      {result && (
        <ResultCard mainLabel="LCM" mainValue={result.lcm} rows={[{ label: 'HCF (GCD)', value: result.hcf }]} />
      )}
      <FormulaCard note="LCM = smallest number divisible by all inputs. HCF = largest number that divides all inputs evenly." />
    </>
  )
}
