export type Result<V, E> = { err: false; value: V } | { err: true; value: E };

export type Controller<V, E> = {
  ok: (value: V) => void;
  err: (error: E) => void;
};

export type Thenable<V, E> = {
  then: <R>(
    onDone: ((result: Result<V, E>) => R | PromiseLike<R>) | null | undefined
  ) => Promise<R>;
};

export type Future<V, E> = {
  controller: Controller<V, E>;
  thenable: Thenable<V, E>;
};
