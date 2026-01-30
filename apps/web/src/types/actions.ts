/*
 * A generic type for action responses.
 * where T is the type of the data returned on success.
 * */
export type ActionRes<T = void> = T extends void
  ? { success: true } | { success: false; error: string }
  : { success: true; data: T } | { success: false; error: string };
