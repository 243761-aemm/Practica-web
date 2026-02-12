// web/src/app/reports/3/page.tsx

export default async function InventoryRiskReport() {
  // Consumimos la API que llama a vw_inventory_risk
  const response = await fetch('http://localhost:3000/api/reports/3', { cache: 'no-store' });
  
  if (!response.ok) {
    return <p className="p-8 text-red-500">Error al cargar el reporte de inventario.</p>;
  }

  const data = await response.json();

  return (
    <main className="p-8 bg-white min-h-screen">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">⚠️</span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Control de Riesgo de Inventario
        </h1>
      </div>

      <div className="overflow-hidden rounded-xl border-2 border-slate-200 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="p-4 font-bold uppercase text-xs">Producto</th>
              <th className="p-4 font-bold uppercase text-xs">Categoría</th>
              <th className="p-4 font-bold uppercase text-xs text-center">Stock Actual</th>
              <th className="p-4 font-bold uppercase text-xs text-center">Estado de Riesgo</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.map((prod: any, index: number) => (
              <tr key={index} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-semibold text-slate-800">
                  {prod.producto} {/* Coincide con p.name AS producto en tu SQL */}
                </td>
                <td className="p-4 text-slate-500 italic">
                  {prod.categoria} {/* Coincide con c.name AS categoria en tu SQL */}
                </td>
                <td className="p-4 text-center font-mono font-bold text-lg">
                  {prod.stock}
                </td>
                <td className="p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest shadow-sm ${
                    prod.nivel_riesgo === 'CRÍTICO' 
                      ? 'bg-red-600 text-white' 
                      : prod.nivel_riesgo === 'BAJO' 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-emerald-500 text-white'
                  }`}>
                    {prod.nivel_riesgo} {/* Coincide con tu CASE en SQL */}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-slate-100 rounded-lg border-l-4 border-slate-400">
        <p className="text-xs text-slate-600">
          * Los niveles se calculan automáticamente: <strong>CRÍTICO</strong> (≤ 5), <strong>BAJO</strong> (≤ 15), <strong>ESTABLE</strong> (mayor a 15).
        </p>
      </div>
    </main>
  );
}