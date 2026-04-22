import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { alleghenyCounty } from "@/data/publishers.ts";

export const alleghenyCountyEnvironmentalJusticeAreas: LayerConfig<SimplifiedSymbologyConfig> =
  {
    slug: "allegheny-county-environmental-justice-areas",
    title: "Environmental Justice Areas",
    description:
      "The Health Department defines an environmental justice area as any census tract where at least 20 percent of the population lives in poverty, and/or 30 percent or more of the population is minority.",

    source: {
      slug: "allegheny-county-environmental-justice-areas",
      title: "WPRDC - Allegheny County Environmental Justice Areas",
      url: "https://data.wprdc.org/dataset/environmental-justice-census-tracts",
      resourceID: "86d92434-8f27-4981-b5ab-90bc0a7c0f79",
      publisher: alleghenyCounty,
    },

    tiles: {
      source:
        "https://data.wprdc.org/tiles/table.86d92434-8f27-4981-b5ab-90bc0a7c0f79._geom",
      sourceLayer: "table.86d92434-8f27-4981-b5ab-90bc0a7c0f79._geom",
    },

    extent: {
      label: "Allegheny County",
      bbox: [0, 0, 0, 0],
    },

    legend: {
      geoType: GeoType.Polygon,
      slug: "ej",
      title: "Environmental Justice Areas",
      type: "fixed",
      style: { fillColor: "#E38633", fillOpacity: 0.8, strokeColor: "#000" },
      label: "Environmental Justice Areas",
    },

    symbology: {
      mode: "simplified",
      geoType: GeoType.Polygon,
      fillColor: { mode: "fixed", style: "#E38633" },
      strokeColor: { mode: "fixed", style: "#000000" },
      strokeWidth: { mode: "fixed", style: 1 },
    },

    renderOptions: {
      filter: ["==", "EJ_Area", "1"],
    },
  };
