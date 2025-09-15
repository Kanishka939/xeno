export default function DataTable({ columns, rows }: { columns: { key: string, header: string, width?: string }[], rows: any[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left text-slate-600 border-b">
            {columns.map(col => <th key={col.key} style={{ width: col.width }} className="py-2 pr-4">{col.header}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b last:border-0">
              {columns.map(col => <td key={col.key} className="py-2 pr-4">{r[col.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
