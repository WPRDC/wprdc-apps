import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { alleghenyCounty } from "@/data/publishers.ts";

export const golfCourses: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "golf-courses",
  title: "Golf Courses",
  description: "Golf courses in Allegheny County",

  source: {
    slug: "golf-courses",
    title: "WPRDC - Allegheny County Greenways",
    url: "https://data.wprdc.org/dataset/allegheny-county-greenways",
    resourceID: "0335f47a-ed05-4664-8ba3-7ddffd6828bc",
    publisher: alleghenyCounty,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.0335f47a-ed05-4664-8ba3-7ddffd6828bc._geom",
    sourceLayer: "table.0335f47a-ed05-4664-8ba3-7ddffd6828bc._geom",
  },

  extent: {
    label: "Allegheny County",
    bbox: [0, 0, 0, 0],
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: { mode: "fixed", style: "#F781BF" },
    strokeColor: { mode: "fixed", style: "#000000" },
    strokeWidth: { mode: "fixed", style: 1 },
  },
  renderOptions: {
    filter: ["==", "Type", "Golf Courses"],
  },
};
