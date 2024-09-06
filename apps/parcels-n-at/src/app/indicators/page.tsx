import {
  type ContinuousAggregateStatsRecord,
  fetchGeography,
  fetchMapConfig,
  fetchMapConfigs,
  fetchQuestion,
  fetchSpaceratQuery,
  type QuestionRecord,
  type SpaceRATResponse,
} from "@wprdc/api";
import { IndicatorMap } from "@/components/indicator-map";

interface SearchParams {
  maps: string;
  geog: string;
  variant: string;
  question: string;
  stat: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<React.ReactElement> {
  const mapConfigs = await fetchMapConfigs();
  const mapCollection = await fetchMapConfig(searchParams.maps);
  const geog = await fetchGeography(searchParams.geog);
  const question = await fetchQuestion(searchParams.question);

  let response:
    | SpaceRATResponse<QuestionRecord<ContinuousAggregateStatsRecord>>
    | undefined;
  if (searchParams.geog && searchParams.question && searchParams.variant) {
    response = await fetchSpaceratQuery({
      question: searchParams.question,
      region: searchParams.geog,
      variant: searchParams.variant,
    });
  }

  return (
    <div className="w-full overflow-auto px-6">
      <IndicatorMap
        availableMaps={mapConfigs}
        map={mapCollection}
        geog={geog}
        variant={searchParams.variant}
        question={question}
        data={response}
        stat={searchParams.stat}
      />
    </div>
  );
}
