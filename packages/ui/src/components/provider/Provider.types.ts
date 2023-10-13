import type { ReactNode } from "react";

/**
 *
 * Provider types
 *
 **/
export interface ProviderProps {
  usingSSR?: boolean;
  usingNextJS?: boolean;
  children: ReactNode;
}

export type ProviderContext = Pick<ProviderProps, "usingNextJS">;
