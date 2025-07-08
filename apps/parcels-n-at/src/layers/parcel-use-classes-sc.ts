import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";
import { getClassificationColor } from "@/components/parcel-dashboard";

export const parcelUseClasses: LayerConfig = {
  slug: "parcel-use-classes",
  title: "Parcel Use Class",
  description: "Color parcels based on use category.",
  type: GeoType.Polygon,
  publisher: {
    name: "WPRDC",
    homepage: "https://wprdc.org/",
    org: "wprdc",
  },

  source: {
    slug: "use-classes-sc",
    title: "Parcel Use Class",
    url: "https://data.wprdc.org/dataset/property-assessments",
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
        RESIDENTIAL: getClassificationColor("RESIDENTIAL"),
        COMMERCIAL: getClassificationColor("COMMERCIAL"),
        INDUSTRIAL: getClassificationColor("INDUSTRIAL"),
        AGRICULTURAL: getClassificationColor("AGRICULTURAL"),
        GOVERNMENT: getClassificationColor("GOVERNMENT"),
        UTILITIES: getClassificationColor("UTILITIES"),
        OTHER: getClassificationColor("OTHER"),
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
