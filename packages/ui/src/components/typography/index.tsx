import { twMerge } from "tailwind-merge";
import type { LabelProps, NoteProps } from "./Typography.types";

function Label({ children, className }: LabelProps): React.ReactElement {
  return (
    <div
      className={twMerge(
        "font-roboto text-xs font-black uppercase text-stone-500",
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

export const Typography = {
  Label,
  Note,
};
