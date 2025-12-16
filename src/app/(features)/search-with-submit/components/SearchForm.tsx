'use client';

import { useRouter } from 'next/navigation';

import { css } from '@emotion/react';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components';
import { SearchInput } from '@/shared/components/search';

type SearchFormProps = {
  initialKeyword: string;
};

type FormValues = {
  keyword: string;
};

export function SearchForm({ initialKeyword }: SearchFormProps) {
  const router = useRouter();

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: { keyword: initialKeyword },
  });

  const onSubmit = (data: FormValues) => {
    const keyword = data.keyword.trim();
    if (!keyword) return;

    router.push(`?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      css={css`
        display: flex;
        gap: 10px;
      `}
    >
      <SearchInput {...register('keyword')} placeholder="검색어를 입력하세요" />
      <Button type="submit">검색</Button>
    </form>
  );
}
