# 프로젝트 세팅 의사결정 문서

## 개요

프로젝트 초기 세팅 단계에서 코드 품질, 일관성, 개발 경험을 위한 도구와 규칙을 결정합니다.

---

## 결정 1: 코드 포매팅 도구 선택

**날짜**: 2025-12-10

### 컨텍스트

- 프로젝트 초기 단계에서 코드 스타일 일관성을 확보해야 함
- PR 리뷰 시 포매팅 논의를 최소화하고 기능 리뷰에 집중하기 위함
- 자동 포매팅을 통해 개발자 수동 작업 부담 감소

### 결정

**Prettier 사용**

### 근거

- 포매팅 전용 도구로 설정이 단순하고 직관적
- 대부분의 에디터에서 플러그인 지원으로 개발 경험 향상
- 커뮤니티 표준으로 널리 사용되어 문서와 자료가 풍부함
- ESLint와의 충돌은 `eslint-config-prettier`로 해결 가능

### 대안 검토

- **ESLint 포매팅 규칙만 사용**: ESLint는 린팅에 집중하고 포매팅은 부차적 기능이며, 포매팅 옵션이 Prettier보다 제한적이어서 거부

### 코드 위치

- 설정 파일: `.prettierrc`

---

## 결정 2: Prettier 기본 설정 옵션

**날짜**: 2025-12-10

### 컨텍스트

Prettier를 사용하기로 결정했다면, 기본 포매팅 규칙을 설정해야 함

### 결정

**일반적인 커뮤니티 표준 설정 적용**

- `semi`: `true` - 세미콜론 사용
- `singleQuote`: `true` - 싱글 따옴표 사용
- `tabWidth`: `2` - 들여쓰기 2칸
- `useTabs`: `false` - 스페이스 사용 (탭 미사용)
- `printWidth`: `100` - 줄 길이 100자
- `trailingComma`: `"all"` - 모든 곳에 trailing comma
- `arrowParens`: `"always"` - 화살표 함수 파라미터 항상 괄호
- `endOfLine`: `"lf"` - Unix 줄바꿈

### 근거

- Next.js/React 커뮤니티에서 가장 널리 사용되는 표준 설정
- TypeScript와의 호환성 고려 (세미콜론 사용)
- 코드 일관성과 가독성 확보
- 팀 협업 시 가장 일반적인 설정으로 학습 곡선 최소화
- `printWidth: 100`: JSX/TSX 환경에서 props가 길어지고 중첩이 깊어질 때 80자는 줄바꿈이 과도하게 발생. 모던 모니터 환경과 Next.js/React 프로젝트 표준을 고려하여 100 선택

### 대안 검토

- **줄 길이 80**: JSX/TSX 환경에서 props가 길어지고 중첩이 깊어질 때 줄바꿈이 과도하게 발생하여 가독성이 떨어질 수 있음. 모던 모니터 환경과 Next.js/React 프로젝트 표준을 고려하여 100 선택
- **trailingComma "es5"**: "all"이 더 현대적이고 Git diff를 더 깔끔하게 만들어 "all" 선택
- **arrowParens "avoid"**: "always"가 더 명확하고 TypeScript와의 호환성이 좋아 "always" 선택

### 코드 위치

- 설정 파일: `.prettierrc`
- 실행 스크립트: `package.json` (scripts 섹션)
  - `"format": "prettier --write ."` - 전체 프로젝트 포매팅
  - `"format:check": "prettier --check ."` - 포매팅 검증만 수행 (CI/CD용)

---

## 결정 3: ESLint와 Prettier 통합 방법

**날짜**: 2025-12-10

### 컨텍스트

ESLint와 Prettier가 충돌하지 않도록 통합 설정이 필요함

### 결정

**옵션 1: eslint-config-prettier만 사용**

- Prettier와 충돌하는 ESLint 규칙만 비활성화
- Prettier는 별도로 실행
- ESLint와 Prettier의 역할을 명확히 분리

### 근거

- **역할 분리**: ESLint는 린팅(코드 품질, 버그 방지), Prettier는 포매팅(코드 스타일)으로 관심사 분리 원칙에 부합
- **성능**: ESLint 실행 속도 유지. `eslint-plugin-prettier`는 ESLint 내부에서 Prettier를 실행하여 속도 저하 발생 가능
- **Prettier 공식 권장**: Prettier 공식 문서에서도 `eslint-config-prettier`만 사용하는 것을 권장
- **실행 방식**: 개발 중에는 에디터에서 저장 시 Prettier 자동 실행, 커밋 전에는 `lint-staged` 등으로 두 도구를 순차 실행 가능

### 대안 검토

- **옵션 2 (eslint-config-prettier + eslint-plugin-prettier)**: ESLint 실행 속도 저하 가능성과 관심사 분리 원칙에 맞지 않아 거부. 하나의 명령어로 실행 가능한 장점보다 역할 분리와 성능이 더 중요

### 코드 위치

- 설정 파일: `eslint.config.mjs`
- 패키지: `eslint-config-prettier` (devDependencies)

---

## 결정 4: 자동 포매팅 실행 시점

**날짜**: 2025-12-10

### 컨텍스트

포매팅을 언제 자동으로 실행할지 결정해야 함

### 결정

**옵션 4: 조합 (저장 시 + 커밋 전)**

- **저장 시**: 에디터에서 자동 포매팅 (VS Code 등)
- **커밋 전**: husky + lint-staged로 ESLint와 Prettier 자동 실행
- 개발 중에는 즉시 포매팅 적용, 커밋 전에는 최종 검증 및 수정

### 근거

- **저장 시 포매팅**: 개발 중 즉시 포매팅이 적용되어 코드 스타일을 유지하며 개발 가능
- **커밋 전 검증**: 모든 팀원에게 일관된 적용 보장, 포매팅되지 않은 코드가 저장소에 커밋되는 것을 방지
- **이중 안전장치**: 저장 시 포매팅을 놓쳤더라도 커밋 전에 자동으로 수정되어 안전함
- **개발 경험**: 저장 시 즉시 포매팅으로 개발 흐름이 끊기지 않음

### 대안 검토

- **옵션 1 (저장 시만)**: 에디터 설정이 없는 팀원이나 다른 에디터 사용 시 일관성 보장 어려움
- **옵션 2 (커밋 전만)**: 개발 중 포매팅이 적용되지 않아 코드 스타일이 일관되지 않을 수 있음
- **옵션 3 (빌드 전만)**: 수동 실행 필요로 자동화 부족

### 코드 위치

- Git hook: `.husky/pre-commit`
- lint-staged 설정: `package.json` (lint-staged 필드)
- 에디터 설정: `.vscode/settings.json` (VS Code 사용자용 예시)

---

## 결정 5: .prettierignore 파일 생성

**날짜**: 2025-12-10

### 컨텍스트

일부 파일/디렉토리는 포매팅에서 제외해야 함. 빌드 결과물, 의존성, 생성된 파일들은 포매팅 대상이 아님

### 결정

**다음 항목들을 제외:**

- `node_modules/`, `.pnp/`, `.pnp.*` - 의존성 패키지
- `.next/`, `out/`, `build/`, `dist/` - 빌드 결과물
- `coverage/` - 테스트 커버리지 리포트
- `yarn.lock`, `package-lock.json`, `pnpm-lock.yaml` - 락 파일 (자동 생성)
- `*.min.js`, `*.min.css` - 압축된 파일
- `.DS_Store`, `*.tsbuildinfo`, `next-env.d.ts` - 시스템/생성 파일

### 근거

- 빌드 결과물과 의존성은 포매팅할 필요가 없고, 포매팅 시 불필요한 리소스 낭비
- 락 파일은 패키지 매니저가 자동 생성하므로 수동 포매팅 불필요
- 압축된 파일은 이미 최적화되어 있어 포매팅 의미 없음
- 시스템 파일과 TypeScript 생성 파일은 포매팅 대상이 아님

### 대안 검토

- **일부 항목만 제외**: 모든 생성 파일을 제외하는 것이 안전하고 명확함

### 코드 위치

- 설정 파일: `.prettierignore`
