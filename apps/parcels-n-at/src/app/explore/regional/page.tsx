import { fetchSpaceratQuery } from "@wprdc/api";

export default async function Page() {
  const data = await fetchSpaceratQuery({
    question: "fair-market-assessed-value",
    region: "neighborhood.shadyside",
  });

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
