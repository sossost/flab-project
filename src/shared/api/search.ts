import { apiClient } from '@/shared/api/client';
import type { Post } from '@/shared/types';

export async function getSearchPosts(searchKeyword: string): Promise<Post[]> {
  return apiClient.get<Post[]>(`/posts/search?q=${encodeURIComponent(searchKeyword)}`);
}
