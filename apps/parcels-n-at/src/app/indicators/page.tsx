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
  searchParams: Promise<SearchParams>;
}): Promise<React.ReactElement> {
  const { mapset, geog, variant, question, stat } = await searchParams;

  const mapSets = await fetchMapSets();
  const selectedMapSet = await fetchMapSet(mapset ?? mapSets[0].id);

  return (
    <div className="w-full px-6">
      <div className="bg-primary text-xl font-bold">
        THIS IS JUST A TECH DEMO. THE STATS AND CALCULATIONS HAVE NOT YET BEEN
        VERIFIED.
      </div>
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
