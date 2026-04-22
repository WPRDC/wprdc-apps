import { LayerConfig, SimplifiedSymbologyConfig } from "@wprdc/types";
import { GeoType } from "@/types";
import { threeRiversWetWeather } from "@/data/publishers.ts";

export const threeRiversWetWeatherGIInventory: LayerConfig<SimplifiedSymbologyConfig> =
  {
    slug: "3rww-gi-inventory",
    title: "3RWW Green Infrastructure Inventory",
    description: "Inventory of green infrastructure projects compiled by 3RWW.",

    source: {
      slug: "3rww-gi-inventory",
      title: "WPRDC - 3RWW Green Infrastructure Inventory",
      url: "https://data.wprdc.org/dataset/3rww-green-infrastructure-inventory",
      resourceID: "bbe84edd-f737-4e28-b31e-fc7dfa162082",
      publisher: threeRiversWetWeather,
    },

    tiles: {
      source:
        "https://data.wprdc.org/tiles/table.bbe84edd-f737-4e28-b31e-fc7dfa162082._geom",
      sourceLayer: "table.bbe84edd-f737-4e28-b31e-fc7dfa162082._geom",
    },

    extent: {
      label: "Allegheny County",
      bbox: [0, 0, 0, 0],
    },

    symbology: {
      mode: "simplified",
      geoType: GeoType.Point,
      fillColor: { mode: "fixed", style: "#008000" },
      strokeColor: { mode: "fixed", style: "#000000" },
      strokeWidth: { mode: "fixed", style: 1 },
    },

    interaction: {
      idField: "project_name",
      hoverPopupContent: "{{project_name}}",
      clickPopupContent:
        "<h3>{{project_name}}</h3>" +
        "<p><strong>Description:</strong> {{project_description}}</p>",
    },
  };
