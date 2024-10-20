import { geocodeParcel } from "@wprdc/api";
import { MapControls } from "@/components/parcel-dashboard/components/map-controls.tsx";

export interface MapControlsSectionProps {
  parcelID: string;
}

export async function MapControlsSection({
  parcelID,
}: MapControlsSectionProps) {
  const response = await geocodeParcel(parcelID);

  return (
    <div>
      {!!response && <MapControls parcelID={parcelID} bbox={response.bbox} />}
    </div>
  );
}
