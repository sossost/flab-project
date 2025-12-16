import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { queryKeys } from '@/shared/constants';

import { getSearchPosts } from '../api/searchPosts';

export const useSearchPosts = (keyword: string) => {
  return useQuery({
    queryKey: queryKeys.posts.search(keyword),
    queryFn: () => getSearchPosts(keyword),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
};
