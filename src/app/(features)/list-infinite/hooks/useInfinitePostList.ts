import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/constants';
import type { PaginatedResponse, Post } from '@/shared/types';

import { getInfinitePosts } from '../api/posts';

const LIMIT = 10;

export function useInfinitePostList() {
  return useSuspenseInfiniteQuery<PaginatedResponse<Post>, Error>({
    queryKey: queryKeys.posts.infinite(),
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getInfinitePosts(pageParam as number, LIMIT),
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },
  });
}
