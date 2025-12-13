'use client';

import { isApiError } from '@/shared/api';
import { type ErrorBoundaryFallbackProps, ErrorFallback } from '@/shared/components';

export function PaginationListErrorFallback({ error, resetError }: ErrorBoundaryFallbackProps) {
  let errorMessage = error?.message;
  let is404 = false;
  let isRangeError = false;

  if (isApiError(error)) {
    if (error.status === 404) is404 = true;
    if (error.status === 400) isRangeError = true;

    if (error.data && typeof error.data === 'object' && 'message' in error.data) {
      errorMessage = (error.data as { message: string }).message;
    }
  }

  return (
    <ErrorFallback
      error={error}
      resetError={resetError}
      errorMessage={errorMessage}
      redirectButton={
        is404 || isRangeError ? { href: '?page=1', label: '첫 페이지로 이동' } : undefined
      }
      variant="widget"
    />
  );
}
