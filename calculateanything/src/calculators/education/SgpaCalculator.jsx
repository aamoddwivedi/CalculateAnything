import { useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import Button from '../../components/Button'
import ResultCard from '../../components/ResultCard'
import FormulaCard from '../../components/FormulaCard'
import ErrorBanner from '../../components/ErrorBanner'
import { formatNumber } from '../../utils/format'
import { useHistory } from '../../hooks/useHistory'

let idCounter = 0
const newSubject = () => ({ id: idCounter++, name: '', credits: '', grade: '' })

export default function SgpaCalculator() {
  const [subjects, setSubjects] = useState([newSubject(), newSubject(), newSubject()])
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const { addEntry } = useHistory()

  const update = (id, field, value) =>
    setSubjects((s) => s.map((row) => (row.id === id ? { ...row, [field]: value } : row)))

  const addRow = () => setSubjects((s) => [...s, newSubject()])
  const removeRow = (id) => setSubjects((s) => s.filter((row) => row.id !== id))

  const calculate = () => {
    const filled = subjects.filter((s) => s.credits !== '' || s.grade !== '')
    if (filled.length === 0) { setError('Add at least one subject.'); setResult(null); return }
    for (const s of filled) {
      if (s.credits === '' || isNaN(Number(s.credits)) || Number(s.credits) <= 0) {
        setError('Every subject needs valid, positive credits.'); setResult(null); return
      }
      if (s.grade === '' || isNaN(Number(s.grade)) || Number(s.grade) < 0 || Number(s.grade) > 10) {
        setError('Grade points must be between 0 and 10.'); setResult(null); return
      }
    }
    setError(null)
    const totalCredits = filled.reduce((sum, s) => sum + Number(s.credits), 0)
    const weighted = filled.reduce((sum, s) => sum + Number(s.credits) * Number(s.grade), 0)
    const sgpa = weighted / totalCredits
    setResult({ sgpa, totalCredits, weighted })
    addEntry('sgpa-calculator', 'SGPA Calculator', `${filled.length} subjects \u2192 SGPA ${formatNumber(sgpa)}`)
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
        <div className="space-y-3">
          {subjects.map((s) => (
            <div key={s.id} className="grid grid-cols-[1fr_90px_90px_auto] items-center gap-2">
              <input
                placeholder="Subject name"
                value={s.name}
                onChange={(e) => update(s.id, 'name', e.target.value)}
                className="focus-ring rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-ink-600 dark:bg-ink-800"
              />
              <input
                placeholder="Credits"
                type="number"
                value={s.credits}
                onChange={(e) => update(s.id, 'credits', e.target.value)}
                className="num focus-ring rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-ink-600 dark:bg-ink-800"
              />
              <input
                placeholder="Grade pt"
                type="number"
                value={s.grade}
                onChange={(e) => update(s.id, 'grade', e.target.value)}
                className="num focus-ring rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-ink-600 dark:bg-ink-800"
              />
              <button onClick={() => removeRow(s.id)} aria-label="Remove subject" className="focus-ring rounded-lg p-2 text-slate-400 hover:text-red-500">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
        <button onClick={addRow} className="focus-ring mt-3 flex items-center gap-1.5 text-sm font-medium text-amber-500">
          <Plus size={16} /> Add subject
        </button>
        <ErrorBanner message={error} />
        <div className="mt-5">
          <Button onClick={calculate}>Calculate SGPA</Button>
        </div>
      </div>

      {result && (
        <ResultCard
          mainLabel="SGPA"
          mainValue={formatNumber(result.sgpa)}
          rows={[
            { label: 'Total credits', value: result.totalCredits },
            { label: 'Weighted points', value: formatNumber(result.weighted) },
          ]}
        />
      )}

      <FormulaCard
        formula="SGPA = \u03a3(Credit \u00d7 Grade Point) \u00f7 \u03a3Credit"
        note="Add every subject from the semester for an accurate SGPA."
      />
    </>
  )
}
