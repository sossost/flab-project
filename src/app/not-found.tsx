'use client';

import Link from 'next/link';

import { css } from '@emotion/react';

import { Button } from '@/shared/components';
import { theme } from '@/shared/theme';
import { pxToRem } from '@/shared/utils';

export default function NotFound() {
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
      `}
    >
      <h2
        css={css`
          font-size: ${pxToRem(32)};
          font-weight: bold;
          margin-bottom: ${theme.spacing.sm};
        `}
      >
        404
      </h2>
      <p
        css={css`
          font-size: ${pxToRem(18)};
          color: ${theme.colors.textSecondary};
          margin-bottom: ${theme.spacing.md};
        `}
      >
        요청하신 페이지를 찾을 수 없습니다
      </p>
      <Button as={Link} href="/">
        홈으로 이동
      </Button>
    </div>
  );
}
