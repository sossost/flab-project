'use client';

import { Skeleton } from '@/shared/components';

import { PostListLayout } from './PostListLayout';

export function PostListSkeleton() {
  return (
    <PostListLayout>
      {Array.from({ length: 10 }).map((_, index) => (
        <Skeleton key={index} width="100%" height="120px" />
      ))}
    </PostListLayout>
  );
}
