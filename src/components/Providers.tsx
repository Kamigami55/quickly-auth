import { Provider as JotaiProvider } from 'jotai';

export function Providers({ children: children }: React.PropsWithChildren) {
  return <JotaiProvider>{children}</JotaiProvider>;
}
