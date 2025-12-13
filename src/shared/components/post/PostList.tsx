'use client';

import type { Post } from '@/shared/types';

import { EmptyState } from '../EmptyState';

import { PostItem } from './PostItem';
import { PostListLayout } from './PostListLayout';

type PostListProps = {
  posts: Post[];
};

export function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return <EmptyState message="게시글이 없습니다." />;
  }

  return (
    <PostListLayout>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </PostListLayout>
  );
}
