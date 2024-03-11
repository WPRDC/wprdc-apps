import type { BasemapOptions } from "./Map.types";

export const basemaps: Record<string, BasemapOptions> = {
  basic: {
    url: "https://api.maptiler.com/maps/basic-v2/style.json",
    label: "Basic",
  },
  streets: {
    url: "https://api.maptiler.com/maps/streets-v2/style.json",
    label: "Streets",
  },
  outdoors: {
    url: "https://api.maptiler.com/maps/b59101bd-2934-4077-86c6-31144aa01131/style.json",
    label: "Outdoors",
  },
  minimal: {
    url: "https://api.maptiler.com/maps/dataviz/style.json",
    label: "Minimal",
  },
  topo: {
    url: "https://api.maptiler.com/maps/topo-v2/style.json",
    label: "Topographic",
  },
  satellite: {
    url: "https://api.maptiler.com/maps/satellite/style.json",
    label: "Satellite",
  },
};
