import type { Municipality, Neighborhood } from "@wprdc/types";
import type { MapGeoJSONFeature } from "react-map-gl/maplibre";

export function NeighborhoodPopupRow({
  feature,
}: {
  feature: MapGeoJSONFeature;
}): React.ReactElement {
  const { hood } = feature.properties as Neighborhood;

  return (
    <div className="text-base font-bold">
      <div>{hood}</div>
    </div>
  );
}

export function MunicipalityPopupRow({
  feature,
}: {
  feature: MapGeoJSONFeature;
}): React.ReactElement {
  let { NAME: name } = feature.properties as Municipality;
  name = name.toLowerCase();
  if (name === "o'hara") name = "O'Hara"; // fixme: generalize
  return (
    <div className="text-base font-bold">
      <div className="capitalize">{name}</div>
    </div>
  );
}
