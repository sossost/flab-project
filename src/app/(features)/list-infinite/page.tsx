import { Metadata } from 'next';

import { AsyncBoundary, Spacing, Title } from '@/shared/components';
import { PostListSkeleton } from '@/shared/components/post';

import { InfiniteListContainer } from './components';

export default function ListInfinitePage() {
  return (
    <>
      <Title as="h1" variant="h1">
        포스트 무한스크롤 목록
      </Title>
      <Spacing size={20} />
      <AsyncBoundary loadingFallback={<PostListSkeleton />}>
        <InfiniteListContainer />
      </AsyncBoundary>
    </>
  );
}

export const metadata: Metadata = {
  title: '포스트 무한스크롤 목록',
  description: '스크롤을 내리면서 포스트를 계속 확인할 수 있는 무한스크롤 목록 페이지입니다.',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/list-infinite`,
  },
  openGraph: {
    title: '포스트 무한스크롤 목록',
    description:
      '스크롤을 내리면서 다양한 게시글을 연속해서 확인할 수 있는 무한스크롤 목록 페이지입니다.',
    type: 'website',
    url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/list-infinite`,
  },
  robots: {
    index: true,
    follow: true,
  },
};
