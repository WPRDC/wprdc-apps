import type { PropsWithChildren, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { A } from "@wprdc/ui";
import { ScrollTopButton } from "@/components/scroll-top-button.tsx";

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
        "group/section mt-5 scroll-mt-24 px-4 pb-2 pt-2",
        props.className,
      )}
    >
      <div className="list-none  decoration-2 hover:text-stone-800">
        <div className="flex w-full items-center justify-between">
          {!!props.label && (
            <h2 className="text-3xl font-bold">{props.label}</h2>
          )}
        </div>
        {!!props.description && (
          <p className="mb-3 mt-2">{props.description}</p>
        )}
      </div>


      <div className="box-content px-0 py-4">{props.children}</div>

      {!!props.datasetLinks && !!props.datasetLinks.length && (
        <div className="pt-4 pr-0">
          <h3 className="mb-1 text-xl font-bold">
            Source{props.datasetLinks?.length === 1 ? "" : "s"}
          </h3>
          <ul>
            {props.datasetLinks.map((link) => (
              <li key={link}>
                <A href={link} target="_blank">
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
