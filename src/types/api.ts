export type ApiSuccess<T> = {
  success: true;
  status: number;
  data: T;
};

export type ApiError = {
  success: false;
  status: number;
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

export type ApiResult<T> = ApiSuccess<T> | ApiError;

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
  nextPage: number | null;
}
