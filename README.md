# flab-project

과제 기반 프로젝트로, 각 과제별로 독립적인 기능을 구현합니다.

## 기술 스택

### Core

- **Language**: JavaScript, TypeScript
- **Framework**: Next.js 16.0.8 (App Router)
- **UI Library**: React 19.2.1

### Data & State Management

- **Data Fetching**: React Query (TanStack Query)
- **State Management**: Jotai
- **Form Management**: React Hook Form

### Styling

- **CSS-in-JS**: Emotion (@emotion/react, @emotion/styled)

### Development Tools

- **Code Quality**: ESLint, Prettier
- **Git Hooks**: Husky, lint-staged
- **Network**: Fetch API (Browser Native)

## 프로젝트 구조

### 폴더 구조

```
src/
  app/
    (routes)/                    # 라우트 그룹 (선택적)
      list-pagination/           # 피쳐: 페이지네이션 목록 페이지
        page.tsx                 # 페이지 컴포넌트
        components/              # 해당 페이지 전용 컴포넌트
        hooks/                   # 해당 페이지 전용 커스텀 훅
        api/                     # 해당 페이지 전용 API 호출
        types.ts                 # 해당 페이지 전용 타입 정의
      list-infinite/             # 피쳐: 무한스크롤 목록 페이지
      search-with-submit/        # 피쳐: 검색 (submit 버튼)
      search-without-submit/     # 피쳐: 검색 (debounce)
    layout.tsx                   # 루트 레이아웃
    page.tsx                     # 홈 페이지
    globals.css                  # 전역 스타일
  shared/                        # 공통 사용
    components/                   # 공통 컴포넌트
      ErrorBoundary.tsx
      Loading.tsx
    hooks/                       # 공통 커스텀 훅
    utils/                       # 유틸 함수
    types/                       # 공통 타입 정의
    constants/                   # 상수
    api/                         # 공통 API 클라이언트
      client.ts
      types.ts
      config.ts
```

### 아키텍처 원칙

- **피쳐 기반 구조**: 각 과제가 독립적인 피쳐로 관리됨
- **피쳐별 독립성**: 피쳐 간 직접 의존 금지, `shared/`를 통해서만 공통 기능 사용
- **Server/Client 구분**: Server Components를 기본으로 사용, 필요 시에만 Client Components
- **공통 기능 재사용**: 2개 이상의 피쳐에서 사용하는 것은 `shared/`에 배치

### 데이터 페칭 전략

- **Server Components**: 기본 `fetch` 사용 (Next.js가 자동으로 Suspense와 통합)
- **Client Components**: React Query 사용 (페이지네이션, 무한스크롤, 검색 등)
- **API 클라이언트**: 커스텀 API 클라이언트 래퍼 사용 (fetch 기반)

### 에러 처리

- **ErrorBoundary**: 루트 레이아웃에 전역 ErrorBoundary, 필요 시 피쳐별 추가
- **Suspense**: 각 피쳐 페이지에서 데이터 페칭 영역을 Suspense로 감싸기

### 스타일링

- **Emotion**: CSS-in-JS 라이브러리 사용
- **Server Components**: Emotion 사용 불가, 전역 CSS 또는 기본 스타일 사용
- **Client Components**: Emotion의 styled API 또는 css prop 사용

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 개발 가이드라인

### 코드 스타일

- **포매팅**: Prettier 사용 (자동 포매팅)
- **린팅**: ESLint 사용 (자동 수정)
- **커밋 전**: Husky + lint-staged로 자동 검사

### 컴포넌트 작성

- **Server Components**: 기본으로 사용 (성능, SEO 최적화)
- **Client Components**: 인터랙션이 필요한 경우에만 사용 (`'use client'` 지시어)
- **스타일링**: Emotion 사용 (Client Components에서만)

### API 호출

- **공통 클라이언트**: `shared/api/client.ts`의 `apiClient` 사용
- **피쳐별 API**: `app/{feature-name}/api/`에 배치
- **타입 안정성**: 모든 API 함수에 타입 정의

### 의사결정 문서

프로젝트의 아키텍처 결정사항은 [의사결정 문서](./docs/decisions/)에서 확인할 수 있습니다.

- [프로젝트 세팅](./docs/decisions/01-project-setup.md)
- [아키텍처](./docs/decisions/02-architecture.md)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
