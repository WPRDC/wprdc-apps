import type { PropsWithChildren, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { TbCaretDown, TbCaretRight } from "react-icons/tb";

export function Section(
  props: PropsWithChildren<
    React.HTMLProps<HTMLDivElement> & {
      label?: string;
      description?: ReactNode;
      defaultOpen?: boolean;
    }
  >,
): React.ReactElement {
  return (
    <details
      className={twMerge("group/section mt-5 p-2", props.className)}
      open={props.defaultOpen}
    >
      <summary className="group/sectionsummary cursor-pointer list-none decoration-2 hover:text-stone-800">
        <div className="flex w-fit items-center">
          <TbCaretRight className="block size-6 group-open/section:hidden"></TbCaretRight>
          <TbCaretDown className="hidden size-6 group-open/section:block"></TbCaretDown>
          {!!props.label && (
            <h2 className="group-hover/sectionsummary:bg-primary px-1 text-3xl font-bold">
              {props.label}
            </h2>
          )}
        </div>
        {!!props.description && (
          <p className="ml-2.5 border-l-4 border-transparent pl-3.5 italic group-open/section:border-black">
            {props.description}
          </p>
        )}
      </summary>
      <div className="ml-2.5 box-content border-l-4 border-black p-4 pl-8 pr-0">
        {props.children}
      </div>
    </details>
  );
}
