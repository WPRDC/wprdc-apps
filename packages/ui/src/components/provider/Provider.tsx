/**
 *
 * Provider
 *
 * Provides context for library components
 *
 **/
import * as React from "react";
import { createContext, useContext } from "react";
import { SSRProvider, OverlayProvider } from "react-aria";
import type { ProviderContext, ProviderProps } from "./Provider.types.ts";

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
    return (
      <Context.Provider value={context}>
        <SSRProvider>
          <OverlayProvider>{children}</OverlayProvider>
        </SSRProvider>
      </Context.Provider>
    );
  }
  return (
    <Context.Provider value={context}>
      <OverlayProvider>{children}</OverlayProvider>
    </Context.Provider>
  );
}

export function useProvider(): ProviderContext {
  return useContext(Context);
}
