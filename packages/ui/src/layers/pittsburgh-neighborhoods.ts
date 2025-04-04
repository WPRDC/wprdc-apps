import type { InteractiveSymbologyProps, LayerConfig } from "@wprdc/types";
import { GeoType, SymbologyMode } from "@wprdc/types";

export const pittsburghNeighborhoodLayer: LayerConfig<InteractiveSymbologyProps> =
  {
    slug: "pittsburgh-neighborhoods",
    title: "Pittsburgh Neighborhoods",
    description: "Neighborhoods in the City of Pittsburgh",
    symbologyMode: SymbologyMode.Interactive,
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
      color: { default: "#FFF", selected: "#FCEC52", hovered: "#bae6fd" },
      borderColor: { default: "#000", selected: "#000", hovered: "#bae6fd" },
      opacity: [
        [8, { default: 0.2, selected: 0.4, hovered: 0.7 }],
        [14.5, { default: 0.2, selected: 0.4, hovered: 0.7 }],
        [15, { default: 0, selected: 0, hovered: 0 }],
      ],
      borderOpacity: [
        [8, 1],
        [14.5, 1],
        [15, 0],
      ],
      borderWidth: [
        [8, { default: 1, selected: 2, hovered: 2.5 }],
        [12, { default: 1, selected: 2, hovered: 2.5 }],
        [14.5, { default: 4, selected: 8, hovered: 10 }],
      ],
      textField: ["get", "hood"],
      textSize: [
        [8, 0],
        [11.9, 0],
        [12, 9],
        [15, 12],
      ],
    },

    interaction: {
      idField: "hood",
      hoverPopupContent: `<h1>{{hood}}</h1>`,
      clickPopupContent: "",
    },

    renderOptions: {
      noLegend: true,
    },
  };
