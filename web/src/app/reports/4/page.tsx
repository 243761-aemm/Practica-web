import Pagination from '@/components/Pagination';

export default async function CustomerValueReport(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const page = parseInt(searchParams.page || '1');

 
  const url = new URL('http://localhost:3000/api/reports/4');
  url.searchParams.append('page', page.toString());

  const response = await fetch(url.toString(), { cache: 'no-store' });
  
  if (!response.ok) {
    return <p className="p-8 text-red-500">Error al cargar el ranking de clientes.</p>;
  }

  const result = await response.json();
  const { data, hasNext } = result;

  return (
    <main className="p-8 bg-slate-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">
          Ranking de Valor del Cliente (CLV)
        </h1>
        <p className="text-slate-500">Identificación de clientes VIP basados en consumo total.</p>
      </div>

      <div className="grid gap-4">
        {data.map((customer: any, index: number) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-full font-black text-xl">
                {index + 1 + (page - 1) * 5}
              </div>
              <div>
                <p className="font-bold text-slate-800 text-lg">
                  {customer.cliente} {}
                </p>
                <p className="text-xs text-slate-400 font-medium">
                  {customer.email}
                </p>
                <div className="mt-1 inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded">
                  {customer.total_ordenes} PEDIDOS REALIZADOS
                </div>
              </div>
            </div>

            <div className="text-right">
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Inversión Total</p>
              <p className="text-2xl font-mono font-black text-emerald-600">
                ${customer.total_gastado ? parseFloat(customer.total_gastado).toFixed(2) : "0.00"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <div className="mt-4 p-8 text-center border-2 border-dashed border-slate-200 rounded-xl">
          <p className="text-slate-400 font-medium">No hay clientes para mostrar.</p>
        </div>
      )}

      <Pagination page={page} hasNext={hasNext} />
    </main>
  );
}