export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'focus-ring inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-transform active:scale-[0.98]'
  const variants = {
    primary: 'bg-amber-400 text-ink-950 hover:bg-amber-500',
    ghost: 'bg-transparent border border-slate-300 dark:border-ink-600 text-inherit hover:bg-slate-100 dark:hover:bg-ink-800',
    subtle: 'bg-slate-100 dark:bg-ink-800 text-inherit hover:bg-slate-200 dark:hover:bg-ink-700',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
