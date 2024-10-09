import { fetchMapSet, fetchMapSets } from "@wprdc/api";
import { IndicatorMap, MapStats } from "@/components/indicator-map";

interface SearchParams {
  mapset: string;
  geog: string;
  variant: string;
  question: string;
  stat?: keyof MapStats;
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<React.ReactElement> {
  const { mapset, geog, variant, question, stat } = searchParams;

  const mapSets = await fetchMapSets();
  const selectedMapSet = await fetchMapSet(mapset ?? mapSets[0].id);

  return (
    <div className="w-full px-6">
      <IndicatorMap
        availableMapsSets={mapSets}
        selectedMapSet={selectedMapSet}
        selectedGeogID={geog}
        selectedVariantID={variant}
        selectedQuestionID={question}
        selectedStatID={stat}
      />
    </div>
  );
}
