'use client';

import { useEffect } from 'react';

import { useRouter, usePathname } from 'next/navigation';

import { css } from '@emotion/react';
import { useForm } from 'react-hook-form';

import { SearchInput } from '@/shared/components/search';
import { useDebounce } from '@/shared/hooks/useDebounce';

type DebouncedSearchInputProps = {
  initialKeyword: string;
};

type FormValues = {
  keyword: string;
};

export function DebouncedSearchInput({ initialKeyword }: DebouncedSearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { register, watch } = useForm<FormValues>({
    defaultValues: { keyword: initialKeyword },
  });

  const keyword = watch('keyword');
  const debouncedKeyword = useDebounce(keyword, 300);

  useEffect(() => {
    const trimmedKeyword = debouncedKeyword.trim();
    const url = trimmedKeyword ? `${pathname}?q=${encodeURIComponent(trimmedKeyword)}` : pathname;

    router.replace(url);
  }, [debouncedKeyword, pathname, router]);

  return (
    <SearchInput
      {...register('keyword')}
      placeholder="검색어를 입력하세요"
      css={css`
        width: 100%;
        min-width: 0;
      `}
    />
  );
}
