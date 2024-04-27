"use client";

import { Map, parcelLayer } from "@wprdc/ui";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import type { MapGeoJSONFeature, MapRef } from "react-map-gl/maplibre";
import { ParcelSearch } from "@/components/parcel-search";
import type { GeocodeResponseBody } from "@/app/api/parcels/geocode/route";

const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

export interface NavMapProps {
  selectedParcel?: string;
}

export function NavMap({ selectedParcel }: NavMapProps): React.ReactElement {
  const mapRef = useRef<MapRef>(null);

  const router = useRouter();

  useEffect(() => {
    if (selectedParcel)
      void fetch(`/api/parcels/geocode/?pid=${selectedParcel}`)
        .then((res) => res.json())
        .then((data: GeocodeResponseBody) => {
          if (data.bbox && mapRef.current) {
            const map = mapRef.current.getMap();
            map.fitBounds(data.bbox, {
              padding: 50,
            });
          }
        });
  }, [selectedParcel]);

  return (
    <Map
      initialViewState={{ zoom: 15.5 }}
      layers={[parcelLayer]}
      mapTilerAPIKey={API_KEY}
      maxZoom={19}
      minZoom={11}
      onNavigate={(feature: MapGeoJSONFeature) => {
        router.push(
          `/explore?parcel=${feature.properties.parcel_id as string}`,
        );
      }}
      ref={mapRef}
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
