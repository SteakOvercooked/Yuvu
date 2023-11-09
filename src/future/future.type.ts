export type Result<TValue, TError> =
  | { err: false; result: TValue }
  | { err: true; result: TError };

export type Controller<TValue, TError> = {
  ok: (value: TValue) => void;
  err: (error: TError) => void;
};

export type Thenable<TValue, TError> = {
  then: <TReturn>(
    onDone:
      | ((result: Result<TValue, TError>) => TReturn | PromiseLike<TReturn>)
      | null
      | undefined
  ) => Promise<TReturn>;
};

export type Future<TValue, TError> = {
  controller: Controller<TValue, TError>;
  thenable: Thenable<TValue, TError>;
};
