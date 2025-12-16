import { ErrorBoundary, ErrorFallback } from '@/shared/components';
import { SearchResultContainer } from '@/shared/components/search';
import { Spacing } from '@/shared/components/Spacing';
import { Title } from '@/shared/components/Title';

import { DebouncedSearchInput } from './components/DebouncedSearchInput';

type SearchWithoutSubmitPageProps = {
  searchParams: Promise<{
    q: string;
  }>;
};

export default async function SearchWithoutSubmitPage({
  searchParams,
}: SearchWithoutSubmitPageProps) {
  const searchParamsData = await searchParams;
  const keyword = searchParamsData.q || '';

  return (
    <>
      <Title as="h1" variant="h1">
        포스트 검색 (Debounce)
      </Title>
      <Spacing size={20} />
      <DebouncedSearchInput initialKeyword={keyword} />
      <Spacing size={20} />
      <ErrorBoundary fallback={ErrorFallback}>
        <SearchResultContainer keyword={keyword} />
      </ErrorBoundary>
    </>
  );
}
