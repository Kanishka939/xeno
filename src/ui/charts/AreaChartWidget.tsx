import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
export default function AreaChartWidget({ data, dataKey }: { data: any[], dataKey: string }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.5}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" minTickGap={24} />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey={dataKey} stroke="#0ea5e9" fillOpacity={1} fill="url(#rev)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
