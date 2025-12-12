import { NextRequest, NextResponse } from 'next/server';

import postsData from '@/data/posts.json';
import { createErrorResponse } from '@/shared/api/utils';
import type { Post, PaginatedResponse } from '@/shared/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const pageParam = searchParams.get('page');
    const limitParam = searchParams.get('limit');

    const page = parseInt(pageParam || '1', 10);
    const limit = parseInt(limitParam || '10', 10);

    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return createErrorResponse('page와 limit는 1 이상의 숫자여야 합니다.');
    }

    const posts: Post[] = Array.isArray(postsData) ? postsData : [];
    const total = posts.length;
    const totalPages = Math.ceil(total / limit);

    if (totalPages === 0 && page > 1) {
      return createErrorResponse('데이터가 없습니다.');
    }

    if (page > totalPages && totalPages > 0) {
      return createErrorResponse(`page는 ${totalPages} 이하여야 합니다.`);
    }

    const offset = (page - 1) * limit;
    const paginatedPosts = posts.slice(offset, offset + limit);

    const response: PaginatedResponse<Post> = {
      data: paginatedPosts,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };

    return NextResponse.json(response);
  } catch {
    return createErrorResponse('서버 오류가 발생했습니다.', 500);
  }
}
