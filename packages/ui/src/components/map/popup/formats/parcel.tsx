import type { ParcelIndex } from "@wprdc/types";
import type { MapGeoJSONFeature } from "react-map-gl/maplibre";
import { makeAddress } from "../../../../util";

export function ParcelIndexPopupRow({
  feature,
}: {
  feature: MapGeoJSONFeature;
}): React.ReactElement {
  const properties = feature.properties as ParcelIndex;
  const [address, city] = makeAddress({
    number: properties.housenum,
    ...properties,
  });

  return (
    <div className="text-lg font-bold">
      {address ? <div className="font-sans leading-none">{address}</div> : null}
      {address && city ? (
        <div className="mb-1 font-sans text-xs leading-none">{city}</div>
      ) : null}
      <div className="font-mono text-xs leading-none">
        {feature.properties.parcel_id}
      </div>
    </div>
  );
}
