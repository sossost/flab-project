'use client';

import { css } from '@emotion/react';

import { EmptyState } from '@/shared/components';
import { PostList, PostListSkeleton } from '@/shared/components/post';
import { useSearchPosts } from '@/shared/hooks/useSearchPosts';

type SearchResultContainerProps = {
  keyword: string;
};

export function SearchResultContainer({ keyword }: SearchResultContainerProps) {
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
