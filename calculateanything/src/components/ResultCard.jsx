export default function ResultCard({ mainLabel, mainValue, rows = [], accent = 'amber' }) {
  const accents = {
    amber: 'from-amber-400/20 to-transparent border-amber-400/40',
    teal: 'from-teal-400/20 to-transparent border-teal-400/40',
  }
  return (
    <div className={`rounded-2xl border bg-gradient-to-br p-6 ${accents[accent]}`}>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{mainLabel}</p>
      <p className="num mt-1 text-4xl font-bold tracking-tight">{mainValue}</p>
      {rows.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-200 pt-4 dark:border-ink-600 sm:grid-cols-3">
          {rows.map((r) => (
            <div key={r.label}>
              <p className="text-xs text-slate-500 dark:text-slate-400">{r.label}</p>
              <p className="num mt-0.5 text-lg font-semibold">{r.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
