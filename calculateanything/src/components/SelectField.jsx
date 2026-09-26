export default function SelectField({ label, options, className = '', ...props }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-slate-600 dark:text-slate-300">{label}</span>
      <select
        className="focus-ring w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-base dark:border-ink-600 dark:bg-ink-800"
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </label>
  )
}
