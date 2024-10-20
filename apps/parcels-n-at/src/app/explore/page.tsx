import { NavMap } from "@/components/nav-map";
import { PropertyDashboard } from "@/components/parcel-dashboard";
import { MapProvider } from "@/components/map-provider.tsx";

interface Params {
  parcelID: string;
}

export default function Page({
  searchParams,
}: {
  params: Params;
  searchParams?: Record<string, string | number>;
}): React.ReactElement {
  return (
    <div className="h-full w-full xl:flex xl:content-stretch">
      <MapProvider>
        <div className="h-96 xl:h-auto xl:w-1/2">
          <NavMap selectedParcel={String(searchParams?.parcel)} />
        </div>
        <div className="relative h-full border-2 border-l-2 border-stone-800 bg-zinc-100 xl:w-1/2 xl:overflow-auto">
          {searchParams?.parcel ? (
            <PropertyDashboard parcelID={String(searchParams.parcel)} />
          ) : (
            <div>Pick a parcel to begin</div>
          )}
        </div>
      </MapProvider>
    </div>
  );
}
