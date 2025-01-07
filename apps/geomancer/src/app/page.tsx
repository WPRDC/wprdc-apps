import Image from "next/image";
import { getTileLayerCatalog } from "@wprdc/api";
import { Text } from "react-aria-components";
import { SearchBox, SearchBoxItem } from "@/component/search-box";

export default async function Home() {
  const catalog = await getTileLayerCatalog();

  const items: SearchBoxItem[] = Object.entries(catalog).map(
    ([key, value], i) => ({
      name: value.description,
      id: key + i,
    }),
  );

  console.log(items);

  return (
    <div>
      <div>
        <SearchBox items={items} />
      </div>

      <div></div>
    </div>
  );
}
