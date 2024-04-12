"use client";

import type { ParcelSelectionOptions } from "@wprdc/ui";
import {
  Button,
  Heading,
  municipalitiesLayer,
  parcelLayer,
  ParcelPicker,
  pittsburghNeighborhoodLayer,
} from "@wprdc/ui";
import { useRef, useState } from "react";
import type { Key } from "react-stately";
import { TbDownload } from "react-icons/tb";
import { FieldMenu } from "@/components/field-menu";
import { datasets } from "@/datasets";
import { formatShortDate } from "@/util";

const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

export default function Page(): React.ReactElement {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const [parcelSelection, setParcelSelection] =
    useState<ParcelSelectionOptions>({});

  const [fieldSelection, setFieldSelection] = useState<
    Record<string, "all" | Key[]>
  >({});

  function handleDownload(): void {
    const params = new URLSearchParams({
      selectedFeatures: JSON.stringify(parcelSelection.selectedFeatures ?? {}),
      drawnAreas: JSON.stringify(parcelSelection.drawnAreas ?? {}),
      fieldSelection: JSON.stringify(fieldSelection),
    });

    fetch(`/api/parcels/?${params.toString()}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = linkRef.current;
        if (!link) {
          return;
        }

        link.href = url;
        link.download = `parcels-n-at_${formatShortDate(new Date())}.zip`; // Any name you want to download the file as
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console -- for debugging
        console.error(err);
      });
  }

  const parcelsSelected = parcelSelection.selectedFeatures
    ? parcelSelection.selectedFeatures[parcelLayer.slug].length
    : 0;
  const neighborhoodsSelected = parcelSelection.selectedFeatures
    ? parcelSelection.selectedFeatures[pittsburghNeighborhoodLayer.slug].length
    : 0;
  const municipalitiesSelected = parcelSelection.selectedFeatures
    ? parcelSelection.selectedFeatures[municipalitiesLayer.slug].length
    : 0;
  const areasDrawn = parcelSelection.drawnAreas?.length ?? 0;
  const fieldsSelected = Object.values(fieldSelection).flat().length;

  const downloadEnabled =
    (Boolean(parcelsSelected) ||
      Boolean(neighborhoodsSelected) ||
      Boolean(municipalitiesSelected) ||
      Boolean(areasDrawn)) &&
    Boolean(fieldsSelected);

  return (
    <div className="flex w-full overflow-auto">
      <div className="flex w-1/2 flex-col">
        <ParcelPicker
          mapTilerAPIKey={API_KEY}
          onSelectionChange={setParcelSelection}
        />
      </div>
      <div className="w-1/ h-full overflow-auto p-4">
        <div className="mb-2 border-b pb-4">
          <Heading className="m-0 mb-1 p-0" level={1}>
            Download parcel data from the WPRDC
          </Heading>
          <div className="text-2xl font-medium italic text-gray-800">
            The data you want, for the parcels you&apos;re interested in.
          </div>
          <div>
            <div className="my-2 flex items-center">
              <div className="bg-primary mr-2 flex size-8 items-center justify-center rounded-full border-2 border-black">
                <div className="text-3xl font-bold">1</div>
              </div>
              <div className="text-2xl font-bold">Select Parcels</div>
            </div>
            <div className="pl-12">
              <div className="text-base font-medium">
                Mix and match how you select parcels
              </div>
              <ul className="list-inside list-disc text-base font-medium">
                <li>Select parcels on the map one-by-one,</li>
                <li>
                  Select administrative regions to select all the parcels within
                  them,
                </li>
                <li>Draw a shape to select parcels under it, and/or</li>
                <li>
                  Paste a list of Parcel IDs{" "}
                  <span className="text-sm italic text-gray-600">
                    coming soon
                  </span>
                </li>
              </ul>
            </div>

            <div className="mb-2 mt-4 flex items-center">
              <div className="bg-primary mr-2 flex size-8 items-center justify-center rounded-full border-2 border-black">
                <div className="text-3xl font-bold">2</div>
              </div>
              <div className="text-2xl font-bold">Select Fields</div>
            </div>
            <div className="pl-12">
              <div className="text-base font-medium">
                Select all the fields you want to download from across various
                datasets.
              </div>
            </div>

            <div className="my-2 flex items-center">
              <div className="bg-primary mr-2 flex size-8 items-center justify-center rounded-full border-2 border-black">
                <div className="text-3xl font-bold">3</div>
              </div>
              <div className="text-2xl font-bold">Download</div>
            </div>
            <div>
              <div className="pl-12">
                <div className="text-base font-medium">
                  <div>Download data based on your selections.</div>
                </div>
                <div className="font-mono text-sm">
                  <span>
                    {parcelsSelected} Parcel{parcelsSelected !== 1 ? "s" : ""},{" "}
                  </span>
                  <span>
                    {neighborhoodsSelected} Neighborhood
                    {parcelsSelected !== 1 ? "s" : ""}, and
                  </span>{" "}
                  <span>
                    {municipalitiesSelected} Municipalit
                    {parcelsSelected !== 1 ? "ies" : "y"} selected.
                  </span>
                </div>
                <div className="font-mono text-sm">
                  <span>{fieldsSelected}</span> Fields selected.
                </div>

                {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid -- workaround used for download triggered by button  */}
                <a className="hidden" ref={linkRef} />
                <Button
                  className="mt-3 flex items-center space-x-1"
                  isDisabled={!downloadEnabled}
                  onPress={handleDownload}
                >
                  <TbDownload />
                  <div>Download Data For Your Selection</div>
                </Button>
                {!downloadEnabled && (
                  <div className="font-gray-700 text-xs italic">
                    You must select parcels and fields before downloading.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <FieldMenu datasets={datasets} onSelectionChange={setFieldSelection} />
      </div>
    </div>
  );
}
