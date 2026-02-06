import { query } from '@/lib/db';
import Pagination from '@/components/Pagination';

export const dynamic = 'force-dynamic';

export default async function CustomerValueReport({ 
  searchParams 
}: { 
  searchParams: { page?: string } 
}) {
  const search = await searchParams;
  const currentPage = Number(search?.page) || 1;
  const limit = 5;
  const offset = (currentPage - 1) * limit;

  
  const res = await query(
    'SELECT * FROM vw_customer_value ORDER BY total_gastado DESC NULLS LAST LIMIT $1 OFFSET $2',
    [limit, offset]
  );
  
  const customers = res.rows;
  const hasNext = customers.length === limit;

  return (
    <main className="p-8 text-black bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-2">Reporte 4: Valor del Cliente</h1>
      <p className="text-gray-600 mb-6 border-b pb-4">Clientes ordenados por monto total de consumo.</p>

      <div className="overflow-x-auto border rounded-lg shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-3 text-left">Cliente</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-center">Total Órdenes</th>
              <th className="p-3 text-right">Monto Total</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={i} className="border-b hover:bg-blue-50">
                <td className="p-3 font-medium">{c.cliente}</td>
                <td className="p-3 text-gray-600">{c.email}</td>
                <td className="p-3 text-center">{c.total_ordenes}</td>
                <td className="p-3 text-right font-bold text-blue-700">
                  ${parseFloat(c.total_gastado || 0).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={currentPage} hasNext={hasNext} />
    </main>
  );
}