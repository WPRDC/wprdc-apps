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
}: LoadingMessageProps): React.ReactElement {
  const displayName = name ? ` ${name}` : "";
  const msg = message || `Loading ${displayName}...`;
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div>
        <div className="flex flex-col items-center p-1">
          <Spinner />
        </div>
        <div className="p-1 font-semibold italic">{msg}</div>
      </div>
    </div>
  );
}
