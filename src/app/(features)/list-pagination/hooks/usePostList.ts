'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/constants';
import type { PaginatedResponse, Post } from '@/shared/types';

import { getPosts } from '../api/posts';

const LIMIT = 10;

export function usePostList(page: number) {
  return useSuspenseQuery<PaginatedResponse<Post>>({
    queryKey: queryKeys.posts.list(page),
    queryFn: () => getPosts(page, LIMIT),
  });
}
