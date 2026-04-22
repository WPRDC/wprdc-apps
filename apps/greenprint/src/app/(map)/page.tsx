import { LayerMenu } from "@/components/layer-menu";
import { NavMap } from "@/components/nav-map.tsx";
import { MapProvider } from "@/components/map-provider";
import React, { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={null}>
        <LayerMenu />
      </Suspense>
      <MapProvider>
        <div className="max-h-full flex-grow">
          <Suspense fallback={null}>
            <NavMap />
          </Suspense>
        </div>
      </MapProvider>
    </>
  );
}
