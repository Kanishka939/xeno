export function fmtCurrency(n: number, currency = 'USD') {
  try { return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(n) }
  catch { return `$${n.toFixed(2)}` }
}
