'use client';

import { css } from '@emotion/react';

import { theme } from '@/shared/theme';
import type { Post } from '@/shared/types';
import { pxToRem } from '@/shared/utils';

type PostItemProps = {
  post: Post;
};

export function PostItem({ post }: PostItemProps) {
  return (
    <li
      css={css`
        padding: ${theme.spacing.md};
        border: 1px solid ${theme.colors.border};
        border-radius: ${theme.borderRadius.md};
        background-color: ${theme.colors.background};
      `}
    >
      <h3
        css={css`
          font-size: ${pxToRem(18)};
          font-weight: 600;
          margin-bottom: ${theme.spacing.sm};
          color: ${theme.colors.text};
        `}
      >
        {post.title}
      </h3>
      <p
        css={css`
          font-size: ${pxToRem(14)};
          color: ${theme.colors.textSecondary};
          margin-bottom: ${theme.spacing.sm};
          line-height: 1.5;
        `}
      >
        {post.content}
      </p>
      <time
        css={css`
          font-size: ${pxToRem(12)};
          color: ${theme.colors.textSecondary};
        `}
        dateTime={post.createdAt}
      >
        {new Date(post.createdAt).toLocaleDateString('ko-KR')}
      </time>
    </li>
  );
}
