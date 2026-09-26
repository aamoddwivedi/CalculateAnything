export default function FormulaCard({ title = 'How it\u2019s calculated', formula, variables = [], note }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
      <h3 className="text-base font-semibold">{title}</h3>
      {formula && (
        <p className="num mt-3 rounded-lg bg-slate-50 px-4 py-3 text-lg dark:bg-ink-800">{formula}</p>
      )}
      {variables.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
          {variables.map((v) => (
            <li key={v.symbol}><span className="num font-semibold">{v.symbol}</span> — {v.meaning}</li>
          ))}
        </ul>
      )}
      {note && <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">{note}</p>}
    </div>
  )
}
