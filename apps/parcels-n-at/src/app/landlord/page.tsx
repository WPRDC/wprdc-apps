import {
  fetchAssessmentRecord,
  fetchSpaceratQuery,
  type QuestionRecord,
  type SpaceRATResponse,
} from "@wprdc/api";

import { fetchOwnerName } from "@/actions";
import { type ReactNode } from "react";
import { type VisualizationSpec } from "@wprdc/types";
import {
  type CityViolation,
  type DatastoreRecord,
  type FieldRecord,
} from "@wprdc/types";
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


function groupByCasefile(
  records: CityViolation[],
): Record<string, CityViolation[]> {
  return records.reduce<Record<string, CityViolation[]>>((acc, curr) => {
    const cfn = curr.casefile_number;

    if (!Object.prototype.hasOwnProperty.call(acc, cfn)) {
      acc[cfn] = [];
    }

    acc[cfn].push(curr);
    return acc;
  }, {});
}

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

  const parcelIDs = records.map((r) => r.region);

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

      <div className="mb-16 mt-4 flex flex-col space-y-6">
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
              <figcaption className="bg-black px-2 py-1 font-mono text-sm font-bold uppercase text-white">
                Properties by Fair-market Assessed Value
              </figcaption>
              <div className="max-w-3xl overflow-x-auto">
                <ChartViz spec={parcelPriceSpec} data={{ table: records }} />
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
                    {!!address ? address : "No Address"}
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

interface ValueDisplayProps {
  label: string;
  value: ReactNode;
}

function ValueDisplay({ label, value }: ValueDisplayProps): React.ReactElement {
  return (
    <dl className="py-2">
      <dd className="text-sm">{label}</dd>
      <dt className="font-mono text-4xl font-bold">{value}</dt>
    </dl>
  );
}

interface ViolationsDisplayProps {
  fields?: FieldRecord<CityViolation>;
  violations: CityViolation[];
}

function ViolationsDisplay(props: ViolationsDisplayProps): React.ReactElement {
  const byCaseFile = groupByCasefile(props.violations);

  return (
    <Tabs orientation="vertical">
      <TabList className="w-44 min-w-44">
        {Object.keys(byCaseFile).map((cfn) => (
          <Tab
            key={cfn}
            id={cfn}
            className="selected:border-transparent text-xs"
          >
            {cfn}
          </Tab>
        ))}
      </TabList>

      {Object.entries(byCaseFile).map(([cfn, violations]) => (
        <TabPanel key={cfn} id={cfn}>
          <dl className="mb-2">
            <dt className="text-xs font-semibold text-stone-700">
              Case File #
            </dt>
            <dd className="font-mono font-semibold">{cfn}</dd>
          </dl>

          <dl>
            <dt className="text-xs font-semibold text-stone-700">
              Code Section
            </dt>
            <dd className="font-mono">
              {violations[0].violation_code_section}
            </dd>
          </dl>

          <div className="text-xs font-semibold text-stone-700">Events</div>
          <div className="max-h-[600px] overflow-auto border">
            {violations
              .sort(
                (a, b) =>
                  new Date(b.investigation_date).getTime() -
                  new Date(a.investigation_date).getTime(),
              )
              .map((violation) => (
                <ViolationCard
                  key={`${violation.investigation_date}:${violation.investigation_outcome}`}
                  violation={violation}
                />
              ))}
          </div>
        </TabPanel>
      ))}
    </Tabs>
  );
}

interface ViolationCardProps {
  violation: CityViolation;
}

function ViolationCard({ violation }: ViolationCardProps): React.ReactElement {
  return (
    <div className="w-full border-b border-stone-600 p-2 first-of-type:border-t">
      <div className="mb-2 flex space-x-3">
        <div className="min-w-16 font-bold">
          {new Date(violation.investigation_date).toLocaleDateString()}
        </div>
        <OutcomeChip outcome={violation.investigation_outcome} />
        <OutcomeChip outcome={violation.status} />
      </div>
      <dl>
        <div className="pb-2">
          <dt className="text-sm font-semibold">Findings</dt>
          <dd className="font-mono text-xs">
            {violation.investigation_findings}
          </dd>
        </div>
        <div className="pb-2">
          <dt className="text-sm font-semibold">Description</dt>
          <dd className="font-mono text-xs">
            {violation.violation_description}
          </dd>
        </div>
        <div className="pb-2">
          <dt className="text-sm font-semibold">Special Instructions</dt>
          <dd className="font-mono text-xs">
            {violation.violation_spec_instructions}
          </dd>
        </div>
      </dl>
    </div>
  );
}

function OutcomeChip({ outcome }: { outcome: string }): React.ReactElement {
  let color = "gray";
  let bgColor = "white";
  switch (outcome) {
    case "VIOLATION FOUND":
    case "IN VIOLATION":
      color = "#7f1d1d";
      bgColor = "#fca5a5";
      break;
    case "CLOSED":
    case "VIOLATION RESOLVED":
    case "VOID/CLOSE":
    case "NO VIOLATION FOUND":
      color = "#052e16";
      bgColor = "#bbf7d0";
      break;
  }

  return (
    <div
      className="flex w-fit items-center rounded-sm border px-1"
      style={{ color, backgroundColor: bgColor, borderColor: color }}
    >
      <div className="text-sm font-semibold">{outcome}</div>
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

function cleanAddress(addr: string | undefined): string | undefined {
  if (!addr) return undefined;
  return addr.slice(0, -1);
}
