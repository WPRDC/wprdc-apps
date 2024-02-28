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
  children,
}: ProviderProps): React.ReactElement {
  const context: ProviderContext = {
    usingNextJS,
  };
  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export function useProvider(): ProviderContext {
  return useContext(Context);
}
