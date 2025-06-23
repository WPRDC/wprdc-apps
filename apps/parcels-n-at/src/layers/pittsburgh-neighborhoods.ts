import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const pittsburghNeighborhoods: LayerConfig = {
  slug: "pittsburgh-neighborhoods",
  title: "Pittsburgh Neighborhoods",
  description: "Neighborhoods in the City of Pittsburgh",
  type: GeoType.Polygon,
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

  tileSource: {
    tileJSONSource:
      "https://data.wprdc.org/tiles/table.4af8e160-57e9-4ebf-a501-76ca1b42fc99._geom",
    sourceLayer: "table.4af8e160-57e9-4ebf-a501-76ca1b42fc99._geom",
    minZoom: 7,
    maxZoom: 14.8,
  },

  symbology: {
    mode: "simple",
    color: {
      mode: "fixed",
      value: "#FFF",
    },
    borderColor: {
      mode: "fixed",
      value: "#000",
    },
    opacity: {
      mode: "fixed",
      value: 0,
    },
    borderOpacity: {
      mode: "zoom",
      value: [
        [8, 1],
        [14.5, 1],
        [15, 0],
      ],
    },
    borderWidth: {
      mode: "zoom",
      value: [
        [8, 1],
        [12, 1],
        [14.5, 4],
      ],
    },
    textField: { mode: "expression", expression: ["get", "hood"] },
    textSize: {
      mode: "zoom",
      value: [
        [8, 0],
        [11.9, 0],
        [12, 9],
        [15, 12],
      ],
    },
  },
  renderOptions: {
    noLegend: true,
  },
};
