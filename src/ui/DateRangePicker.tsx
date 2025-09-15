import { addDays, format } from 'date-fns'
export type Range = { start: string, end: string }
export default function DateRangePicker({ range, setRange }: { range: Range, setRange: (r: Range) => void }) {
  const presets = [{ label: '7D', days: 7 },{ label: '30D', days: 30 },{ label: '90D', days: 90 },{ label: '180D', days: 180 }]
  function setDays(d: number) { const end = new Date(); const start = addDays(end, -d + 1); setRange({ start: format(start,'yyyy-MM-dd'), end: format(end,'yyyy-MM-dd') }) }
  return (
    <div className="flex items-center gap-2">
      <input type="date" className="input" value={range.start} onChange={(e) => setRange({ ...range, start: e.target.value })} />
      <span>—</span>
      <input type="date" className="input" value={range.end} onChange={(e) => setRange({ ...range, end: e.target.value })} />
      {presets.map(p => <button key={p.label} className="btn btn-outline" onClick={() => setDays(p.days)}>{p.label}</button>)}
    </div>
  )
}
