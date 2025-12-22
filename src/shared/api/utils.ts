import { NextResponse } from 'next/server';

import { ApiError } from './types';

/**
 * API Route에서 사용하는 공통 에러 응답 생성 함수
 *
 * @param message - 에러 메시지
 * @param status - HTTP 상태 코드 (기본값: 400)
 * @returns NextResponse 객체
 */
export function createErrorResponse(message: string, status: number = 400) {
  return NextResponse.json({ message: message || 'Unknown error' }, { status });
}

export function isApiError(error: unknown): error is ApiError {
  if (typeof error !== 'object' || error === null) {
    return false;
  }

  return 'status' in error && 'message' in error;
}

export function getErrorMessage(
  error: Error | null | undefined,
  defaultMessage = '알 수 없는 오류가 발생했습니다.',
): string {
  if (!error) {
    return defaultMessage;
  }

  if (isApiError(error)) {
    if (error.data && typeof error.data === 'object' && 'message' in error.data) {
      const dataMessage = (error.data as { message: string }).message;
      if (dataMessage) {
        return dataMessage;
      }
    }
  }

  return error.message || defaultMessage;
}
