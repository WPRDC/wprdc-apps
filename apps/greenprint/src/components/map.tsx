"use client";
import { Map as _Map, MapProps } from "@wprdc/ui";
import { flatLayers } from "@/layers";
import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LAYER_QUERY_KEY } from "@/util.ts";

const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

export function Map(props: MapProps) {
  const searchParams = useSearchParams();

  const selectedKeys = useMemo<Set<string>>(() => {
    const raw = searchParams.get(LAYER_QUERY_KEY);
    if (!raw) return new Set();
    return new Set(raw.split(",").filter(Boolean));
  }, [searchParams]);

  const layers = useMemo(() => {
    return flatLayers.filter((layer) => selectedKeys.has(layer.slug));
  }, [selectedKeys]);

  console.log(flatLayers, Array.from(selectedKeys), layers);

  return (
    <_Map
      mapTilerAPIKey={API_KEY}
      initialViewState={{ zoom: 9 }}
      layers={layers}
    ></_Map>
  );
}
