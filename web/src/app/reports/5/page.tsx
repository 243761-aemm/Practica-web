export default async function Reporte5Page() {
  
  const response = await fetch('http://localhost:3000/api/reports/5', { cache: 'no-store' });
  const data = await response.json();

  return (
    <main className="p-8 bg-white min-h-screen text-slate-900">
      <h1 className="text-3xl font-bold mb-6">Análisis de Métodos de Pago</h1>
      
      <div className="grid gap-6">
        {data.map((item: any) => (
          <div key={item.metodo_pago} className="border-2 border-slate-200 p-4 rounded-lg flex justify-between items-center shadow-sm">
            <div>
              <p className="text-xs font-black text-blue-600 uppercase">{item.metodo_pago}</p>
              <p className="text-2xl font-bold">${parseFloat(item.monto_total).toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">{item.total_usos} transacciones</p>
              <p className="text-lg font-black text-slate-800">{item.porcentaje_del_total}%</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}