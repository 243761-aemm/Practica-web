'use client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const term = formData.get('query')?.toString();
    
    const params = new URLSearchParams(searchParams);
    if (term) params.set('query', term);
    else params.delete('query');
    
    params.set('page', '1');
    replace(`?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        name="query"
        className="border p-2 rounded text-black bg-gray-50 border-gray-300 focus:border-blue-500 outline-none"
        placeholder="Buscar producto..."
        defaultValue={searchParams.get('query')?.toString()}
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Buscar
      </button>
    </form>
  );
}