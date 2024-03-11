/**
 *
 * Map
 *
 * Maplibre map
 *
 **/
"use client";

import { useCallback, useContext, useMemo, useState } from "react";
import type {
  MapGeoJSONFeature,
  MapLayerMouseEvent,
  Point,
} from "react-map-gl/maplibre";
import ReactMapGL, { NavigationControl } from "react-map-gl/maplibre";
import { Button } from "react-aria-components";
import { TbX } from "react-icons/tb";
import { FaChevronCircleDown } from "react-icons/fa";
import { BasemapMenu } from "./BasemapMenu";
import { LayerGroup } from "./LayerGroup";
import { extractFeatures } from "./util";
import { Legend } from "./Legend";
import { basemaps } from "./basemaps";
import type { MapProps } from "./Map.types";
import { MapContext } from "./MapProvider";

export function Map({
  children,
  onClick,
  onHover,
  mapTilerAPIKey,
}: MapProps): React.ReactElement {
  const { selectedLayers } = useContext(MapContext);

  const [basemap, setBasemap] = useState<keyof typeof basemaps>("basic");
  const [zoom, setZoom] = useState<string>();

  const [hoverPoint, setHoverPoint] = useState<Point | null>(null);
  const [hoveredFeatures, setHoveredFeatures] = useState<
    MapGeoJSONFeature[] | null
  >(null);

  const [clickPoint, setClickPoint] = useState<Point | null>(null);
  const [clickedFeatures, setClickedFeatures] = useState<
    MapGeoJSONFeature[] | null
  >(null);

  const interactiveLayerIDs = useMemo(() => {
    if (
      !!selectedLayers &&
      selectedLayers.map((l) => l.slug).includes("parcel-boundaries")
    ) {
      return ["parcel-boundaries-fill"];
    }
    return [];
  }, [selectedLayers]);

  const handleHover = useCallback(
    (e: MapLayerMouseEvent) => {
      const features = extractFeatures(e);
      setHoveredFeatures(features);
      if (!!features && !!features.length) setHoverPoint(e.point);
      else setHoverPoint(null);
      if (onHover) {
        onHover(e);
      }
    },
    [onHover],
  );

  const handleClick = useCallback(
    (e: MapLayerMouseEvent): void => {
      const features = extractFeatures(e);
      setClickedFeatures(features);
      if (!!features && features.length > 1) setClickPoint(e.point);
      else setClickPoint(null);
      if (onClick) {
        onClick(e);
      }
    },
    [onClick],
  );

  function getCursor(features?: MapGeoJSONFeature[] | null): string {
    if (!features?.length) return "grab";
    return "pointer";
  }

  return (
    <ReactMapGL
      cursor={getCursor(hoveredFeatures)}
      initialViewState={{
        longitude: -80,
        latitude: 40.44,
        zoom: 11,
      }}
      interactive
      interactiveLayerIds={interactiveLayerIDs}
      mapStyle={`${basemaps[basemap].url}?key=${mapTilerAPIKey}`}
      onClick={handleClick}
      onMouseMove={handleHover}
      onZoom={(e) => {
        setZoom(e.target.getZoom().toFixed(2));
      }}
    >
      <NavigationControl showCompass visualizePitch />

      <div className="absolute right-12 top-2.5">
        <BasemapMenu onSelection={setBasemap} selectedBasemap={basemap} />
      </div>

      <div className="absolute left-2.5 top-2.5 rounded-sm border bg-white bg-white/60 p-1 text-xs font-bold backdrop-blur-md">
        Zoom: <span>{zoom}</span>
      </div>

      <div className="absolute bottom-5 right-2.5">
        <Legend layers={selectedLayers} />
      </div>

      {/* Popup on hover */}
      {!!hoverPoint && !!hoveredFeatures && !clickPoint && (
        <div
          className="pointer-events-none absolute mx-auto border border-transparent bg-white/60 pb-2 backdrop-blur-md"
          style={{ left: hoverPoint.x + 12, top: hoverPoint.y + 12 }}
        >
          <div className="px-2 py-1 text-left text-xs font-bold">
            {hoveredFeatures.length > 1 && "Click to open selection menu"}
          </div>
          {hoveredFeatures.map((feature, i) => (
            <div className="px-2" key={feature.id}>
              {!!i && (
                <div className="flex items-center ">
                  <div className="w-8 border-t border-stone-700" />
                  <div className="mx-1 w-fit flex-shrink pb-0.5 italic">
                    and
                  </div>
                  <div className="flex-grow border-t border-stone-700" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!!clickPoint && clickedFeatures ? (
        <div
          className="border-lightgreen absolute z-10 mx-auto border-2 bg-white/80 pb-2 backdrop-blur-md"
          style={{ left: clickPoint.x + 12, top: clickPoint.y + 12 }}
        >
          <Button
            className="absolute right-1 top-1 font-bold hover:text-red-600"
            onPress={() => {
              setClickPoint(null);
              setClickedFeatures(null);
            }}
          >
            <TbX className="h-4 w-4" />
          </Button>
          <div className="flex items-center space-x-1 px-2 py-1 text-left text-xs font-bold">
            <FaChevronCircleDown />
            <div>Select a parcel</div>
          </div>
          <div className="flex flex-col items-stretch">
            {clickedFeatures.map((feature, i) => (
              <div key={feature.id}>
                {!!i && (
                  <div className="flex items-center">
                    <div className="w-8 flex-shrink border-t border-stone-700" />
                    <div className="mx-1 w-fit flex-shrink pb-0.5 italic">
                      or
                    </div>
                    <div className="flex-grow border-t border-stone-700" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {!!selectedLayers &&
        selectedLayers.map((layerConfig) => (
          <LayerGroup context={{}} key={layerConfig.slug} layer={layerConfig} />
        ))}
      {children}
    </ReactMapGL>
  );
}
