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
      <div className="ui-mx-auto ui-max-w-lg ui-border ui-border-red-600 ui-bg-red-50 ui-p-2 ui-text-center ui-shadow-md ui-shadow-red-800 dark:ui-bg-red-950">
        <div className="ui-font-mono ui-text-lg ui-font-bold ui-uppercase">
          {title}
        </div>
        <div className="ui-font-medium">{message}</div>
      </div>
    );
  return (
    <div className="ui-flex ui-w-max ui-items-center ui-border ui-border-red-600 ui-bg-red-50 ui-px-2 ui-shadow-md ui-shadow-red-700 dark:ui-bg-red-950">
      <div className="ui-font-mono ui-text-lg ui-font-bold ui-uppercase">
        {title}
      </div>
      <div className="ui-px-2">-</div>
      <div className="text-sm ui-font-semibold">{message}</div>
    </div>
  );
}
