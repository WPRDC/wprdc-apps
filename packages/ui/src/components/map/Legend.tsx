import type { LayerConfig } from "@wprdc/types";
import {
  CategoryLegendOptions,
  FixedLegendOptions,
  GeoType,
  LegendItemOptions,
  RampLegendOptions,
  SimplifiedSymbologyConfig,
} from "@wprdc/types";
import { PiLineSegmentsFill } from "react-icons/pi";
import type { LegendItemProps, LegendProps } from "./Map.types";
import { darken } from "./util";
import { legendFromOption } from "./parse.ts";
import React, { CSSProperties, HTMLProps } from "react";

export function Legend({
  layers,
  children,
}: LegendProps): React.ReactElement | null {
  const filteredLayers = layers?.filter(
    (l: LayerConfig) =>
      l.legend || (l.symbology.mode === "simplified" && l.legend !== false),
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
        <LegendItem key={item.slug} layer={item} />
      ))}

      <div>{children}</div>
    </div>
  );
}

export function LegendItem({ layer }: LegendItemProps): React.ReactElement {
  const legendProps = layer.legend
    ? layer.legend
    : legendFromOption(layer as LayerConfig<SimplifiedSymbologyConfig>);

  if (!legendProps) return <></>;

  return (
    <div className="mt-1">
      <div className="pb-1 text-sm font-semibold text-gray-700">
        {layer.title}
      </div>
      {legendProps.type === "fixed" && <FixedLegendRow {...legendProps} />}
      {legendProps.type === "category" && (
        <CategoryLegendRow {...legendProps} />
      )}
      {legendProps.type === "ramp" && <RampLegendRow {...legendProps} />}
    </div>
  );
}

function PolygonIcon({ style }: HTMLProps<HTMLDivElement>) {
  return <div className="h-4 w-4 rounded-sm border-2" style={style} />;
}
function CircleIcon({ style }: HTMLProps<HTMLDivElement>) {
  return <div className="h-3 w-3 rounded-full border-2" style={style} />;
}
const LineIcon = PiLineSegmentsFill;


function asCSS(geoType: GeoType, style: LegendItemOptions) {
  const { fillColor, fillOpacity, strokeColor, strokeOpacity, strokeWidth } =
    style;

  switch (geoType) {
    case GeoType.Line:
      return {
        color: fillColor,
        opacity: fillOpacity,
      };
    case GeoType.Point:
    case GeoType.Polygon:
      return {
        background: fillColor,
        opacity: fillOpacity,
        borderColor: strokeColor ?? darken(20)(fillColor ?? "black"),
        borderWidth: strokeWidth,
      };
  }
}

export function FixedLegendRow({
  slug,
  title,
  geoType,
  style,
  label,
}: FixedLegendOptions) {
  const cssStyle: CSSProperties = asCSS(geoType, style)

  return (
    <div className="flex items-center space-x-2 pb-1">
      {geoType === GeoType.Polygon && <PolygonIcon style={cssStyle} />}
      {geoType === GeoType.Point && <CircleIcon style={cssStyle} />}
      {geoType === GeoType.Line && (
        <PiLineSegmentsFill className="h-4 w-4" style={cssStyle} />
      )}
      <div className="text-xs font-medium">{label}</div>
    </div>
  );
}


export function CategoryLegendRow({
  slug,
  title,
  geoType,
  baseStyle,
  styles,
  secondaryStyles,
}: CategoryLegendOptions) {
  if (!secondaryStyles)
    return (
      <div>
        <div>{title}</div>
        {styles.map(({ style, label, slug }) => (
          <div key={slug} className="flex items-center space-x-2 pb-1">
            {geoType === GeoType.Polygon && (
              <div
                className="h-4 w-4 rounded-sm border-2"
                style={asCSS(geoType, { ...baseStyle, ...style })}
              />
            )}
            {geoType === GeoType.Point && (
              <div
                className="h-3 w-3 rounded-full border-2"
                style={asCSS(geoType, { ...baseStyle, ...style })}
              />
            )}
            {geoType === GeoType.Line && (
              <PiLineSegmentsFill
                className="h-4 w-4"
                style={asCSS(geoType, { ...baseStyle, ...style })}
              />
            )}
            <div className="text-xs font-medium">{label}</div>
          </div>
        ))}
      </div>
    );

  //todo: handle matrix of categories
  return <div></div>;
}
export function RampLegendRow({
  slug,
  title,
  geoType,
  baseStyle,
  styles,
  categoryStyles,
}: RampLegendOptions) {
  // todo; handle with category styles
  return (
    <div>
      <div>{title}</div>
      <div className="w-full">
        <div className="flex justify-between pb-1">
          <div>{styles[0].label}</div>
          <div>{styles[styles.length - 1].label}</div>
        </div>
        <div
          className="w-full"
          style={{
            border: baseStyle.strokeColor,
            borderWidth: baseStyle.strokeWidth,
            backgroundColor: `linear-gradient(90deg,${styles[0].style} 0%,${styles[styles.length - 1].style} 100%)`,
          }}
        ></div>
      </div>
    </div>
  );
}
