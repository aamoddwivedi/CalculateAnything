export function formatNumber(n, decimals = 2) {
  if (!isFinite(n) || isNaN(n)) return '—'
  return Number(n.toFixed(decimals)).toLocaleString('en-IN', {
    maximumFractionDigits: decimals,
  })
}

export function formatCurrency(n, decimals = 2) {
  if (!isFinite(n) || isNaN(n)) return '—'
  return `₹${formatNumber(n, decimals)}`
}

export function isBlank(v) {
  return v === '' || v === null || v === undefined
}

// Guards a calculator's compute step: returns an error string, or null if all good.
export function validatePositive(fields) {
  for (const [label, value] of Object.entries(fields)) {
    if (isBlank(value)) return `${label} is required.`
    if (isNaN(Number(value))) return `${label} must be a number.`
    if (Number(value) < 0) return `${label} cannot be negative.`
  }
  return null
}
