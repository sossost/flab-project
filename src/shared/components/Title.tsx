'use client';

import { HTMLAttributes } from 'react';

import { css } from '@emotion/react';

import { theme } from '@/shared/theme';
import { pxToRem } from '@/shared/utils';

type HeadingLevel = keyof typeof TITLE_VARIANTS;

type TitleProps = {
  children: React.ReactNode;
  as?: HeadingLevel;
  variant?: HeadingLevel;
  color?: string;
  align?: 'left' | 'center' | 'right';
} & HTMLAttributes<HTMLHeadingElement>;

export function Title({
  children,
  as = 'h1',
  variant,
  color = theme.colors.text,
  align = 'left',
  ...props
}: TitleProps) {
  const Component = as;
  const styleConfig = TITLE_VARIANTS[variant || as];

  return (
    <Component
      css={css`
        margin: 0;
        color: ${color};
        text-align: ${align};
        font-size: ${styleConfig.fontSize};
        font-weight: ${styleConfig.fontWeight};
        line-height: ${styleConfig.lineHeight};
      `}
      {...props}
    >
      {children}
    </Component>
  );
}

const TITLE_VARIANTS = {
  h1: {
    fontSize: pxToRem(32),
    lineHeight: 1.4,
    fontWeight: 700,
  },
  h2: {
    fontSize: pxToRem(28),
    lineHeight: 1.4,
    fontWeight: 700,
  },
  h3: {
    fontSize: pxToRem(24),
    lineHeight: 1.5,
    fontWeight: 600,
  },
  h4: {
    fontSize: pxToRem(20),
    lineHeight: 1.5,
    fontWeight: 600,
  },
  h5: {
    fontSize: pxToRem(18),
    lineHeight: 1.5,
    fontWeight: 600,
  },
  h6: {
    fontSize: pxToRem(16),
    lineHeight: 1.5,
    fontWeight: 500,
  },
} as const;
