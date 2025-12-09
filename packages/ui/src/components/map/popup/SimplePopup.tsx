"use client";

import { PropsWithChildren, useMemo } from "react";
import { Button } from "react-aria-components";
import { TbSquareRoundedChevronDown, TbX } from "react-icons/tb";
import type { ClickPopupProps, PopupProps } from "../Map.types";
import { PopupRow } from "./PopupRow";
import { MapGeoJSONFeature } from "react-map-gl/maplibre";

export function HoverPopup({
  features,
  point,
  getContent,
  layers,
}: PopupProps): React.ReactElement | null {
  const filteredFeatures: MapGeoJSONFeature[] = useMemo(() => {
    const filtered: Record<string, MapGeoJSONFeature> = {};

    for (const feature of features) {
      // find the layer the feature came from
      const layer = layers?.find((l) => l.slug === feature.source);

      // store using unique key
      if (layer && layer.interaction) {
        const featID = `${feature.source}/${feature.properties[layer.interaction.idField]}`;
        filtered[featID] = feature;
      }
    }
    return Object.values(filtered);
  }, [features, layers]);

  return (
    <div
      className="pointer-events-none absolute border-2 border-black/40 bg-white/80 backdrop-blur-md"
      style={{ left: point.x + 12, top: point.y + 12 }}
    >
      {filteredFeatures.length > 1 && (
        <div className="px-2 pt-1 text-left text-xs font-bold">
          Click to open selection menu
        </div>
      )}
      <div className="py-2">
        {filteredFeatures.map((feature, i) => (
          <div className="px-1" key={i}>
            {!!i && (
              <div className="flex items-center">
                <div className="w-8 border-t border-stone-700" />
                <div className="mx-1 w-fit shrink italic leading-none">
                  and
                </div>
                <div className="grow border-t border-stone-700" />
              </div>
            )}
            <div className="w-full px-1 py-1 text-left hover:bg-primary/20 hover:backdrop-blur-md">
              <PopupRow content={getContent(feature)} />
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
  getContent,
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
                <div className="w-8 shrink border-t border-stone-700" />
                <div className="mx-1 w-fit shrink italic leading-none">
                  or
                </div>
                <div className="grow border-t border-stone-700" />
              </div>
            )}
            <Button
              className="w-full px-1 py-1 text-left hover:bg-primary/20 hover:backdrop-blur-md"
              onPress={() => {
                onNavigate(feature);
              }}
            >
              <PopupRow content={getContent(feature)} />
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
