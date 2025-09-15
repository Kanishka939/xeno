import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
const COLORS = ['#0ea5e9','#111827','#22c55e','#f59e0b','#ef4444','#6366f1','#14b8a6']
export default function PieChartWidget({ data, dataKey, nameKey }: { data: any[], dataKey: string, nameKey: string }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey={dataKey} nameKey={nameKey} outerRadius={100} label>
            {data.map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
