/**
 *
 * LoadingMessage
 *
 */
import React from "react";
import { Spinner } from "../spinner";
import type { LoadingMessageProps } from "./LoadingMessage.types";
import { twMerge } from "tailwind-merge";

export function LoadingMessage({
  name,
  message,
  size = "M",
}: LoadingMessageProps): React.ReactElement {
  const displayName = name ? ` ${name}` : "";
  let msg = "Loading...";
  if (message) msg = message;
  else if (displayName) msg = `Loading ${displayName}...`;

  return (
    <div
      className={twMerge(
        "flex h-full w-full items-center justify-center",
        size !== "S" && "flex-col",
      )}
    >
      <div className="flex items-center p-1">
        <Spinner className="" size={size} />
      </div>
      <div
        className={twMerge(
          "p-1 font-mono font-semibold uppercase",
          size === "S" && "text-xs",
          size === "L" && "text-lg",
        )}
      >
        {msg}
      </div>
    </div>
  );
}
