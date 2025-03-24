"use client";

import {
  CategoryOptions,
  GeoType,
  LayerConfig,
  SymbologyMode,
} from "@wprdc/types";
import {
  ControlsLegendItemProps,
  ControlsLegendProps,
  ControlsLegendRowProps,
} from "./Map.types.ts";
import { darken } from "./util.tsx";
import { PiLineSegmentsFill } from "react-icons/pi";
import { ListBox, ListBoxItem } from "react-aria-components";

export function ControlsLegend({
  layers,
  selectedLayers,
  onSelectionChange,
}: ControlsLegendProps): React.ReactElement | null {
  const filteredLayers = layers?.filter(
    (l: LayerConfig) => !l.renderOptions?.noLegend,
  );

  // hide layer when empty
  if (!filteredLayers?.length) {
    return null;
  }

  return (
    <div className="z-100 flex flex-col rounded-sm border bg-white/65 p-2 backdrop-blur-md">
      <div className="text-leafgreen text-xs font-semibold uppercase">
        Legend
      </div>

      {filteredLayers.map((item) => (
        <ControlsLegendItem
          key={item.slug}
          layer={item}
          selectedCategories={selectedLayers?.[item.slug]}
          onSelectionChange={
            onSelectionChange ? onSelectionChange(item.slug) : undefined
          }
        />
      ))}
    </div>
  );
}

export function ControlsLegendItem({
  layer,
  selectedCategories,
  onSelectionChange,
}: ControlsLegendItemProps): React.ReactElement {
  return (
    <div>
      <div
        className="pb-1 text-sm font-semibold text-gray-700"
        id="controlslegendlabel"
      >
        {layer.title}
      </div>
      <ListBox
        className="mt-1"
        selectionMode="multiple"
        aria-labelledby="controlslegendlabel"
        selectedKeys={selectedCategories}
        onSelectionChange={onSelectionChange}
      >
        {layer.symbologyMode === SymbologyMode.Solid && (
          <ControlsLegendRow
            borderColor={layer.symbology.borderColor}
            color={layer.symbology.color}
            label={layer.title}
            type={layer.type}
            textValue={layer.slug}
          />
        )}
        {layer.symbologyMode === SymbologyMode.Qualitative &&
          Object.entries<CategoryOptions>(
            layer.symbology.colors.categories,
          ).map(([k, record]) => (
            <ControlsLegendRow
              key={k}
              {...record}
              type={layer.type}
              textValue={k}
            />
          ))}
      </ListBox>
    </div>
  );
}

export function ControlsLegendRow({
  label,
  color,
  borderColor,
  type,
  textValue,
}: ControlsLegendRowProps): React.ReactElement {
  return (
    <ListBoxItem
      textValue={textValue}
      id={textValue}
      className="group flex items-center space-x-2 pb-1"
    >
      {type === GeoType.Polygon && (
        <div
          className="h-4 w-4 cursor-pointer rounded-sm border-2 opacity-10 group-selected:opacity-90"
          style={{
            background: color,
            borderColor: borderColor ?? darken(20)(color ?? "black"),
          }}
        />
      )}

      {type === GeoType.Point && (
        <div
          className="h-3 w-3 rounded-full border-2"
          style={{
            background: color,
            borderColor: borderColor ?? "black",
          }}
        />
      )}

      {type === GeoType.Line && (
        <PiLineSegmentsFill className="h-4 w-4" style={{ color }} />
      )}

      <div className="text-xs font-medium">{label}</div>
    </ListBoxItem>
  );
}
