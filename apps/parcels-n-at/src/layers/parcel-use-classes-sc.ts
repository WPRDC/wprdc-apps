import type { LayerConfig } from "@wprdc/types";
import { GeoType } from "@wprdc/types";
import { getClassificationColor } from "@/components/parcel-dashboard";

export const parcelUseClasses: LayerConfig = {
  slug: "parcel-use-classes",
  title: "Parcel Use Class",
  description: "Color parcels based on use category.",

  source: {
    slug: "use-classes-sc",
    title: "Parcel Use Class",
    url: "https://data.wprdc.org/dataset/property-assessments",
    resourceID: "",
    publisher: {
      name: "WPRDC",
      homepage: "https://wprdc.org/",
      org: "wprdc",
    },
  },

  tiles: {
    source: "https://data.wprdc.org/tiles/table.parcel_index.geom",
    sourceLayer: "table.parcel_index.geom",
    minZoom: 13,
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,

    fillColor: {
      mode: "category",
      field: "class",

      style: [
        {
          slug: "residential",
          value: "RESIDENTIAL",
          label: "Residential",
          style: getClassificationColor("RESIDENTIAL"),
        },
        {
          slug: "commercial",
          value: "COMMERCIAL",
          label: "Commercial",
          style: getClassificationColor("COMMERCIAL"),
        },
        {
          slug: "industrial",
          value: "INDUSTRIAL",
          label: "Industrial",
          style: getClassificationColor("INDUSTRIAL"),
        },
        {
          slug: "agricultural",
          value: "AGRICULTURAL",
          label: "Agricultural",
          style: getClassificationColor("AGRICULTURAL"),
        },
        {
          slug: "government",
          value: "GOVERNMENT",
          label: "Government",
          style: getClassificationColor("GOVERNMENT"),
        },
        {
          slug: "utilities",
          value: "UTILITIES",
          label: "Utilities",
          style: getClassificationColor("UTILITIES"),
        },
        {
          slug: "other",
          value: "OTHER",
          label: "Other",
          style: getClassificationColor("OTHER"),
        },
      ],
    },

    fillOpacity: {
      mode: "fixed",
      style: [
        [9, 1],
        [12, 0.8],
      ],
    },

    strokeOpacity: {
      mode: "fixed",
      style: [
        [9, 1],
        [12, 0.8],
      ],
    },

    strokeWidth: {
      mode: "fixed",
      style: [
        [10, 0],
        [12, 1],
        [13, 1],
        [15, 2],
        [18, 4],
      ],
    },
  },
};
