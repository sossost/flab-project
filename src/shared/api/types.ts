/**
 * API 에러를 표현하는 커스텀 에러 클래스
 *
 * Error 클래스를 상속받는 이유:
 * - Error는 JavaScript의 기본 에러 클래스로, 스택 트레이스를 자동으로 생성
 * - instanceof Error 체크가 가능하여 에러 타입 구분 가능
 * - 타입/인터페이스는 런타임에 존재하지 않아 instanceof 체크 불가능
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
