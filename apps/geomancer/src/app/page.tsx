import Image from "next/image";
import { getTileLayerCatalog } from "@wprdc/api";
import { Text } from "react-aria-components";
import { SearchBox, SearchBoxItem } from "@/component/search-box";

export default async function Home() {
  const catalog = await getTileLayerCatalog();

  return (
    <div>
      <div></div>

      <div></div>
    </div>
  );
}
