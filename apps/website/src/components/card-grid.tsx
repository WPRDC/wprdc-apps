import { PropsWithChildren } from "react";

export function CardGrid({ children }: PropsWithChildren<{}>) {
  return (
    <ul className="my-8 grid grid-cols-3 items-stretch gap-6">{children}</ul>
  );
}
