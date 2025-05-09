"use client";

import { CategoryOptions, GeoType, LayerConfig } from "@wprdc/types";
import {
  ControlsLegendItemProps,
  ControlsLegendProps,
  ControlsLegendRowProps,
} from "./Map.types.ts";
import { darken } from "./util.tsx";
import { PiLineSegmentsFill } from "react-icons/pi";
import {
  Dialog,
  DialogTrigger,
  ListBox,
  ListBoxItem,
} from "react-aria-components";
import { TbAdjustmentsAlt } from "react-icons/tb";
import { Button } from "../button";
import { Modal, ModalOverlay } from "../modal";
import { LayerMenu } from "../layer-menu";
import { parseAsLegendProps } from "./parse.ts";

export function ControlsLegend({
  layers,
  selectedLayers,
  onSelectionChange,
  onStyleChange,
}: ControlsLegendProps): React.ReactElement | null {
  const filteredLayers = layers?.filter(
    (l: LayerConfig) => !l.renderOptions?.noLegend,
  );

  // hide layer when empty
  if (!filteredLayers?.length) {
    return null;
  }

  return (
    <div className="z-100 flex flex-col rounded-sm border border-black bg-white p-2">
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
          onStyleChange={onStyleChange}
        />
      ))}
    </div>
  );
}

export function ControlsLegendItem({
  layer,
  selectedCategories,
  onSelectionChange,
  onStyleChange,
}: ControlsLegendItemProps): React.ReactElement {
  return (
    <div>
      <div className="flex items-start pb-1 pt-2">
        <div
          className="max-w-44 flex-grow pr-2 text-base font-semibold leading-none text-gray-700"
          id="controlslegendlabel"
        >
          {layer.title}
        </div>
        {/*{!!onStyleChange && (*/}
        {/*  <DialogTrigger>*/}
        {/*    <Button*/}
        {/*      dense*/}
        {/*      className="rounded-md p-1"*/}
        {/*      aria-label="symbology settings"*/}
        {/*    >*/}
        {/*      <TbAdjustmentsAlt className="size-4" />*/}
        {/*    </Button>*/}
        {/*    <ModalOverlay>*/}
        {/*      <Modal>*/}
        {/*        <Dialog>*/}
        {/*          {({ close }) => (*/}
        {/*            <LayerMenu*/}
        {/*              defaultConfig={layer}*/}
        {/*              onSubmit={onStyleChange}*/}
        {/*              onClose={close}*/}
        {/*            />*/}
        {/*          )}*/}
        {/*        </Dialog>*/}
        {/*      </Modal>*/}
        {/*    </ModalOverlay>*/}
        {/*  </DialogTrigger>*/}
        {/*)}*/}
      </div>

      <ListBox
        className="mt-1"
        selectionMode="multiple"
        aria-labelledby="controlslegendlabel"
        selectedKeys={selectedCategories}
        onSelectionChange={onSelectionChange}
      >
        {layer.symbology.mode === "category" ? (
          layer.symbology.categories.map(
            ({value, label}) => (
              <ControlsLegendRow
                key={value}
                {...parseAsLegendProps(layer, value)}
                label={label}
                type={layer.type}
                textValue={value}
              />
            ),
          )
        ) : (
          <ControlsLegendRow
            {...parseAsLegendProps(layer)}
            label={layer.title}
            type={layer.type}
            textValue={layer.slug}
          />
        )}
      </ListBox>
    </div>
  ) as React.ReactElement<unknown, string | React.JSXElementConstructor<any>>;
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
      className="group flex cursor-pointer items-center space-x-2 pb-1"
    >
      {type === GeoType.Polygon && (
        <div
          className="h-4 w-4 rounded-sm border-2 opacity-10 group-selected:opacity-90"
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
      <div className="flex-grow text-xs font-medium">{label}</div>
    </ListBoxItem>
  );
}
