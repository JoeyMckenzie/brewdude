import { Nullable } from './common';

export interface BrewdudeApiResponse<T> {
  success: boolean;
  message?: string;
  data?: Nullable<T>;
}

export interface BrewdudeHandlerResponse<T> {
  data?: Nullable<T>;
  error?: Error;
}
