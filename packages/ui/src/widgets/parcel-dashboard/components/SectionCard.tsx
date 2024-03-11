import type { PropsWithChildren } from "react";
import { Suspense } from "react";
import { twMerge } from "tailwind-merge";
import { Typography } from "../../../components";

export function SectionCard(
  props: PropsWithChildren<
    React.HTMLProps<
      HTMLDivElement & {
        label?: string;
      }
    >
  >,
): React.ReactElement {
  return (
    <section
      className={twMerge(
        "rounded border border-black bg-white p-2 shadow-sm",
        props.className,
      )}
    >
      {!!props.label && <Typography.Label>{props.label}</Typography.Label>}
      <Suspense fallback={<Suspense fallback="Loading" />}>
        {props.children}
      </Suspense>
    </section>
  );
}
