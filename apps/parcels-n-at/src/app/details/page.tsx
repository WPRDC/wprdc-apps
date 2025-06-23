import React from "react";
import { PropertyDashboard } from "@/components/parcel-dashboard";

interface Params {
  parcel: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Params>;
}): Promise<React.ReactElement> {
  const { parcel } = await searchParams;

  const parcelID = parcel ? String(parcel) : undefined;

  return (
    <div className="bg-wprdc-50 w-full overflow-x-auto">
      <div className="mx-auto max-w-screen-md border-2 border-black bg-white">
        <PropertyDashboard parcelID={parcelID} />
      </div>
    </div>
  );
}
