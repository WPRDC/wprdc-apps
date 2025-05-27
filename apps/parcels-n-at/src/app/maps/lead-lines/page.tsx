"use client";

import { parcelLeadlineStatus } from "@/layers/parcel-leadline-status";
import { Map } from "@/components/map";
import { MapGeoJSONFeature } from "react-map-gl/maplibre";
import { useRouter } from "next/navigation";

const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY ?? "missing";

export default function Page() {
  const router = useRouter();
  return (
    <div className="h-full w-full xl:flex xl:content-stretch">
      <Map
        defaultLayers={[parcelLeadlineStatus]}
        mapTilerAPIKey={API_KEY}
        onNavigate={(feature: MapGeoJSONFeature) => {
          router.push(`/explore?parcel=${feature.properties.parid as string}`);
        }}
      />
    </div>
  );
}
