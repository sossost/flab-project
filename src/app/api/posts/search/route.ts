import { NextRequest, NextResponse } from 'next/server';

import postsData from '@/data/posts.json';
import { createErrorResponse } from '@/shared/api/utils';
import type { Post } from '@/shared/types';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const qParam = searchParams.get('q');

    const q = qParam || '';

    const posts: Post[] = Array.isArray(postsData) ? postsData : [];
    const filteredPosts = q ? posts.filter((post) => post.title.includes(q)) : posts;

    return NextResponse.json(filteredPosts);
  } catch {
    return createErrorResponse('서버 오류가 발생했습니다.', 500);
  }
}
