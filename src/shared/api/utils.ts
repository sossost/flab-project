import { NextResponse } from 'next/server';

/**
 * API Route에서 사용하는 공통 에러 응답 생성 함수
 *
 * @param message - 에러 메시지
 * @param status - HTTP 상태 코드 (기본값: 400)
 * @returns NextResponse 객체
 */
export function createErrorResponse(message: string, status: number = 400) {
  return NextResponse.json({ error: message }, { status });
}
