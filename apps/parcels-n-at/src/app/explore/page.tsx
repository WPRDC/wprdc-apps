import { PropertyDashboard } from "@wprdc/ui";
import { NavMap } from "@/components/nav-map";

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
    <div className="h-full w-full  xl:flex xl:content-stretch">
      <div className="h-96 xl:h-auto xl:w-1/2">
        <NavMap selectedParcel={String(searchParams?.parcel)} />
      </div>
      <div className="h-full border-l-2 border-stone-400 bg-stone-200 xl:w-1/2 xl:overflow-auto">
        {searchParams?.parcel ? (
          <PropertyDashboard parcelID={String(searchParams.parcel)} />
        ) : (
          <div>Pick a parcel to begin</div>
        )}
      </div>
    </div>
  );
}
