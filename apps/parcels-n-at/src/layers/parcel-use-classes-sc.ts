import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";

export const parcelUseClasses: LayerConfig = {
  slug: "parcel-use-classes",
  title: "Parcel Use Class",
  description: "",
  type: GeoType.Polygon,
  publisher: {
    name: "WPRDC",
    homepage: "https://wprdc.org/",
    org: "wprdc",
  },

  source: {
    slug: "use-classes-sc",
    title: "Parcel Use Class",
    url: "",
    resourceID: "",
  },

  tileSource: {
    tileJSONSource:
      "https://data.wprdc.org/tiles/table.parcel_index.geom",
    sourceLayer: "table.parcel_index.geom",
    minZoom: 13,
  },

  symbology: {
    mode: "category",
    field: "class",

    categories: [
      { value: "RESIDENTIAL", label: "Residential" },
      { value: "COMMERCIAL", label: "Commercial" },
      { value: "INDUSTRIAL", label: "Industrial" },
      { value: "AGRICULTURAL", label: "Agricultural" },
      { value: "GOVERNMENT", label: "Government" },
      { value: "UTILITIES", label: "Utilities" },
      { value: "OTHER", label: "Other" },
    ],

    color: {
      mode: "category",
      submode: "simple",
      value: {
        RESIDENTIAL: "#14532d",
        COMMERCIAL: "#1e40af",
        INDUSTRIAL: "#92400e",
        AGRICULTURAL: "#eab308",
        GOVERNMENT: "#a21caf",
        UTILITIES: "#5b21b6",
        OTHER: "#44403c",
      },
    },

    opacity: {
      mode: "zoom",
      value: [
        [9, 1],
        [12, 0.8],
      ],
    },

    borderOpacity: {
      mode: "zoom",
      value: [
        [9, 1],
        [12, 0.8],
      ],
    },

    borderWidth: {
      mode: "zoom",
      value: [
        [10, 0],
        [12, 1],
        [13, 1],
        [15, 2],
        [18, 4],
      ],
    },
  },
};
