'use client';

import Link from 'next/link';

import { css } from '@emotion/react';

import { getErrorMessage } from '@/shared/api';
import { theme } from '@/shared/theme';
import { pxToRem } from '@/shared/utils';

import { Button } from './Button';

type RedirectButtonConfig = {
  href: string;
  label: string;
};

type ErrorWithMetadata = Error & {
  redirectButton?: RedirectButtonConfig;
  variant?: 'page' | 'widget';
};

type ErrorFallbackProps = {
  error: Error;
  resetError: () => void;
  isGlobalError?: boolean;
};

export function ErrorFallback({ error, resetError, isGlobalError = false }: ErrorFallbackProps) {
  // 에러 객체에서 메타데이터 추출
  const errorWithMetadata = error as ErrorWithMetadata;
  const redirectButton = errorWithMetadata.redirectButton;
  const variant = errorWithMetadata.variant || 'page';
  const isPage = variant === 'page';
  const hasRedirectButton = !!redirectButton;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: ${theme.spacing.lg};
        gap: ${theme.spacing.md};
        text-align: center;
        height: 100%;
        border: 1px solid ${theme.colors.border};
        border-radius: ${theme.borderRadius.lg};

        ${isPage ? 'min-height: 100vh;' : 'flex:1;'}
      `}
    >
      <h2
        css={css`
          font-size: ${isPage ? pxToRem(24) : pxToRem(16)};
          font-weight: ${isPage ? 700 : 500};
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
        {getErrorMessage(error)}
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

        {hasRedirectButton && (
          /* Global Error는 a 태그를 사용하여 Hard Reload 유도 */
          <Button as={isGlobalError ? 'a' : Link} variant="secondary" href={redirectButton.href}>
            {redirectButton.label}
          </Button>
        )}
      </div>
    </div>
  );
}
