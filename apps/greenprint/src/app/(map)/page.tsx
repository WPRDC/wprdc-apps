import { LayerMenu } from "@/components/layer-menu";
import { NavMap } from "@/components/nav-map.tsx";
import { MapProvider } from "@/components/map-provider";
import React from "react";

export default async function Home() {
  return (
    <>
      <LayerMenu />
      <MapProvider>
        <div className="max-h-full flex-grow">
          <NavMap />
        </div>
      </MapProvider>
    </>
  );
}
