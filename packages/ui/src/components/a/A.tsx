/**
 *
 * A
 *
 * Anchor element for links
 *
 **/
import { Link } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import type { AProps } from "./A.types";

export function A({
  href = "",
  children,
  className,
  ...props
}: AProps): React.ReactElement {
  return (
    <Link
      className={twMerge("font-semibold underline hover:bg-primary", className)}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
