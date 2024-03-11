/**
 *
 * ErrorMessage
 *
 * [ Shows errors ]
 *
 */

import type { ErrorMessageProps } from "./ErrorMessage.types";

export function ErrorMessage({
  title = "Uncaught Error",
  message = "Please contact the helpdesk.",
  variant,
}: ErrorMessageProps): React.ReactElement {
  if (variant === "centered")
    return (
      <div className="mx-auto max-w-lg border border-red-600 bg-red-50 p-2 text-center shadow-md shadow-red-800 dark:bg-red-950">
        <div className="font-mono text-lg font-bold uppercase">{title}</div>
        <div className="font-medium">{message}</div>
      </div>
    );
  return (
    <div className="flex w-max items-center border border-red-600 bg-red-50 px-2 shadow-md shadow-red-700 dark:bg-red-950">
      <div className="font-mono text-sm font-bold uppercase">{title}</div>
      <div className="px-2">-</div>
      <div className="text-sm font-semibold">{message}</div>
    </div>
  );
}
