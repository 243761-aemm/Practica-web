'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Pagination({ page, hasNext }: { page: number, hasNext: boolean }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    replace(`?${params.toString()}`);
  };

  return (
    <div className="flex gap-4 mt-8 items-center justify-center">
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page <= 1}
        className="px-4 py-2 bg-gray-100 border rounded disabled:opacity-30 hover:bg-gray-200 text-black"
      >
        Anterior
      </button>
      <span className="font-bold text-black">Página {page}</span>
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={!hasNext}
        className="px-4 py-2 bg-gray-100 border rounded disabled:opacity-30 hover:bg-gray-200 text-black"
      >
        Siguiente
      </button>
    </div>
  );
}