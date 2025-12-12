'use client';

import { useEffect } from 'react';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';

import { ErrorFallback } from '@/shared/components';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { reset: resetQueryError } = useQueryErrorResetBoundary();

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('💥 [Global Rendering Error]:', error);
    }
  }, [error]);

  return (
    <ErrorFallback
      error={error}
      resetError={() => {
        resetQueryError();
        reset();
      }}
    />
  );
}
