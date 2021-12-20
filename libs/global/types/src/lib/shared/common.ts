export type Nullable<T> = T | null | undefined;

export type NonNull<T> = T extends null | undefined ? never : T;
