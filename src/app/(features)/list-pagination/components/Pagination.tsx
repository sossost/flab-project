'use client';

import { css } from '@emotion/react';

import { Button } from '@/shared/components';
import { theme } from '@/shared/theme';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  return (
    <nav
      aria-label="페이지네이션"
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        gap: ${theme.spacing.sm};
        padding: ${theme.spacing.md};
      `}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="이전 페이지"
      >
        이전
      </Button>

      <div
        css={css`
          display: flex;
          gap: ${theme.spacing.xs};
        `}
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            variant={page === currentPage ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handlePageClick(page)}
            aria-label={`${page}페이지로 이동`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="다음 페이지"
      >
        다음
      </Button>
    </nav>
  );
}
