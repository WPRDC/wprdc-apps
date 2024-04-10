"use client";

import { Map, parcelLayer } from "@wprdc/ui";
import { useRouter } from "next/navigation";
import { ParcelSearch } from "@/components/parcel-search";

const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

export interface NavMapProps {
  selectedParcel?: string;
}

export function NavMap({ selectedParcel }: NavMapProps): React.ReactElement {
  const router = useRouter();
  return (
    <Map
      initialViewState={{ zoom: 15.5 }}
      layers={[parcelLayer]}
      mapTilerAPIKey={API_KEY}
      maxZoom={19}
      minZoom={11}
      onClick={(features) => {
        features.length &&
          router.push(`/parcel?parcel=${features[0].properties.parcel_id}`);
      }}
      selectedIDs={{
        [parcelLayer.slug]: [selectedParcel ?? ""],
      }}
    >
      <div className="absolute left-2.5 top-2.5 w-full">
        <div className="mx-auto max-w-screen-lg">
          <ParcelSearch />
        </div>
      </div>
    </Map>
  );
}
