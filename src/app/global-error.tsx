'use client';

import { useEffect } from 'react';

import ErrorFallback from '@/shared/components/ErrorFallback';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('💥💥 [Critical Root Layout Error]:', error);
    }
  }, [error]);

  return (
    <html>
      <body>
        <ErrorFallback error={error} resetError={reset} isGlobalError />
      </body>
    </html>
  );
}
