'use client';

import Link from 'next/link';

import { css } from '@emotion/react';

import { theme } from '@/shared/theme';
import { pxToRem } from '@/shared/utils';

const features = [
  {
    title: '페이지네이션 목록',
    description: '페이지 번호를 사용한 전통적인 페이지네이션',
    href: '/list-pagination',
  },
  {
    title: '무한스크롤 목록',
    description: '스크롤을 내리면 자동으로 다음 데이터를 로드',
    href: '/list-infinite',
  },
  {
    title: '검색 (Submit 버튼)',
    description: '검색 버튼을 클릭하여 검색 실행',
    href: '/search-with-submit',
  },
  {
    title: '검색 (Debounce)',
    description: '입력 중 자동으로 검색 실행 (디바운스 적용)',
    href: '/search-without-submit',
  },
];

export default function Home() {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: ${theme.spacing.xl};
      `}
    >
      <main
        css={css`
          width: 100%;
          max-width: ${pxToRem(800)};
        `}
      >
        <h1
          css={css`
            font-size: ${pxToRem(32)};
            font-weight: bold;
            margin-bottom: ${theme.spacing.md};
            text-align: center;
          `}
        >
          과제 피쳐 목록
        </h1>
        <p
          css={css`
            font-size: ${pxToRem(16)};
            color: ${theme.colors.textSecondary};
            margin-bottom: ${theme.spacing.xl};
            text-align: center;
          `}
        >
          각 피쳐를 클릭하여 이동할 수 있습니다.
        </p>
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(${pxToRem(300)}, 1fr));
            gap: ${theme.spacing.md};
          `}
        >
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              aria-label={`${feature.title}로 이동: ${feature.description}`}
              css={css`
                display: flex;
                flex-direction: column;
                padding: ${theme.spacing.lg};
                border: 1px solid ${theme.colors.border};
                border-radius: ${theme.borderRadius.md};
                background-color: ${theme.colors.background};
                text-decoration: none;
                transition:
                  border-color 0.15s ease,
                  box-shadow 0.15s ease;
                cursor: pointer;

                &:hover {
                  border-color: ${theme.colors.primary};
                  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                &:focus-visible {
                  outline: 2px solid ${theme.colors.primary};
                  outline-offset: 2px;
                  border-color: ${theme.colors.primary};
                }
              `}
            >
              <h2
                css={css`
                  font-size: ${pxToRem(20)};
                  font-weight: 600;
                  margin-bottom: ${theme.spacing.sm};
                  color: ${theme.colors.text};
                `}
              >
                {feature.title}
              </h2>
              <p
                css={css`
                  font-size: ${pxToRem(14)};
                  color: ${theme.colors.textSecondary};
                  line-height: 1.5;
                `}
              >
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
