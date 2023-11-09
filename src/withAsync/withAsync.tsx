import { useEffect, useState, useRef } from 'react';

import useFuture from 'src/hooks/useFuture';
import type {
  WithAsyncRequiredProps,
  AsyncOpener,
  AsyncModal,
} from './withAsync.type';
import type { Thenable } from 'src/future';

const DEFAULT_YUID = 'yuvu-modal';

export const withAsync = <TMixedProps extends WithAsyncRequiredProps<any, any>>(
  ModalComponent: (props: TMixedProps) => React.ReactNode
): [AsyncModal<TMixedProps>, AsyncOpener<TMixedProps>] => {
  const modalStore = new Map<
    string,
    [(params?: unknown) => void, () => Thenable<unknown, unknown>]
  >();

  // false-positive
  /* eslint-disable react/prop-types */
  const AsyncModal: AsyncModal<TMixedProps> = ({
    yuid = DEFAULT_YUID,
    ...rest
  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [controller, thenable] = useFuture<any, any>();
    const params = useRef<unknown>(undefined);

    useEffect(() => {
      let mounted = true;

      const openModal = (modalParams?: unknown) => {
        params.current = modalParams;
        setIsOpen(true);
        thenable().then(() => {
          if (mounted) {
            setIsOpen(false);
          }
        });
      };

      modalStore.set(yuid, [openModal, thenable]);

      return () => {
        mounted = false;
        modalStore.delete(yuid);
      };
    }, [yuid]);

    // lying about the type, no way to construct props at runtime based on the type of props of ModalComponent
    return (
      <ModalComponent
        {...({
          controller,
          isOpen,
          params: params.current,
          ...rest,
        } as unknown as TMixedProps)}
      />
    );
  };

  const open = (config?: { params: unknown; yuid?: string }) => {
    const yuid = config?.yuid ?? DEFAULT_YUID;
    const exposed = modalStore.get(yuid);

    if (exposed === undefined) {
      return undefined;
    }

    const [openModal, thenable] = exposed;
    openModal(config?.params);

    return thenable();
  };

  return [AsyncModal, open as AsyncOpener<TMixedProps>];
};
