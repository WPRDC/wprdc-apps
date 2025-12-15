"use client";

import {
  Button,
  FilterList,
  FilterListItem,
  Heading,
  LoadingMessage,
  municipalities,
  parcelLayer,
  ParcelPicker,
  type ParcelSelectionOptions,
  pittsburghNeighborhoodLayer,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@wprdc/ui";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Key } from "react-stately";
import {
  TbCodeDots,
  TbDownload,
  TbHomeDollar,
  TbList,
  TbMap,
  TbPointer,
} from "react-icons/tb";
import { FieldMenu } from "@/components/field-menu";
import { datasets } from "@/datasets";
import { formatShortDate } from "@/util";
import { StepHeader } from "@/components/step-header";
import { OldSelectionForm } from "@/components/old-selection-form";
import { ParcelListForm } from "@/components/parcel-list-form.tsx";
import { OwnerSelect } from "@/components/owner-select.tsx";

const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

const BASE_URL = process.env.BASE_URL ?? "";

function compareItems(a: FilterListItem, b: FilterListItem) {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name == b.name) {
    return 0;
  }
  return 1;
}

export default function Page(): React.ReactElement {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const [muniOptions, setMuniOptions] = useState<FilterListItem[]>([]);
  const [hoodOptions, setHoodOptions] = useState<FilterListItem[]>([]);

  const [drawnCount, setDrawnCount] = useState<number>(0);
  const [drawLoading, setDrawLoading] = useState<boolean>(false);
  const [mapSelection, setMapSelection] = useState<ParcelSelectionOptions>({
    selectedFeatures: {
      [parcelLayer.slug]: [],
      [pittsburghNeighborhoodLayer.slug]: [],
      [municipalities.slug]: [],
    },
    drawnAreas: [],
    ownerAddresses: [],
  });

  const [listSelection, setListSelection] = useState<string[]>([]);

  const [downloading, setDownloading] = useState(false);

  const [fieldSelection, setFieldSelection] = useState<
    Record<string, "all" | Key[]>
  >({});

  useEffect(() => {
    fetch(`${BASE_URL}/api/regions/neighborhood`)
      .then((res) => res.json())
      .then((data: { records: FilterListItem[] }) =>
        setHoodOptions(data.records.toSorted(compareItems)),
      );
    fetch(`${BASE_URL}/api/regions/municipality`)
      .then((res) => res.json())
      .then((data: { records: FilterListItem[] }) =>
        setMuniOptions(data.records.toSorted(compareItems)),
      );
  }, []);

  const handleDirectSelection =
    (layerSlug: string) =>
    (selection: Key[]): void => {
      setMapSelection({
        selectedFeatures: {
          ...mapSelection.selectedFeatures,
          [layerSlug]: selection.map((s) => s.toString()),
        },
        drawnAreas: mapSelection.drawnAreas,
        ownerAddresses: mapSelection.ownerAddresses,
      });
    };

  function handleOwnerSelectionChange(addresses: string[]) {
    console.log("🎅🏻", addresses);
    setMapSelection({
      selectedFeatures: mapSelection.selectedFeatures,
      drawnAreas: mapSelection.drawnAreas,
      ownerAddresses: addresses,
    });
  }

  function handleDownload(): void {
    const params = new URLSearchParams({
      selectedFeatures: JSON.stringify(mapSelection.selectedFeatures),
      drawnAreas: JSON.stringify(mapSelection.drawnAreas),
      ownerAddresses: JSON.stringify(mapSelection.ownerAddresses),
      listSelection: JSON.stringify(listSelection),
      fieldSelection: JSON.stringify(fieldSelection),
    });

    setDownloading(true);
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
      .catch((err: unknown) => {
        console.error(err);
      })
      .finally(() => {
        setDownloading(false);
      });
  }

  const handleDrawing = useCallback((count: number, loading: boolean): void => {
    setDrawLoading(loading);
    if (!loading) {
      setDrawnCount(count);
    }
  }, []);

  // lists of selected geogrpahies
  const [selectedParcels, selectedNeighborhoods, selectedMunicipalities] =
    useMemo(
      () => [
        mapSelection.selectedFeatures[parcelLayer.slug].concat(listSelection),
        mapSelection.selectedFeatures[pittsburghNeighborhoodLayer.slug],
        mapSelection.selectedFeatures[municipalities.slug],
      ],
      [mapSelection.selectedFeatures, listSelection],
    );

  const parcelsSelected = useMemo(
    () => selectedParcels.length,
    [selectedParcels],
  );

  const neighborhoodsSelected = useMemo(
    () => selectedNeighborhoods.length,
    [selectedNeighborhoods],
  );

  const municipalitiesSelected = useMemo(
    () => selectedMunicipalities.length,
    [selectedMunicipalities],
  );

  const fieldsSelected = useMemo(
    () => Object.values(fieldSelection).flat().length,
    [fieldSelection],
  );

  const datasetsSelected = useMemo(
    () =>
      Object.values(fieldSelection).reduce<number>(
        (acc, fields) => (fields.length ? acc + 1 : acc),
        0,
      ),
    [fieldSelection],
  );

  const downloadEnabled = useMemo(
    () =>
      (!!parcelsSelected ||
        !!neighborhoodsSelected ||
        !!municipalitiesSelected ||
        !!drawnCount) &&
      !!fieldsSelected,
    [
      drawnCount,
      fieldsSelected,
      municipalitiesSelected,
      neighborhoodsSelected,
      parcelsSelected,
    ],
  );

  return (
    <div className="w-full overflow-auto">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 pt-4 pb-36">
        <div className="pb-1">
          <Heading className="m-0 mb-1 p-0" level={1}>
            Download parcel data from the WPRDC
          </Heading>

          <div className="text-xl font-medium text-gray-800 italic">
            The data you want, for the parcels you&apos;re interested in.
          </div>
        </div>

        {/* Select Parcels*/}
        <div className="py-4">
          <StepHeader step={1}>Select Parcels</StepHeader>
          <div className="px-9 pb-2 text-lg font-medium">
            Select the parcels you want covered in your download. You can build
            search area using the selection regions (in a list or on a map),
            provide a list of parcel IDs or reuse a search area from a previous
            download.
          </div>
          <div className="pl-9 text-base font-medium">
            <div className="pb-4" />
            <Tabs>
              <TabList className="w-full">
                <Tab id="regions" className="flex items-center space-x-1">
                  <TbPointer />
                  <div>Region Picker</div>
                </Tab>
                <Tab id="map" className="flex items-center space-x-1">
                  <TbMap />
                  <div>Map</div>
                </Tab>
                <Tab id="ownership" className="flex items-center space-x-1">
                  <TbHomeDollar />
                  <div>Ownership</div>
                </Tab>
                <Tab
                  id="parcel-id-list"
                  className="flex items-center space-x-1"
                >
                  <TbList />
                  <div>Parcel ID List</div>
                </Tab>
                <Tab
                  id="upload selection"
                  className="flex items-center space-x-1"
                >
                  <TbCodeDots />
                  <div>Upload</div>
                </Tab>
              </TabList>
              <TabPanel id="regions" className="border-t border-stone-800 p-2">
                <div className="mb-2">
                  Directly select the municipalities and/or Pittsburgh
                  neighborhoods in which you&apos;d like parcel data.
                </div>

                <div className="flex gap-8">
                  <div className="w-full max-w-96">
                    {muniOptions.length ? (
                      <FilterList
                        label="Pick Municipalities"
                        selectionMode="multiple"
                        initialItems={muniOptions}
                        initialSelectedKeys={
                          mapSelection.selectedFeatures[municipalities.slug]
                        }
                        onChange={handleDirectSelection(municipalities.slug)}
                      />
                    ) : (
                      <LoadingMessage />
                    )}
                  </div>
                  <div className="w-full max-w-96">
                    {hoodOptions.length ? (
                      <FilterList
                        label="Pick Neighorbhoods"
                        selectionMode="multiple"
                        initialItems={hoodOptions}
                        initialSelectedKeys={
                          mapSelection.selectedFeatures[
                            pittsburghNeighborhoodLayer.slug
                          ]
                        }
                        onChange={handleDirectSelection(
                          pittsburghNeighborhoodLayer.slug,
                        )}
                      />
                    ) : (
                      <LoadingMessage />
                    )}
                  </div>
                </div>
              </TabPanel>

              <TabPanel id="map" className="border-t border-stone-800 p-2">
                <div className="">
                  Use the map to select parcels by any mixture of:
                </div>
                <ul className="mb-4 list-inside list-disc pl-4">
                  <li>Direct selection (zoomed in)</li>
                  <li>
                    Selecting neighborhoods and/or municipalities (zoomed out)
                  </li>
                  <li>Drawing a capture area (top left)</li>
                </ul>

                <ParcelPicker
                  className="aspect-4/3 w-full rounded-md border-2 border-black lg:aspect-video"
                  mapTilerAPIKey={API_KEY}
                  onDrawCountChange={handleDrawing}
                  onSelectionChange={setMapSelection}
                  selection={mapSelection}
                />
              </TabPanel>

              <TabPanel
                id="ownership"
                className="border-t border-stone-800 p-2"
              >
                <div className="pb-4">
                  Limit your selection to parcels with a specific owner address.
                </div>
                <OwnerSelect
                  label="Select owners"
                  initialItems={mapSelection.ownerAddresses.map((address) => ({
                    address,
                  }))}
                  onChange={handleOwnerSelectionChange}
                />
              </TabPanel>

              <TabPanel
                id="parcel-id-list"
                className="border-t border-stone-800 p-2"
              >
                <div className="mb-2">
                  Directly enter a list of parcel IDs or use a list from a
                  previous search.
                </div>

                <ParcelListForm onChange={setListSelection} />
              </TabPanel>
              <TabPanel
                id="upload selection"
                className="border-t border-stone-800 p-2"
              >
                <div className="mb-2">
                  Use a saved map selection from a previous download.
                </div>
                <OldSelectionForm />
              </TabPanel>
            </Tabs>
          </div>
        </div>

        {/* Select Fields */}
        <div className="mt-2 flex flex-col overflow-auto py-4">
          <StepHeader step={2}>Select Fields</StepHeader>
          <div className="px-9 pb-2 text-lg font-medium">
            Select all fields you want in your download.
          </div>
          <div className="overflow-auto pl-9">
            <FieldMenu
              datasets={datasets}
              onSelectionChange={setFieldSelection}
            />
          </div>
        </div>

        {/* Download */}
        <div className="border-t border-gray-400 py-4">
          <StepHeader step={3}>Download</StepHeader>
          <div className="px-9">
            <div className="pb-2 text-lg font-medium">
              Review your selection and download your parcel data.
            </div>
            <div className="pb-1">
              <div className="pt-2 text-sm leading-none font-bold">
                Parcel Selection:
              </div>
              <div className="flex leading-none">
                <div className="mr-1 after:content-['|']">
                  <span className="font-mono text-sm font-bold">
                    {parcelsSelected}
                  </span>
                  <span className="mx-1 text-xs">Individual Parcels</span>
                </div>
                <div className="mr-1 after:content-['|']">
                  <span className="font-mono text-sm font-bold">
                    {neighborhoodsSelected}
                  </span>
                  <span className="mx-1 text-xs">Neighborhoods</span>
                </div>
                <div className="mr-1 after:content-['|']">
                  <span className="font-mono text-sm font-bold">
                    {municipalitiesSelected}
                  </span>
                  <span className="mx-1 text-xs">Municipalities</span>
                </div>
                <div className="mr-1 after:content-['|']">
                  <span className="font-mono text-sm font-bold">
                    {mapSelection.ownerAddresses.length}
                  </span>
                  <span className="mx-1 text-xs">Owners</span>
                </div>
                <div className="flex items-baseline">
                  <div className="font-mono text-sm font-bold">
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

            <div className="pb-4">
              <div className="pt-2 text-sm leading-none font-bold">
                Field Selection:
              </div>
              <div className="flex items-baseline leading-none">
                <div className="">
                  <span className="font-mono text-sm font-bold">
                    {fieldsSelected}
                  </span>{" "}
                  <span className="text-xs">
                    Field{fieldsSelected === 1 ? "" : "s"}
                  </span>{" "}
                  <span className="text-xs">from </span>
                  <span className="font-mono text-sm font-bold">
                    {datasetsSelected}
                  </span>{" "}
                  <span className="text-xs">
                    Dataset{datasetsSelected === 1 ? "" : "s"}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <a className="hidden" ref={linkRef} />
              <Button
                variant="primary"
                className="mx-0 mt-2 min-w-52 p-0"
                isDisabled={!downloadEnabled}
                onPress={handleDownload}
              >
                <div className="flex items-center justify-center space-x-1 pt-1">
                  <TbDownload className="size-6" />
                  <div className="text-2xl">Download</div>
                </div>
                <div className="h-1">
                  {downloading && (
                    <Spinner color="#0e7490" className="w-full" line />
                  )}
                </div>
              </Button>

              <div className="min-h-5">
                {!downloadEnabled && (
                  <div className="font-gray-700 cursor-not-allowed text-xs italic">
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
