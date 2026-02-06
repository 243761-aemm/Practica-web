import { query } from '@/lib/db';
import Search from '@/components/Search';
import Pagination from '@/components/Pagination';

export const dynamic = 'force-dynamic';

export default async function TopProductsReport({ 
  searchParams 
}: { 
  searchParams: { query?: string, page?: string } 
}) {
  
  const search = await searchParams;
  const queryParam = search?.query || '';
  const currentPage = Number(search?.page) || 1;
  const limit = 5;
  const offset = (currentPage - 1) * limit;

  
  const res = await query(
    'SELECT * FROM vw_top_products_ranked WHERE producto ILIKE $1 ORDER BY ranking ASC LIMIT $2 OFFSET $3',
    [`%${queryParam}%`, limit, offset]
  );
  
  const products = res.rows;
  const hasNext = products.length === limit;

  return (
    <main className="p-8 text-black bg-white min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reporte 2: Productos Estrella</h1>
          <p className="text-gray-600 italic">Ranking basado en ingresos totales.</p>
        </div>
        <Search />
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="p-3 text-center">Rank</th>
              <th className="p-3 text-left">Producto</th>
              <th className="p-3 text-center">Unidades</th>
              <th className="p-3 text-right">Ingresos</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p) => (
                <tr key={p.ranking} className="border-b hover:bg-gray-50 text-black">
                  <td className="p-3 text-center font-bold">#{p.ranking}</td>
                  <td className="p-3">{p.producto}</td>
                  <td className="p-3 text-center">{p.unidades_vendidas}</td>
                  <td className="p-3 text-right font-mono font-semibold">
                    ${parseFloat(p.ingresos_totales).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-10 text-center text-gray-500">
                  No se encontraron productos con "{queryParam}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination page={currentPage} hasNext={hasNext} />
    </main>
  );
}