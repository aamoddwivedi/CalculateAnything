export default function InputField({ label, unit, error, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>
      <div className="relative">
        <input
          className={`focus-ring w-full rounded-xl border bg-white px-4 py-2.5 num text-base dark:bg-ink-800 ${
            error ? 'border-red-400' : 'border-slate-300 dark:border-ink-600'
          } ${unit ? 'pr-14' : ''}`}
          {...props}
        />
        {unit && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">{unit}</span>
        )}
      </div>
      {error && <span className="mt-1 block text-xs text-red-500">{error}</span>}
    </label>
  )
}
