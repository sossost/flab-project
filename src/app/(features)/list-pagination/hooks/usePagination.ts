'use client';

import { useTransition } from 'react';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export function usePagination(key = 'page') {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get(key)) || 1;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(key, String(newPage));

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: true });
    });
  };

  return { currentPage, changePage, isPending };
}
