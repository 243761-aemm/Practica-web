import { query } from '@/lib/db';

export default async function SalesDailyReport({ searchParams }: { searchParams: { from?: string, to?: string } }) {
  
  const res = await query('SELECT * FROM vw_sales_daily');
  const data = res.rows;

  
  const totalPeriodo = data.reduce((acc, curr) => acc + parseFloat(curr.total_ventas), 0);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Ventas Diarias</h1>
      <p className="mb-4">Análisis de ingresos y tickets por día.</p>
      
      <div className="bg-blue-100 p-4 rounded-lg mb-6 w-fit">
        <span className="text-sm text-blue-800">Total Acumulado:</span>
        <p className="text-2xl font-bold text-blue-900">${totalPeriodo.toFixed(2)}</p>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Fecha</th>
            <th className="border p-2">Total Ventas</th>
            <th className="border p-2">Tickets</th>
            <th className="border p-2">Ticket Promedio</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="text-center">
              <td className="border p-2">{row.fecha.toLocaleDateString()}</td>
              <td className="border p-2">${row.total_ventas}</td>
              <td className="border p-2">{row.tickets}</td>
              <td className="border p-2">${row.ticket_promedio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}