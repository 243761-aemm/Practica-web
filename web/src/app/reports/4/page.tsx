import { query } from '@/lib/db';
import Pagination from '@/components/Pagination';

export default async function CustomerValueReport({ 
  searchParams 
}: { 
  searchParams: { page?: string } 
}) {
  // 1. Validación de parámetros (Paginación Server-side)
  const page = Math.max(1, parseInt(searchParams.page || '1'));
  const limit = 5; // Cantidad de registros por página
  const offset = (page - 1) * limit;

  // 2. Consulta a la VIEW obligatoria (SELECT solo sobre VIEW) [cite: 30, 41]
  // Usamos parámetros para evitar SQL Injection
  const res = await query(
    'SELECT * FROM vw_customer_value ORDER BY total_gastado DESC LIMIT $1 OFFSET $2',
    [limit, offset]
  );
  
  const customers = res.rows;
  const hasNext = customers.length === limit;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-2">Reporte 4: Valor del Cliente</h1>
      <p className="text-gray-600 mb-6">Métrica de clientes frecuentes y su gasto promedio[cite: 27, 28].</p>

      {/* KPI Destacado  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-green-50 border-l-4 border-green-500 rounded">
          <span className="text-sm text-green-700 uppercase font-bold">Insight Clave</span>
          <p className="text-lg text-green-900">
            Mostrando los clientes con mayor impacto en la facturación.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">Cliente</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-center">Órdenes</th>
              <th className="border p-3 text-right">Total Gastado</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={i} className="hover:bg-gray-50 transition">
                <td className="border p-3 font-medium">{c.cliente} </td>
                <td className="border p-3 text-gray-600">{c.email}</td>
                <td className="border p-3 text-center">{c.total_ordenes}</td>
                <td className="border p-3 text-right font-bold text-blue-600">
                  ${parseFloat(c.total_gastado).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Control de Paginación */}
      <Pagination page={page} hasNext={hasNext} />
    </main>
  );
}