'use client';

import { ComponentProps } from 'react';

import { css } from '@emotion/react';

type SearchInputProps = ComponentProps<'input'> & {
  error?: string;
};

export const SearchInput = ({ error, ...props }: SearchInputProps) => {
  return (
    <input
      css={css`
        flex: 1;
        padding: 10px 12px;
        border-radius: 6px;
        border: 1px solid ${error ? '#ef4444' : '#ddd'};
        font-size: 14px;
        outline: none;
        transition: border-color 0.2s;

        &:focus {
          border-color: ${error ? '#ef4444' : '#3b82f6'};
          box-shadow: 0 0 0 1px ${error ? '#ef4444' : '#3b82f6'};
        }
        &::placeholder {
          color: #ccc;
        }
        &:disabled {
          background: #f9fafb;
          color: #9ca3af;
        }
      `}
      {...props}
    />
  );
};
