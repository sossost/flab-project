'use client';

import { useEffect, useRef } from 'react';

import { css } from '@emotion/react';

import { theme } from '@/shared/theme';

type InfiniteScrollWrapperProps = {
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  isError: boolean;
  onLoadMore: () => void;
  children: React.ReactNode;
  endFallback: React.ReactNode;
  errorFallback: (onRetry: () => void) => React.ReactNode;
  loadingFallback: React.ReactNode;
};

export function InfiniteScrollWrapper({
  hasNextPage,
  isFetchingNextPage,
  isError,
  onLoadMore,
  children,
  endFallback,
  errorFallback,
  loadingFallback,
}: InfiniteScrollWrapperProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isError || !hasNextPage || isFetchingNextPage) return;

    const target = sentinelRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          onLoadMore();
        }
      },
      {
        root: null,
        rootMargin: '0px 0px 200px 0px',
        threshold: 0,
      },
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [isError, hasNextPage, isFetchingNextPage, onLoadMore]);

  return (
    <>
      {children}
      {isError ? (
        errorFallback(onLoadMore)
      ) : !hasNextPage ? (
        endFallback
      ) : (
        <div
          ref={sentinelRef}
          role="status"
          aria-live="polite"
          css={css`
            min-height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: ${theme.colors.textSecondary};
            font-size: 0.875rem;
          `}
        >
          {isFetchingNextPage && loadingFallback}
        </div>
      )}
    </>
  );
}
