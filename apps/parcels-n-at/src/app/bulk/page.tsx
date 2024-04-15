"use client";

import type { ParcelSelectionOptions } from "@wprdc/ui";
import {
  Button,
  Heading,
  municipalitiesLayer,
  parcelLayer,
  ParcelPicker,
  pittsburghNeighborhoodLayer,
  Spinner,
} from "@wprdc/ui";
import { useCallback, useRef, useState } from "react";
import type { Key } from "react-stately";
import { TbDownload } from "react-icons/tb";
import { FieldMenu } from "@/components/field-menu";
import { datasets } from "@/datasets";
import { formatShortDate } from "@/util";
import { StepHeader } from "@/components/step-header";

const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

export default function Page(): React.ReactElement {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const [drawnCount, setDrawnCount] = useState<number>(0);
  const [drawLoading, setDrawLoading] = useState<boolean>(false);
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

  const handleDrawing = useCallback((count: number, loading: boolean): void => {
    setDrawLoading(loading);
    if (!loading) {
      setDrawnCount(count);
    }
  }, []);

  const parcelsSelected = parcelSelection.selectedFeatures
    ? parcelSelection.selectedFeatures[parcelLayer.slug].length
    : 0;
  const neighborhoodsSelected = parcelSelection.selectedFeatures
    ? parcelSelection.selectedFeatures[pittsburghNeighborhoodLayer.slug].length
    : 0;
  const municipalitiesSelected = parcelSelection.selectedFeatures
    ? parcelSelection.selectedFeatures[municipalitiesLayer.slug].length
    : 0;
  const fieldsSelected = Object.values(fieldSelection).flat().length;

  const downloadEnabled =
    (Boolean(parcelsSelected) ||
      Boolean(neighborhoodsSelected) ||
      Boolean(municipalitiesSelected) ||
      Boolean(drawnCount)) &&
    Boolean(fieldsSelected);

  return (
    <div className="flex w-full">
      <div className="flex w-1/2 flex-col">
        <ParcelPicker
          mapTilerAPIKey={API_KEY}
          onDrawCountChange={handleDrawing}
          onSelectionChange={setParcelSelection}
        />
      </div>

      <div className="flex h-full w-1/2 flex-col p-4">
        <div className="pb-1">
          <Heading className="m-0 mb-1 p-0" level={1}>
            Download parcel data from the WPRDC
          </Heading>
          <div className="text-xl font-medium italic text-gray-800">
            The data you want, for the parcels you&apos;re interested in.
          </div>
        </div>

        {/* Select Parcels*/}
        <div>
          <StepHeader step={1}>Select Parcels</StepHeader>
          <div className="pl-6 text-base font-medium">
            <div>Mix and match how you select parcels on the map.</div>
            <div className="pt-1 text-sm font-bold leading-none">
              Current Selection:
            </div>

            <div className="flex leading-none">
              <div className="mr-1 after:content-['|']">
                <span className="font-mono text-sm">{parcelsSelected}</span>
                <span className="mx-1 text-xs">Individual Parcels</span>
              </div>
              <div className="mr-1 after:content-['|']">
                <span className="font-mono text-sm">
                  {neighborhoodsSelected}
                </span>
                <span className="mx-1 text-xs">Neighborhoods</span>
              </div>
              <div className="mr-1 after:content-['|']">
                <span className="font-mono text-sm">
                  {municipalitiesSelected}
                </span>
                <span className="mx-1 text-xs">Municipalities</span>
              </div>
              <div className="flex items-baseline">
                <div className="font-mono text-sm">
                  {drawLoading ? (
                    <Spinner className="inline-block" size="S" />
                  ) : (
                    drawnCount
                  )}
                </div>
                <div className="mx-1 text-xs">Parcels Under Drawing</div>
              </div>
            </div>
          </div>
        </div>

        {/* Select Fields */}
        <div className="mt-2 flex flex-col overflow-auto border-t border-gray-400 pt-2">
          <StepHeader step={2}>Select Fields</StepHeader>
          <div className="pb-2 pl-6 text-base font-medium">
            Select all the fields you want to download from across various
            datasets.
          </div>
          <div className="overflow-auto px-6">
            <FieldMenu
              datasets={datasets}
              onSelectionChange={setFieldSelection}
            />
          </div>
        </div>

        {/* Download */}
        <div className="border-t border-gray-400 pt-2">
          <StepHeader step={3}>Download</StepHeader>
          <div className="flex pl-6">
            <div>
              {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid -- workaround used for download triggered by button  */}
              <a className="hidden" ref={linkRef} />
              <Button
                className="mx-0 mt-2 flex items-center space-x-1"
                isDisabled={!downloadEnabled}
                onPress={handleDownload}
              >
                <TbDownload />
                <div>Download Data For Your Selection</div>
              </Button>
              <div className="min-h-5">
                {!downloadEnabled && (
                  <div className="font-gray-700 text-xs italic">
                    You must select parcels and fields before downloading.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
