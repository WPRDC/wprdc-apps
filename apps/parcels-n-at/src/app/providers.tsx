"use client";

/**
 * For future use of providers, but by wrapping the app in a client component,
 * we are able to safely use useID without hydration mismatches
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
