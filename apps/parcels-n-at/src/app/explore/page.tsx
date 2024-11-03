import { NavMap } from "@/components/nav-map";
import { PropertyDashboard } from "@/components/parcel-dashboard";
import { MapProvider } from "@/components/map-provider.tsx";
import { ParcelSearch } from "@/components/parcel-search.tsx";
import React from "react";

interface Params {
  parcelID: string;
  ownerAddr?: string;
  highlightVacant?: string;
  highlightOwnerOccupied?: string;
  highlightAssessedValue?: string;
}

export default async function Page({
  searchParams,
}: {
  params: Params;
  searchParams: Promise<
    Record<
      "parcel" | "ownerAddr" | "classes" | "ownerOccupied",
      string | number
    >
  >;
}): Promise<React.ReactElement> {
  const { parcel, ownerAddr, classes, ownerOccupied } = await searchParams;

  const parcelID = parcel ? String(parcel) : undefined;
  const ownerAddress = ownerAddr ? String(ownerAddr) : undefined;
  const useClasses = classes ? String(classes) : undefined;

  return (
    <div className="h-full w-full xl:flex xl:content-stretch">
      <MapProvider>
        <div className="h-96 xl:h-auto xl:w-1/2">
          <NavMap
            selectedParcel={parcelID}
            ownerAddress={ownerAddress}
            showOwnerOccupied={Boolean(ownerOccupied)}
            showVacant={Boolean(ownerOccupied)}
            classes={useClasses}
          />
        </div>
        <div className="relative h-full border-l-2 border-stone-800 bg-stone-50 xl:w-1/2 xl:overflow-auto">
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
