import { useState } from 'react'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import StepsCard from '../../components/StepsCard'
import FormulaCard from '../../components/FormulaCard'
import ErrorBanner from '../../components/ErrorBanner'
import { formatNumber, isBlank } from '../../utils/format'
import { useHistory } from '../../hooks/useHistory'

export default function QuadraticEquation() {
  const [a, setA] = useState('')
  const [b, setB] = useState('')
  const [c, setC] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    if ([a, b, c].some((v) => isBlank(v) || isNaN(Number(v)))) { setError('Enter valid numbers for a, b and c.'); setResult(null); return }
    const A = Number(a), B = Number(b), C = Number(c)
    if (A === 0) { setError('"a" cannot be zero — this would not be a quadratic equation.'); setResult(null); return }
    setError(null)
    const discriminant = B * B - 4 * A * C
    let roots, nature
    if (discriminant > 0) {
      const r1 = (-B + Math.sqrt(discriminant)) / (2 * A)
      const r2 = (-B - Math.sqrt(discriminant)) / (2 * A)
      roots = `${formatNumber(r1)}, ${formatNumber(r2)}`
      nature = 'Two distinct real roots'
    } else if (discriminant === 0) {
      const r = -B / (2 * A)
      roots = formatNumber(r)
      nature = 'One repeated real root'
    } else {
      const real = -B / (2 * A)
      const imag = Math.sqrt(-discriminant) / (2 * A)
      roots = `${formatNumber(real)} \u00b1 ${formatNumber(imag)}i`
      nature = 'Two complex roots'
    }
    setResult({ discriminant, roots, nature, A, B, C })
    addEntry('quadratic-equation', 'Quadratic Equation Calculator', `${a}x\u00b2+${b}x+${c}=0 \u2192 ${roots}`)
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="grid gap-4 sm:grid-cols-3">
          <InputField label="a" type="number" value={a} onChange={(e) => setA(e.target.value)} />
          <InputField label="b" type="number" value={b} onChange={(e) => setB(e.target.value)} />
          <InputField label="c" type="number" value={c} onChange={(e) => setC(e.target.value)} />
        </div>
        <ErrorBanner message={error} />
        <div className="mt-5"><Button onClick={calculate}>Solve</Button></div>
      </div>
      {result && (
        <>
          <ResultCard mainLabel={result.nature} mainValue={result.roots} rows={[{ label: 'Discriminant', value: formatNumber(result.discriminant) }]} />
          <StepsCard steps={[
            `Discriminant = b\u00b2 \u2212 4ac = (${result.B})\u00b2 \u2212 4(${result.A})(${result.C}) = ${formatNumber(result.discriminant)}`,
            `x = [\u2212b \u00b1 \u221a(discriminant)] \u00f7 2a`,
            `Roots: ${result.roots}`,
          ]} />
        </>
      )}
      <FormulaCard formula="ax\u00b2 + bx + c = 0  \u2192  x = [\u2212b \u00b1 \u221ab\u00b2\u22124ac] \u00f7 2a" />
    </>
  )
}
