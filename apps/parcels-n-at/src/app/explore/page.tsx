import { NavMap } from "@/components/nav-map";
import { PropertyDashboard } from "@/components/parcel-dashboard";
import { MapProvider } from "@/components/map-provider";
import { ParcelSearch } from "@/components/parcel-search";
import React, { useMemo } from "react";
import { MapPopup } from "@/components/map-popup";
import { geocodeParcel } from "@wprdc/api";

import {availableLayers} from '@/layers';
import { GeocodeResponseBody } from "@/app/api/parcels/geocode/route.ts";

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
    classes,
    ownerOccupied,
    z,
    zoomPan: _zoomPan,
    selectedLayers
  } = await searchParams;

  const parcelID = parcel ? String(parcel) : undefined;
  const ownerAddress = ownerAddr ? String(ownerAddr) : undefined;
  const useClasses = classes ? String(classes) : undefined;

  const zoomPan = _zoomPan ?? z;
  const geocodeResponse = await fetch(
    `${BASE_URL}/api/parcels/geocode?pid=${parcelID}`,
  );
  const {  bbox } =
    (await geocodeResponse.json()) as GeocodeResponseBody;

  return (
    <div className="h-full w-full xl:flex xl:content-stretch">
      {!!parcel && (
        <div className="mb-0.5 block p-4 text-xl font-semibold lg:hidden">
          <p>Find information about a parcel</p>
          <ParcelSearch />
        </div>
      )}

      <MapProvider>
        <div className="hidden h-96 lg:block xl:h-auto xl:w-1/2">
          <NavMap
            mapID="popupMap"
            selectedParcel={parcelID}
            ownerAddress={ownerAddress}
            showOwnerOccupied={Boolean(ownerOccupied)}
            showVacant={Boolean(ownerOccupied)}
            classes={useClasses}
            bbox={bbox}
            zoomPan={!!zoomPan}
            availableLayers={availableLayers}
            selectedLayers={selectedLayers}
          />
        </div>

        <div className="fixed bottom-4 right-4 z-40 flex flex-col lg:hidden">
          <MapPopup
            selectedParcel={parcelID}
            ownerAddress={ownerAddress}
            showOwnerOccupied={Boolean(ownerOccupied)}
            showVacant={Boolean(ownerOccupied)}
            classes={useClasses}
          />
        </div>
        <div className="relative h-full border-t-2 border-stone-800 bg-stone-50 lg:border-l-2 xl:w-1/2 xl:overflow-auto xl:border-t-0">
          {parcel ? (
            <PropertyDashboard parcelID={String(parcel)} />
          ) : (
            <article className="flex flex-col space-y-8 p-4">
              <div>
                <h1 className="mb-4 text-4xl font-bold">
                  Explore WPRDC property data by parcel
                </h1>
                <div className="prose prose-lg">
                  <p>
                    The <strong>Parcels N'at Data Explorer</strong> provides a
                    user-friendly, realtime view of data about parcels across
                    Allegheny County.
                  </p>
                  <p></p>
                  <p>
                    You can <strong>click on parcels on the map</strong> or{" "}
                    <strong>search by address or parcel ID</strong>.
                  </p>
                </div>
              </div>

              <div className="pb-8">
                <ParcelSearch />
              </div>

              <div className="prose prose-lg mt-12">
                <h2 className="text-2xl font-bold">Source Code</h2>

                <p>
                  You can find the source code for this application on in our{" "}
                  <a href="https://github.com/wprdc/wprdc-apps" target="_blank">
                    apps monorepo
                  </a>
                  .
                </p>
                <h3 className="text-xl font-bold">
                  Powered by SpaceRAT technology!
                </h3>

                <p>
                  Aggregate statistics in the <a href="/explore">Explorer</a>{" "}
                  and <a href="/indicators">Indicators</a> views use our{" "}
                  <a href="https://github.com/wprdc/spacerat" target="_blank">
                    <strong>Spatial Relational Toolkit</strong> library{" "}
                    (SpaceRAT)
                  </a>
                  .
                </p>

                <p>SpaceRAT provides realtime aggregate statistics by</p>
                <ol>
                  <li>
                    maintaining a custom{" "}
                    <a
                      href="https://en.wikipedia.org/wiki/Gazetteer"
                      target="_blank"
                    >
                      gazetteer
                    </a>{" "}
                    of local geographies
                  </li>
                  <li>
                    and by defining how data in{" "}
                    <a href="https://data.wprdc.org" target="_blank">
                      the data center
                    </a>{" "}
                    describes those geographies.
                  </li>
                </ol>
              </div>
            </article>
          )}
        </div>
      </MapProvider>
    </div>
  );
}
