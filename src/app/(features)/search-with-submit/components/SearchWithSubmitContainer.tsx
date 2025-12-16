'use client';

import { css } from '@emotion/react';

import { EmptyState } from '@/shared/components';
import { PostList } from '@/shared/components/post/PostList';
import { PostListSkeleton } from '@/shared/components/post/PostListSkeleton';

import { useSearchPosts } from '../hooks/useSearchPosts';

type SearchWithSubmitContainerProps = {
  keyword: string;
};

export function SearchWithSubmitContainer({ keyword }: SearchWithSubmitContainerProps) {
  const { data: posts = [], isFetching, isLoading } = useSearchPosts(keyword);

  if (isLoading) {
    return <PostListSkeleton />;
  }

  return (
    <div
      css={css`
        opacity: ${isFetching ? 0.5 : 1};
        transition: opacity 0.2s;
      `}
    >
      {posts.length === 0 && keyword ? (
        <EmptyState message="검색 결과가 없습니다." />
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
}
