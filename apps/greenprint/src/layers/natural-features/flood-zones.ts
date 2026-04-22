import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { pittsburgh } from "@/data/publishers.ts";

export const floodZones: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "flood-zones",
  title: "Flood Zones",
  description: "Flood-prone areas in Allegheny County",

  source: {
    slug: "flood-zones",
    title: "WPRDC - FEMA Flood Zones",
    url: "https://data.wprdc.org/dataset/2014-fema-flood-zones",
    resourceID: "122717f9-f08a-4be1-82b9-c213cc069e8c",
    publisher: pittsburgh,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.122717f9-f08a-4be1-82b9-c213cc069e8c._geom",
    sourceLayer: "table.122717f9-f08a-4be1-82b9-c213cc069e8c._geom",
  },

  extent: {
    label: "Allegheny County",
    bbox: [0, 0, 0, 0],
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Polygon,
    fillColor: { mode: "fixed", style: "#007791" },
    strokeColor: { mode: "fixed", style: "#000000" },
    strokeWidth: { mode: "fixed", style: 1 },
  },
};
