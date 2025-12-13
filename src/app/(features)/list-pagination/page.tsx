import { AsyncBoundary, Spacing, Title } from '@/shared/components';
import { PostListSkeleton } from '@/shared/components/post';

import { PaginationListErrorFallback, PaginationListContainer } from './components';

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
      <AsyncBoundary
        loadingFallback={<PostListSkeleton />}
        errorFallback={PaginationListErrorFallback}
        resetKeys={[searchParamsData]}
      >
        <PaginationListContainer />
      </AsyncBoundary>
    </>
  );
}
