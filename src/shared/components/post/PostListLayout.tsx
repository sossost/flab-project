'use client';

import { PropsWithChildren } from 'react';

import { css } from '@emotion/react';

import { theme } from '@/shared/theme';

export function PostListLayout({ children }: PropsWithChildren) {
  return (
    <ul
      css={css`
        list-style: none;
        gap: ${theme.spacing.md};
        margin: 0;
        display: flex;
        flex-direction: column;
      `}
    >
      {children}
    </ul>
  );
}
