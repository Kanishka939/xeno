import { useParams } from 'react-router-dom';
import Card from '../ui/Card';
import DataTable from '../ui/DataTable';
import { useData } from '../state/data';
import { fmtCurrency } from '../utils/format';

export default function Orders() {
  const { tenantId } = useParams();
  const { dataset } = useData();
  if (!tenantId) return null;
  const ds = dataset(tenantId);

  const rows = ds.orders.slice(0, 120).map(o => ({
    id: o.id,
    date: o.processedAt.slice(0, 10),
    total: fmtCurrency(o.total),
    status: o.financialStatus,
  }));

  const statusColors: Record<string, string> = {
    paid: 'bg-emerald-100 text-emerald-600',
    pending: 'bg-yellow-100 text-yellow-600',
    refunded: 'bg-rose-100 text-rose-600',
    voided: 'bg-gray-100 text-gray-500',
  };

  const columns = [
    { key: 'id', header: 'Order ID' },
    { key: 'date', header: 'Processed at' },
    { key: 'total', header: 'Total' },
    {
      key: 'status',
      header: 'Status',
      render: (row: any) => (
        <span
          className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold transition-transform hover:scale-105 ${statusColors[row.status]}`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  return (
    <div className="container py-12 md:py-20">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-8 md:mb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 bg-clip-text text-transparent leading-tight">
          Orders
        </h1>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-2">
          Showing{' '}
          <b className="font-semibold text-gray-800 dark:text-gray-200">{rows.length}</b> of{' '}
          <b className="font-semibold text-gray-800 dark:text-gray-200">{ds.orders.length}</b>{' '}
          orders
        </p>
      </div>

      <Card className="p-0 transition-shadow hover:shadow-2xl hover:shadow-indigo-500/20">
        <DataTable columns={columns} rows={rows} />
      </Card>
    </div>
  );
}
