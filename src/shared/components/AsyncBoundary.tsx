'use client';

import { Suspense, type ReactNode } from 'react';

import { ErrorBoundary, ErrorBoundaryFallbackProps } from './ErrorBoundary';
import { ErrorFallback } from './ErrorFallback';
import Loading from './Loading';

type AsyncBoundaryProps = {
  children: ReactNode;
  loadingFallback?: ReactNode;
  errorFallback?: (props: ErrorBoundaryFallbackProps) => ReactNode;
  onError?: (error: Error, errorInfo: { componentStack: string }) => void;
};

/**
 * ErrorBoundary와 Suspense를 결합한 컴포넌트
 *
 * @param loadingFallback - Suspense 로딩 중 표시할 UI
 * @param errorFallback - 에러 발생 시 표시할 UI (함수로 전달 시 error, resetError 제공)
 * @param onError - 에러 발생 시 호출되는 콜백 함수
 */
export function AsyncBoundary({
  children,
  loadingFallback = <Loading />,
  errorFallback = ({ error, resetError }: ErrorBoundaryFallbackProps) => (
    <ErrorFallback error={error} resetError={resetError} />
  ),
  onError,
}: AsyncBoundaryProps) {
  return (
    <ErrorBoundary fallback={errorFallback} onError={onError}>
      <Suspense fallback={loadingFallback}>{children}</Suspense>
    </ErrorBoundary>
  );
}
