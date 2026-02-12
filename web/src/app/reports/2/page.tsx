// web/src/app/reports/2/page.tsx

export default async function TopProductsReport() {
  // Consumimos la API interna que consulta la vista vw_top_products_ranked
  const response = await fetch('http://localhost:3000/api/reports/2', { cache: 'no-store' });
  
  if (!response.ok) {
    return <p className="p-8 text-red-500">Error al cargar el reporte de productos.</p>;
  }

  const data = await response.json();

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-slate-800">
        Reporte 2: Ranking de Productos Estrella
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item: any) => (
          <div 
            key={item.ranking} 
            className="p-6 border-2 border-slate-200 rounded-xl shadow-sm bg-white hover:border-blue-400 transition-colors"
          >
            <div className="flex justify-between items-start mb-4">
              <span className="bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-full">
                RANK #{item.ranking}
              </span>
            </div>
            
            <h2 className="font-bold text-xl text-slate-900 mb-2">
              {item.producto} {/* Coincide con p.name AS producto en tu SQL */}
            </h2>
            
            <div className="flex justify-between text-sm border-t pt-4 border-slate-100">
              <div>
                <p className="text-slate-500 uppercase text-[10px] font-bold">Unidades</p>
                <p className="font-mono font-bold text-lg text-slate-700">
                  {item.unidades_vendidas} {/* Coincide con SUM(oi.qty) AS unidades_vendidas */}
                </p>
              </div>
              <div className="text-right">
                <p className="text-slate-500 uppercase text-[10px] font-bold">Ingresos Totales</p>
                <p className="font-mono font-bold text-lg text-green-600">
                  ${parseFloat(item.ingresos_totales).toFixed(2)} {/* Coincide con ingresos_totales */}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}