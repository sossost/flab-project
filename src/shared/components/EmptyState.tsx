'use client';

import { css } from '@emotion/react';

import { theme } from '@/shared/theme';
import { formatCssValue } from '@/shared/utils';

type EmptyStateProps = {
  message?: string;
  minHeight?: string | number;
  fontSize?: string | number;
};

export function EmptyState({
  message = '데이터가 없습니다.',
  minHeight = '50vh',
  fontSize = 16,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: ${theme.spacing.xl};
        color: ${theme.colors.textSecondary};
        min-height: ${formatCssValue(minHeight)};
        font-size: ${formatCssValue(fontSize)};
        font-weight: 500;
        line-height: 1.5;
      `}
    >
      {message}
    </div>
  );
}
