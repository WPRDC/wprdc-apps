import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useControl } from "react-map-gl/maplibre";
import { styles } from "./draw-control-style";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import type { DrawControlProps } from "./Map.types";

// @ts-expect-error -- overriding constants
MapboxDraw.constants.classes.CONTROL_BASE = "maplibregl-ctrl";
// @ts-expect-error -- overriding constants
MapboxDraw.constants.classes.CONTROL_PREFIX = "maplibregl-ctrl-";
// @ts-expect-error -- overriding constants
MapboxDraw.constants.classes.CONTROL_GROUP = "maplibregl-ctrl-group";

export default function DrawControl({
  position,
  onCreate = () => undefined,
  onUpdate = () => undefined,
  onDelete = () => undefined,
  ...props
}: DrawControlProps): null {
  useControl<MapboxDraw>(
    () => new MapboxDraw({ styles, ...props }),
    ({ map }) => {
      map.on("draw.create", onCreate);
      map.on("draw.update", onUpdate);
      map.on("draw.delete", onDelete);
    },
    ({ map }) => {
      map.off("draw.create", onCreate);
      map.off("draw.update", onUpdate);
      map.off("draw.delete", onDelete);
    },
    {
      position,
    },
  );

  return null;
}
