"use client";

import React from "react";
import { Button, DialogTrigger, Header } from "react-aria-components";
import { BiInfoCircle } from "react-icons/bi";
import { TiInfoLarge as InfoIcon } from "react-icons/ti";
import type { InfoTooltipProps } from "./InfoTooltip.types";
import { Popover } from "./Popover";
import { FaInfo } from "react-icons/fa6";

export function InfoTooltip({
  info,
  size = "S",
  dark = false
}: InfoTooltipProps): React.ReactElement {
  return (
    <DialogTrigger>
      <Button className="">
        {size === "S" ? (
          <FaInfo className="size-3" style={{color: dark ? "#22d3ee": "#0e7490"}} />
        ) : (
          <BiInfoCircle className="size-5" style={{color: dark ? "#22d3ee": "#0e7490"}} />
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
