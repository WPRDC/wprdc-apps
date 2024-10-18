import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { TbCaretDown, TbCaretRight } from "react-icons/tb";

export function Section(
  props: PropsWithChildren<
    React.HTMLProps<
      HTMLDivElement & {
        label?: string;
      }
    >
  >,
): React.ReactElement {
  return (
    <details className={twMerge("group/section mt-5 p-2", props.className)}>
      <summary className="group/sectionsummary flex w-fit cursor-pointer list-none items-center decoration-2 hover:text-stone-800">
        <TbCaretRight className="block size-6 group-open/section:hidden"></TbCaretRight>
        <TbCaretDown className="hidden size-6 group-open/section:block"></TbCaretDown>
        {!!props.label && (
          <h2 className="group-hover/sectionsummary:bg-primary px-1 text-3xl font-bold">
            {props.label}
          </h2>
        )}
      </summary>
      <div className="ml-2.5 box-content border-l-4 border-black p-4 pl-8 pr-0">
        {props.children}
      </div>
    </details>
  );
}
