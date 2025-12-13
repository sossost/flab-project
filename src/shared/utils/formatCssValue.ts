import { pxToRem } from './pxToRem';

/**
 * 숫자인 경우 rem으로 변환하고, 문자열인 경우 그대로 반환합니다.
 * @param value 변환할 크기 값 (예: 16, "100%", "auto")
 */
export function formatCssValue(value?: string | number): string | undefined {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? pxToRem(value) : value;
}
