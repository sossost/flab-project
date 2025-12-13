'use client';

import { Spacing } from '@/shared/components';
import { PostList } from '@/shared/components/post';

import { usePagination } from '../hooks/usePagination';
import { usePostList } from '../hooks/usePostList';

import { Pagination } from './Pagination';

export function PaginationListContainer() {
  const { currentPage, changePage } = usePagination();
  const { data } = usePostList(currentPage);

  return (
    <section>
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
