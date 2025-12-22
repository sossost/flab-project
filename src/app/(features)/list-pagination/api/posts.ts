import {
  apiClient,
  getErrorMessage,
  isApiError,
  PageNotFoundError,
  PageRangeError,
} from '@/shared/api';
import type { PaginatedResponse, Post } from '@/shared/types';

export async function getPosts(page: number, limit: number = 10): Promise<PaginatedResponse<Post>> {
  try {
    return await apiClient.get<PaginatedResponse<Post>>(`/posts?page=${page}&limit=${limit}`);
  } catch (error) {
    if (isApiError(error)) {
      const errorMessage = getErrorMessage(error);

      if (error.status === 404) {
        throw new PageNotFoundError(
          errorMessage || '페이지를 찾을 수 없습니다.',
          {
            href: '?page=1',
            label: '첫 페이지로 이동',
          },
          'widget',
        );
      }

      if (error.status === 400) {
        throw new PageRangeError(
          errorMessage || '유효하지 않은 페이지 범위입니다.',
          {
            href: '?page=1',
            label: '첫 페이지로 이동',
          },
          'widget',
        );
      }
    }

    throw error;
  }
}
