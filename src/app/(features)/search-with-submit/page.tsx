import { ErrorBoundary, ErrorFallback } from '@/shared/components';
import { Spacing } from '@/shared/components/Spacing';
import { Title } from '@/shared/components/Title';

import { SearchForm, SearchWithSubmitContainer } from './components';

type SearchWithSubmitPageProps = {
  searchParams: Promise<{
    q: string;
  }>;
};

export default async function SearchWithSubmitPage({ searchParams }: SearchWithSubmitPageProps) {
  const searchParamsData = await searchParams;
  const keyword = searchParamsData.q || '';

  return (
    <>
      <Title as="h1" variant="h1">
        포스트 검색 (Submit)
      </Title>
      <Spacing size={20} />
      <SearchForm initialKeyword={keyword} />
      <Spacing size={20} />
      <ErrorBoundary fallback={ErrorFallback}>
        <SearchWithSubmitContainer keyword={keyword} />
      </ErrorBoundary>
    </>
  );
}
