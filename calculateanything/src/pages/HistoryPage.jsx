import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { useHistory } from '../hooks/useHistory'
import Button from '../components/Button'

export default function HistoryPage() {
  const { history, removeEntry, clearHistory } = useHistory()

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">History</h1>
        {history.length > 0 && (
          <Button variant="ghost" onClick={clearHistory}>Clear all</Button>
        )}
      </div>
      {history.length === 0 ? (
        <p className="mt-4 text-slate-500 dark:text-slate-400">
          Your recent calculations will show up here — nothing sensitive is stored, just a quick summary.
        </p>
      ) : (
        <ul className="mt-8 space-y-3">
          {history.map((h) => (
            <li key={h.id} className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-ink-700 dark:bg-ink-900">
              <div>
                <Link to={`/calculators/${h.calculatorId}`} className="focus-ring font-medium hover:text-amber-500">
                  {h.calculatorName}
                </Link>
                <p className="num mt-0.5 text-sm text-slate-500 dark:text-slate-400">{h.summary}</p>
                <p className="mt-0.5 text-xs text-slate-400">{new Date(h.timestamp).toLocaleString()}</p>
              </div>
              <button onClick={() => removeEntry(h.id)} aria-label="Delete entry" className="focus-ring shrink-0 rounded-lg p-2 text-slate-400 hover:text-red-500">
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
