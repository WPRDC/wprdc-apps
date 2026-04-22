import { LayerMenu } from "@/components/layer-menu";
import { NavMap } from "@/components/nav-map.tsx";
import { MapProvider } from "@/components/map-provider";
import { ParcelDashboard } from "@/components/parcel-dashboard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const { parcel: parcelID } = (await searchParams) || {};
  return (
    <main className="flex flex-grow overflow-hidden">
      <LayerMenu />
      <MapProvider>
        <div className="max-h-full flex-grow">
          <NavMap />
        </div>
      </MapProvider>
      <div className="relative w-full max-w-md overflow-auto border-l border-blue-800">
        <ParcelDashboard parcelID={parcelID} />
      </div>
    </main>
  );
}
