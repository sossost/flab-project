'use client';

import Link from 'next/link';

import { css } from '@emotion/react';

import { theme } from '@/shared/theme';
import { pxToRem } from '@/shared/utils';

import { Button } from './Button';

type RedirectButtonConfig = {
  href: string;
  label: string;
};

type ErrorFallbackProps = {
  error: Error;
  resetError: () => void;
  isGlobalError?: boolean;

  redirectButton?: RedirectButtonConfig;
};

export function ErrorFallback({
  error,
  resetError,
  isGlobalError = false,
  redirectButton = { href: '/', label: '홈으로 이동' },
}: ErrorFallbackProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: ${theme.spacing.lg};
        gap: ${theme.spacing.md};
        text-align: center;
      `}
    >
      <h2
        css={css`
          font-size: ${pxToRem(24)};
          font-weight: bold;
          margin-bottom: ${theme.spacing.sm};
          color: ${theme.colors.text};
        `}
      >
        오류가 발생했습니다
      </h2>
      <p
        css={css`
          color: ${theme.colors.textSecondary};
          margin-bottom: ${theme.spacing.md};
          white-space: pre-wrap;
        `}
      >
        {error.message || '알 수 없는 오류가 발생했습니다.'}
      </p>

      <div
        css={css`
          display: flex;
          gap: ${theme.spacing.md};
        `}
      >
        <Button variant="primary" onClick={resetError}>
          다시 시도
        </Button>

        {/* Global Error는 a 태그를 사용하여 Hard Reload 유도 */}
        <Button as={isGlobalError ? 'a' : Link} variant="secondary" href={redirectButton.href}>
          {redirectButton.label}
        </Button>
      </div>
    </div>
  );
}
