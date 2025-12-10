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
