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
