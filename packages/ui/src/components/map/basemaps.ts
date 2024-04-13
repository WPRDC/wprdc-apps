import type { BasemapOptions } from "./Map.types";
import outdoors from "./images/basemaps/outdoors-close.jpg";
import satellite from "./images/basemaps/satellite-close.jpg";
import streets from "./images/basemaps/streets-close.jpg";
import topo from "./images/basemaps/topo-close.jpg";
import minimal from "./images/basemaps/minimal-close.jpg";
import basic from "./images/basemaps/basic-close.jpg";

export const basemaps: Record<string, BasemapOptions> = {
  basic: {
    url: "https://api.maptiler.com/maps/basic-v2/style.json",
    label: "Basic",
    image: outdoors as string,
  },
  streets: {
    url: "https://api.maptiler.com/maps/streets-v2/style.json",
    label: "Streets",
    image: satellite as string,
  },
  outdoors: {
    url: "https://api.maptiler.com/maps/b59101bd-2934-4077-86c6-31144aa01131/style.json",
    label: "Outdoors",
    image: streets as string,
  },
  minimal: {
    url: "https://api.maptiler.com/maps/dataviz/style.json",
    label: "Minimal",
    image: topo as string,
  },
  topo: {
    url: "https://api.maptiler.com/maps/topo-v2/style.json",
    label: "Topographic",
    image: minimal as string,
  },
  satellite: {
    url: "https://api.maptiler.com/maps/satellite/style.json",
    label: "Satellite",
    image: basic as string,
  },
};
