import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { pwsa } from "@/data/publishers.ts";

export const pwsaCombinedSewersheds: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "pwsa-combined-sewersheds",
  title: "Combined Sewershed",
  description: "Combined sewersheds in the City of Pittsburgh.",

  source: {
    slug: "pwsa-combined-sewersheds",
    title: "WPRDC - Combined Sewershed",
    url: "https://data.wprdc.org/dataset/combined-sewershed",
    resourceID: "138d6b65-1630-4905-9421-de90cd9d59e5",
    publisher: pwsa,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.138d6b65-1630-4905-9421-de90cd9d59e5._geom",
    sourceLayer: "table.138d6b65-1630-4905-9421-de90cd9d59e5._geom",
  },

  extent: {
    label: "Pittsburgh",
    bbox: [0, 0, 0, 0],
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: {
      mode: "category",
      field: "MOD_BASIN",
      style: [
        {
          slug: "Upper Mon",
          label: "Upper Mon",
          value: "Upper Mon",
          style: "#e41a1c",
        },
        {
          slug: "Chartiers",
          label: "Chartiers",
          value: "Chartiers",
          style: "#377eb8",
        },
        {
          slug: "Saw Mill Run",
          label: "Saw Mill Run",
          value: "Saw Mill Run",
          style: "#4daf4a",
        },
        { slug: "LOGR", label: "LOGR", value: "LOGR", style: "#984ea3" },
        {
          slug: "Upper Allegheny",
          label: "Upper Allegheny",
          value: "Upper Allegheny",
          style: "#ff7f00",
        },
        {
          slug: "Main Rivers",
          label: "Main Rivers",
          value: "Main Rivers",
          style: "#ffff33",
        },
      ],
    },
    fillOpacity: { mode: "fixed", style: 0.3 },
    strokeColor: { mode: "fixed", style: "#000" },
    strokeWidth: { mode: "fixed", style: 1 },
  },
};
