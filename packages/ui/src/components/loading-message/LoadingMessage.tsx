/**
 *
 * LoadingMessage
 *
 */
import React from "react";
import { Spinner } from "../spinner";
import type { LoadingMessageProps } from "./LoadingMessage.types";

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
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div>
        <div className="flex flex-col items-center p-1 ">
          <Spinner className="" size={size} />
        </div>
        <div className="p-1 font-mono font-semibold uppercase">{msg}</div>
      </div>
    </div>
  );
}
