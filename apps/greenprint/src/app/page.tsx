import { LayerMenu } from "@/components/layer-menu";
import { NavMap } from "@/components/nav-map.tsx";
import { MapProvider } from "@/components/map-provider";
import { ParcelDashboard } from "@/components/parcel-dashboard";
import { LAYER_QUERY_KEY } from "@/util.ts";
import { flatLayers } from "@/layers";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const { parcel: parcelID, [LAYER_QUERY_KEY]: selectedLayers } =
    (await searchParams) || {};

  const selectedKeys = !selectedLayers
    ? new Set()
    : new Set(selectedLayers.split(",").filter(Boolean));

  const layers = flatLayers.filter((layer) => selectedKeys.has(layer.slug));

  return (
    <main className="flex flex-grow overflow-hidden">
      <LayerMenu />
      <MapProvider>
        <div className="max-h-full flex-grow">
          <NavMap layers={layers} />
        </div>
      </MapProvider>
      <div className="relative w-full max-w-md overflow-auto border-l border-blue-800">
        {/*<ParcelDashboard parcelID={parcelID} />*/}
      </div>
    </main>
  );
}
