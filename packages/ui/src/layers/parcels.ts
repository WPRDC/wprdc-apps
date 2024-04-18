import type { LayerConfig, InteractiveSymbologyProps } from "@wprdc/types";
import { GeoType, SymbologyMode } from "@wprdc/types";

export const parcelLayer: LayerConfig<InteractiveSymbologyProps> = {
  // metadata
  slug: "parcels",
  title: "Parcels",
  description: "",
  symbologyMode: SymbologyMode.Interactive,
  type: GeoType.Polygon,
  extent: "Allegheny County",
  publisher: {
    name: "Allegheny County",
    homepage: "https://www.alleghenycounty.us/",
    org: "allegheny-county",
  },
  source: {
    slug: "parcels",
    title: "Allegheny County Parcel Boundaries",
    url: "https://data.wprdc.org/dataset/allegheny-county-parcel-boundaries1",
    resourceID: "3f50d47a-ab54-4da2-9f03-8519006e9fc9",
  },
  noLegend: true,

  // tile server config
  tileJSONSource: "https://data.wprdc.org/tiles/table.parcel_index.geom",
  sourceLayer: "table.parcel_index.geom",
  minZoom: 15,

  // interaction-specific config
  idField: "parcel_id",
  ignoreCase: ["==", ["get", "parcel_id"], "COMMON GROUND"],

  // default style config
  color: { default: "#000", selected: "#FCEC52", hovered: "#bae6fd" },

  borderColor: { default: "#000", selected: "#000", hovered: "#bae6fd" },

  opacity: [
    [16, { default: 0.1, selected: 0.5, hovered: 0.6 }],
    [18, { default: 0.2, selected: 0.6, hovered: 0.7 }],
  ],

  borderOpacity: [[16, 1]],

  hoverPopupFormat: "parcel-index",
  clickPopupFormat: "parcel-index",
};
