export type ExpectedError = {
  status: number;
  message: string;
};

/*
 *typescript utility for handling async operations with error handling
 **/
type Ok<T> = { ok: true; data: T };
type Err<E> = { ok: false; error: E };

export type Result<T, E> = Ok<T> | Err<E>;

export type PromiseRes<T, E = Error> = Promise<Result<T, E>>;

/*
 *
 *result function
 * **/
export function ok<T>(data: T): Ok<T> {
  return { ok: true, data };
}

/*
 *
 *error function
 * **/
export function err<E>(error: E): Err<E> {
  return { ok: false, error };
}

/*
 * AttemptArg : type for the argument of attempt function
 * **/
type AttemptArg<T> = () => Promise<T>;

/*
 * ErrorType : union type for Error and ExpectedError
 * **/
type ErrorType = Error | ExpectedError;
/*
 *
 * actual attempt function | axios overloaded
 *
 * **/

export async function attempt<T, E = ErrorType>(
  fn: AttemptArg<T>,
  opts?: {
    onTearDown?: () => void;
  }
): Promise<Result<T, E>> {
  try {
    const result = await fn();

    return ok(result as T);
  } catch (error: any) {
    //Axios specific error handling

    return err(error as E);
  } finally {
    opts?.onTearDown?.();
  }
}

/**
 * andThenAsync function : chains asynchronous Result operations
 * **/
export async function andThenAsync<T, E, U>(
  result: Promise<Result<T, E>> | Result<T, E>,
  fn: (value: T) => Promise<Result<U, E>>
): Promise<Result<U, E>> {
  const resolved = await result;
  if (!resolved.ok) return resolved;
  return fn(resolved.data);
}

/*
 * A Synchronous version of attempt function
 * **/
export function attemptSync<T, E = Error>(fn: () => T): Result<T, E> {
  try {
    return ok(fn());
  } catch (error: any) {
    return err(error as E);
  }
}

/*
 * this andThen function : chains Result operations
 * **/
export function andThen<T, E, U>(
  result: Result<T, E>,
  fn: (value: T) => Result<U, E>
): Result<U, E> {
  if (!result.ok) return result;
  return fn(result.data);
}
