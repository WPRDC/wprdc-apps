/**
 *
 * ErrorMessage
 *
 * [ Shows errors ]
 *
 */
import * as React from "react";
import type { ErrorMessageProps } from "./ErrorMessage.types.ts";

export function ErrorMessage({
  title = "Uncaught Error",
  message = "Please contact the helpdesk.",
  variant,
}: ErrorMessageProps): React.ReactElement {
  if (variant === "centered")
    return (
      <div className="w-full border border-red-600 bg-none text-center text-red-600 shadow-md shadow-red-700">
        <p className="font-mono font-bold uppercase">{title}</p>
        <p className="font-medium">{message}</p>
      </div>
    );
  return (
    <div className="flex w-max border border-red-600 shadow-md shadow-red-700">
      <div className="bg-none px-1 py-0.5 text-red-600">{title}</div>{" "}
      <div className="font-mono font-semibold uppercase">{message}</div>
    </div>
  );
}
