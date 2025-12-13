'use client';

import { css } from '@emotion/react';

import { Spacing } from '@/shared/components';
import { PostList } from '@/shared/components/post';

import { usePagination } from '../hooks/usePagination';
import { usePostList } from '../hooks/usePostList';

import { Pagination } from './Pagination';

export function PaginationListContainer() {
  const { currentPage, changePage, isPending } = usePagination();
  const { data } = usePostList(currentPage);

  return (
    <section
      css={css`
        opacity: ${isPending ? 0.5 : 1};
        transition: opacity 0.3s ease-in-out;
        will-change: opacity;
        pointer-events: ${isPending ? 'none' : 'auto'};
      `}
    >
      <PostList posts={data.data} />
      <Spacing size={20} />
      <Pagination
        currentPage={currentPage}
        totalPages={data.meta.totalPages}
        onPageChange={changePage}
      />
    </section>
  );
}
