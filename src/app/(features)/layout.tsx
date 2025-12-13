'use client';

import Link from 'next/link';

import { css } from '@emotion/react';

import { theme } from '@/shared/theme';
import { pxToRem } from '@/shared/utils';

export default function FeatureLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      css={css`
        position: relative;
        display: flex;
        flex-direction: column;
        width: 100%;
        min-height: 100vh;
        gap: ${theme.spacing.md};
        padding-bottom: ${theme.spacing.lg};
        padding-top: ${pxToRem(80)};
      `}
    >
      <header
        css={css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          padding: ${theme.spacing.lg};
          padding-top: ${theme.spacing.xl};
          height: ${pxToRem(48)};
          background-color: ${theme.colors.background};
          border-bottom: 1px solid ${theme.colors.border};
        `}
      >
        <Link
          href="/"
          css={css`
            font-size: ${pxToRem(16)};
            font-weight: 500;
            margin-bottom: ${theme.spacing.sm};
            color: ${theme.colors.textSecondary};

            &:hover {
              color: ${theme.colors.text};
            }
          `}
        >
          &larr; 홈으로 이동
        </Link>
      </header>
      <main
        css={css`
          max-width: ${pxToRem(1200)};
          width: 100%;
          margin: 0 auto;
        `}
      >
        {children}
      </main>
    </div>
  );
}
