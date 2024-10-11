import { ReactNode } from 'react';

/**
 * Mocked Markdown component
 */
export default function Markdown({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
