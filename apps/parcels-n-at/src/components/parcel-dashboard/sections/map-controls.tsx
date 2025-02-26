import { geocodeParcel } from "@wprdc/api";
import { MapControls } from "@/components/parcel-dashboard/components/map-controls";
import { GeocodeResponseBody } from "@/app/api/parcels/geocode/route.ts";
const BASE_URL = process.env.BASE_URL ?? "";

export interface MapControlsSectionProps {
  parcelID: string;
}

export async function MapControlsSection({
  parcelID,
}: MapControlsSectionProps) {
  const response = await fetch(
    `${BASE_URL}/api/parcels/geocode?pid=${parcelID}`,
  );
  const data = (await response.json()) as GeocodeResponseBody;

  return (
    <div>
      {!!response && data.bbox && (
        <MapControls parcelID={parcelID} bbox={data.bbox} />
      )}
    </div>
  );
}
