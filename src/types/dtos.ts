/**
 * DTO interfaces used for request bodies and service inputs.
 */

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface PromoInput {
  title: string;
  imageUrl: string;
  periodFrom: Date;
  periodTo: Date;
  url?: string;
  featured?: boolean;
}

export interface CarouselSlideInput {
  title?: string | null;
  imageUrl: string;
  href?: string | null;
  order?: number | null;
}

export interface CurrencyRateInput {
  code: string;
  buy: number;
  sell: number;
  flagSrc?: string | null;
}