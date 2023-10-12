/**
 *
 * LoadingMessage
 *
 */
import React from "react";
import { Spinner } from "../spinner";
import type { LoadingMessageProps } from "./LoadingMessage.types.ts";

export function LoadingMessage({
  name,
  message,
  size = "M",
}: LoadingMessageProps): React.ReactElement {
  const displayName = name ? ` ${name}` : "";
  let msg = "Loading...";
  if (message) msg = message;
  else if (displayName) `Loading ${displayName}...`;

  return (
    <div className="ui-flex ui-h-full ui-w-full ui-flex-col ui-items-center ui-justify-center">
      <div>
        <div className="ui-flex ui-flex-col ui-items-center ui-p-1 ">
          <Spinner className="" size={size} />
        </div>
        <div className="ui-p-1 ui-font-mono ui-font-semibold ui-uppercase">
          {msg}
        </div>
      </div>
    </div>
  );
}
