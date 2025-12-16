# 검색 피쳐 의사결정 문서

## 개요

검색 기능 구현을 위한 의사결정을 기록합니다. 사용자 인터랙션 방식에 따라 **1) 명시적 Submit 방식**과 **2) 암묵적 Debounce 방식**으로 나누어 각각의 최적화 전략과 상태 관리 방식을 정의합니다.

---

## 결정 1: 검색 상태 관리 위치 (URL 동기화)

**날짜**: 2025-12-16

### 컨텍스트

검색어를 컴포넌트 내부 상태(`useState`)로만 관리할지, URL 쿼리 파라미터(`?q=keyword`)와 동기화할지 결정해야 함

### 결정

**URL Query Parameter를 진실의 원천(Source of Truth)으로 사용**

- **상태 원천**: URL (`searchParams`)
- **초기화**: 컴포넌트 마운트 시 URL의 `q` 파라미터 값을 읽어 RHF(React Hook Form)의 `defaultValues`에 주입
- **업데이트**: 검색 동작 발생 시 `router`를 통해 URL을 변경하고, 변경된 URL을 감지하여 API 요청 트리거

### 근거

- **공유 및 북마크**: 사용자가 검색 결과를 공유하거나 북마크했을 때 동일한 결과를 보장해야 함
- **새로고침 유지**: 새로고침 시에도 검색 맥락이 유지되어야 함
- **브라우저 히스토리**: 뒤로가기/앞으로가기 탐색 시 자연스러운 UX 제공

### 대안 검토

- **Local State (`useState`)**: 구현은 간단하나 새로고침 시 데이터가 휘발되고 공유가 불가능하여 검색 페이지에 부적합

### 코드 위치

- 페이지 컴포넌트: `src/app/(features)/search-with-submit/page.tsx`, `src/app/(features)/search-without-submit/page.tsx`

---

## 결정 2: Submit 기반 검색 구현 전략 (`search-with-submit`)

**날짜**: 2025-12-16

### 컨텍스트

사용자가 검색 버튼을 눌렀을 때만 요청이 발생해야 하는 시나리오. 불필요한 리렌더링과 요청을 방지해야 함

### 결정

**Uncontrolled Input (`register`) + `handleSubmit` 조합**

- **입력 감지**: `watch`를 **사용하지 않음**. `register`만 사용하여 비제어 컴포넌트(Uncontrolled Component)로 관리
- **트리거**: 폼의 `onSubmit` 이벤트(`handleSubmit`)가 발생했을 때만 로직 실행
- **동작 흐름**: 사용자 입력(렌더링 X) → Submit 버튼 클릭 → URL 업데이트(`router.push`)

### 근거

- **렌더링 최적화**: `watch` 사용 시 타이핑할 때마다 리렌더링이 발생하는데, Submit 방식에서는 이것이 불필요한 리소스 낭비임 (Anti-Pattern 방지)
- **의도 명확성**: 사용자가 명시적으로 검색 의사를 밝혔을 때만 상태를 업데이트함

### 코드 예시

```tsx
const { register, handleSubmit } = useForm();
// ❌ const keyword = watch('keyword'); // 절대 금지

const onSubmit = (data) => {
  router.push(`?q=${data.keyword}`);
};
```

---

## 결정 3: Debounce 기반 검색 구현 전략 (`search-without-submit`)

**날짜**: 2025-12-16

### 컨텍스트별도의 버튼 없이 타이핑만으로 검색이 되어야 하는 시나리오. 과도한 API 요청을 막고 자연스러운 경험을 제공해야 함

### 결정

**`watch` + `useDebounce` Hook + `useEffect` 조합**

- **입력 감지**: RHF `watch`를 사용하여 입력값을 실시간 구독
- **지연 처리**: 커스텀 `useDebounce` 훅으로 값 변경을 일정 시간(300~500ms) 지연
- **트리거**: Debounce 된 값이 변경되었을 때 `useEffect`에서 URL 업데이트
- **히스토리 관리**: `router.replace` 사용 (결정 4 참고)

### 근거

\* **실시간 반응성**: 별도의 액션 없이 즉각적인 피드백 제공

- **서버 부하 방지**: 모든 키입력마다 요청하지 않고, 입력이 멈췄을 때만 요청

### 코드 위치

- 검색 폼 컴포넌트: `src/app/(features)/search-without-submit/components/DebouncedSearchInput.tsx`
- 훅: `src/shared/hooks/useDebounce.ts`

---

## 결정 4: 브라우저 히스토리 관리 전략 (`push` vs `replace`)

**날짜**: 2025-12-16

### 컨텍스트검색 방식에 따라 브라우저 히스토리에 기록을 남길지 말지 결정해야 함. 특히 실시간 검색 시 뒤로가기 경험을 고려해야 함

### 결정

**방식에 따른 차별화 전략**

- **Submit 방식**: `router.push` 사용
- 명시적인 검색 행위이므로 히스토리에 남겨 "뒤로 가기" 시 이전 검색 결과로 돌아갈 수 있게 함

- **Debounce 방식**: `router.replace` 사용
- 타이핑 중간 과정(예: 'ㄱ', '가', '강', '강아', '강아지')이 모두 히스토리에 남으면 "뒤로 가기 지옥"이 발생하므로 현재 엔트리를 교체함

### 근거

\* **UX 보호**: Debounce 방식에서 `push`를 사용하면 사용자가 이전 페이지로 돌아가기 위해 뒤로가기를 수십 번 눌러야 하는 나쁜 경험을 하게 됨

---

## 결정 5: 쿼리 실행 제어 및 로딩 UX (`keepPreviousData`)

**날짜**: 2025-12-16

### 컨텍스트

검색어 변경 시 **깜빡임 없는 로딩 처리**가 필요하며, 빈 검색어일 때의 요청 여부는 **페이지 성격(기본 리스트 제공 여부)**에 따라 달라질 수 있음

### 결정

**`placeholderData: keepPreviousData`를 활용한 이전 결과 유지**

- **Submit 방식(`search-with-submit`)**
  - 빈 검색어일 때는 **기본 리스트(전체 포스트)** 를 보여주는 것을 허용
  - 검색어가 변경되면 **이전 검색 결과를 유지**한 채 `isFetching` 상태만으로 로딩을 표현

- **Debounce 방식(`search-without-submit`)**
  - 필요 시 `enabled: !!keyword` 옵션을 통해 **완전히 빈 검색어일 때의 불필요한 요청을 막는 것**을 고려
  - 다만, 현재 과제 범위에서는 Submit 방식과의 일관성을 위해 **공통적으로 keepPreviousData 중심 전략**만 사용

### 근거

- **시각적 안정성**: 리스트가 사라졌다가 다시 나타나는 것보다, 기존 리스트가 유지되다가 교체되는 것이 훨씬 자연스러운 UX임
- **기본 리스트 제공**: Submit 기반 검색 페이지에서는, 검색 전 초기 진입 시 전체 목록을 한 번 보여주는 것이 자연스러운 경우가 많음

### 대안 검토

- **대안 1: `enabled: !!keyword`를 강제 적용**
  - 장점: 완전히 빈 검색어일 때는 요청을 보내지 않아, 리소스 절약에 유리
  - 단점: 검색 페이지 최초 진입 시 아무 데이터도 보이지 않아, \"기본 리스트를 먼저 보여주고 검색으로 좁혀간다\"는 UX와 맞지 않을 수 있음
  - 이번 과제에서는 **초기 진입 시 기본 리스트를 허용하는 UX**를 선택하여, `enabled` 강제 전략은 적용하지 않음

### 코드 예시

```tsx
const { data, isFetching } = useQuery({
  queryKey: ['search', keyword],
  queryFn: () => getSearchResults(keyword),
  enabled: !!keyword, // 빈 값 방어
  placeholderData: keepPreviousData, // 깜빡임 방지
});
```

### 코드 위치

- 쿼리 훅: `src/shared/hooks/useSearchPosts.ts`
- API 함수: `src/shared/api/search.ts`
- 검색 결과 컨테이너: `src/shared/components/search/SearchResultContainer.tsx`
