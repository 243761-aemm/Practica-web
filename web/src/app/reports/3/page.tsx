import { query } from '@/lib/db';

export default async function InventoryRiskReport() {
  // Consumimos la vista que ya tiene el CASE y el porcentaje calculado
  const res = await query('SELECT * FROM vw_inventory_risk ORDER BY stock ASC');
  const inventory = res.rows;

  // KPI: Contar cuántos productos están en riesgo CRÍTICO
  const criticalCount = inventory.filter(item => item.nivel_riesgo === 'CRÍTICO').length;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-2">Reporte 3: Riesgo de Inventario</h1>
      <p className="text-gray-600 mb-6">Monitoreo de existencias basado en niveles de seguridad.</p>

      {/* KPI de Alerta */}
      <div className="mb-8">
        <div className={`p-4 rounded-lg border ${criticalCount > 0 ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
          <p className="text-sm font-bold uppercase tracking-wide">Estado Crítico</p>
          <p className="text-3xl font-black">{criticalCount} <span className="text-lg font-normal">productos por agotarse</span></p>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="p-4 font-semibold border-b">Producto</th>
              <th className="p-4 font-semibold border-b">Categoría</th>
              <th className="p-4 font-semibold border-b text-center">Stock</th>
              <th className="p-4 font-semibold border-b text-center">Nivel de Riesgo</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-4 border-b">{item.producto}</td>
                <td className="p-4 border-b text-gray-500 text-sm">{item.categoria}</td>
                <td className="p-4 border-b text-center font-mono">{item.stock}</td>
                <td className="p-4 border-b text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.nivel_riesgo === 'CRÍTICO' ? 'bg-red-100 text-red-700' :
                    item.nivel_riesgo === 'BAJO' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {item.nivel_riesgo}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}