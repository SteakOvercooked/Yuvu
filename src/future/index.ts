import type { Future, Controller, Result, Thenable } from './future.type';

function future<V, E>(): Future<V, E> {
  let _resolve: (value: Result<V, E> | PromiseLike<Result<V, E>>) => void;
  const promise = new Promise<Result<V, E>>((resolve) => (_resolve = resolve));

  const controller: Controller<V, E> = {
    ok: (value) => _resolve({ err: false, value }),
    err: (error) => _resolve({ err: true, value: error }),
  };

  const thenable: Thenable<V, E> = {
    then: (onDone) => promise.then(onDone),
  };

  return { controller, thenable };
}

export * from './future.type';
export default future;
