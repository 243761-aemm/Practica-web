

export default async function DailySalesReport() {
 
  const response = await fetch('http://localhost:3000/api/reports/1', { cache: 'no-store' });
  
  if (!response.ok) {
    return <p className="p-8 text-red-500">Error al cargar el reporte de ventas diarias.</p>;
  }

  const data = await response.json();

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">
          Reporte 1: Rendimiento de Ventas Diarias
        </h1>
        <p className="text-slate-500 italic">Seguimiento cronológico de ingresos y transacciones.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border-2 border-slate-200 shadow-sm bg-white">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white">
              <th className="p-4 font-bold uppercase text-xs">Fecha de Venta</th>
              <th className="p-4 font-bold uppercase text-xs text-center">Tickets</th>
              <th className="p-4 font-bold uppercase text-xs text-right">Ticket Promedio</th>
              <th className="p-4 font-bold uppercase text-xs text-right">Total Ingresos</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {data.map((row: any, index: number) => (
              <tr key={index} className="hover:bg-blue-50 transition-colors">
                <td className="p-4 font-bold text-slate-700">
                  {new Date(row.fecha).toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </td>
                <td className="p-4 text-center font-semibold text-slate-600">
                  {row.tickets}
                </td>
                <td className="p-4 text-right text-slate-500 font-mono">
                  ${parseFloat(row.ticket_promedio).toFixed(2)}
                </td>
                <td className="p-4 text-right">
                  <span className="text-lg font-black text-emerald-600 font-mono">
                    ${parseFloat(row.total_ventas).toFixed(2)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="mt-4 p-8 text-center border-2 border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-400 font-medium">No hay datos de ventas registrados para mostrar.</p>
        </div>
      )}
    </main>
  );
}