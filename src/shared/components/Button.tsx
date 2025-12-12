'use client';

import { ButtonHTMLAttributes, type Ref } from 'react';

import { css, keyframes, type SerializedStyles } from '@emotion/react';

import { theme } from '@/shared/theme';
import { pxToRem } from '@/shared/utils';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'ref'> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  ref?: Ref<HTMLButtonElement>;
};

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  children,
  className,
  ref,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;
  const variantStyle = VARIANT_STYLES[variant];
  const spinnerColors = getLoadingSpinnerColor(variant);

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      aria-label={loading ? '로딩 중' : undefined}
      css={css`
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: ${theme.spacing.xs};
        padding: ${SIZE_MAP[size].padding};
        height: ${SIZE_MAP[size].height};
        font-size: ${SIZE_MAP[size].fontSize};
        font-weight: 500;
        border-radius: ${theme.borderRadius.md};
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        border: none;
        outline: none;
        background: none;

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        ${variantStyle.base}

        &:not(:disabled):hover {
          ${variantStyle.hover}
        }

        &:focus-visible {
          outline: 2px solid ${theme.colors.primary};
          outline-offset: 2px;
        }
      `}
      className={className}
      {...props}
    >
      {loading && (
        <span
          css={css`
            position: absolute;
            inset: 0;
            margin: auto;
            display: inline-block;
            width: ${SIZE_MAP[size].fontSize};
            height: ${SIZE_MAP[size].fontSize};
            border: 2px solid ${spinnerColors.border};
            border-top-color: ${spinnerColors.borderTop};
            border-radius: 50%;
            animation: ${spin} 0.8s linear infinite;
          `}
          aria-hidden="true"
        />
      )}
      <span
        css={css`
          opacity: ${loading ? 0 : 1};
          display: inline-flex;
          align-items: center;
          gap: ${theme.spacing.xs};
          visibility: ${loading ? 'hidden' : 'visible'};
        `}
      >
        {children}
      </span>
    </button>
  );
}

const SIZE_MAP: Record<ButtonSize, { padding: string; fontSize: string; height: string }> = {
  sm: {
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    fontSize: pxToRem(14),
    height: pxToRem(32),
  },
  md: {
    padding: `${theme.spacing.sm} ${theme.spacing.md}`,
    fontSize: pxToRem(16),
    height: pxToRem(40),
  },
  lg: {
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    fontSize: pxToRem(18),
    height: pxToRem(48),
  },
};

const VARIANT_STYLES: Record<ButtonVariant, { base: SerializedStyles; hover: SerializedStyles }> = {
  primary: {
    base: css`
      background-color: ${theme.colors.primary};
      color: ${theme.colors.background};
    `,
    hover: css`
      background-color: color-mix(in srgb, ${theme.colors.primary} 80%, transparent);
    `,
  },
  secondary: {
    base: css`
      background-color: ${theme.colors.secondary};
      color: ${theme.colors.text};
      border: 1px solid transparent;
    `,
    hover: css`
      background-color: color-mix(in srgb, ${theme.colors.text} 10%, transparent);
    `,
  },
  outline: {
    base: css`
      background-color: transparent;
      color: ${theme.colors.text};
      border: 1px solid ${theme.colors.border};
    `,
    hover: css`
      background-color: ${theme.colors.background};
      border-color: ${theme.colors.text};
    `,
  },
  ghost: {
    base: css`
      background-color: transparent;
      color: ${theme.colors.text};
    `,
    hover: css`
      background-color: color-mix(in srgb, ${theme.colors.text} 10%, transparent);
    `,
  },
  destructive: {
    base: css`
      background-color: ${theme.colors.error};
      color: ${theme.colors.background};
    `,
    hover: css`
      background-color: color-mix(in srgb, ${theme.colors.error} 80%, transparent);
    `,
  },
};

const getLoadingSpinnerColor = (variant: ButtonVariant) => {
  const isLightVariant = variant === 'primary' || variant === 'destructive';
  return {
    border: isLightVariant
      ? `color-mix(in srgb, ${theme.colors.background} 30%, transparent)`
      : `color-mix(in srgb, ${theme.colors.text} 10%, transparent)`,
    borderTop: isLightVariant ? theme.colors.background : theme.colors.text,
  };
};
