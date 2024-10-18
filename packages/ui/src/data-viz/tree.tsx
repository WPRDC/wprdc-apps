import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { type Value } from "@wprdc/types";

export interface TreeVizItemProps<T extends Value> {
  id: number | string;

  /** Icon to prepend to label */
  icon?: IconType;

  /** Short label for this value in the tree */
  label: ReactNode;

  /** The value to display at this part of the tree*/
  value?: T;

  /** Function to render the value (e.g. i18n, color based on value) */
  format?: (value: Value) => ReactNode;

  /** Extra information that describes the value.  Used in tooltips. */
  info?: string;

  items?: TreeVizItemProps<Value>[];

  /** Set true for toplevel items (for styling) */
  root?: boolean;
}

export interface TreeVizProps {
  /** Unique identifier */
  id: number | string;

  /** The items to display in the tree */
  items: TreeVizItemProps<Value>[];

  /** Label for the tree */
  label: ReactNode;

  /** Function to render the value (e.g. i18n, color based on value) */
  format?: (value: Value) => ReactNode;

  /** Extra information that describes the value.  Used in tooltips. */
  info?: string;

  /** Icon to prepend to label */
  icon?: IconType | "div";

  className?: string;
}

export function TreeViz({
  label,
  items,
  icon: Icon,
}: TreeVizProps): React.ReactElement {
  return (
    <div className="w-fit rounded-sm border border-black">
      <div className="flex items-center space-x-1 bg-black px-2 py-1.5 text-white">
        {!!Icon && <Icon />}
        <div className="pr-1 font-mono text-sm uppercase leading-none">
          {label}
        </div>
      </div>
      <ul className="bg-white p-2">
        {items.map((item) => (
          <TreeVizItem key={item.id} {...item} root />
        ))}
      </ul>
    </div>
  );
}

export function TreeVizItem<T extends Value = Value>({
  label,
  icon: Icon,
  items,
  format = (v) => v,
  value,
}: TreeVizItemProps<T>): React.ReactElement {
  return (
    <li className="mt-2 pr-1">
      <div className="flex items-center leading-none">
        <div className="flex items-center font-mono text-sm font-medium leading-none text-black">
          {!!Icon && <Icon />}
          <div className="leading-none">{label}</div>:
        </div>
        <div className="ml-1 font-mono text-lg font-black leading-none">
          {format(value)}
        </div>
      </div>

      {!!items && (
        <ul className="ml-2 border-l-2 border-stone-700 pl-2">
          {items.map((item) => (
            <TreeVizItem key={item.id} {...item} />
          ))}
        </ul>
      )}
    </li>
  );
}
