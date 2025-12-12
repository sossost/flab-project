'use client';

import { useState } from 'react';

import {
  QueryCache,
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function makeQueryClient() {
  return new QueryClient({
    // ✅ v5 변경점: 캐시 레벨에서 전역 에러 핸들링 설정
    queryCache: new QueryCache({
      onError: (error: Error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('🔴 [React Query Error]:', error);
        }
      },
    }),
    defaultOptions: {
      queries: {
        // SSR에서는 클라이언트에서 즉시 재요청(refetch)하는 것을 막기 위해 설정
        staleTime: 60 * 1000,
        throwOnError: true, // 에러를 컴포넌트로 전파
        retry: false,
      },
    },
  });
}

export default function QueryClientProvider({ children }: { children: React.ReactNode }) {
  // 2. Next.js SSR 환경을 위한 상태 관리
  // - useState의 Lazy Initializer(() => makeQueryClient())를 사용
  // - 이렇게 해야 요청(Request)마다 별도의 클라이언트가 생성되어 데이터가 섞이지 않음
  const [queryClient] = useState(() => makeQueryClient());

  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </TanStackQueryClientProvider>
  );
}
