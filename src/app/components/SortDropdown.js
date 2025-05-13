'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function SortDropdown({ currentSort }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChange = (e) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', e.target.value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      value={currentSort || 'popularity'}
      onChange={handleChange}
      className="flex-grow sm:flex-grow-0 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
    >
      <option value="popularity">Popularity</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
      <option value="newest">Newest First</option>
      <option value="rating">Highest Rated</option>
    </select>
  );
}