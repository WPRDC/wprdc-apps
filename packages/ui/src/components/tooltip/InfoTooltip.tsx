"use client";
import { Button, DialogTrigger, Header } from "react-aria-components";
import { TiInfoLarge as InfoIcon } from "react-icons/ti";
import React from "react";
import { BiInfoCircle } from "react-icons/bi";
import { Popover } from "./Popover";
import type { InfoTooltipProps } from "./InfoTooltip.types";

export function InfoTooltip({
  info,
  size = "S",
}: InfoTooltipProps): React.ReactElement {
  return (
    <DialogTrigger>
      <Button className="text-blue-400 hover:text-blue-600">
        {size === "S" ? (
          <InfoIcon className="size-3" />
        ) : (
          <BiInfoCircle className="size-5" />
        )}
      </Button>
      <Popover>
        <Header className="mb-1 text-xs font-bold text-gray-500">Info</Header>
        <div>{info}</div>
      </Popover>
    </DialogTrigger>
  );
}
