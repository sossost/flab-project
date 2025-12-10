'use client';

import { useState } from 'react';

import {
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function QueryClientProvider({ children }: { children: React.ReactNode }) {
  // SSR 환경에서 데이터 격리를 위해 useState로 선언
  // 컴포넌트 외부에 선언하면 서버에서 여러 사용자의 요청이 같은 인스턴스를 공유하여
  // 다른 사용자의 데이터가 노출되는 보안 사고가 발생할 수 있음
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // SSR에서는 클라이언트에서 즉시 재요청하는 것을 막기 위해 설정
            staleTime: 60 * 1000, // 1분
          },
        },
      }),
  );

  return (
    <TanStackQueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </TanStackQueryClientProvider>
  );
}
