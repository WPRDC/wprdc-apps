"use client";

import { useEffect, useState } from "react";
import type { MapGeoJSONFeature } from "react-map-gl/maplibre";
import type {
  GeoJSONFeature,
  InteractiveSymbologyProps,
  LayerConfig,
} from "@wprdc/types";
import type { Polygon } from "geojson";
import type { DrawMode } from "@mapbox/mapbox-gl-draw";
import {
  alleghenyCountyBoundary,
  municipalitiesLayer as _municipalities,
  parcelLayer,
  pittsburghBoundary,
  pittsburghNeighborhoodLayer,
} from "../../layers";
import type { DrawEvent } from "../../components";
import { Map } from "../../components";
import { flattenPolygons } from "../../util/geo";
import type { ParcelPickerProps } from "./ParcelPicker.types";
import { ModeOverlay } from "./ModeOverlay";

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
  initialViewState,
  onDrawCountChange,
}: ParcelPickerProps): React.ReactElement {
  // Zoom level of the map
  const [zoom, setZoom] = useState<number>(initialViewState?.zoom ?? 11);
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
  const [drawMode, setDrawMode] = useState<DrawMode>();

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
      case "draw.modechange":
        setDrawMode(e.mode);
    }
  }

  /* todo:
      actions - download, save selection, copy list of parcel ids, SQL filter (query builder)
   */

  useEffect(() => {
    if (onDrawCountChange) {
      if (!drawnAreas.length) onDrawCountChange(0, false);
      else {
        onDrawCountChange(0, true);
        const geom = flattenPolygons(drawnAreas as GeoJSONFeature<Polygon>[]);

        fetch(`/api/parcels/count/?geometry=${JSON.stringify(geom.geometry)}`)
          .then((res) => res.json())
          .then((data: { parcelCount: number }) => {
            onDrawCountChange(data.parcelCount, false);
          })
          .catch((err) => {
            // eslint-disable-next-line no-console -- nothing else we can really do here
            console.error(err);
          });
      }
    }
  }, [onDrawCountChange, drawnAreas]);

  // console.log(drawMode);

  return (
    <div className="flex h-full w-full flex-col">
      <Map
        drawControlProps={{
          onCreate: handleDrawing,
          onDelete: handleDrawing,
          onUpdate: handleDrawing,
          onModeChange: handleDrawing,
        }}
        initialViewState={initialViewState}
        layers={[
          parcelLayer,
          pittsburghNeighborhoodLayer,
          municipalities,
          pittsburghBoundary,
          alleghenyCountyBoundary,
        ]}
        mapTilerAPIKey={mapTilerAPIKey}
        onClick={handleMapClick}
        onZoom={setZoom}
        selectedIDs={selectedFeatures}
        useDrawControls
      >
        <div className="absolute bottom-2.5 left-2.5 rounded border border-stone-600 bg-white/60 p-2 backdrop-blur-sm">
          <ModeOverlay drawing={drawMode === "draw_polygon"} zoom={zoom} />
        </div>
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
