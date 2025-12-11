# 아키텍처 의사결정 문서

## 개요

프로젝트의 아키텍처 전반에 대한 의사결정을 기록합니다. 폴더 구조, 데이터 페칭 전략, 에러 처리, 컴포넌트 구조, 스타일링 등 프로젝트의 핵심 아키텍처 결정사항을 포함합니다.

---

## 결정 1: 폴더 구조 방식 선택 (레이어 기반 vs 피쳐 기반)

**날짜**: 2025-12-10

### 컨텍스트

과제 기반 프로젝트에서 각 과제별로 독립적인 기능을 구현해야 함. 폴더 구조를 어떻게 조직할지 결정해야 함

### 결정

**피쳐 기반 구조 선택**

- 기능/도메인별로 그룹화하는 피쳐 기반 구조 선택
- 각 과제가 독립적인 피쳐로 관리됨
- 관련 파일들이 피쳐별로 함께 위치

### 근거

- **과제별 독립성**: 각 과제가 독립적인 피쳐로 관리되어 명확함
- **관련 파일 그룹화**: 각 피쳐의 컴포넌트, 훅, API 등이 한 곳에 모여 관리 용이
- **확장성**: 새로운 과제 추가 시 새 피쳐만 추가하면 됨
- **유지보수성**: 특정 과제 수정 시 해당 피쳐만 확인하면 됨

### 대안 검토

#### 레이어 기반 구조 (비교 검토한 방식)

**구조:**

```
src/
  components/     # 모든 컴포넌트
  pages/          # 모든 페이지
  hooks/          # 모든 커스텀 훅
  api/            # 모든 API 호출
  utils/          # 모든 유틸 함수
```

**특징:**

- 파일 타입별로 그룹화
- 작은 프로젝트에 적합
- 파일 찾기가 쉬움

**장점:**

- 구조가 단순하고 직관적
- 파일 타입별로 일관된 위치

**단점:**

- 피쳐가 커지면 관련 파일이 분산됨
- 특정 기능 수정 시 여러 폴더를 오가야 함
- 과제별로 독립적인 기능을 구현하는 프로젝트에는 부적합

**선택하지 않은 이유:**

- 과제 기반 프로젝트에서는 각 과제가 독립적인 피쳐이므로, 관련 파일들이 함께 있는 피쳐 기반 구조가 더 적합
- 레이어 기반은 관련 파일이 분산되어 관리가 어려움

### 코드 위치

- 피쳐 폴더: `src/app/{feature-name}/`
- 공통 폴더: `src/shared/`

---

## 결정 2: 피쳐 폴더 위치 결정 (features 폴더 분리 vs app 폴더 내 구성)

**날짜**: 2025-12-10

### 컨텍스트

피쳐 기반 구조를 선택했으므로, 피쳐들을 별도의 `features/` 폴더로 분리할지, `app/` 폴더 내에 구성할지 결정해야 함

### 결정

**app 폴더 내에 피쳐 구성 (features 폴더 분리하지 않음)**

- Next.js App Router의 `app/` 폴더 내에 각 피쳐를 라우트로 구성
- 각 라우트(피쳐) 폴더에 관련 파일들을 함께 배치
- `shared/` 폴더에 정말 공통으로 사용하는 것만 분리

### 근거

- **단순성**: 구조가 단순하여 파일 찾기와 관리가 쉬움
- **Next.js 컨벤션**: App Router의 표준 구조와 일치
- **파일 간 이동 최소화**: 라우팅과 로직이 같은 폴더에 있어 이동이 적음
- **개발 속도**: 파일 간 이동이 적어 개발 속도 향상
- **과제별 독립성**: 각 과제가 독립적이므로 재사용 필요성이 낮음

### 대안 검토

#### features 폴더로 분리하는 방식 (비교 검토한 방식)

**구조:**

```
src/
  app/
    list-pagination/
      page.tsx              # 라우팅만 (얇은 래퍼)
  features/
    list-pagination/
      components/
      hooks/
      api/
  shared/
    components/
```

**특징:**

- 라우팅과 비즈니스 로직 분리
- features 폴더에 피쳐별 로직 집중
- app 폴더는 라우팅에만 집중

**장점:**

- 라우팅과 로직의 명확한 분리
- 피쳐 간 재사용 용이
- 큰 프로젝트에서 확장성 좋음

**단점:**

- 구조가 복잡해짐
- 파일 간 이동이 많아짐 (app ↔ features)
- 과제 기반 프로젝트에서는 오버엔지니어링
- 각 과제가 독립적이므로 재사용 이점이 적음

**선택하지 않은 이유:**

- 과제 기반 프로젝트에서는 각 과제가 독립적이어서 피쳐 간 재사용 필요성이 낮음
- 구조 복잡도만 증가하고 실질적 이점이 적음
- app 폴더 내에 구성하는 것이 더 단순하고 관리하기 쉬움

### 코드 위치

- 피쳐 폴더: `src/app/{feature-name}/`
- 공통 폴더: `src/shared/`

---

## 결정 3: 구체적인 폴더 구조

**날짜**: 2025-12-10

### 컨텍스트

선택한 구조 방식에 맞춰 구체적인 폴더 구조를 정의해야 함

### 결정

**다음과 같은 폴더 구조 사용:**

**라우트 그룹 사용 시:**

```
src/
  app/
    (routes)/                    # 라우트 그룹 (선택적, 결정 5 참고)
      list-pagination/           # 피쳐: 페이지네이션 목록 페이지
        page.tsx                 # 페이지 컴포넌트
        components/              # 해당 페이지 전용 컴포넌트
        hooks/                   # 해당 페이지 전용 커스텀 훅
        api/                     # 해당 페이지 전용 API 호출
        types.ts                 # 해당 페이지 전용 타입 정의
      list-infinite/             # 피쳐: 무한스크롤 목록 페이지
        page.tsx
        components/
        hooks/
        api/
        types.ts
      search-with-submit/        # 피쳐: 검색 (submit 버튼)
        page.tsx
        components/
        hooks/
        api/
        types.ts
      search-without-submit/     # 피쳐: 검색 (debounce)
        page.tsx
        components/
        hooks/
        api/
        types.ts
    layout.tsx                   # 루트 레이아웃
    page.tsx                     # 홈 페이지
    globals.css                  # 전역 스타일
  shared/                        # 공통 사용
    components/                   # 공통 컴포넌트
      ErrorBoundary.tsx
      Loading.tsx
      ...
    hooks/                       # 공통 커스텀 훅
    utils/                       # 유틸 함수
    types/                       # 공통 타입 정의
    constants/                   # 상수
```

**라우트 그룹 미사용 시:**

```
src/
  app/
    list-pagination/             # 피쳐: 페이지네이션 목록 페이지
      page.tsx
      components/
      hooks/
      api/
      types.ts
    list-infinite/               # 피쳐: 무한스크롤 목록 페이지
      ...
    layout.tsx
    page.tsx
    globals.css
  shared/
    ...
```

### 근거

- **피쳐별 독립성**: 각 피쳐(과제)의 모든 관련 파일이 한 곳에 모여 관리 용이
- **명확한 책임 분리**: `app/`은 라우팅과 피쳐, `shared/`는 공통 사용
- **확장성**: 새로운 과제 추가 시 새 피쳐 폴더만 추가하면 됨
- **Next.js 표준**: App Router의 파일 시스템 라우팅과 일치

### 대안 검토

- **더 세분화된 구조**: 과도한 구조는 복잡도만 증가하므로 현재 구조 유지
- **모든 것을 app에 넣기**: 공통 컴포넌트는 `shared/`로 분리하여 재사용성 확보

### 피쳐 간 의존성 규칙

- **피쳐 → Shared**: 공통 컴포넌트/훅/유틸 사용 가능
- **피쳐 → 피쳐**: 직접 의존 금지 (독립성 유지)
- **Shared**: 다른 폴더에 의존하지 않음

### 코드 위치

- 피쳐 폴더: `src/app/{feature-name}/`
- 공통 폴더: `src/shared/`

---

## 결정 4: 공통 폴더(shared) 사용 기준

**날짜**: 2025-12-10

### 컨텍스트

어떤 것을 `shared/`에 넣고, 어떤 것을 각 피쳐에 두어야 할지 기준이 필요함

### 결정

**다음 기준으로 `shared/` 사용:**

**shared/에 포함:**

- 2개 이상의 피쳐에서 사용하는 컴포넌트/훅/유틸
- 프로젝트 전반에서 사용하는 타입/상수
- ErrorBoundary, Loading 등 공통 UI 컴포넌트

**각 피쳐에 포함:**

- 해당 피쳐에서만 사용하는 모든 것
- 피쳐 전용 컴포넌트, 훅, API 호출, 타입

### 근거

- **재사용성**: 2개 이상에서 사용하면 공통으로 관리
- **독립성 유지**: 피쳐별 독립성 보장
- **명확한 기준**: 2개 이상 사용 시 공통으로 이동하는 명확한 기준

### 대안 검토

- **모든 것을 shared에**: 피쳐별 독립성이 떨어지고 파일 찾기가 어려워짐
- **모든 것을 피쳐에**: 중복 코드 발생 가능

### 코드 위치

- 공통 폴더: `src/shared/`
- 피쳐별 폴더: `src/app/{feature-name}/`

---

## 결정 5: 라우트 그룹 사용 여부

**날짜**: 2025-12-10

### 컨텍스트

Next.js App Router의 라우트 그룹 `(routes)` 사용 여부 결정

### 결정

**라우트 그룹 사용 (선택적)**

- `(routes)` 그룹으로 피쳐 관련 라우트들을 묶음
- 홈 페이지(`page.tsx`)는 그룹 밖에 유지
- 레이아웃 구조가 복잡해지면 그룹 사용 고려

### 근거

- **명확한 그룹화**: 피쳐 관련 라우트들을 시각적으로 그룹화
- **유연성**: 필요 시 그룹을 제거하거나 추가 가능
- **레이아웃 관리**: 그룹별로 다른 레이아웃 적용 가능

### 라우트 그룹 설명

**라우트 그룹(Route Groups)이란?**

Next.js App Router에서 폴더명을 `(group-name)` 형식으로 감싸면 URL 경로에 포함되지 않으면서도 폴더 구조를 조직화할 수 있는 기능입니다.

**예시:**

```
app/
  (routes)/              # URL에 포함되지 않음
    list-pagination/      # URL: /list-pagination
    list-infinite/        # URL: /list-infinite
  page.tsx                # URL: /
```

**라우트 그룹을 사용하지 않으면:**

```
app/
  list-pagination/        # URL: /list-pagination
  list-infinite/          # URL: /list-infinite
  page.tsx                # URL: /
```

**라우트 그룹의 장점:**

- URL 경로에 영향을 주지 않고 폴더 구조만 조직화
- 그룹별로 다른 레이아웃 적용 가능
- 시각적으로 관련 라우트들을 그룹화

**라우트 그룹의 단점:**

- 구조가 복잡해질 수 있음
- 작은 프로젝트에서는 불필요할 수 있음

### 대안 검토

- **그룹 미사용**: 구조가 더 단순하지만, 라우트가 많아지면 관리 어려움

### 코드 위치

- 라우트 그룹: `src/app/(routes)/`

---

## 결정 6: 데이터 페칭 기본 전략

**날짜**: 2025-12-10

### 컨텍스트

과제 요구사항에 Suspense 사용이 포함되어 있고, 각 피쳐별로 데이터 페칭이 필요함. 프로젝트 전체의 기본 데이터 페칭 전략을 결정해야 함

### 결정

**Server Components와 Client Components 구분하여 사용**

- **Server Components**: 기본 `fetch` 사용 (Next.js가 자동으로 Suspense와 통합)
- **Client Components**: React Query (TanStack Query) 사용
- 클라이언트 인터랙션이 필요한 경우(페이지네이션, 무한스크롤, 검색 등)는 Client Components에서 React Query 사용

### 근거

- **Server Components의 이점**: 서버에서 데이터 페칭하여 초기 로딩 속도 향상, 번들 크기 감소
- **Client Components의 필요성**: 페이지네이션, 무한스크롤 등 클라이언트 인터랙션은 Client Components 필요
- **React Query의 장점**: 클라이언트 사이드 상태 관리, 캐싱, 리패칭 등 기능 제공
- **Suspense 지원**: Server Components는 Next.js가 자동 처리, Client Components는 React Query로 지원

### 사용 전략

**Server Components에서:**

- 초기 데이터 로딩
- SEO가 중요한 데이터
- 기본 `fetch` 사용 (Next.js가 자동으로 Suspense와 통합)

**Client Components에서:**

- 페이지네이션: `useQuery` + `keepPreviousData` 옵션
- 무한스크롤: `useInfiniteQuery`
- 검색 (submit 버튼): `useQuery` + `enabled` 옵션으로 submit 시에만 실행
- 검색 (debounce): `useQuery` + debounced query key

### 대안 검토

- **SWR**: Suspense 지원하지만 React Query보다 기능이 제한적
- **모든 것을 Server Components로**: 클라이언트 인터랙션이 필요한 경우 불가능
- **모든 것을 Client Components로**: 초기 로딩 속도 저하, 번들 크기 증가
- **Apollo Client**: GraphQL 전용이고 REST API에는 과함

### 코드 위치

- Provider 설정: `src/app/layout.tsx` 또는 별도 Provider 컴포넌트
- Query Client 설정: `src/shared/providers/` 또는 `src/app/`
- Server Components 데이터 페칭: `src/app/{feature-name}/page.tsx` (직접 fetch)
- Client Components 쿼리: `src/app/{feature-name}/hooks/` 또는 `src/app/{feature-name}/api/`

---

## 결정 6-1: QueryClient 선언 방식 (컴포넌트 내부 vs 외부)

**날짜**: 2025-12-10

### 컨텍스트

Next.js App Router는 SSR(Server Side Rendering) 환경이므로, React Query의 `QueryClient`를 어디에 선언하느냐에 따라 **데이터 격리(Isolation)**가 달라집니다. 컴포넌트 외부에 선언하면 서버에서 여러 사용자의 요청이 같은 `QueryClient` 인스턴스를 공유하여 **다른 사용자의 데이터가 노출되는 심각한 보안 사고**가 발생할 수 있습니다.

### 결정

**컴포넌트 내부에서 `useState`로 선언 (Per-Request 방식)**

```tsx
export default function QueryClientProvider({ children }) {
  const [queryClient] = useState(() => new QueryClient({...}));
  return <TanStackQueryClientProvider client={queryClient}>...</TanStackQueryClientProvider>;
}
```

### 근거

- **데이터 격리**: 각 요청(사용자)마다 독립적인 `QueryClient` 인스턴스가 생성되어 데이터가 섞이지 않음
- **보안**: SSR 환경에서 다른 사용자의 데이터가 노출되는 것을 방지
- **SSR 호환성**: Next.js App Router의 SSR 환경에서 안전하게 동작
- **클라이언트 상태 유지**: `useState`의 lazy initialization으로 컴포넌트가 리렌더링되어도 같은 인스턴스 유지

### 동작 방식

**서버 측:**

- 각 요청이 들어올 때마다 컴포넌트가 새로 렌더링되면서 새로운 `QueryClient` 인스턴스 생성
- 요청 처리가 끝나면 인스턴스가 사라짐 (데이터 격리)

**클라이언트 측:**

- `useState`로 선언되어 페이지 이동 시에도 같은 인스턴스 유지
- 초기값으로 함수를 전달하여 컴포넌트가 마운트될 때 한 번만 생성 (lazy initialization)

### 대안 검토

#### 컴포넌트 외부 선언 (전역 변수) - ❌ 거부

```tsx
// ❌ Next.js SSR 환경에서는 절대 사용하면 안 됨
const queryClient = new QueryClient();

export default function QueryClientProvider({ children }) {
  return <TanStackQueryClientProvider client={queryClient}>...</TanStackQueryClientProvider>;
}
```

**특징:**

- 파일이 로드될 때 한 번만 생성 (모듈 레벨 싱글톤)
- 서버가 꺼질 때까지 계속 살아있음
- 모든 요청이 같은 인스턴스를 공유

**문제점:**

- **데이터 누수**: A 사용자가 접속해서 조회한 데이터가 `QueryClient` 캐시에 저장됨
- **보안 사고**: B 사용자가 접속하면 서버 메모리에 있는 A 사용자의 데이터가 노출될 수 있음
- **SSR 환경에서 사용 불가**: Next.js App Router에서는 절대 사용하면 안 됨

**사용 가능한 경우:**

- SPA(CRA, Vite 등): 브라우저에서만 실행되므로 사용자 혼자만 사용하여 문제 없음

### 비교표

| 구분              | 외부 선언 (전역 변수)            | 내부 선언 (useState)                  |
| :---------------- | :------------------------------- | :------------------------------------ |
| **생성 시점**     | 파일이 로드될 때 (서버 켜질 때)  | 컴포넌트가 마운트될 때 (요청 올 때)   |
| **수명**          | 서버가 꺼질 때까지 계속 살아있음 | 요청 처리가 끝나면 사라짐 (서버 기준) |
| **인스턴스 공유** | 모든 요청이 같은 인스턴스 공유   | 각 요청마다 독립적인 인스턴스         |
| **데이터 격리**   | ❌ 없음 (데이터 누수 위험)       | ✅ 있음 (안전)                        |
| **SPA(CRA)**      | 사용 가능 (편함)                 | 사용 가능                             |
| **SSR(Next.js)**  | ❌ 절대 금지 (정보 유출 위험)    | ✅ 필수 권장 사항                     |

### 코드 위치

- QueryClientProvider: `src/shared/providers/QueryClientProvider.tsx`
- QueryClient 선언: 컴포넌트 내부에서 `useState`로 선언

---

## 결정 7: ErrorBoundary 기본 구조

**날짜**: 2025-12-10

### 컨텍스트

과제 요구사항에 ErrorBoundary 적용이 포함되어 있음. ErrorBoundary를 어디에 배치하고 어떻게 구성할지 결정해야 함

### 결정

**계층적 ErrorBoundary 구조**

- **루트 레이아웃**: 전역 ErrorBoundary (모든 에러를 최종적으로 처리)
- **피쳐별**: 필요 시 각 페이지에 추가 ErrorBoundary (세밀한 에러 처리)
- ErrorBoundary 컴포넌트는 `shared/components/`에 위치

### 근거

- **전역 에러 처리**: 루트 레이아웃의 ErrorBoundary로 예상치 못한 에러 처리
- **피쳐별 세밀한 처리**: 각 피쳐에서 필요 시 추가 ErrorBoundary로 더 구체적인 에러 처리 가능
- **유연성**: 피쳐별로 필요에 따라 ErrorBoundary 추가 가능
- **재사용성**: 공통 ErrorBoundary 컴포넌트를 shared에 두어 재사용

### 구조 예시

```
app/
  layout.tsx                    # 루트 레이아웃에 ErrorBoundary
    <ErrorBoundary>
      {children}
    </ErrorBoundary>
  list-pagination/
    page.tsx                     # 필요 시 추가 ErrorBoundary
      <ErrorBoundary>
        <Suspense>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
shared/
  components/
    ErrorBoundary.tsx            # 공통 ErrorBoundary 컴포넌트
```

### 대안 검토

- **루트에만 ErrorBoundary**: 모든 에러가 루트로 전파되어 세밀한 에러 처리 어려움
- **각 페이지마다 필수**: 불필요한 중복 가능

### 코드 위치

- 공통 ErrorBoundary: `src/shared/components/ErrorBoundary.tsx`
- 루트 레이아웃: `src/app/layout.tsx`
- 피쳐별 ErrorBoundary: `src/app/{feature-name}/page.tsx` (선택적)

---

## 결정 8: Suspense 사용 전략

**날짜**: 2025-12-10

### 컨텍스트

과제 요구사항에 Suspense 사용이 포함되어 있음. Suspense를 어디에 배치하고 어떻게 구성할지 결정해야 함

### 결정

**계층적 Suspense 구조**

- **페이지 레벨**: 각 피쳐 페이지에서 데이터 페칭 영역을 Suspense로 감싸기
- **컴포넌트 레벨**: 필요 시 세부 컴포넌트별로 Suspense 경계 설정
- **로딩 UI**: 각 Suspense 경계에 맞는 로딩 컴포넌트 제공

### 근거

- **과제 요구사항**: Suspense 사용이 명시적으로 요구됨
- **점진적 로딩**: 페이지 전체가 아닌 필요한 부분만 로딩 상태 표시 가능
- **사용자 경험**: 로딩 상태를 명확하게 표시하여 사용자 경험 향상
- **에러 처리**: ErrorBoundary와 함께 사용하여 에러 처리 가능

### 구조 예시

```
app/
  list-pagination/
    page.tsx
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <ProductList />
        </Suspense>
      </ErrorBoundary>
```

### Suspense 사용 규칙

- **Server Components**: Next.js가 자동으로 Suspense와 통합 (기본 fetch 사용 시)
- **Client Components**: React Query의 Suspense 모드 사용
- **로딩 UI**: 각 Suspense 경계에 적절한 로딩 컴포넌트 제공

### 대안 검토

- **전역 Suspense만 사용**: 세밀한 로딩 상태 표시 어려움
- **Suspense 미사용**: 과제 요구사항 미충족

### 코드 위치

- Suspense 경계: `src/app/{feature-name}/page.tsx`
- 로딩 컴포넌트: `src/shared/components/Loading.tsx` 또는 피쳐별 로딩 컴포넌트

---

## 결정 9: Server Components vs Client Components 전략

**날짜**: 2025-12-10

### 컨텍스트

Next.js App Router에서는 기본적으로 Server Components를 사용하지만, 클라이언트 인터랙션이 필요한 경우 Client Components가 필요함. 언제 어떤 것을 사용할지 전략을 결정해야 함

### 결정

**기본적으로 Server Components 사용, 필요 시에만 Client Components 사용**

- **기본 원칙**: Server Components를 기본으로 사용
- **Client Components 사용 시점**:
  - 클라이언트 인터랙션이 필요한 경우 (onClick, onChange 등)
  - 브라우저 API 사용 (localStorage, window 등)
  - React Hooks 사용 (useState, useEffect 등)
  - React Query 사용 (클라이언트 사이드 데이터 페칭)

### 근거

- **성능**: Server Components는 서버에서 렌더링되어 초기 로딩 속도 향상
- **번들 크기**: Server Components는 클라이언트 번들에 포함되지 않아 번들 크기 감소
- **SEO**: Server Components는 서버에서 렌더링되어 SEO에 유리
- **필요한 경우만 Client**: 클라이언트 기능이 필요한 경우에만 Client Components 사용

### 사용 가이드

**Server Components 사용:**

- 정적 콘텐츠
- 초기 데이터 페칭 (기본 fetch)
- SEO가 중요한 콘텐츠
- 서버에서만 접근 가능한 데이터

**Client Components 사용:**

- 사용자 인터랙션 (버튼 클릭, 폼 입력 등)
- 상태 관리 (useState, useReducer 등)
- 생명주기 훅 (useEffect 등)
- 브라우저 API 사용
- React Query를 사용한 데이터 페칭

### 컴포넌트 구조 예시

```
app/
  list-pagination/
    page.tsx                    # Server Component (초기 데이터 페칭)
      <ProductList />           # Client Component (페이지네이션 인터랙션)
        <ProductItem />          # Server Component (정적 콘텐츠)
```

### 대안 검토

- **모든 것을 Server Components로**: 클라이언트 인터랙션이 필요한 경우 불가능
- **모든 것을 Client Components로**: 성능 저하, 번들 크기 증가, SEO 불리

### 코드 위치

- Server Components: `src/app/{feature-name}/page.tsx`, `src/app/{feature-name}/components/`
- Client Components: `src/app/{feature-name}/components/` (파일 상단에 `'use client'` 지시어)

---

## 결정 10: 스타일링 전략

**날짜**: 2025-12-10

### 컨텍스트

프로젝트 요구사항에 Emotion 사용이 명시되어 있음. Emotion을 사용하여 스타일링 전략을 수립해야 함

### 결정

**Emotion 사용**

- CSS-in-JS 라이브러리인 Emotion 사용
- `@emotion/react`와 `@emotion/styled` 패키지 사용
- 컴포넌트와 스타일을 함께 관리하여 개발 경험 향상

### 근거

- **프로젝트 요구사항**: 과제 요구사항에 Emotion 사용이 명시되어 있음
- **CSS-in-JS의 장점**: 컴포넌트와 스타일이 함께 위치하여 관리 용이
- **동적 스타일링**: props 기반 동적 스타일링 용이
- **타입 안정성**: TypeScript와 함께 사용 시 타입 안정성 제공
- **성능**: styled-components 대비 더 나은 성능
- **유연성**: css prop과 styled API 모두 지원하여 다양한 사용 패턴 가능

### Server Components와의 호환성

- **Server Components**: Emotion 사용 불가 (클라이언트 전용)
- **해결 방법**:
  - Server Components는 전역 CSS 또는 기본 스타일 사용
  - 스타일이 필요한 경우 Client Component로 분리
  - 또는 Server Component 내부에 Client Component로 스타일링된 래퍼 사용

### 대안 검토

- **CSS Modules**: Next.js 기본 지원이지만, 동적 스타일링이 제한적이고 컴포넌트와 스타일이 분리됨
- **Tailwind CSS**: 유틸리티 기반 CSS로 빠른 개발 가능하지만, 동적 스타일링이 제한적
- **styled-components**: Emotion과 유사하지만 성능이 상대적으로 낮고, Next.js와의 통합이 복잡할 수 있음
- **일반 CSS**: 스타일 격리가 없어 충돌 가능성

### 코드 위치

- 스타일드 컴포넌트: `src/app/{feature-name}/components/` (같은 파일 또는 별도 파일)
- 전역 스타일: `src/app/globals.css`
- Emotion 설정: `src/app/layout.tsx` 또는 별도 설정 파일

---

## 결정 10-1: 테마 관리 방식

**날짜**: 2025-12-11

### 컨텍스트

Emotion을 사용한 스타일링에서 컬러, 타이포그래피 등 디자인 토큰을 어떻게 관리할지 결정해야 함. 로딩 스피너 등 공용 컴포넌트에서 컬러 스킴이 필요함

### 결정

**Emotion Theme 사용**

- Emotion의 `ThemeProvider`와 `useTheme` 훅 사용
- 테마 객체를 TypeScript로 정의하여 타입 안정성 확보
- 다크모드는 현재 구현하지 않지만, 확장 가능한 구조로 설계

### 근거

1. **Emotion과의 자연스러운 통합**: Emotion의 네이티브 기능으로 `theme` prop을 통해 모든 컴포넌트에서 접근 가능
2. **타입 안정성**: TypeScript로 테마 타입을 정의하여 자동완성과 타입 체크 제공
3. **컴포넌트 접근성**: `useTheme` 훅이나 `theme` prop을 통해 모든 컴포넌트에서 쉽게 접근
4. **확장성**: 다크모드 추가 시 테마 객체만 확장하면 됨
5. **일관성**: 프로젝트 전반에서 동일한 디자인 토큰 사용 보장

### 대안 검토

#### 1. CSS 변수 (CSS Custom Properties)

**장점:**

- CSS와 JavaScript 모두에서 사용 가능
- 런타임에 동적으로 변경 가능 (다크모드 전환 등)
- 브라우저 네이티브 기능

**단점:**

- TypeScript 타입 안정성이 약함
- Emotion과의 통합이 자연스럽지 않음
- CSS 변수와 TypeScript 타입을 별도로 관리해야 함

#### 2. TypeScript 상수 파일

**장점:**

- 타입 안정성
- 단순하고 명확함
- 의존성 없음

**단점:**

- Emotion과 통합 시 수동으로 import 필요
- 런타임 변경이 어려움 (다크모드 전환 등)
- 컴포넌트에서 접근이 불편함 (`import theme from '@/shared/theme'`)

#### 3. 조합 방식 (CSS 변수 + TypeScript 상수)

**장점:**

- CSS와 JavaScript 모두에서 사용 가능
- 타입 안정성 확보

**단점:**

- 중복 관리 가능성
- 복잡도 증가

### 테마 구조

```typescript
// src/shared/theme/index.ts
export const theme = {
  colors: {
    primary: '#000000',
    secondary: '#666666',
    background: '#ffffff',
    text: '#000000',
    // ... 기타 컬러
  },
  // ... 기타 디자인 토큰
} as const;
```

### 확장성 고려사항

- 다크모드는 현재 구현하지 않지만, 테마 구조는 확장 가능하게 설계
- 향후 다크모드 추가 시 테마 객체에 `dark` 속성 추가 또는 테마 함수로 확장 가능

### 코드 위치

- 테마 정의: `src/shared/theme/index.ts`
- ThemeProvider: `src/app/layout.tsx` 또는 별도 Provider 컴포넌트

---

## 결정 11: API 함수 구조 및 기본 에러 처리 방향

**날짜**: 2025-12-10

### 컨텍스트

각 피쳐에서 API 호출이 필요함. API 함수를 어디에 위치시키고, 어떤 방식으로 작성하며, 에러를 어떻게 처리할지 결정해야 함

### 결정

**피쳐별 API 함수 + 커스텀 API 클라이언트 래퍼**

- **API 함수 위치**: 각 피쳐의 `api/` 폴더에 피쳐별 API 함수 배치
- **API 함수 작성 방식**: 커스텀 API 클라이언트 래퍼 사용 (fetch 기반, 직접 구현)
- **에러 처리**: 공통 API 클라이언트에서 기본 에러 처리, 필요 시 개별 처리 가능

### 근거

- **학습 효과**: fetch API를 직접 사용하여 네이티브 API의 동작 원리 이해
- **깊이 있는 학습**: 에러 처리, 타입 변환, 응답 처리 등을 직접 구현하며 내부 동작 이해
- **기초 지식**: 추상화 없이 원리를 학습하여 실무에서도 유용한 기초 지식 습득
- **피쳐별 독립성**: 각 과제가 독립적이므로 API 함수도 피쳐별로 관리하는 것이 일관성 있음
- **공통 기능 재사용**: 에러 처리, 타입 변환 등 공통 로직은 래퍼로 재사용
- **유연성**: 피쳐별로 필요 시 개별 에러 처리 가능
- **타입 안정성**: 공통 래퍼에서 타입 안정성 제공
- **일관성**: 모든 API 호출이 동일한 방식으로 처리되어 일관성 유지

### 구조

**공통 API 클라이언트:**

```
shared/
  api/
    client.ts              # 공통 API 클라이언트 (fetch 래퍼)
      - get(), post(), put(), delete() 등
      - 기본 에러 처리
      - 타입 안정성 제공
    types.ts               # 공통 API 타입 (ApiResponse, ApiError 등)
    config.ts              # API 설정 (BASE_URL 등)
```

**피쳐별 API 함수:**

```
app/
  list-pagination/
    api/
      products.ts          # 피쳐별 API 함수
        - getProducts(page: number)
        - 공통 클라이언트 사용
      types.ts             # 피쳐별 API 타입
```

### 사용 예시

**공통 API 클라이언트:**

```typescript
// shared/api/client.ts
export class ApiClient {
  async get<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new ApiError(response.status, await response.json());
      }
      return response.json();
    } catch (error) {
      // 공통 에러 처리
      throw error;
    }
  }
}

export const apiClient = new ApiClient();
```

**피쳐별 API 함수:**

```typescript
// app/list-pagination/api/products.ts
import { apiClient } from '@/shared/api/client';
import type { ProductListResponse } from './types';

export async function getProducts(page: number): Promise<ProductListResponse> {
  return apiClient.get<ProductListResponse>(`/api/products?page=${page}`);
}
```

### 대안 검토

#### 1. API 함수 위치 관련

##### 대안 1-1: 모든 API 함수를 shared에 배치

**구조:**

```
shared/
  api/
    products.ts
    search.ts
    ...
```

**장점:**

- 모든 API 함수가 한 곳에 모여 관리 용이
- 공통 로직 재사용 용이

**단점:**

- 피쳐별 독립성이 떨어짐
- 피쳐가 많아지면 파일 찾기 어려움
- 과제 기반 프로젝트 특성과 맞지 않음

**선택하지 않은 이유:**

- 각 과제가 독립적이므로 API 함수도 피쳐별로 관리하는 것이 일관성 있음
- 결정 1(피쳐 기반 구조)과 일관성 유지

#### 2. API 함수 작성 방식 관련

##### 대안 2-1: axios 사용

**특징:**

- 널리 사용되는 HTTP 클라이언트 라이브러리
- 인터셉터, 자동 JSON 변환 등 풍부한 기능 제공

**장점:**

- 널리 사용되어 문서와 자료가 풍부함
- 인터셉터, 요청/응답 변환 등 고급 기능 제공
- 타임아웃, 재시도 등 설정이 용이함
- 실무에서 많이 사용되는 스킬

**단점:**

- 번들 크기가 큼 (약 13KB)
- 추상화가 많아 내부 동작 이해가 어려움
- fetch API와 거리가 멀어 네이티브 API 학습에는 부적합
- Next.js App Router의 Server Components에서 사용 시 주의 필요

**학습 관점:**

- 실무 경험에는 도움이 되지만, 깊이 있는 학습에는 제한적
- 추상화로 인해 내부 동작 원리 이해가 어려움

**선택하지 않은 이유:**

- 학습 목적의 프로젝트에서는 fetch API를 직접 다루는 것이 더 유익함
- 커스텀 래퍼를 통해 원리를 이해한 후 필요 시 라이브러리 사용 가능

##### 대안 2-2: ky 사용

**특징:**

- fetch 기반의 가벼운 HTTP 클라이언트 라이브러리
- 모던하고 직관적인 API

**장점:**

- 가벼움 (약 3KB, axios 대비 약 1/4)
- fetch 기반으로 모던하고 직관적
- TypeScript 지원 우수
- Next.js와 잘 맞음
- 실무에서도 사용 가능한 스킬

**단점:**

- axios보다 사용자층이 작음
- 기능이 axios보다 제한적
- 추상화로 인해 fetch를 직접 다루지 않아 깊이 있는 학습에는 제한적

**학습 관점:**

- fetch 기반이므로 fetch 개념 이해에는 도움이 됨
- 하지만 직접 구현하는 것보다는 학습 효과가 낮음

**선택하지 않은 이유:**

- 학습 목적에서는 직접 구현하는 것이 더 유익함
- 커스텀 래퍼를 통해 원리를 이해한 후 필요 시 라이브러리 사용 가능

##### 대안 2-3: 직접 fetch 사용 (래퍼 없음)

**구조:**

```typescript
// 각 API 함수에서 직접 fetch 사용
export async function getProducts(page: number) {
  const response = await fetch(`/api/products?page=${page}`);
  return response.json();
}
```

**장점:**

- 구조가 단순함
- 추가 추상화 없음
- fetch API를 직접 사용

**단점:**

- 에러 처리를 각 함수마다 반복 구현해야 함
- 타입 안정성 보장이 어려움
- 공통 로직(인증, 헤더 등) 관리 어려움
- 일관성 유지 어려움
- 코드 중복 발생

**선택하지 않은 이유:**

- 공통 래퍼를 사용하면 에러 처리, 타입 안정성, 공통 로직을 한 곳에서 관리 가능
- 코드 중복 방지 및 일관성 확보
- 래퍼를 직접 구현하면서도 fetch API를 사용하여 학습 효과 유지

#### 3. 에러 처리 방식 관련

##### 대안 3-1: 개별 에러 처리만 사용

**구조:**

```typescript
// 각 API 함수에서 개별적으로 에러 처리
export async function getProducts(page: number) {
  try {
    // ...
  } catch (error) {
    // 개별 처리
  }
}
```

**장점:**

- 각 피쳐별로 세밀한 에러 처리 가능

**단점:**

- 에러 처리 로직이 중복됨
- 일관성 유지 어려움
- 공통 에러 처리 로직 재사용 불가

**선택하지 않은 이유:**

- 공통 래퍼에서 기본 에러 처리를 하고, 필요 시 개별 처리도 가능하도록 유연성 확보

### 에러 처리 전략

**공통 에러 처리 (기본):**

- 네트워크 에러
- HTTP 상태 코드 에러 (4xx, 5xx)
- 공통 에러 타입 정의

**개별 에러 처리 (필요 시):**

- 특정 피쳐에서만 필요한 에러 처리
- 비즈니스 로직 에러
- React Query의 `onError`에서 처리

### 코드 위치

- 공통 API 클라이언트: `src/shared/api/client.ts`
- 공통 API 타입: `src/shared/api/types.ts`
- 공통 API 설정: `src/shared/api/config.ts`
- 피쳐별 API 함수: `src/app/{feature-name}/api/`
- 피쳐별 API 타입: `src/app/{feature-name}/api/types.ts`

---

## 결정 11-1: API 클라이언트 에러 처리 방식

**날짜**: 2025-12-11

### 컨텍스트

API 클라이언트 래퍼를 구현할 때 에러를 어떻게 처리하고 타입을 정의할지 결정해야 함. 네트워크 에러, HTTP 에러, 파싱 에러 등 다양한 에러 상황을 일관되게 처리해야 함

### 결정

**커스텀 ApiError 클래스 + throw 방식**

- `ApiError` 클래스를 정의하여 에러 정보를 구조화
- 에러 발생 시 throw하여 호출하는 쪽에서 처리하도록 함
- React Query의 `onError`에서 에러 처리 가능

### 근거

- **구조화된 에러 정보**: status, message, data 등을 포함하여 에러 정보를 명확히 전달
- **일관성**: 모든 에러가 동일한 형태로 처리되어 일관성 유지
- **유연성**: 호출하는 쪽에서 필요에 따라 에러 처리 가능 (React Query의 onError 등)
- **타입 안정성**: TypeScript로 에러 타입을 명확히 정의

### 에러 타입 정의

```typescript
// shared/api/types.ts
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
```

### 에러 처리 전략

**공통 에러 처리:**

- 네트워크 에러: fetch 실패 시 네트워크 에러로 처리
- HTTP 에러: `response.ok === false`일 때 ApiError throw
- 파싱 에러: JSON 파싱 실패 시 에러 throw
- 빈 응답: 204 No Content 등 빈 응답 처리

**에러 처리 흐름:**

1. API 클라이언트에서 에러 발생 시 ApiError throw
2. 피쳐별 API 함수에서 catch하여 추가 처리 가능 (선택적)
3. React Query의 `onError`에서 최종 에러 처리

### 대안 검토

#### 대안 1: Result 타입 반환 (throw 없이)

```typescript
type Result<T, E> = { success: true; data: T } | { success: false; error: E };
```

**장점:**

- 에러를 명시적으로 처리하도록 강제
- 타입 안정성 향상

**단점:**

- 모든 호출에서 에러 체크 필요
- React Query와의 통합이 어색함 (React Query는 throw 기반)
- 코드가 장황해짐

**선택하지 않은 이유:**

- React Query가 throw 기반으로 동작하므로 throw 방식이 더 자연스러움
- Result 타입은 Rust/Swift 스타일이지만 JavaScript/TypeScript 생태계와 맞지 않음

#### 대안 2: 콜백 방식

```typescript
apiClient.get(url, {
  onSuccess: (data) => {...},
  onError: (error) => {...},
});
```

**장점:**

- 에러 처리를 명시적으로 할 수 있음

**단점:**

- Promise 기반 코드와 어색함
- React Query와의 통합이 어려움
- 코드가 복잡해짐

**선택하지 않은 이유:**

- Promise 기반 비동기 처리와 맞지 않음
- React Query와의 통합이 어색함

### 코드 위치

- 에러 타입: `src/shared/api/types.ts`
- 에러 처리: `src/shared/api/client.ts`

---

## 결정 11-2: BASE_URL 설정 방식

**날짜**: 2025-12-11

### 컨텍스트

API 클라이언트에서 사용할 BASE_URL을 어떻게 설정하고 관리할지 결정해야 함. 환경별로 다른 URL을 사용해야 할 수 있음

### 결정

**환경 변수 + config.ts 파일**

- `NEXT_PUBLIC_API_URL` 환경 변수 사용
- `config.ts` 파일에서 환경 변수를 읽어서 관리
- 기본값 설정 (개발 환경 대비)

### 근거

- **환경별 설정**: 개발/프로덕션 환경에 따라 다른 URL 사용 가능
- **타입 안정성**: config.ts에서 타입을 정의하여 타입 안정성 확보
- **중앙 관리**: BASE_URL을 한 곳에서 관리하여 변경 용이
- **Next.js 호환**: `NEXT_PUBLIC_` 접두사로 클라이언트에서 접근 가능

### 구조

```typescript
// shared/api/config.ts
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
} as const;
```

### 대안 검토

#### 대안 1: 환경 변수만 사용

```typescript
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
```

**장점:**

- 단순함

**단점:**

- 타입 안정성 부족
- 기본값 설정이 어색함
- 설정이 분산됨

**선택하지 않은 이유:**

- config.ts 파일로 중앙 관리하는 것이 더 명확함

#### 대안 2: 하드코딩

```typescript
const BASE_URL = 'http://localhost:3000/api';
```

**장점:**

- 매우 단순함

**단점:**

- 환경별 설정 불가능
- 유연성 부족

**선택하지 않은 이유:**

- 환경별 설정이 필요함

### 코드 위치

- 설정 파일: `src/shared/api/config.ts`

---

## 결정 11-3: HTTP 메서드 지원 및 헤더 관리

**날짜**: 2025-12-11

### 컨텍스트

API 클라이언트에서 어떤 HTTP 메서드를 지원하고, 헤더를 어떻게 관리할지 결정해야 함

### 결정

**기본 HTTP 메서드 지원 + 기본 헤더 설정**

- **지원 메서드**: GET, POST, PUT, DELETE
- **기본 헤더**: `Content-Type: application/json`
- **커스텀 헤더**: 각 메서드에서 추가 헤더 전달 가능

### 근거

- **필수 메서드**: RESTful API에서 가장 많이 사용하는 메서드
- **일관성**: 모든 요청에 기본 헤더를 설정하여 일관성 유지
- **유연성**: 필요 시 커스텀 헤더 추가 가능
- **학습 효과**: 기본적인 HTTP 메서드를 직접 구현하며 학습

### 메서드 시그니처

```typescript
class ApiClient {
  async get<T>(url: string, headers?: HeadersInit): Promise<T>;
  async post<T>(url: string, data?: unknown, headers?: HeadersInit): Promise<T>;
  async put<T>(url: string, data?: unknown, headers?: HeadersInit): Promise<T>;
  async delete<T>(url: string, headers?: HeadersInit): Promise<T>;
}
```

### 헤더 관리

**기본 헤더:**

- `Content-Type: application/json` (body가 있는 요청에만 적용)
- GET, DELETE 등 body가 없는 요청에는 Content-Type 헤더 추가하지 않음

**커스텀 헤더:**

- 각 메서드 호출 시 추가 헤더 전달 가능
- 기본 헤더와 병합하여 사용

### 추가 고려 사항

다음 기능들은 고려했지만 현재는 도입하지 않기로 결정했습니다.

#### 1. PATCH 메서드 추가

**고려 사항:**

- RESTful API에서 자주 사용되는 메서드
- 부분 업데이트에 유용

**도입하지 않은 이유:**

- 현재 프로젝트에서 필요 여부 불명확
- 기본 메서드(GET, POST, PUT, DELETE)만으로 충분
- 필요 시 나중에 추가 가능

#### 2. 인터셉터 방식

**고려 사항:**

```typescript
apiClient.interceptors.request.use((config) => {
  config.headers['Authorization'] = getToken();
  return config;
});
```

- 요청/응답 전후 처리 가능
- 인증 토큰 자동 추가 등 유용한 기능

**도입하지 않은 이유:**

- 복잡도 증가
- 현재 프로젝트에서 필요 여부 불명확
- 현재는 단순한 구조가 더 적합
- 필요 시 나중에 추가 가능

#### 3. AbortController 지원

**고려 사항:**

- 요청 취소 기능 제공
- 컴포넌트 언마운트 시 자동 취소
- 타임아웃 구현 가능
- 메모리 누수 방지

**도입하지 않은 이유:**

- **React Query 사용**: Client Components에서 React Query를 사용하는 경우, React Query가 내부적으로 AbortController를 사용하여 자동으로 요청 취소 처리
- **Server Components**: Server Components에서 Next.js의 기본 `fetch`를 사용하는 경우, Next.js가 자동으로 요청 취소 처리
- **현재 필요성 낮음**: 현재 프로젝트에서는 React Query와 Next.js fetch가 요청 취소를 자동으로 처리하므로 커스텀 API 클라이언트에 추가할 필요 없음
- **필요 시 추가 가능**: 나중에 직접 fetch를 사용하는 경우가 생기면 그때 추가 가능

### 코드 위치

- API 클라이언트: `src/shared/api/client.ts`

---

## 결정 11-4: API 클라이언트 타입 안정성

**날짜**: 2025-12-11

### 컨텍스트

API 클라이언트의 타입 안정성을 어떻게 보장할지 결정해야 함. 응답 타입을 명시적으로 지정하여 타입 안정성을 확보해야 함

### 결정

**제네릭 사용**

- 각 메서드에서 제네릭 타입 파라미터 사용
- 호출 시 응답 타입을 명시적으로 지정
- TypeScript의 타입 추론 활용

### 근거

- **타입 안정성**: 제네릭으로 응답 타입을 명시하여 타입 안정성 확보
- **명확성**: 호출 시점에 응답 타입을 명시하여 코드 가독성 향상
- **유연성**: API 응답 구조에 따라 자유롭게 타입 지정 가능
- **IDE 지원**: 타입 추론으로 자동완성 및 타입 체크 지원

### 구조

```typescript
// shared/api/client.ts
class ApiClient {
  async get<T>(url: string): Promise<T> {
    // ...
  }

  async post<T>(url: string, data?: unknown): Promise<T> {
    // ...
  }
}
```

### 사용 예시

```typescript
interface Product {
  id: number;
  name: string;
}

// 응답 타입을 명시적으로 지정
const products = await apiClient.get<Product[]>('/api/products');
```

### 대안 검토

#### 대안 1: ApiResponse 래퍼 타입

```typescript
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

const response = await apiClient.get<ApiResponse<Product[]>>('/api/products');
const products = response.data;
```

**장점:**

- 응답 구조를 명확히 정의
- 메타데이터(status, message 등) 포함 가능
- 일관된 응답 구조

**단점:**

- API 응답 구조가 이미 정해져 있을 수 있음 (백엔드가 직접 데이터를 반환하는 경우)
- 불필요한 추상화일 수 있음
- 모든 API가 같은 구조를 사용하지 않을 수 있음

**선택하지 않은 이유:**

- API 응답 구조는 백엔드에 따라 다름
- 제네릭으로 직접 타입 지정하는 것이 더 유연함
- 필요 시 나중에 추가 가능

#### 대안 2: 타입 추론만 사용

```typescript
const products = await apiClient.get('/api/products');
// 타입이 any 또는 unknown
```

**장점:**

- 코드가 간단함

**단점:**

- 타입 안정성 부족
- 타입 체크 불가능
- IDE 지원 부족

**선택하지 않은 이유:**

- 타입 안정성이 핵심 요구사항
- TypeScript의 이점을 활용해야 함

### 코드 위치

- API 클라이언트: `src/shared/api/client.ts`

---

## 결정 11-5: API 클라이언트 인스턴스 관리

**날짜**: 2025-12-11

### 컨텍스트

API 클라이언트 인스턴스를 어떻게 관리할지 결정해야 함. 싱글톤으로 하나의 인스턴스만 사용할지, 필요 시 인스턴스를 생성할지 결정해야 함

### 결정

**싱글톤 패턴**

- 하나의 인스턴스만 생성하여 export
- 모든 곳에서 같은 인스턴스 사용
- 생성자에서 설정을 주입받을 수 있도록 설계 (확장성)

### 근거

- **일관성**: 싱글톤으로 모든 곳에서 같은 인스턴스 사용
- **간편성**: 매번 인스턴스를 생성할 필요 없음
- **메모리 효율**: 하나의 인스턴스만 유지하여 메모리 효율적
- **확장성**: 필요 시 설정을 주입받을 수 있어 확장 가능

### 구조

```typescript
// shared/api/client.ts
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || API_CONFIG.BASE_URL;
  }

  async get<T>(url: string): Promise<T> {
    // ...
  }
}

// 싱글톤 인스턴스 export
export const apiClient = new ApiClient();
```

### 사용 예시

```typescript
// 모든 곳에서 같은 인스턴스 사용
import { apiClient } from '@/shared/api/client';

const products = await apiClient.get<Product[]>('/api/products');
```

### 대안 검토

#### 대안 1: 인스턴스 생성 방식

```typescript
// 매번 인스턴스 생성
const apiClient = new ApiClient(BASE_URL);
```

**장점:**

- 여러 인스턴스 생성 가능
- 각 인스턴스마다 다른 설정 가능 (다른 BASE_URL 등)
- 테스트 시 mock 인스턴스 생성 용이

**단점:**

- 매번 인스턴스 생성 필요
- 현재 프로젝트에서 여러 인스턴스가 필요한 경우 없음
- 코드가 장황해질 수 있음

**선택하지 않은 이유:**

- 현재는 하나의 API 클라이언트만 필요
- 싱글톤이 더 간편하고 일관성 있음
- 필요 시 팩토리 함수로 확장 가능

#### 대안 2: 팩토리 함수

```typescript
export function createApiClient(baseUrl?: string) {
  return new ApiClient(baseUrl);
}

const apiClient = createApiClient();
```

**장점:**

- 인스턴스 생성과 싱글톤의 중간 형태
- 필요 시 여러 인스턴스 생성 가능

**단점:**

- 현재 프로젝트에서 필요 여부 불명확
- 복잡도 증가

**선택하지 않은 이유:**

- 현재는 싱글톤으로 충분
- 필요 시 나중에 팩토리 함수로 변경 가능

### 코드 위치

- API 클라이언트: `src/shared/api/client.ts`
