import type { Controller, Thenable } from 'src/future';

export type WithAsyncRequiredProps<TValue = unknown, TError = unknown> = {
  isOpen: boolean;
  controller: () => Controller<TValue, TError>;
};

export type WithAsyncExtendedProps<
  TValue = unknown,
  TError = unknown,
  TParams = unknown
> = WithAsyncRequiredProps<TValue, TError> & {
  params: TParams;
};

export type YuvuProps = {
  yuid?: string;
};

export type AsyncModal<TMixedProps> = (
  props: YuvuProps & Omit<TMixedProps, keyof WithAsyncExtendedProps>
) => React.ReactNode;

export type AsyncOpener<TMixedProps> =
  TMixedProps extends WithAsyncExtendedProps<
    infer TValue,
    infer TError,
    infer TParams
  >
    ? (
        config: { params: TParams } & YuvuProps
      ) => Thenable<TValue, TError> | undefined
    : TMixedProps extends WithAsyncRequiredProps<infer TValue, infer TError>
    ? (config?: YuvuProps) => Thenable<TValue, TError> | undefined
    : never;
