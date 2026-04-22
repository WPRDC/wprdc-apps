import { LayerCategory } from "@/types/mapping";

import { alleghenyCountyBoundary } from "./base-layers/allegheny-county";
import { alleghenyWatersheds } from "./base-layers/allegheny-watersheds";
import { municipalities } from "./base-layers/municipalities";
import { pittsburghNeighborhoods } from "./base-layers/neighborhoods";
import { parcels } from "./base-layers/parcels";
import { pittsburghBoundary } from "./base-layers/pittsburgh";
import { pwsaCombinedSewersheds } from "./base-layers/pwsa-combined-sewersheds";
import { alleghenyCountyHydrologyAreas } from "./natural-features/allegheny-county-hydrology-areas";
import { alleghenyCountyHydrologyLines } from "./natural-features/allegheny-county-hydrology-lines";
import { floodZones } from "./natural-features/flood-zones";
import { alleghenyLandUseAreas } from "./natural-features/allegheny-land-use-areas";
import { landslides } from "./natural-features/landslides";
import { pittsburghLandslideProne } from "./natural-features/pittsburgh-landslide-prone";
import { sensitiveSlope } from "./natural-features/sensitive-slope";
import { slope25 } from "./natural-features/slope-25";
import { alleghenyCountyEnvironmentalJusticeAreas } from "./other/allegheny-county-environmental-justice-areas";
// import brownfields from "./other/brownfields";
import { cityOwned } from "./other/city-owned";
import { taxDelinquent } from "./other/tax-delinquent";
import { vacantLots } from "./other/vacant-lots";
import { allBikeLanes } from "./transportation/all-bike-lanes";
import { bikeTrails } from "./transportation/bike-trails";
import { citySteps } from "./transportation/city-steps";
import { pogohStations } from "./transportation/pogoh-stations";
import { transitRoutes } from "./transportation/transit-routes";
import { transitStops } from "./transportation/transit-stops";
import { threeRiversWetWeatherGIInventory } from "./urban-green-features/3rww-gi-inventory";
import { agriculturalEasement } from "./urban-green-features/agricultural-easement";
import { alleghenyParks } from "./urban-green-features/allegheny-parks";
import { golfCourses } from "./urban-green-features/golf-courses";
import { growPghGardens } from "./urban-green-features/grow-pgh-gardens";
// import { landTrustProperty } from "./urban-green-features/land-trust-property";
import { lotsToLove } from "./urban-green-features/lots-to-love";
import { municipalParks } from "./urban-green-features/municipal-parks";
import { parkNode } from "./urban-green-features/park-node";
import { pghParksOpenspace } from "./urban-green-features/pgh-parks-openspace";
import { pittsburghGreenways } from "./urban-green-features/pittsburgh-greenways";
import { pittsburghParks } from "./urban-green-features/pittsburgh-parks";
import { trails } from "./urban-green-features/trails";
import { greenprint } from "./urban-green-features/greenprint";
import { pwsaGiConcept } from "./urban-green-features-planned/pwsa-gi-concept";
import { LayerConfig } from "@wprdc/types";

const layers: Record<
  LayerCategory,
  {
    label: string;
    layers: LayerConfig[];
  }
> = {
  interactive: {
    label: "Interactive",
    layers: [parcels],
  },
  base: {
    label: "Base Layers",
    layers: [
      alleghenyCountyBoundary,
      alleghenyWatersheds,
      municipalities,
      pittsburghNeighborhoods,
      pittsburghBoundary,
      pwsaCombinedSewersheds,
    ],
  },
  "natural-features": {
    label: "Natural Features",
    layers: [
      alleghenyCountyHydrologyAreas,
      alleghenyCountyHydrologyLines,
      floodZones,
      alleghenyLandUseAreas,
      landslides,
      pittsburghLandslideProne,
      sensitiveSlope,
      slope25,
    ],
  },

  "urban-green-features": {
    label: "Urban Green Features",
    layers: [
      greenprint,
      threeRiversWetWeatherGIInventory,
      agriculturalEasement,
      alleghenyParks,
      golfCourses,
      growPghGardens,
      // landTrustProperty,
      lotsToLove,
      municipalParks,
      parkNode,
      pghParksOpenspace,
      pittsburghGreenways,
      pittsburghParks,
      // shareTheRoad,
      trails,
    ],
  },
  "urban-green-features-planned": {
    label: "Planned Urban Green Features",
    layers: [pwsaGiConcept],
  },
  transportation: {
    label: "Transportation",
    layers: [
      allBikeLanes,
      bikeTrails,
      citySteps,
      pogohStations,
      transitRoutes,
      transitStops,
    ],
  },
  other: {
    label: "Other",
    layers: [
      alleghenyCountyEnvironmentalJusticeAreas,
      // brownfields,
      cityOwned,
      taxDelinquent,
      vacantLots,
    ],
  },
};

export const flatLayers = Object.values(layers).flatMap(
  (section) => section.layers,
);

export default layers;
