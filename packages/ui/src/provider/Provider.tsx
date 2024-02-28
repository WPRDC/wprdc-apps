/**
 *
 * Provider
 *
 * Provides context for library components
 *
 **/

import { createContext, useContext } from "react";
import type { ProviderContext, ProviderProps } from "./Provider.types";

const Context = createContext<ProviderContext>({});
Context.displayName = "ProviderContext";

export function Provider({
  usingNextJS = false,
  usingSSR = false,
  children,
}: ProviderProps): React.ReactElement {
  const context: ProviderContext = {
    usingNextJS,
  };

  if (usingNextJS || usingSSR) {
    return <Context.Provider value={context}>{children}</Context.Provider>;
  }
  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export function useProvider(): ProviderContext {
  return useContext(Context);
}
