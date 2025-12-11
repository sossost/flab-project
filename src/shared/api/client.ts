import { API_CONFIG } from './config';
import { ApiError } from './types';

/**
 * API 클라이언트 래퍼 클래스
 *
 * fetch API를 래핑하여 다음 기능 제공:
 * - 타입 안정성 (제네릭 사용)
 * - 일관된 에러 처리
 * - 기본 헤더 설정
 * - BASE_URL 자동 추가
 *
 * 싱글톤 패턴:
 * - 하나의 인스턴스만 생성하여 모든 곳에서 재사용
 * - 메모리 효율적이고 일관성 유지
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || API_CONFIG.BASE_URL;
  }

  /**
   * 공통 요청 처리 메서드
   *
   * 에러 처리 흐름:
   * 1. 네트워크 에러: fetch 실패 시 (연결 실패, 타임아웃 등)
   * 2. HTTP 에러: response.ok === false (4xx, 5xx)
   * 3. 파싱 에러: JSON 파싱 실패
   * 4. 빈 응답: 204 No Content 등
   *
   * @param url - 요청 URL (절대 경로면 그대로 사용, 상대 경로면 BASE_URL 추가)
   * @param options - fetch 옵션 (method, headers, body 등)
   * @returns Promise<T> - 응답 데이터 (제네릭 타입)
   */
  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const fullUrl = url.startsWith('http') ? url : `${this.baseUrl}${url}`;

    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    };

    if (options.body) {
      headers['Content-Type'] = 'application/json';
    }

    try {
      const response = await fetch(fullUrl, {
        ...options,
        headers,
      });

      if (response.status === 204) {
        return undefined as T;
      }

      if (!response.ok) {
        let errorData: unknown;
        try {
          errorData = await response.json();
        } catch {
          errorData = await response.text();
        }

        throw new ApiError(response.status, response.statusText || 'Request failed', errorData);
      }

      try {
        return await response.json();
      } catch (error) {
        throw new ApiError(
          500,
          'Failed to parse response as JSON',
          error instanceof Error ? error.message : String(error),
        );
      }
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        0,
        error instanceof Error ? error.message : 'Network error occurred',
        error,
      );
    }
  }

  async get<T>(url: string, headers?: HeadersInit): Promise<T> {
    return this.request<T>(url, {
      method: 'GET',
      headers,
    });
  }

  async post<T>(url: string, data?: unknown, headers?: HeadersInit): Promise<T> {
    return this.request<T>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      headers,
    });
  }

  async put<T>(url: string, data?: unknown, headers?: HeadersInit): Promise<T> {
    return this.request<T>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      headers,
    });
  }

  async delete<T>(url: string, headers?: HeadersInit): Promise<T> {
    return this.request<T>(url, {
      method: 'DELETE',
      headers,
    });
  }
}

export const apiClient = new ApiClient();
