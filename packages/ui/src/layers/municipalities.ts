import type { LayerConfig, InteractiveSymbologyProps } from "@wprdc/types";
import { GeoType, SymbologyMode } from "@wprdc/types";

export const municipalities: LayerConfig<InteractiveSymbologyProps> = {
  // metadata
  slug: "allegheny-county-municipalities",
  title: "Allegheny County Municipalities",
  description: "Towns, Cities, Boroughs, etc. in Allegheny County",
  symbologyMode: SymbologyMode.Interactive,
  type: GeoType.Polygon,
  extent: "Allegheny County",
  publisher: {
    name: "Allegheny County",
    homepage: "https://www.alleghenycounty.us/",
    org: "allegheny-county",
  },

  source: {
    slug: "allegheny-county-municipalities",
    title: "Allegheny County Municipal Boundaries",
    url: "https://data.wprdc.org/dataset/allegheny-county-municipal-boundaries",
    resourceID: "b0cb0249-d1ba-45b7-9918-dc86fa8af04c",
  },
  noLegend: true,

  // tile server config
  tileJSONSource:
    "https://data.wprdc.org/tiles/table.b0cb0249-d1ba-45b7-9918-dc86fa8af04c._geom",
  sourceLayer: "table.b0cb0249-d1ba-45b7-9918-dc86fa8af04c._geom",

  minZoom: 7,
  maxZoom: 14.8,
  // interaction config
  idField: "NAME",

  // default style config
  color: { default: "#000", selected: "#FCEC52", hovered: "#bae6fd" },
  borderColor: { default: "#000", selected: "#000", hovered: "#bae6fd" },

  opacity: [
    [8, { default: 0.2, selected: 0.4, hovered: 0.7 }],
    [14.5, { default: 0.2, selected: 0.4, hovered: 0.7 }],
    [15, { default: 0, selected: 0, hovered: 0 }],
  ],
  borderOpacity: [
    [8, 1],
    [14.5, 1],
    [15, 0],
  ],

  borderWidth: [
    [8, { default: 1, selected: 2, hovered: 2.5 }],
    [12, { default: 1, selected: 2, hovered: 2.5 }],
    [14.5, { default: 4, selected: 8, hovered: 10 }],
  ],

  hoverPopupFormat: "municipality",
  clickPopupFormat: "municipality",
};
