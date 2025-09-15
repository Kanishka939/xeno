import { useMemo, useState } from 'react'
import Card from '../ui/Card'
import StatsGrid from '../ui/StatsGrid'
import DateRangePicker, { Range } from '../ui/DateRangePicker'
import { useData } from '../state/data'
import { useParams, Link } from 'react-router-dom'
import { format, addDays } from 'date-fns'
import LineChartWidget from '../ui/charts/LineChartWidget'
import AreaChartWidget from '../ui/charts/AreaChartWidget'
import PieChartWidget from '../ui/charts/PieChartWidget'
import BarChartWidget from '../ui/charts/BarChartWidget'
import DataTable from '../ui/DataTable'
import { fmtCurrency } from '../utils/format'

export default function Insights() {
  const { tenantId } = useParams()
  const { currentTenant, metrics, exportCSV } = useData()

  const today = new Date()
  const start = addDays(today, -29)
  const [range, setRange] = useState<Range>({ start: format(start, 'yyyy-MM-dd'), end: format(today, 'yyyy-MM-dd') })

  const m = useMemo(() => tenantId ? metrics(tenantId, range.start, range.end) : null, [tenantId, range])
  if (!tenantId || !currentTenant || !m) return null

  const statItems = [
    { label: 'Customers', value: m.totals.customers },
    { label: 'Orders', value: m.totals.orders },
    { label: 'Revenue', value: fmtCurrency(m.totals.revenue) },
    { label: 'AOV', value: fmtCurrency(m.totals.aov) }
  ]

  const extras = [
    { label: 'Repeat purchase rate', value: (m.totals.repeatRate*100).toFixed(1)+'%' },
    { label: 'Conversion (proxy)', value: (m.totals.conversionRate*100).toFixed(1)+'%' }
  ]

  const topCustomerRows = m.topCustomers.map(c => ({ name: c.name, email: c.email, spent: fmtCurrency(c.spent) }))
  const topProductRows = m.topProducts.map(p => ({ title: p.title, category: p.category, revenue: fmtCurrency(p.revenue) }))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{currentTenant.name} — Insights</h1>
          <div className="text-slate-500 text-sm">{currentTenant.shop?.connected ? <span className="badge">Shopify connected</span> : <span className="badge">Demo data</span>}</div>
        </div>
        <DateRangePicker range={range} setRange={setRange} />
      </div>

      <StatsGrid items={statItems} />

      <div className="grid md:grid-cols-2 gap-3">
        <Card title="Orders over time"><LineChartWidget data={m.series} dataKey="orders" /></Card>
        <Card title="Revenue over time"><AreaChartWidget data={m.series.map(x => ({...x, revenue: Number(x.revenue.toFixed(2))}))} dataKey="revenue" /></Card>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <Card title="Order status distribution"><PieChartWidget data={m.statusData} nameKey="name" dataKey="value" /></Card>
        <Card title="Top products by revenue" right={<button className="btn btn-outline" onClick={() => exportCSV(tenantId, range.start, range.end)}>Export Orders CSV</button>}>
          <BarChartWidget data={m.topProducts.map(p => ({ name: p.title.slice(0,18)+'…', revenue: Number(p.revenue.toFixed(2)) }))} xKey="name" yKey="revenue" />
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <Card title="Top 5 customers by spend">
          <DataTable columns={[{ key: 'name', header: 'Customer' }, { key: 'email', header: 'Email' }, { key: 'spent', header: 'Spent' }]} rows={topCustomerRows} />
        </Card>
        <Card title="Bonus metrics">
          <div className="grid grid-cols-2 gap-2">
            {extras.map((x, idx) => (
              <div key={idx} className="card p-4">
                <div className="text-sm text-slate-500">{x.label}</div>
                <div className="text-xl font-semibold">{x.value}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex gap-2">
        <Link to={`/tenant/${tenantId}/customers`} className="btn btn-outline">View customers</Link>
        <Link to={`/tenant/${tenantId}/orders`} className="btn btn-outline">View orders</Link>
      </div>
    </div>
  )
}
