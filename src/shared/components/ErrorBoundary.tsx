'use client';

import { Component, type ReactNode } from 'react';

export type ErrorBoundaryFallbackProps = {
  error: Error;
  resetError: () => void;
};

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback: (props: ErrorBoundaryFallbackProps) => ReactNode;
  onError?: (error: Error, errorInfo: { componentStack: string }) => void;
  resetKeys?: unknown[];
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

/**
 * @param children - ErrorBoundary로 감쌀 자식 컴포넌트
 * @param fallback - 에러 발생 시 표시할 UI (필수)
 *   - ReactNode: 직접 전달된 컴포넌트
 *   - 함수: (error, resetError) => ReactNode 형태
 * @param onError - 에러 발생 시 호출되는 콜백 함수 (로깅, 에러 리포팅 등에 사용)
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error);
      console.error('Error info:', errorInfo);
    }

    this.props.onError?.(error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (!this.state.hasError) return;

    const { resetKeys } = this.props;

    if (!resetKeys) return;

    if (this.isResetKeysChanged(prevProps.resetKeys, resetKeys)) {
      this.resetError();
    }
  }

  private isResetKeysChanged(prev: unknown[] | undefined, current: unknown[]): boolean {
    if (prev === current) return false;
    if (!prev) return true;
    if (prev.length !== current.length) return true;

    for (let i = 0; i < current.length; i++) {
      if (prev[i] !== current[i]) {
        return true;
      }
    }

    return false;
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (typeof this.props.fallback === 'function') {
        return this.props.fallback({
          error: this.state.error,
          resetError: this.resetError,
        });
      }

      return this.props.fallback;
    }

    return this.props.children;
  }
}
