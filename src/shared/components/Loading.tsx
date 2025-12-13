'use client';

import { css } from '@emotion/react';

import { theme } from '@/shared/theme';
import { pxToRem } from '@/shared/utils';

const SIZE_MAP = {
  sm: pxToRem(20),
  md: pxToRem(32),
  lg: pxToRem(48),
} as const;

type LoadingSize = keyof typeof SIZE_MAP;

type LoadingProps = {
  size?: LoadingSize;
};

export default function Loading({ size = 'md' }: LoadingProps) {
  return (
    <div
      css={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      `}
    >
      <div
        role="status"
        aria-label="로딩 중"
        css={css`
          width: ${SIZE_MAP[size]};
          height: ${SIZE_MAP[size]};
          border: 3px solid ${theme.colors.border};
          border-top-color: ${theme.colors.primary};
          border-radius: ${theme.borderRadius.full};
          animation: spin 0.8s linear infinite;
        `}
      />
    </div>
  );
}
