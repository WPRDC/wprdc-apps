import { ParcelDashboard } from "@/components/parcel-dashboard";

export default async function ParcelSlot({
  searchParams,
}: {
  searchParams: Promise<{ parcel: string }>;
}) {
  const { parcel: parcelID } = (await searchParams) || {};
  if (!parcelID) return null;
  return <ParcelDashboard parcelID={String(parcelID)} />;
}
