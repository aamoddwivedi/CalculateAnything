import { useState } from 'react'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import StepsCard from '../../components/StepsCard'
import FormulaCard from '../../components/FormulaCard'
import ErrorBanner from '../../components/ErrorBanner'
import { formatNumber, validatePositive } from '../../utils/format'
import { useHistory } from '../../hooks/useHistory'

export default function PertCalculator() {
  const [o, setO] = useState('')
  const [m, setM] = useState('')
  const [p, setP] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const calculate = () => {
    const err = validatePositive({ Optimistic: o, 'Most likely': m, Pessimistic: p })
    if (err) { setError(err); setResult(null); return }
    const O = Number(o), M = Number(m), P = Number(p)
    if (!(O <= M && M <= P)) { setError('Values must satisfy Optimistic \u2264 Most Likely \u2264 Pessimistic.'); setResult(null); return }
    setError(null)
    const te = (O + 4 * M + P) / 6
    const variance = Math.pow((P - O) / 6, 2)
    const sd = Math.sqrt(variance)
    setResult({ te, variance, sd, O, M, P })
    addEntry('pert-calculator', 'PERT Calculator', `Expected time ${formatNumber(te)}`)
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="grid gap-4 sm:grid-cols-3">
          <InputField label="Optimistic (O)" type="number" value={o} onChange={(e) => setO(e.target.value)} />
          <InputField label="Most likely (M)" type="number" value={m} onChange={(e) => setM(e.target.value)} />
          <InputField label="Pessimistic (P)" type="number" value={p} onChange={(e) => setP(e.target.value)} />
        </div>
        <ErrorBanner message={error} />
        <div className="mt-5"><Button onClick={calculate}>Calculate</Button></div>
      </div>
      {result && (
        <>
          <ResultCard
            mainLabel="Expected time (TE)"
            mainValue={formatNumber(result.te)}
            rows={[{ label: 'Variance', value: formatNumber(result.variance) }, { label: 'Std. deviation', value: formatNumber(result.sd) }]}
          />
          <StepsCard steps={[
            `TE = (O + 4M + P) \u00f7 6 = (${result.O} + 4\u00d7${result.M} + ${result.P}) \u00f7 6 = ${formatNumber(result.te)}`,
            `Variance = ((P \u2212 O) \u00f7 6)\u00b2 = ((${result.P} \u2212 ${result.O}) \u00f7 6)\u00b2 = ${formatNumber(result.variance)}`,
          ]} />
        </>
      )}
      <FormulaCard
        formula="TE = (O + 4M + P) \u00f7 6"
        variables={[{ symbol: 'O', meaning: 'Optimistic time' }, { symbol: 'M', meaning: 'Most likely time' }, { symbol: 'P', meaning: 'Pessimistic time' }]}
      />
    </>
  )
}
