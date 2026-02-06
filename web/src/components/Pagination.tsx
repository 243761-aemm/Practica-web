import Link from 'next/link';

export default function Pagination({ page, hasNext }: { page: number, hasNext: boolean }) {
  return (
    <div className="flex gap-4 mt-6 items-center">
      <Link 
        href={`?page=${Math.max(1, page - 1)}`}
        className={`px-4 py-2 border rounded ${page <= 1 ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'}`}
      >
        Anterior
      </Link>
      <span className="font-medium">Página {page}</span>
      <Link 
        href={`?page=${page + 1}`}
        className={`px-4 py-2 border rounded ${!hasNext ? 'pointer-events-none opacity-50' : 'hover:bg-gray-100'}`}
      >
        Siguiente
      </Link>
    </div>
  );
}