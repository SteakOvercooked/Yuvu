import type { Future, Controller, Result, Thenable } from './future.type';

export function makeFuture<TValue, TError>(): Future<TValue, TError> {
  let _resolve: (
    value: Result<TValue, TError> | PromiseLike<Result<TValue, TError>>
  ) => void;
  const promise = new Promise<Result<TValue, TError>>(
    (resolve) => (_resolve = resolve)
  );

  const controller: Controller<TValue, TError> = {
    ok: (value) => _resolve({ err: false, result: value }),
    err: (error) => _resolve({ err: true, result: error }),
  };

  const thenable: Thenable<TValue, TError> = {
    then: (onDone) => promise.then(onDone),
  };

  return { controller, thenable };
}

export * from './future.type';
