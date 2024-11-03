"use client";

import { PropsWithChildren } from "react";
import { Button } from "react-aria-components";
import { TbSquareRoundedChevronDown, TbX } from "react-icons/tb";
import type { ClickPopupProps, PopupProps } from "../Map.types";
import { PopupRow } from "./PopupRow";

export function HoverPopup({
  features,
  point,
  getPopupID,
}: PopupProps): React.ReactElement | null {
  return (
    <div
      className="pointer-events-none absolute border-2 border-black/40 bg-white/80 backdrop-blur-md"
      style={{ left: point.x + 12, top: point.y + 12 }}
    >
      {features.length > 1 && (
        <div className="px-2 pt-1 text-left text-xs font-bold">
          Click to open selection menu
        </div>
      )}
      <div className="py-2">
        {features.map((feature, i) => (
          <div className="px-1" key={i}>
            {!!i && (
              <div className="flex items-center">
                <div className="w-8 border-t border-stone-700" />
                <div className="mx-1 w-fit flex-shrink italic leading-none">
                  and
                </div>
                <div className="flex-grow border-t border-stone-700" />
              </div>
            )}
            <div className="w-full px-1 py-1 text-left hover:bg-primary/20 hover:backdrop-blur-md">
              <PopupRow feature={feature} pID={getPopupID(feature)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ClickPopup({
  features,
  point,
  getPopupID,
  onClose,
  onNavigate,
}: ClickPopupProps): React.ReactElement | null {
  return (
    <div
      className="absolute z-10 mx-auto rounded-sm border-2 border-black bg-white/80 pb-2 backdrop-blur-md"
      style={{ left: point.x + 12, top: point.y + 12 }}
    >
      <Button
        className="absolute right-1 top-1 font-bold hover:text-red-600"
        onPress={onClose}
      >
        <TbX className="h-4 w-4" />
      </Button>
      <div className="flex items-center space-x-1 px-2 pt-1 text-left text-xs font-bold">
        <TbSquareRoundedChevronDown />
        <div>Select a parcel</div>
      </div>
      <div className="flex flex-col items-stretch px-1 pt-2">
        {features.map((feature, i) => (
          <div key={`${i}`}>
            {!!i && (
              <div className="flex items-center">
                <div className="w-8 flex-shrink border-t border-stone-700" />
                <div className="mx-1 w-fit flex-shrink italic leading-none">
                  or
                </div>
                <div className="flex-grow border-t border-stone-700" />
              </div>
            )}
            <Button
              className="w-full px-1 py-1 text-left hover:bg-primary/20 hover:backdrop-blur-md"
              onPress={() => {
                onNavigate(feature);
              }}
            >
              <PopupRow feature={feature} pID={getPopupID(feature)} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SimplePopupWrapper({
  children,
  point,
}: PropsWithChildren<{ point: PopupProps["point"] }>): React.ReactElement {
  return (
    <div
      className="pointer-events-none absolute border-2 border-black/40 bg-white/80 backdrop-blur-md"
      style={{ left: point.x + 12, top: point.y + 12 }}
    >
      {children}
    </div>
  );
}
