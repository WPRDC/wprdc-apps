import { pittsburghNeighborhoodLayer } from "./pittsburgh-neighborhoods";
import { parcelLayer } from "./parcels";
import { municipalitiesLayer } from "./municipalitiesLayer";
import { pittsburghBoundary } from "./pittsburgh-boundary";
import { alleghenyCountyBoundary } from "./allegheny-county-boundary";

export * from "./pittsburgh-neighborhoods";
export * from "./parcels";
export * from "./municipalitiesLayer";
export * from "./pittsburgh-boundary";
export * from "./allegheny-county-boundary";

export const dataLayers = {
  "pittsburgh-neighborhoods": pittsburghNeighborhoodLayer,
  parcels: parcelLayer,
  "allegheny-county-municipalities": municipalitiesLayer,
  "pittsburgh-boundary": pittsburghBoundary,
  "allegheny-county-boundary": alleghenyCountyBoundary,
};

export type LayerSlug = keyof typeof dataLayers;
