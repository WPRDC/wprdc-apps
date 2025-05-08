import type { CategoryOptions, LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";
import { PiLineSegmentsFill } from "react-icons/pi";
import type { LegendItemProps, LegendProps, LegendRowProps } from "./Map.types";
import { darken } from "./util";
import { parseAsLegendProps } from "./parse.ts";

export function Legend({ layers }: LegendProps): React.ReactElement | null {
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
        <LegendItem key={item.slug} layer={item} />
      ))}
    </div>
  );
}

export function LegendItem({ layer }: LegendItemProps): React.ReactElement {
  return (
    <div className="mt-1">
      <div className="pb-1 text-sm font-semibold text-gray-700">
        {layer.title}
      </div>
      {layer.symbology.mode === "simple" && (
        <LegendRow
          {...parseAsLegendProps(layer)}
          label={layer.title}
          type={layer.type}
        />
      )}
      {layer.symbology.mode === "category" &&
        Object.entries<CategoryOptions>(layer.symbology.categories).map(
          ([k, record]) => <LegendRow key={k} {...record} type={layer.type} />,
        )}
    </div>
  );
}

export function LegendRow({
  label,
  color,
  borderColor,
  type,
}: LegendRowProps): React.ReactElement {
  return (
    <div className="flex items-center space-x-2 pb-1">
      {type === GeoType.Polygon && (
        <div
          className="h-4 w-4 rounded-sm border-2"
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
    </div>
  );
}
