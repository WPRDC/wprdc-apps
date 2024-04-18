import { PropertyDashboard } from "@wprdc/ui";
import { Suspense } from "react";
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
    <div className="h-full w-full lg:flex lg:content-stretch">
      <div className="lg:w-1/2">
        <NavMap selectedParcel={searchParams?.parcel} />
      </div>
      <div className="h-full border-l-2 border-stone-400 bg-stone-200 lg:w-1/2 lg:overflow-auto">
        {searchParams?.parcel ? (
          <Suspense fallback="Loading" key={searchParams.parcel}>
            <PropertyDashboard parcelID={String(searchParams.parcel)} />
          </Suspense>
        ) : (
          <div>Pick a parcel to begin</div>
        )}
      </div>
    </div>
  );
}
