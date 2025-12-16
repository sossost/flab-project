import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { getSearchPosts } from '@/shared/api/search';
import { queryKeys } from '@/shared/constants';

export const useSearchPosts = (keyword: string) => {
  return useQuery({
    queryKey: queryKeys.posts.search(keyword),
    queryFn: () => getSearchPosts(keyword),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60,
  });
};
