/**
 *
 * A
 *
 * Anchor element for links
 *
 **/

import type { AProps } from "./A.types";

export function A({ href = "", children }: AProps): React.ReactElement {
  return (
    <a className="font-semibold underline hover:bg-primary" href={href}>
      {children}
    </a>
  );
}
