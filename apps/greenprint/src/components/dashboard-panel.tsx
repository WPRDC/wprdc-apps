import { useSearchParams } from "next/navigation";
import { ParcelDashboard } from "@/components/parcel-dashboard";
import { memo } from "react";

export const DashboardPanel = memo(function ParcelPanel() {
  const searchParams = useSearchParams();
  const parcelID = searchParams.get("parcel");

  if (!parcelID) return null;
  return <ParcelDashboard parcelID={parcelID} />;
});
