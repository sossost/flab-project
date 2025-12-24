# 리팩토링: 에러 처리 구조 개선

**날짜**: 2025-12-22

## 개요

에러 처리 구조를 개선하여 관심사 분리를 명확히 하고, 코드 재사용성을 높이며, 서버 컴포넌트 호환성을 개선했습니다.

---

## 리팩토링 전 구조

**문제점:**

1. **관심사 분리 위반**: UI 레이어(`PaginationListErrorFallback`)에서 에러 분류 로직 처리
2. **재사용성 저하**: 다른 피쳐에서 동일한 분류 로직 중복 필요
3. **테스트 어려움**: UI 컴포넌트에서 비즈니스 로직 테스트 필요
4. **서버 컴포넌트 호환성**: 컴포넌트를 props로 전달 시 에러 발생 가능
5. **불필요한 뎁스**: `PaginationListErrorFallback` 같은 중간 컴포넌트 존재

**기존 구조:**

```
page.tsx (Server Component)
  └─ AsyncBoundary
      └─ errorFallback={PaginationListErrorFallback} (컴포넌트 직접 전달)
          └─ ErrorFallback
              ├─ 에러 분류 로직 (status 체크)
              ├─ redirectButton prop 전달
              └─ variant prop 전달
```

**기존 코드 예시:**

```typescript
// PaginationListErrorFallback.tsx
export function PaginationListErrorFallback({ error, resetError }) {
  let is404 = false;
  let isRangeError = false;

  if (isApiError(error)) {
    if (error.status === 404) is404 = true;
    if (error.status === 400) isRangeError = true;
  }

  return (
    <ErrorFallback
      error={error}
      resetError={resetError}
      redirectButton={
        is404 || isRangeError ? { href: '?page=1', label: '첫 페이지로 이동' } : undefined
      }
      variant="widget"
    />
  );
}
```

---

## 리팩토링 후 구조

**개선 사항:**

1. **에러 클래스 기반 접근**: 에러 분류 로직을 데이터 페칭 레이어로 이동
2. **에러 객체에 메타데이터 포함**: `redirectButton`, `variant` 정보를 에러 객체에 포함
3. **중간 뎁스 제거**: `PaginationListErrorFallback` 제거, 공통 `ErrorFallback`만 사용
4. **유틸 함수 분리**: 에러 메시지 추출 로직을 유틸 함수로 분리

**개선된 구조:**

```
page.tsx (Server Component)
  └─ AsyncBoundary
      └─ errorFallback (기본값 사용, 함수 형태)
          └─ ErrorFallback
              ├─ 에러 객체에서 메타데이터 추출
              ├─ redirectButton (에러 객체에서)
              └─ variant (에러 객체에서)

api/posts.ts
  └─ getPosts()
      └─ catch (error)
          └─ 에러 분류 및 변환
              └─ throw new PageNotFoundError(message, redirectButton, variant)
              └─ throw new PageRangeError(message, redirectButton, variant)
```

**개선된 코드 예시:**

```typescript
// api/posts.ts
export async function getPosts(page: number, limit: number = 10) {
  try {
    return await apiClient.get<PaginatedResponse<Post>>(`/posts?page=${page}&limit=${limit}`);
  } catch (error) {
    if (isApiError(error)) {
      const errorMessage = getErrorMessage(error);

      if (error.status === 404) {
        throw new PageNotFoundError(
          errorMessage || '페이지를 찾을 수 없습니다.',
          { href: '?page=1', label: '첫 페이지로 이동' },
          'widget',
        );
      }

      if (error.status === 400) {
        throw new PageRangeError(
          errorMessage || '유효하지 않은 페이지 범위입니다.',
          { href: '?page=1', label: '첫 페이지로 이동' },
          'widget',
        );
      }
    }
    throw error;
  }
}

// ErrorFallback.tsx
export function ErrorFallback({ error, resetError, isGlobalError = false }) {
  const errorWithMetadata = error as ErrorWithMetadata;
  const redirectButton = errorWithMetadata.redirectButton;
  const variant = errorWithMetadata.variant || 'page';
  const hasRedirectButton = !!redirectButton;

  return (
    <div>
      <p>{getErrorMessage(error)}</p>
      <Button onClick={resetError}>다시 시도</Button>
      {hasRedirectButton && (
        <Button href={redirectButton.href}>{redirectButton.label}</Button>
      )}
    </div>
  );
}
```

---

## 주요 변경 사항

### 1. 에러 클래스 생성

**파일**: `src/shared/api/errors.ts`

```typescript
export class PageNotFoundError extends ApiError {
  redirectButton?: RedirectButtonConfig;
  variant: ErrorVariant;

  constructor(
    message: string = '페이지를 찾을 수 없습니다.',
    redirectButton?: RedirectButtonConfig,
    variant: ErrorVariant = 'widget',
  ) {
    super(404, message);
    this.name = 'PageNotFoundError';
    this.redirectButton = redirectButton;
    this.variant = variant;
  }
}

export class PageRangeError extends ApiError {
  redirectButton?: RedirectButtonConfig;
  variant: ErrorVariant;

  constructor(
    message: string = '유효하지 않은 페이지 범위입니다.',
    redirectButton?: RedirectButtonConfig,
    variant: ErrorVariant = 'widget',
  ) {
    super(400, message);
    this.name = 'PageRangeError';
    this.redirectButton = redirectButton;
    this.variant = variant;
  }
}
```

**효과:**

- 에러 타입을 명확히 정의
- 에러 처리 정보(리다이렉트, variant)를 에러 객체에 포함
- 타입 안정성 향상

### 2. 에러 분류 로직 이동

**변경 전**: `PaginationListErrorFallback`에서 에러 분류

**변경 후**: `api/posts.ts`에서 에러 분류 및 변환

**효과:**

- 관심사 분리: 에러 분류가 데이터 페칭 레이어에서 처리
- 재사용성: 다른 피쳐에서도 동일한 에러 클래스 사용 가능
- 테스트 용이성: 에러 클래스 기반으로 단위 테스트 가능

### 3. ErrorFallback 단순화

**변경 전:**

```typescript
type ErrorFallbackProps = {
  error: Error;
  resetError: () => void;
  isGlobalError?: boolean;
  errorMessage?: string;
  redirectButton?: RedirectButtonConfig;
  variant?: 'page' | 'widget';
};
```

**변경 후:**

```typescript
type ErrorFallbackProps = {
  error: Error;
  resetError: () => void;
  isGlobalError?: boolean;
};
```

**효과:**

- Props 단순화: 에러 정보는 모두 에러 객체에서 추출
- 서버 컴포넌트 호환성: 컴포넌트를 props로 전달하지 않아도 됨
- 확장성: 새로운 에러 타입 추가 시 ErrorFallback 수정 불필요

### 4. 유틸 함수 분리

**파일**: `src/shared/api/utils.ts`

```typescript
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
```

**효과:**

- 재사용성: 다른 곳에서도 동일한 로직 사용 가능
- 일관성: 에러 메시지 추출 로직 통일
- 유지보수성: 메시지 추출 로직 변경 시 한 곳만 수정

### 5. 중간 컴포넌트 제거

**제거된 파일**: `src/app/(features)/list-pagination/components/PaginationListErrorFallback.tsx`

**효과:**

- 뎁스 감소: 불필요한 중간 컴포넌트 제거
- 단순화: 공통 `ErrorFallback`만 사용

---

## 개선 효과

### 1. 관심사 분리

- **이전**: UI 레이어에서 에러 분류 로직 처리
- **이후**: 데이터 페칭 레이어에서 에러 분류 및 변환

### 2. 재사용성

- **이전**: 각 피쳐마다 에러 분류 로직 중복
- **이후**: 공통 에러 클래스 및 `ErrorFallback` 재사용

### 3. 확장성

- **이전**: 새로운 에러 타입 추가 시 `ErrorFallback` 수정 필요
- **이후**: 에러 클래스만 추가하면 자동으로 처리

### 4. 서버 컴포넌트 호환성

- **이전**: 컴포넌트를 props로 전달 시 에러 발생 가능
- **이후**: 에러 객체에서 메타데이터 추출로 문제 해결

### 5. 타입 안정성

- **이전**: 런타임에 에러 타입 체크
- **이후**: 컴파일 타임에 에러 타입 확인 가능

---

## 코드 위치

- **에러 클래스**: `src/shared/api/errors.ts`
- **에러 메시지 추출**: `src/shared/api/utils.ts` (`getErrorMessage`)
- **에러 분류 로직**: `src/app/(features)/list-pagination/api/posts.ts`
- **에러 UI**: `src/shared/components/ErrorFallback.tsx`
- **제거된 파일**: `src/app/(features)/list-pagination/components/PaginationListErrorFallback.tsx`

---

## 참고 사항

- 에러 객체에 `redirectButton`이 없으면 리다이렉트 버튼을 표시하지 않음
- 에러 객체에 `variant`가 없으면 기본값 `'page'` 사용
- `getErrorMessage` 함수는 `ApiError`의 `data.message`를 우선 확인
