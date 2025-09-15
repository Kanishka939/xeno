import { useParams } from 'react-router-dom';
import Card from '../ui/Card';
import DataTable from '../ui/DataTable';
import { useData } from '../state/data';

export default function Customers() {
  const { tenantId } = useParams();
  const { dataset } = useData();

  if (!tenantId) {
    return null;
  }

  const ds = dataset(tenantId);
  const rows = ds.customers.slice(0, 100).map(c => ({
    name: `${c.firstName} ${c.lastName}`,
    email: c.email,
    since: c.createdAt.slice(0, 10)
  }));

  return (
    <div className="container py-10 md:py-16 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 text-gradient">
          Customers
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400 mt-2">
          Displaying <b className="font-semibold">{rows.length}</b> of <b className="font-semibold">{ds.customers.length}</b> customers
        </p>
      </div>

      <Card>
        <DataTable
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'since', header: 'Customer since' }
          ]}
          rows={rows}
        />
      </Card>
    </div>
  );
}