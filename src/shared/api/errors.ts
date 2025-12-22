import { ApiError } from './types';

type RedirectButtonConfig = {
  href: string;
  label: string;
};

type ErrorVariant = 'page' | 'widget';

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
