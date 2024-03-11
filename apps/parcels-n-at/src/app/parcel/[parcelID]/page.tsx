import { PropertyDashboard } from "@wprdc/ui";

interface Params {
  parcelID: string;
}

export default function Page({
  params,
}: {
  params: Params;
}): React.ReactElement {
  return <PropertyDashboard parcelID={params.parcelID} />;
}
