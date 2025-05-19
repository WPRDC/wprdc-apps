import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const pittsburghBoundary: LayerConfig = {
  slug: "pittsburgh-boundary",
  title: "Pittsburgh Boundary",
  description: "Boundary of the City of Pittsburgh",
  type: GeoType.Polygon,
  publisher: {
    name: "City of Pittsburgh",
    homepage: "http://www.pittsburghpa.gov/",
    org: "city-of-pittsburgh",
  },
  source: {
    slug: "pittsburgh-border",
    title: "Pittsburgh City Boundary",
    url: "https://data.wprdc.org/dataset/pittsburgh-city-boundary",
    resourceID: "11af0bf9-2d04-4e71-b28c-a0dfb3078080",
  },

  tileSource: {
    tileJSONSource:
      "https://data.wprdc.org/tiles/table.b0cb0249-d1ba-45b7-9918-dc86fa8af04c._geom",
    sourceLayer: "table.b0cb0249-d1ba-45b7-9918-dc86fa8af04c._geom",
  },

  symbology: {
    mode: "simple",
    color: { mode: "fixed", value: "rgba(0,0,0,0)" },
    borderColor: { mode: "fixed", value: "#000" },
    opacity: { mode: "fixed", value: 0 },
    borderWidth: { mode: "fixed", value: 4 },
  },

  renderOptions: {
    filter: ["==", "NAME", "PITTSBURGH"],
    noLegend: true,
  },
};
