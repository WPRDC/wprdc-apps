"use client";

import { useCallback, useEffect, useState } from "react";
import type { MapGeoJSONFeature } from "react-map-gl/maplibre";
import type {
  GeoJSONFeature,
  InteractiveSymbologyProps,
  LayerConfig,
} from "@wprdc/types";
import type { Polygon } from "geojson";
import type { DrawMode } from "@mapbox/mapbox-gl-draw";
import { twMerge } from "tailwind-merge";
import {
  alleghenyCountyBoundary,
  municipalities as _municipalities,
  parcelLayer,
  pittsburghBoundary,
  pittsburghNeighborhoodLayer,
} from "../../layers";
import type { DrawEvent } from "../../components";
import { Map } from "../../components";
import { flattenPolygons } from "../../util/geo";
import type {
  ParcelPickerProps,
  ParcelSelectionOptions,
} from "./ParcelPicker.types";
import { ModeOverlay } from "./ModeOverlay";

const municipalities: LayerConfig<InteractiveSymbologyProps> = {
  ..._municipalities,
  renderOptions: {
    ..._municipalities.renderOptions,
    filter: ["!=", ["get", "NAME"], "PITTSBURGH"],
  },
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
  className,
  selection: _selection,
}: ParcelPickerProps): React.ReactElement {
  // Zoom level of the map
  const [zoom, setZoom] = useState<number>(initialViewState?.zoom ?? 11);

  const [innerSelection, setInnerSelection] = useState<ParcelSelectionOptions>({
    selectedFeatures: {
      [parcelLayer.slug]: [],
      [pittsburghNeighborhoodLayer.slug]: [],
      [municipalities.slug]: [],
    },
    drawnAreas: [],
  });

  // Shapes drawn on map using draw control
  const [drawMode, setDrawMode] = useState<DrawMode>();

  const { selectedFeatures, drawnAreas } = _selection ?? innerSelection;

  useEffect(() => {
    if (onSelectionChange) onSelectionChange({ selectedFeatures, drawnAreas });
  }, [onSelectionChange, drawnAreas, selectedFeatures]);

  const setDrawnAreas = useCallback(
    function setDrawnAreas(newAreas: GeoJSONFeature[]): void {
      const newSelection: ParcelSelectionOptions = {
        selectedFeatures,
        drawnAreas: newAreas,
      };
      if (onSelectionChange) onSelectionChange(newSelection);
      setInnerSelection(newSelection);
    },
    [onSelectionChange, selectedFeatures],
  );

  const setSelectedFeatures = useCallback(
    function setSelectedFeatures(
      newFeatureSelection: Record<string, string[]>,
    ): void {
      const newSelection: ParcelSelectionOptions = {
        selectedFeatures: newFeatureSelection,
        drawnAreas,
      };
      if (onSelectionChange) onSelectionChange(newSelection);
      setInnerSelection(newSelection);
    },
    [drawnAreas, onSelectionChange],
  );

  const handleMapClick = useCallback(
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
            primaryFeature.properties[regionLayerConfig.interaction.idField];

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
    },
    [selectedFeatures, setSelectedFeatures],
  );

  const handleDrawing = useCallback(
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
    },
    [setDrawnAreas],
  );

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
          .catch((err: unknown) => {
            // eslint-disable-next-line no-console -- nothing else we can really do here
            console.error(err);
          });
      }
    }
  }, [onDrawCountChange, drawnAreas]);

  return (
    <div className={twMerge("flex h-full w-full flex-col", className)}>
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
          municipalities,
          pittsburghNeighborhoodLayer,
          pittsburghBoundary,
          alleghenyCountyBoundary,
        ]}
        mapTilerAPIKey={mapTilerAPIKey}
        onClick={handleMapClick}
        onZoom={setZoom}
        selectedIDs={selectedFeatures}
        useDrawControls
        withScrollZoomControl
        defaultScrollZoom={false}
      >
        <div className="absolute bottom-2.5 left-2.5 rounded border border-stone-600 bg-white/60 p-2 backdrop-blur-sm">
          <ModeOverlay drawing={drawMode === "draw_polygon"} zoom={zoom} />
        </div>
      </Map>
    </div>
  );
}
