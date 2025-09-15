import { useParams } from 'react-router-dom'
import Card from '../ui/Card'
import DataTable from '../ui/DataTable'
import { useData } from '../state/data'
import { fmtCurrency } from '../utils/format'

export default function Orders() {
  const { tenantId } = useParams()
  const { dataset } = useData()
  if (!tenantId) return null
  const ds = dataset(tenantId)
  const rows = ds.orders.slice(0, 120).map(o => ({ id: o.id, date: o.processedAt.slice(0,10), total: fmtCurrency(o.total), status: o.financialStatus }))

  return (
    <div className="space-y-4">
      <Card title="Orders" subtitle={`Showing ${rows.length} of ${ds.orders.length}`}>
        <DataTable columns={[{ key: 'id', header: 'Order ID' }, { key: 'date', header: 'Processed at' }, { key: 'total', header: 'Total' }, { key: 'status', header: 'Status' }]} rows={rows} />
      </Card>
    </div>
  )
}
