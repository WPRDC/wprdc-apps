import type { PropsWithChildren, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { A } from "@wprdc/ui";

export function Section(
  props: PropsWithChildren<
    React.HTMLProps<HTMLDivElement> & {
      label?: string;
      description?: ReactNode;
      defaultOpen?: boolean;
      datasetLinks?: string[];
    }
  >,
): React.ReactElement {
  return (
    <section
      id={props.id}
      className={twMerge(
        "group/section mt-3 rounded border border-stone-200 bg-white p-3",
        props.className,
      )}
    >
      <div className="list-none decoration-2 hover:text-stone-800">
        <div className="flex w-full items-center justify-between">
          {!!props.label && (
            <h2 className="text-2xl font-bold">{props.label}</h2>
          )}
        </div>
        {!!props.description && (
          <p className="mt-2 mb-1 text-sm">{props.description}</p>
        )}
      </div>

      <div className="box-content px-0 py-4">{props.children}</div>

      {!!props.datasetLinks && !!props.datasetLinks.length && (
        <div className="pt-2 pr-0">
          <h3 className="text-lg font-bold">
            Source{props.datasetLinks?.length === 1 ? "" : "s"}
          </h3>
          <ul>
            {props.datasetLinks.map((link) => (
              <li key={link}>
                <A href={link} className="text-sm" target="_blank">
                  {link}
                </A>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
