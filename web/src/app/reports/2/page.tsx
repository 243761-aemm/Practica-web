import { query } from '@/lib/db';
import Search from '@/components/Search';
import Pagination from '@/components/Pagination';

export default async function TopProductsReport({ 
  searchParams 
}: { 
  searchParams: { query?: string, page?: string } 
}) {
  const searchTerm = searchParams.query || '';
  const page = Math.max(1, parseInt(searchParams.page || '1'));
  const limit = 5;
  const offset = (page - 1) * limit;

  // Consulta parametrizada para evitar SQL Injection
  // Usamos ILIKE para la búsqueda parcial
  const sql = `
    SELECT * FROM vw_top_products_ranked 
    WHERE producto ILIKE $1 
    ORDER BY ranking ASC 
    LIMIT $2 OFFSET $3
  `;
  
  const res = await query(sql, [`%${searchTerm}%`, limit, offset]);
  const products = res.rows;
  const hasNext = products.length === limit;

  return (
    <main className="p-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reporte 2: Productos Estrella</h1>
          <p className="text-gray-600">Ranking por ingresos y unidades vendidas.</p>
        </div>
        <Search />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <span className="text-xs font-bold text-yellow-700 uppercase">Top 1 Actual</span>
          <p className="text-xl font-bold">{products[0]?.producto || 'Sin datos'}</p>
        </div>
      </div>

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="p-3 text-center">Rank</th>
            <th className="p-3 text-left">Producto</th>
            <th className="p-3 text-center">Unidades</th>
            <th className="p-3 text-right">Ingresos</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.ranking} className="border-b hover:bg-gray-50">
              <td className="p-3 text-center font-bold">#{p.ranking}</td>
              <td className="p-3">{p.producto}</td>
              <td className="p-3 text-center">{p.unidades_vendidas}</td>
              <td className="p-3 text-right font-mono">${parseFloat(p.ingresos_totales).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination page={page} hasNext={hasNext} />
    </main>
  );
}