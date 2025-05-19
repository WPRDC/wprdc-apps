import type { PropsWithChildren, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { A, Button } from "@wprdc/ui";
import { BiChevronUpCircle, } from "react-icons/bi";

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
        "group/section mt-5 scroll-mt-24 px-4 pt-2 pb-8",
        props.className,
      )}
    >
      <div className="cursor-pointer list-none decoration-2 hover:text-stone-800 border-t-4 border-black">
        <div className="w-full flex items-center justify-between">

        {!!props.label && (
          <h2 className="text-3xl font-bold">
            {props.label}
          </h2>
        )}

          <a href="#menu"><Button className="flex items-center"><BiChevronUpCircle/><div className="pl-">Back to Top</div></Button></a>

        </div>
        {!!props.description && (
          <p className="mt-2 mb-3">
            {props.description}
          </p>
        )}
      </div>

      <div className=" box-content py-4 px-0">
        {props.children}
      </div>

      {!!props.datasetLinks && !!props.datasetLinks.length && (
        <div className="py-4 pr-0">
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
