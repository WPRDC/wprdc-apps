import { getTileLayerCatalog } from "@wprdc/api";

export default async function Home() {
  const catalog = await getTileLayerCatalog();

  return (
    <div>
      <div></div>

      <div></div>
    </div>
  );
}
