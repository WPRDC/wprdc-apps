import type { LayerConfig, InteractiveSymbologyProps } from "@wprdc/types";
import { GeoType, SymbologyMode } from "@wprdc/types";

export const pittsburghNeighborhoodLayer: LayerConfig<InteractiveSymbologyProps> =
  {
    // metadata
    slug: "pittsburgh-neighborhoods",
    title: "Pittsburgh Neighborhoods",
    description: "Neighborhoods in the City of Pittsburgh",
    symbologyMode: SymbologyMode.Interactive,
    type: GeoType.Polygon,
    extent: "Pittsburgh",
    publisher: {
      name: "City of Pittsburgh",
      homepage: "http://www.pittsburghpa.gov/",
      org: "city-of-pittsburgh",
    },
    source: {
      slug: "pittsburgh-neighborhoods",
      title: "City of Pittsburgh Neighborhoods",
      url: "https://data.wprdc.org/dataset/neighborhoods2",
      resourceID: "4af8e160-57e9-4ebf-a501-76ca1b42fc99",
    },
    noLegend: true,

    // tile server config
    tileJSONSource:
      "https://data.wprdc.org/tiles/table.4af8e160-57e9-4ebf-a501-76ca1b42fc99._geom",
    sourceLayer: "table.4af8e160-57e9-4ebf-a501-76ca1b42fc99._geom",
    minZoom: 7,
    maxZoom: 14.8,
    // interaction config
    idField: "hood",

    // default style config
    color: { default: "#000", selected: "#FCEC52", hovered: "#bae6fd" },

    opacity: [
      [8, { default: 0.2, selected: 0.6, hovered: 0.7 }],
      [14.5, { default: 0.2, selected: 0.6, hovered: 0.7 }],
      [15, { default: 0, selected: 0, hovered: 0 }],
    ],

    borderOpacity: [
      [8, 1],
      [14.5, 1],
      [15, 0],
    ],
  };
