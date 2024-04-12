"use client";

import { useEffect, useState } from "react";
import type { MapGeoJSONFeature } from "react-map-gl/maplibre";
import type {
  GeoJSONFeature,
  InteractiveSymbologyProps,
  LayerConfig,
} from "@wprdc/types";
import { FileTrigger } from "react-aria-components";
import type { Polygon } from "geojson";
import {
  parcelLayer,
  pittsburghNeighborhoodLayer,
  municipalitiesLayer as _municipalities,
  pittsburghBoundary,
  alleghenyCountyBoundary,
} from "../../layers";
import type { DrawEvent } from "../../components";
import { Button, Map } from "../../components";
import { flattenPolygons } from "../../util/geo";
import type { ParcelPickerProps } from "./ParcelPicker.types";
import { StatusOverlay } from "./StatusOverlay";

const municipalities: LayerConfig<InteractiveSymbologyProps> = {
  ..._municipalities,
  filter: ["!=", ["get", "NAME"], "PITTSBURGH"],
};

const layerLookup: Record<string, LayerConfig<InteractiveSymbologyProps>> = {
  [parcelLayer.slug]: parcelLayer,
  [pittsburghNeighborhoodLayer.slug]: pittsburghNeighborhoodLayer,
  [municipalities.slug]: municipalities,
};

export function ParcelPicker({
  mapTilerAPIKey,
  onSelectionChange,
}: ParcelPickerProps): React.ReactElement {
  // Admin region selection: map of admin region layer ids to array of feature ids that are selected
  const [selectedFeatures, setSelectedFeatures] = useState<
    Record<string, string[]>
  >({
    [parcelLayer.slug]: [],
    [pittsburghNeighborhoodLayer.slug]: [],
    [municipalities.slug]: [],
  });

  // Shapes drawn on map using draw control
  const [drawnAreas, setDrawnAreas] = useState<GeoJSONFeature[]>([]);
  const [parcelsUnderDrawing, setParcelsUnderDrawing] = useState<number>(0);
  const [parcelsUnderDrawingIsLoading, setParcelsUnderDrawingIsLoading] =
    useState<boolean>(false);

  // TODO: Custom SQL filter
  // const [selectedFilter, setSelectedFilter] = useState<string>("");

  useEffect(() => {
    if (onSelectionChange) onSelectionChange({ selectedFeatures, drawnAreas });
  }, [onSelectionChange, drawnAreas, selectedFeatures]);

  function handleMapClick(features: MapGeoJSONFeature[]): void {
    if (features.length) {
      const primaryFeature: MapGeoJSONFeature = features[0];
      if (
        [
          parcelLayer.slug,
          pittsburghNeighborhoodLayer.slug,
          municipalities.slug,
        ].includes(primaryFeature.source)
      ) {
        const layerID: string = primaryFeature.source;
        const regionLayerConfig: LayerConfig<InteractiveSymbologyProps> =
          layerLookup[layerID];

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- maplibre uses any
        const regionID: string =
          primaryFeature.properties[regionLayerConfig.idField];

        // toggle the region IDs presence in the selected list
        const oldSelection: string[] = selectedFeatures[layerID];
        setSelectedFeatures({
          ...selectedFeatures,
          [layerID]: oldSelection.includes(regionID)
            ? oldSelection.filter((id) => id !== regionID)
            : [...oldSelection, regionID],
        });
      }
    }
  }

  function handleDrawing(e: DrawEvent): void {
    switch (e.type) {
      case "draw.create":
      case "draw.update":
        setDrawnAreas(e.features);
        break;
      case "draw.delete":
        setDrawnAreas([]);
        break;
    }
  }

  function handleFileUpload(files: FileList | null): void {
    const file = files?.item(0);
    if (file) {
      file.text().then(
        (text) => {
          setSelectedFeatures(JSON.parse(text) as Record<string, string[]>);
        },
        (err) => {
          // eslint-disable-next-line no-console -- todo: handle this with ui error
          console.error(err);
        },
      );
    }
  }

  function handleSelectionDownload(): void {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(selectedFeatures),
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "selection.json";

    link.click();
  }

  /* todo:
      actions - download, save selection, copy list of parcel ids, SQL filter (query builder)
   */

  useEffect(() => {
    if (drawnAreas.length) {
      setParcelsUnderDrawingIsLoading(true);
      const geom = flattenPolygons(drawnAreas as GeoJSONFeature<Polygon>[]);

      fetch(`/api/parcels/count/?geometry=${JSON.stringify(geom.geometry)}`)
        .then((res) => res.json())
        .then((data: { parcelCount: number }) => {
          setParcelsUnderDrawing(data.parcelCount);
          setParcelsUnderDrawingIsLoading(false);
        })
        .catch((err) => {
          // eslint-disable-next-line no-console -- nothing else we can really do here
          console.error(err);
        });
    }
  }, [drawnAreas]);

  return (
    <div className="flex h-full w-full flex-col">
      <Map
        drawControlProps={{
          onCreate: handleDrawing,
          onDelete: handleDrawing,
          onUpdate: handleDrawing,
        }}
        layers={[
          parcelLayer,
          pittsburghNeighborhoodLayer,
          municipalities,
          pittsburghBoundary,
          alleghenyCountyBoundary,
        ]}
        mapTilerAPIKey={mapTilerAPIKey}
        onClick={handleMapClick}
        selectedIDs={selectedFeatures}
        useDrawControls
      >
        <StatusOverlay
          parcelsUnderDrawing={parcelsUnderDrawing}
          parcelsUnderDrawingIsLoading={parcelsUnderDrawingIsLoading}
          selectedFeatures={selectedFeatures}
        />
      </Map>

      {/* todo: move this to a menu */}
      {/*<div className="h-24">*/}
      {/*  <FileTrigger onSelect={handleFileUpload}>*/}
      {/*    <Button>Upload Saved Selection</Button>*/}
      {/*  </FileTrigger>*/}
      {/*  <Button onPress={handleSelectionDownload}>Download Selection</Button>*/}
      {/*  <div>*/}
      {/*    Save your selection so can query the same parcels again or make*/}
      {/*    changes later on.*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
}
