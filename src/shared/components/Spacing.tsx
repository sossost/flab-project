'use client';

import { memo } from 'react';

import { css } from '@emotion/react';

import { pxToRem } from '@/shared/utils';

type SpacingProps = {
  direction?: 'vertical' | 'horizontal';
  size: number;
};

export const Spacing = memo(function Spacing({ direction = 'vertical', size }: SpacingProps) {
  return (
    <div
      css={css`
        flex: none;
        width: ${direction === 'horizontal' ? pxToRem(size) : 'auto'};
        height: ${direction === 'vertical' ? pxToRem(size) : 'auto'};
        display: ${direction === 'horizontal' ? 'inline-block' : 'block'};
      `}
    />
  );
});
