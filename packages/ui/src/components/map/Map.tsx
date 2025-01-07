/**
 *
 * Map
 *
 * Maplibre map
 *
 **/
"use client";

import type {
  InteractiveSymbologyProps,
  LayerConfig,
  MapState,
} from "@wprdc/types";
import { SymbologyMode } from "@wprdc/types";
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TbToggleLeft, TbToggleRightFilled } from "react-icons/tb";
import type {
  MapGeoJSONFeature,
  MapLayerMouseEvent,
  MapRef,
  Point,
  ViewStateChangeEvent,
} from "react-map-gl/maplibre";
import { NavigationControl, Map as ReactMapGL } from "react-map-gl/maplibre";
import { twMerge } from "tailwind-merge";
import { Button } from "../button";
import { BasemapMenu } from "./BasemapMenu";
import { basemaps } from "./basemaps";
import DrawControl from "./DrawControl";
import { LayerGroup } from "./LayerGroup";
import { Legend } from "./Legend";
import type { MapProps } from "./Map.types";
import { ClickPopup, HoverPopup, SimplePopupWrapper } from "./popup";
import { extractFeatures } from "./util";

const DEFAULT_MIN_ZOOM = 9;
const DEFAULT_MAX_ZOOM = 22;
const DEFAULT_LONGITUDE = -80;
const DEFAULT_LATITUDE = 40.44;
const DEFAULT_ZOOM = 11;

const NODE_ENV = process.env.NODE_ENV ?? "development";

export const Map = forwardRef<MapRef, MapProps>(function _Map(
  {
    id,
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
    onNavigate,
    showZoom = false,
    style = {},
    scrollZoom = true,
    withScrollZoomControl = false,
    defaultScrollZoom = false,
    onLoad,
    interactiveLayerIDs: manualInteractiveLayerIDs = [],
    hoverPopup: customHoverPopup,
  },
  ref,
): React.ReactElement {
  const _mapRef = useRef<MapRef>(null);
  const mapRef = ref ?? _mapRef;

  const [basemap, setBasemap] = useState<keyof typeof basemaps>("basic");
  const [zoomText, setZoomText] = useState<string>(
    (initialViewState?.zoom ?? DEFAULT_ZOOM).toFixed(2),
  );

  const [scrollZoomButtonActive, setScrollZoomButtonActive] =
    useState<boolean>(false);

  const [hoveredPoint, setHoveredPoint] = useState<Point | null>(null);
  const [hoveredFeatures, setHoveredFeatures] = useState<
    MapGeoJSONFeature[] | null
  >(null);

  const [clickedPoint, setClickedPoint] = useState<Point | null>(null);
  const [clickedFeatures, setClickedFeatures] = useState<
    MapGeoJSONFeature[] | null
  >(null);

  const [drawingMode, setDrawingMode] = useState<string>("simple_select");

  const [onMac, setOnMac] = useState<boolean>(false);

  // scrollZoom controlled by the button
  const [scrollZoomOverride, setScrollZoomOverride] =
    useState(defaultScrollZoom);

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

  /** Called when attempting to close a popup */
  const handlePopupClose = useCallback(() => {
    setClickedPoint(null);
    setClickedFeatures(null);
  }, []);

  /** Called when navigating using a feature */
  const handleNavigate = useCallback(
    (feature: MapGeoJSONFeature) => {
      handlePopupClose();
      if (onNavigate) onNavigate(feature, mapState);
    },
    [handlePopupClose, mapState, onNavigate],
  );

  /** Used by popups to determine which layout to use */
  const getPopupID = useCallback(
    (f: MapGeoJSONFeature) => {
      const layer: LayerConfig<InteractiveSymbologyProps> | undefined =
        layers?.find<LayerConfig<InteractiveSymbologyProps>>(
          (l: LayerConfig): l is LayerConfig<InteractiveSymbologyProps> =>
            l.slug === f.source &&
            l.symbologyMode === SymbologyMode.Interactive,
        );
      return layer?.interaction.hoverPopupFormat ?? "";
    },
    [layers],
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

  const clearHover = useCallback(() => {
    setHoveredPoint(null);
    setHoveredFeatures(null);
  }, []);

  const handleHover = useCallback(
    (e: MapLayerMouseEvent) => {
      const features = extractFeatures(e);
      if (!!features && !!features.length) {
        setHoveredFeatures(features);
        // @ts-ignore
        setHoveredPoint(e.point);
      } else clearHover();
      if (onHover) {
        onHover(features ?? [], mapState, e);
      }
    },
    [mapState, onHover, clearHover],
  );

  const handleClick = useCallback(
    (e: MapLayerMouseEvent): void => {
      const features = extractFeatures(e);

      setClickedFeatures(features);
      if (!!features && features.length > 1) {
        // @ts-ignore
        setClickedPoint(e.point);
      } else setClickedPoint(null);
      // if the map is used for navigation
      if (onNavigate && features && features.length === 1)
        handleNavigate(features[0]);
      if (onClick) {
        onClick(features ?? [], mapState, e);
      }
    },
    [handleNavigate, mapState, onClick, onNavigate],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent): void => {
      if ((onMac && e.key === "Meta") || (!onMac && e.key === "Control")) {
        setScrollZoomButtonActive(true);
      }
    },
    [onMac],
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent): void => {
      if ((onMac && e.key === "Meta") || (!onMac && e.key === "Control")) {
        setScrollZoomButtonActive(false);
      }
    },
    [onMac],
  );

  // listen to keystrokes - used for controlling scroll zoom
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  }, [handleKeyDown, handleKeyUp]);

  // Add listener for drawing mode change and scroll zoom control
  useEffect(() => {
    if (typeof mapRef !== "function" && mapRef.current) {
      const map = mapRef.current.getMap();
      // drawing mode
      map.on("draw.modechange", (e: { mode: string }) => {
        setDrawingMode(e.mode);
      });
    }
  }, [mapRef]);

  // check if user is on a mac device (for keyboard reasons)
  useEffect(() => {
    setOnMac(
      navigator.platform.startsWith("Mac") || navigator.platform === "iPhone",
    );
  }, []);

  // Set map cursor based on hover state
  const cursor = useMemo(() => {
    if (!hoveredFeatures?.length) return "grab";
    return "pointer";
  }, [hoveredFeatures]);

  // IDs of layers that will pass data to map event handlers
  const interactiveLayerIDs = useMemo(() => {
    const autoLayerIDs =
      layers
        ?.filter(
          (l: LayerConfig) => l.symbologyMode === SymbologyMode.Interactive,
        )
        .map((l) => `${l.slug}-fill`) ?? [];

    return autoLayerIDs.concat(manualInteractiveLayerIDs);
  }, [layers, manualInteractiveLayerIDs]);

  // can scroll zoom when it's toggled on, it's
  const canScrollZoom = useMemo(
    () =>
      scrollZoomOverride ||
      scrollZoomButtonActive ||
      (scrollZoom && !withScrollZoomControl),
    [
      scrollZoomOverride,
      scrollZoomButtonActive,
      scrollZoom,
      withScrollZoomControl,
    ],
  );

  return (
    <ReactMapGL
      id={id}
      cursor={cursor}
      initialViewState={{
        longitude: DEFAULT_LONGITUDE,
        latitude: DEFAULT_LATITUDE,
        zoom: initialViewState?.zoom ?? DEFAULT_ZOOM,
        ...initialViewState,
      }}
      interactive
      interactiveLayerIds={
        drawingMode === "simple_select" ? interactiveLayerIDs : []
      }
      scrollZoom={canScrollZoom}
      mapStyle={`${basemaps[basemap].url}?key=${mapTilerAPIKey ?? ""}`}
      maxZoom={maxZoom ?? DEFAULT_MAX_ZOOM}
      minZoom={minZoom ?? DEFAULT_MIN_ZOOM}
      onClick={handleClick}
      onLoad={onLoad}
      onMouseMove={handleHover}
      onMouseOut={clearHover}
      onZoom={handleZoom}
      ref={mapRef}
      style={{ position: "relative", ...style }}
    >
      <NavigationControl showCompass visualizePitch />

      <div className="absolute right-12 top-2 flex flex-col items-end space-y-2">
        <div>
          <BasemapMenu onSelection={setBasemap} selectedBasemap={basemap} />
        </div>
        {withScrollZoomControl ? (
          <>
            <Button
              onPress={() => {
                setScrollZoomOverride(!scrollZoomOverride);
              }}
              className="flex items-center"
            >
              <div className="mr-1 text-sm">Scroll Wheel Zoom</div>
              <TbToggleLeft
                className={twMerge(
                  "hidden size-5 text-gray-500",
                  !canScrollZoom && "block",
                )}
              />
              <TbToggleRightFilled
                className={twMerge(
                  "hidden size-5 text-green-700",
                  canScrollZoom && "block",
                )}
              />
            </Button>
            <div className="rounded border bg-white/80 px-1 text-right text-sm italic leading-none backdrop-blur">
              or hold{" "}
              <span className="inline-block rounded border border-gray-500 px-[3px] font-mono text-xs font-bold not-italic leading-none">
                {onMac ? "⌘" : "ctrl"}
              </span>{" "}
              to scroll wheel zoom
            </div>
          </>
        ) : null}
      </div>

      {showZoom || NODE_ENV === "development" ? (
        <div className="absolute bottom-1 right-1/2 rounded border bg-white/80 p-0.5 text-xs font-bold backdrop-blur">
          <span className="font-mono leading-none">{zoomText}</span>
        </div>
      ) : null}

      <div className="absolute bottom-10 right-2.5">
        <Legend layers={layers} />
      </div>

      {withScrollZoomControl ? (
        <div className="absolute right-12 top-8" />
      ) : null}

      {useDrawControls ? (
        <DrawControl
          controls={{
            polygon: true,
            trash: true,
          }}
          displayControlsDefault={false}
          position="top-left"
          {...drawControlProps}
        />
      ) : null}

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

      {customHoverPopup === undefined &&
        !!hoveredFeatures?.length &&
        !!hoveredPoint &&
        !(!!clickedFeatures?.length && !!clickedPoint) && (
          <HoverPopup
            features={hoveredFeatures}
            getPopupID={getPopupID}
            point={hoveredPoint}
          />
        )}

      {!!customHoverPopup && !!hoveredPoint && hoveredFeatures ? (
        <SimplePopupWrapper point={hoveredPoint}>
          {customHoverPopup}
        </SimplePopupWrapper>
      ) : null}

      {!!clickedFeatures?.length && !!clickedPoint && (
        <ClickPopup
          features={clickedFeatures}
          getPopupID={getPopupID}
          onClose={handlePopupClose}
          onNavigate={handleNavigate}
          point={clickedPoint}
        />
      )}

      {children}
    </ReactMapGL>
  );
});
