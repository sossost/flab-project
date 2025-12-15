import { apiClient } from '@/shared/api/client';
import type { PaginatedResponse, Post } from '@/shared/types';

export async function getInfinitePosts(
  page: number,
  limit: number = 10,
): Promise<PaginatedResponse<Post>> {
  return apiClient.get<PaginatedResponse<Post>>(`/posts?page=${page}&limit=${limit}`);
}
