import { Nullable } from '@brewdude/global/types';

export function isNullOrUndefined(objectToValidate: Nullable<unknown>) {
  return objectToValidate === undefined || objectToValidate === null;
}
