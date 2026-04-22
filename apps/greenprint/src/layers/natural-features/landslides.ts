import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { nasa } from "@/data/publishers.ts";

export const landslides: LayerConfig<SimplifiedSymbologyConfig> = {
  slug: "landslides",
  title: "Landslides",
  description: "Previously reported landslides.",

  source: {
    slug: "landslides",
    title: "WPRDC - Landslides",
    url: "https://data.wprdc.org/dataset/landslides",
    resourceID: "f3d639c6-324f-4672-b86c-d42af5002b66",
    publisher: nasa,
  },

  tiles: {
    source:
      "https://data.wprdc.org/tiles/table.f3d639c6-324f-4672-b86c-d42af5002b66._geom",
    sourceLayer: "table.f3d639c6-324f-4672-b86c-d42af5002b66._geom",
  },

  extent: {
    label: "Allegheny County",
    bbox: [0, 0, 0, 0],
  },

  symbology: {
    mode: "simplified",
    geoType: GeoType.Point,
    fillColor: { mode: "fixed", style: "#000000" },
    strokeColor: { mode: "fixed", style: "#000000" },
    strokeWidth: { mode: "fixed", style: 1 },
  },

  interaction: {
    idField: "ev_title",
    hoverPopupContent: "Landslide: {{ev_title}}",
    clickPopupContent:
      "<h3>Landslide: {{ev_title}}</h3>" +
      "<p><strong>Description:</strong> {{ev_description}}</p>" +
      "<p><strong>Reporting Source:</strong> {{src_name}}</p>",
  },
};
