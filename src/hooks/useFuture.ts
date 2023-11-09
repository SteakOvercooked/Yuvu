import { useEffect } from 'react';

import useLazyRef from './useLazyRef';
import { makeFuture } from 'src/future';

const useFuture = <TValue, TError>() => {
  const future = useLazyRef(makeFuture<TValue, TError>);

  useEffect(() => {
    let mounted = true;
    future.current.thenable.then(() => {
      if (mounted) {
        future.current = makeFuture();
      }
    });

    return () => {
      mounted = false;
    };
  });

  return [
    () => future.current.controller,
    () => future.current.thenable,
  ] as const;
};

export default useFuture;
