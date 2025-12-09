"use client";

import React from "react";
import { Button, DialogTrigger, Header } from "react-aria-components";
import { BiInfoCircle } from "react-icons/bi";
import type { InfoTooltipProps } from "./InfoTooltip.types";
import { Popover } from "./Popover";
import { FaInfo } from "react-icons/fa6";
import { TbAlertCircleFilled } from "react-icons/tb";
import { twMerge } from "tailwind-merge";

export function InfoTooltip({
  info,
  size = "S",
  dark = false,
  warning = false,
}: InfoTooltipProps): React.ReactElement {
  return (
    <DialogTrigger>
      { !warning && (
        <Button className="">
          {size === "S" ? (
            <FaInfo
              className="size-3"
              style={{ color: dark ? "#22d3ee" : "#0e7490" }}
            />
          ) : (
            <BiInfoCircle
              className="size-5"
              style={{ color: dark ? "#22d3ee" : "#0e7490" }}
            />
          )}
        </Button>
      )}
      {warning && (
        <Button
          className={twMerge(
            "flex items-center",
            warning && "border p-0.5 rounded-sm",
            dark
              ? "border-red-600 hover:border-white"
              : "border-red-800 hover:border-black",
          )}
        >
          {size === "S" ? (
            <TbAlertCircleFilled
              className={twMerge(
                "size-4",
                dark
                  ? "text-red-600 hover:text-white"
                  : "text-red-800 hover:text-black",
              )}
            />
          ) : (
            <TbAlertCircleFilled
              className={twMerge(
                "size-5",
                dark
                  ? "text-red-600 hover:text-white"
                  : "text-red-800 hover:text-black",
              )}
            />
          )}
          <div className="text-xs uppercase">Read first</div>
        </Button>
      )}
      <Popover>
        <Header className="mb-1 font-mono text-xs font-bold uppercase text-gray-500">
          Info
        </Header>
        <div className="grow italic">{info}</div>
      </Popover>
    </DialogTrigger>
  );
}
