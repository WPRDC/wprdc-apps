import { twMerge } from "tailwind-merge";
import {
  type CodeProps,
  type DialogTitleProps,
  type LabelProps,
  type NoteProps,
} from "./Typography.types";

function Label({ children, className }: LabelProps): React.ReactElement {
  return (
    <div
      className={twMerge(
        "text-xs font-black uppercase text-stone-500",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Note({ children, className }: NoteProps): React.ReactElement {
  return (
    <div className={twMerge("text-sm italic text-gray-800", className)}>
      {children}
    </div>
  );
}

function Code({
  block = false,
  children,
  className,
}: CodeProps): React.ReactElement {
  return (
    <span
      className={twMerge(
        "box-content inline rounded border border-stone-400 bg-stone-100 px-0.5 font-mono text-sm font-medium not-italic text-wprdc-700",
        block && "block",
        className,
      )}
    >
      {children}
    </span>
  );
}

function DialogTitle({
  children,
  className,
}: DialogTitleProps): React.ReactElement {
  return (
    <div className={twMerge("text-2xl font-semibold", className)}>
      {children}
    </div>
  );
}

export const Typography = {
  Label,
  Note,
  Code,
  DialogTitle,
};
