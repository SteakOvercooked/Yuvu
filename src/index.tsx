import { useRef } from 'react';

export const Com = ({ children }: React.PropsWithChildren) => {
  const ref = useRef<HTMLDivElement>(null);

  return <div ref={ref}>{children}</div>;
};
