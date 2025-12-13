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
