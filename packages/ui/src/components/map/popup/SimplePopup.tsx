"use client";

import { TbSquareRoundedChevronDown, TbX } from "react-icons/tb";
import { Button } from "react-aria-components";
import type { ClickPopupProps, PopupProps } from "../Map.types";
import { PopupRow } from "./PopupRow";

export function HoverPopup({
  features,
  point,
  getPopupID,
}: PopupProps): React.ReactElement | null {
  return (
    <div
      className="pointer-events-none absolute mx-auto border-2 border-black/40 bg-white/80 pb-2 backdrop-blur-md"
      style={{ left: point.x + 12, top: point.y + 12 }}
    >
      <div className="px-2 py-1 text-left text-xs font-bold">
        {features.length > 1 && "Click to open selection menu"}
      </div>
      {features.map((feature, i) => (
        <div className="px-2" key={feature.id}>
          {!!i && (
            <div className="flex items-center ">
              <div className="w-8 border-t border-stone-700" />
              <div className="mx-1 w-fit flex-shrink pb-0.5 italic">and</div>
              <div className="flex-grow border-t border-stone-700" />
            </div>
          )}
          <PopupRow feature={feature} pID={getPopupID(feature)} />
        </div>
      ))}
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
      <div className="flex items-center space-x-1 px-2 py-1 text-left text-xs font-bold">
        <TbSquareRoundedChevronDown />
        <div>Select a parcel</div>
      </div>
      <div className="flex flex-col items-stretch">
        {features.map((feature, i) => (
          <div key={feature.id}>
            {!!i && (
              <div className="flex items-center">
                <div className="w-8 flex-shrink border-t border-stone-700" />
                <div className="mx-1 w-fit flex-shrink pb-0.5 italic">or</div>
                <div className="flex-grow border-t border-stone-700" />
              </div>
            )}
            <Button
              className="w-full px-2 text-left hover:bg-primary/20 hover:backdrop-blur-md"
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
