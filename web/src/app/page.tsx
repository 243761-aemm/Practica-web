import Link from 'next/link';

export default function Dashboard() {
  const reports = [
    { id: 1, name: 'Ventas Diarias', slug: 'sales-daily' },
    { id: 2, name: 'Productos Estrella', slug: 'top-products' },
    { id: 3, name: 'Riesgo de Inventario', slug: 'inventory-risk' },
    { id: 4, name: 'Valor del Cliente', slug: 'customer-value' },
    { id: 5, name: 'Mezcla de Pagos', slug: 'payment-mix' },
  ];

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Cafetería Campus - Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reports.map((report) => (
          <Link key={report.id} href={`/reports/${report.id}`} 
                className="p-6 border rounded-lg hover:bg-gray-50 shadow-sm transition">
            <h2 className="text-xl font-semibold">Reporte {report.id}</h2>
            <p className="text-gray-600">{report.name}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}