import type { MapGeoJSONFeature } from "react-map-gl/maplibre";
import {
  MunicipalityPopupRow,
  NeighborhoodPopupRow,
} from "./formats/admin-region";
import { ParcelIndexPopupRow } from "./formats/parcel";

export interface PopupRowProps {
  pID: string;
  feature: MapGeoJSONFeature;
}

export function PopupRow({ pID, feature }: PopupRowProps): React.ReactElement {
  if (pID === "parcel-index") return <ParcelIndexPopupRow feature={feature} />;
  if (pID === "municipality") return <MunicipalityPopupRow feature={feature} />;
  if (pID === "neighborhood") return <NeighborhoodPopupRow feature={feature} />;
  return <div>Popup {pID} not found</div>;
}
