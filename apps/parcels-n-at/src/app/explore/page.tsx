import { NavMap } from "@/components/nav-map";
import { PropertyDashboard } from "@/components/parcel-dashboard";
import { MapProvider } from "@/components/map-provider.tsx";

interface Params {
  parcelID: string;
  ownerAddr?: string;
  highlightVacant?: string;
  highlightOwnerOccupied?: string;
  highlightAssessedValue?: string;
}

export default async function Page({
  searchParams,
}: {
  params: Params;
  searchParams: Promise<
    Record<
      "parcel" | "ownerAddr" | "classes" | "ownerOccupied",
      string | number
    >
  >;
}): Promise<React.ReactElement> {
  const { parcel, ownerAddr, classes, ownerOccupied } = await searchParams;

  const parcelID = parcel ? String(parcel) : undefined;
  const ownerAddress = ownerAddr ? String(ownerAddr) : undefined;
  const useClasses = classes ? String(classes) : undefined;

  return (
    <div className="h-full w-full xl:flex xl:content-stretch">
      <MapProvider>
        <div className="h-96 xl:h-auto xl:w-1/2">
          <NavMap
            selectedParcel={parcelID}
            ownerAddress={ownerAddress}
            showOwnerOccupied={Boolean(ownerOccupied)}
            showVacant={Boolean(ownerOccupied)}
            classes={useClasses}
          />
        </div>
        <div className="relative h-full border-l-2 border-stone-800 bg-zinc-100 xl:w-1/2 xl:overflow-auto">
          {parcel ? (
            <PropertyDashboard parcelID={String(parcel)} />
          ) : (
            <div>
              <div>Pick a parcel to begin</div>
            </div>
          )}
        </div>
      </MapProvider>
    </div>
  );
}
