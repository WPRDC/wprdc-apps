import { NavMap } from "@/components/nav-map";
import { ParcelSearch } from "@/components/parcel-search";
import React from "react";
import { MapPopup } from "@/components/map-popup";

import { availableLayers } from "@/layers";
import { GeocodeResponseBody } from "@/app/api/parcels/geocode/route.ts";
import { ParcelDashboard } from "@/components/parcel-dashboard";
import { MapProvider } from "@/components/map-provider";

interface Params {
  parcel: string;
  ownerAddr?: string;
  classes?: string;
  ownerOccupied?: string | number;
  zoomPan?: number;
  z?: number;
  selectedLayers?: string | string[];
}

const BASE_URL = process.env.BASE_URL ?? "";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Params>;
}): Promise<React.ReactElement> {
  const {
    parcel,
    ownerAddr,
    z,
    zoomPan: _zoomPan,
    selectedLayers,
  } = await searchParams;

  const parcelID = parcel ? String(parcel) : undefined;
  const ownerAddress = ownerAddr ? String(ownerAddr) : undefined;

  const zoomPan = _zoomPan ?? z;
  const geocodeResponse = await fetch(
    `${BASE_URL}/api/parcels/geocode?pid=${parcelID}`,
  );
  const { bbox } = (await geocodeResponse.json()) as GeocodeResponseBody;

  return (
    <div className="h-full w-full xl:flex xl:content-stretch">
      {!!parcel && (
        <div className="mb-0.5 block p-4 text-xl font-semibold lg:hidden">
          <p>Find information about a parcel</p>
          <ParcelSearch />
        </div>
      )}
      <MapProvider>
        <div className="hidden h-96 lg:block xl:h-auto xl:w-1/2 xl:grow">
          <NavMap
            mapID="popupMap"
            selectedParcel={parcelID}
            ownerAddress={ownerAddress}
            bbox={bbox}
            zoomPan={!!zoomPan}
            availableLayers={availableLayers}
            selectedLayers={selectedLayers}
          />
        </div>

        <div className="fixed right-4 bottom-12 z-40 flex flex-col lg:hidden">
          <MapPopup
            selectedParcel={parcelID}
            ownerAddress={ownerAddress}
            bbox={bbox}
            zoomPan={!!zoomPan}
            availableLayers={availableLayers}
            selectedLayers={selectedLayers}
          />
        </div>
        <div className="relative h-full border-t-2 border-stone-800 bg-stone-50 lg:border-l-2 xl:w-2xl xl:overflow-scroll xl:border-t-0">
          {parcel ? (
            <div>
              <ParcelDashboard parcelID={String(parcel)} />
            </div>
          ) : (
            <article className="flex flex-col space-y-8 p-4">
              <div>
                <h1 className="mb-4 text-4xl font-bold">
                  Explore WPRDC property data by parcel
                </h1>
                <div className="prose prose-lg">
                  <p>
                    The <strong>Parcels N&apos;at Data Explorer</strong>{" "}
                    provides a user-friendly, realtime view of data about
                    parcels across Allegheny County.
                  </p>
                  <p></p>
                  <p>
                    You can <strong>click on parcels on the map</strong> or{" "}
                    <strong>search by address or parcel ID</strong>.
                  </p>
                </div>
              </div>

              <div className="mr-4 w-full pb-8">
                <ParcelSearch />
              </div>
            </article>
          )}
        </div>
      </MapProvider>
    </div>
  );
}
