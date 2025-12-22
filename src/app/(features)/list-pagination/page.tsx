import { Metadata } from 'next';

import { AsyncBoundary, Spacing, Title } from '@/shared/components';
import { PostListSkeleton } from '@/shared/components/post';

import { PaginationListContainer } from './components';

type ListPaginationPageProps = {
  searchParams: Promise<{
    page: string;
  }>;
};

export default async function ListPaginationPage({ searchParams }: ListPaginationPageProps) {
  const searchParamsData = await searchParams;

  return (
    <>
      <Title as="h1" variant="h1">
        포스트 목록
      </Title>
      <Spacing size={20} />
      <AsyncBoundary loadingFallback={<PostListSkeleton />} resetKeys={[searchParamsData.page]}>
        <PaginationListContainer />
      </AsyncBoundary>
    </>
  );
}

export async function generateMetadata({
  searchParams,
}: ListPaginationPageProps): Promise<Metadata> {
  const searchParamsData = await searchParams;
  const page = Number(searchParamsData.page) || 1;
  const title = `포스트 목록 - ${page}페이지`;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const currentPath = `/list-pagination?page=${page}`;

  return {
    title: title,
    description: `현재 ${page}페이지 목록입니다.`,

    alternates: {
      canonical: `${baseUrl}${currentPath}`,
    },

    openGraph: {
      title: title,
      description: '다양한 게시글을 만나보세요.',
      type: 'website',
      url: `${baseUrl}${currentPath}`,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}
