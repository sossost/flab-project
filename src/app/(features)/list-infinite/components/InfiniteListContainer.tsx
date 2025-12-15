'use client';

import { css } from '@emotion/react';

import { Button, Spacing } from '@/shared/components';
import Loading from '@/shared/components/Loading';
import { PostList } from '@/shared/components/post';

import { useInfinitePostList } from '../hooks/useInfinitePostList';

import { InfiniteScrollWrapper } from './InfiniteScrollWrapper';

export function InfiniteListContainer() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } = useInfinitePostList();

  const posts = data.pages.flatMap((page) => page.data);

  return (
    <section
      css={css`
        display: flex;
        flex-direction: column;
      `}
    >
      <InfiniteScrollWrapper
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        isError={isError}
        onLoadMore={fetchNextPage}
        loadingFallback={<Loading />}
        endFallback={<span>더 이상 불러올 게시글이 없습니다.</span>}
        errorFallback={(onLoadMore) => (
          <Button variant="primary" size="sm" onClick={onLoadMore}>
            더 불러오기에 실패했습니다. 다시 시도하기
          </Button>
        )}
      >
        <PostList posts={posts} />
        <Spacing size={20} />
      </InfiniteScrollWrapper>
    </section>
  );
}
