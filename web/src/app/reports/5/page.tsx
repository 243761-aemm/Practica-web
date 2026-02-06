import { query } from '@/lib/db';

export default async function PaymentMixReport() {
  
  const res = await query('SELECT * FROM vw_payment_mix ORDER BY monto_total DESC');
  const payments = res.rows;

  
  const topMethod = payments[0]?.metodo_pago || 'N/A';

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-2">Reporte 5: Mezcla de Pagos</h1>
      <p className="text-gray-600 mb-6">Distribución de ingresos según el método utilizado.</p>

      {}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-6 bg-purple-50 border-l-4 border-purple-500 rounded shadow-sm">
          <span className="text-xs font-bold text-purple-700 uppercase">Método Preferido</span>
          <p className="text-2xl font-bold text-purple-900">{topMethod}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold text-gray-700">Método de Pago</th>
              <th className="p-4 font-semibold text-gray-700 text-center">Transacciones</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Monto Total</th>
              <th className="p-4 font-semibold text-gray-700 text-right">Participación (%)</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-gray-50 transition">
                <td className="p-4 font-medium capitalize">{p.metodo_pago}</td>
                <td className="p-4 text-center">{p.total_usos}</td>
                <td className="p-4 text-right font-mono">${parseFloat(p.monto_total).toFixed(2)}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="font-bold text-blue-600">{p.porcentaje_del_total}%</span>
                    <div className="w-16 bg-gray-200 rounded-full h-1.5">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full" 
                        style={{ width: `${p.porcentaje_del_total}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}