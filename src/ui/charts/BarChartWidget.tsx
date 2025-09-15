import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
export default function BarChartWidget({ data, xKey, yKey }: { data: any[], xKey: string, yKey: string }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={yKey} fill="#111827" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
