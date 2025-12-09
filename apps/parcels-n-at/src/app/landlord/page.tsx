import {
  fetchAssessmentRecord,
  fetchSpaceratQuery,
  type QuestionRecord,
  type SpaceRATResponse,
} from "@wprdc/api";

import { fetchOwnerName } from "@/actions";
import { type VisualizationSpec } from "@wprdc/types";
import {
  ChartViz,
  formatDollars,
  SingleValueVizCollection,
  Tab,
  TabList,
  TabPanel,
  Tabs,
} from "@wprdc/ui";
import { PropertyDashboard } from "@/components/parcel-dashboard";

interface QueriedStats extends QuestionRecord {
  fairmarkettotal: {
    first_quartile: number;
    max: number;
    mean: number;
    median: number;
    min: number;
    mode: number;
    n: number;
    stddev: number;
    sum: number;
    third_quartile: number;
  };
}

type QueryResponse = SpaceRATResponse<QueriedStats>;

interface SearchParams {
  parcel: string;
}

export default async function Page({
  searchParams,
}: {
  searchParams?: SearchParams;
}): Promise<React.ReactElement> {
  const params = await searchParams;

  const assessment = await fetchAssessmentRecord(params?.parcel ?? "");

  const ownerSearch = assessment.records?.length
    ? `${(assessment.records[0].CHANGENOTICEADDRESS1 ?? "").replace(
        /\s+/g,
        " ",
      )}%`
    : "";

  const response: QueryResponse = await fetchSpaceratQuery<QueriedStats>({
    question: ["fairmarkettotal"],
    region: ["county.42003"],
    filter: "by_owner",
    filterArg: ownerSearch,
    queryRecords: true,
  });

  console.log(response);

  const { records, stats } = response.results;

  // group by parcel ID and then
  console.log(records);

  const ownerName = fetchOwnerName(records[0].region);

  const mainStats = stats["county.42003"];

  return (
    <div className="mt-4 w-full overflow-auto px-6">
      <h1>
        <div className="text-2xl">Real Estate Portfolio for</div>{" "}
        <div className="text-5xl font-bold">{ownerName}</div>
      </h1>

      <div className="mt-4 mb-16 flex flex-col space-y-6">
        <div>
          <h2 className="mb-4 text-2xl font-bold">Summary</h2>

          <SingleValueVizCollection
            items={[
              {
                id: "count",
                label: "Number of Parcels",
                value: mainStats.fairmarkettotal.n,
              },
              {
                id: "total-value",
                label: "Total Assessed Value",
                value: mainStats.fairmarkettotal.sum,
                format: formatDollars,
              },
            ]}
          />
          <div className="w-fit max-w-full overflow-x-auto border-2 border-stone-600">
            <figure>
              <figcaption className="bg-black px-2 py-1 font-mono text-sm font-bold text-white uppercase">
                Properties by Fair-market Assessed Value
              </figcaption>
              <div className="max-w-3xl overflow-x-auto">
                <ChartViz
                  spec={{ ...parcelPriceSpec, data: { values: records } }}
                />
              </div>
            </figure>
          </div>
        </div>
        <div className="">
          <h2 className="mb-4 text-2xl font-bold">Breakdown by Parcel</h2>
          <Tabs orientation="vertical">
            <TabList className="mr-2">
              {records.map(({ region: pid, address }) => (
                <Tab
                  key={pid}
                  id={pid}
                  className="selected:border-transparent text-xs"
                >
                  <div className="text-sm">
                    {address ? address : "No Address"}
                  </div>
                  <div>{pid}</div>
                </Tab>
              ))}
            </TabList>
            {records.map(({ region: pid }) => (
              <TabPanel key={pid} id={pid}>
                <div className="max-h-200 max-w-(--breakpoint-sm) overflow-auto rounded-sm border border-black">
                  {/* todo: render differently in embed mode (e.g. no map buttons) */}
                  <PropertyDashboard parcelID={pid} />
                </div>
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}

const parcelPriceSpec: VisualizationSpec = {
  data: { name: "table" },
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  mark: "bar",
  view: {
    strokeWidth: 0,
  },
  encoding: {
    x: {
      field: "region",
      type: "nominal",
      sort: "-y",
      axis: {
        labels: false,
        ticks: false,
        title: null,
      },
    },
    y: {
      field: "fairmarkettotal",
      type: "quantitative",
      axis: {
        title: "Total Fair-market Assessed Value",
        format: "$.0f",
      },
    },
  },
};
