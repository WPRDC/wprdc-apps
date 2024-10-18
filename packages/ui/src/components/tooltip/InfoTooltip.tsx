"use client";

import React from "react";
import { Button, DialogTrigger, Header } from "react-aria-components";
import { BiInfoCircle } from "react-icons/bi";
import { TiInfoLarge as InfoIcon } from "react-icons/ti";
import type { InfoTooltipProps } from "./InfoTooltip.types";
import { Popover } from "./Popover";

export function InfoTooltip({
  info,
  size = "S",
}: InfoTooltipProps): React.ReactElement {
  return (
    <DialogTrigger>
      <Button className="text-cyan-400 hover:text-blue-600">
        {size === "S" ? (
          <InfoIcon className="size-3" />
        ) : (
          <BiInfoCircle className="size-5" />
        )}
      </Button>
      <Popover>
        <Header className="mb-1 font-mono text-xs font-bold uppercase text-gray-500">
          Info
        </Header>
        <div className="italic">{info}</div>
      </Popover>
    </DialogTrigger>
  );
}
