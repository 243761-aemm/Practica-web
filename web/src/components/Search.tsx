'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) params.set('query', term);
    else params.delete('query');
    params.set('page', '1'); // Reiniciar a pag 1 al buscar
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <input
      className="border p-2 rounded w-full md:w-64"
      placeholder="Buscar producto..."
      onChange={(e) => handleSearch(e.target.value)}
      defaultValue={searchParams.get('query')?.toString()}
    />
  );
}