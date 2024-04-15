/**
 *
 * Map
 *
 * Maplibre map
 *
 **/
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
  MapGeoJSONFeature,
  MapLayerMouseEvent,
  MapRef,
  Point,
  ViewStateChangeEvent,
} from "react-map-gl/maplibre";
import ReactMapGL, { NavigationControl } from "react-map-gl/maplibre";
import type { LayerConfig, MapState } from "@wprdc/types";
import { SymbologyMode } from "@wprdc/types";
import { BasemapMenu } from "./BasemapMenu";
import { LayerGroup } from "./LayerGroup";
import { extractFeatures } from "./util";
import { Legend } from "./Legend";
import { basemaps } from "./basemaps";
import type { MapProps } from "./Map.types";
import DrawControl from "./DrawControl";

const DEFAULT_MIN_ZOOM = 9;
const DEFAULT_MAX_ZOOM = 22;

export function Map({
  children,
  onClick,
  onHover,
  mapTilerAPIKey,
  selectedIDs,
  layers,
  initialViewState,
  minZoom,
  maxZoom,
  useDrawControls = false,
  drawControlProps = {},
  onZoom,
  showZoom = false,
}: MapProps): React.ReactElement {
  const mapRef = useRef<MapRef>(null);

  const [basemap, setBasemap] = useState<keyof typeof basemaps>("basic");
  const [zoomText, setZoomText] = useState<string>();

  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);
  const [hoveredFeatures, setHoveredFeatures] = useState<
    MapGeoJSONFeature[] | null
  >(null);

  const [clickedPoint, setClickedPoint] = useState<Point | null>(null);
  const [clickedFeatures, setClickedFeatures] = useState<
    MapGeoJSONFeature[] | null
  >(null);

  const [drawingMode, setDrawingMode] = useState<string>("simple_select");

  const mapState: MapState = useMemo(
    () => ({
      selectedIDs,
      hoveredFeatures,
      clickedFeatures,
      hoveredPoint,
      clickedPoint,
    }),
    [selectedIDs, hoveredFeatures, clickedFeatures, hoveredPoint, clickedPoint],
  );

  const handleZoom = useCallback(
    (e: ViewStateChangeEvent) => {
      // set zoom for showing on map
      const z = e.target.getZoom();
      setZoomText(z.toFixed(2));
      if (onZoom) onZoom(z, mapState, e);
    },
    [mapState, onZoom],
  );

  const handleHover = useCallback(
    (e: MapLayerMouseEvent) => {
      const features = extractFeatures(e);
      setHoveredFeatures(features);
      if (!!features && !!features.length) setHoveredPoint(e.point);
      else setHoveredPoint(null);
      if (onHover) {
        onHover(features ?? [], mapState, e);
      }
    },
    [mapState, onHover],
  );

  const handleClick = useCallback(
    (e: MapLayerMouseEvent): void => {
      const features = extractFeatures(e);
      setClickedFeatures(features);
      if (!!features && features.length > 1) setClickedPoint(e.point);
      else setClickedPoint(null);
      if (onClick) {
        onClick(features ?? [], mapState, e);
      }
    },
    [mapState, onClick],
  );

  function getCursor(features?: MapGeoJSONFeature[] | null): string {
    if (!features?.length) return "grab";
    return "pointer";
  }

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      map.on("draw.modechange", (e: { mode: string }) => {
        setDrawingMode(e.mode);
      });
    }
  }, [mapRef.current]);

  const interactiveLayerIDs = useMemo(() => {
    return layers
      ?.filter(
        (l: LayerConfig) => l.symbologyMode === SymbologyMode.Interactive,
      )
      .map((l) => `${l.slug}-fill`);
  }, [layers]);

  return (
    <ReactMapGL
      cursor={getCursor(hoveredFeatures)}
      initialViewState={{
        longitude: -80,
        latitude: 40.44,
        zoom: 11,
        ...initialViewState,
      }}
      interactive
      interactiveLayerIds={
        drawingMode === "simple_select" ? interactiveLayerIDs : []
      }
      mapStyle={`${basemaps[basemap].url}?key=${mapTilerAPIKey}`}
      maxZoom={maxZoom ?? DEFAULT_MAX_ZOOM}
      minZoom={minZoom ?? DEFAULT_MIN_ZOOM}
      onClick={handleClick}
      onMouseMove={handleHover}
      onZoom={handleZoom}
      ref={mapRef}
      style={{ position: "relative" }}
    >
      <NavigationControl showCompass visualizePitch />

      <div className="absolute right-12 top-2.5">
        <BasemapMenu onSelection={setBasemap} selectedBasemap={basemap} />
      </div>

      {showZoom ? (
        <div className="absolute bottom-2.5 left-2.5 rounded-sm border bg-white p-1 text-xs font-bold">
          Zoom: <span className="font-mono">{zoomText}</span>
        </div>
      ) : null}

      <div className="absolute bottom-10 right-2.5">
        <Legend layers={layers} />
      </div>

      {!!useDrawControls && (
        <DrawControl
          controls={{
            polygon: true,
            trash: true,
          }}
          displayControlsDefault={false}
          position="top-left"
          {...drawControlProps}
        />
      )}

      {!!layers &&
        layers.map((layer) => (
          <LayerGroup
            context={{
              selectedIDs,
              hoveredFeatures,
              hoveredPoint,
              clickedPoint,
            }}
            key={layer.slug}
            layer={layer}
          />
        ))}

      {children}
    </ReactMapGL>
  );
}
