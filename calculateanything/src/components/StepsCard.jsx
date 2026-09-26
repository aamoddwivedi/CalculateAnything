export default function StepsCard({ steps }) {
  if (!steps || steps.length === 0) return null
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-ink-700 dark:bg-ink-900">
      <h3 className="text-base font-semibold">Step-by-step</h3>
      <ol className="num mt-3 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
    </div>
  )
}
