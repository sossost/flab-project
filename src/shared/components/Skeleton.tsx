'use client';

import { css, keyframes } from '@emotion/react';

import { theme } from '@/shared/theme';

import { formatCssValue } from '../utils';

type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
};

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

export function Skeleton({
  width = '100%',
  height = 16,
  borderRadius = theme.borderRadius.sm,
  className,
}: SkeletonProps) {
  return (
    <div
      className={className}
      css={css`
        width: ${formatCssValue(width)};
        height: ${formatCssValue(height)};
        border-radius: ${formatCssValue(borderRadius)};
        background-color: ${theme.colors.border};
        animation: ${pulse} 1.5s ease-in-out infinite;
      `}
    />
  );
}
