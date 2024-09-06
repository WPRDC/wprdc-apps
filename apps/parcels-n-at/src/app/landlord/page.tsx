import {
  fetchAssessmentRecord,
  fetchCityViolationsRecords,
  fetchOwnerName,
  fetchSpaceratQuery,
  type SpaceRATResponse,
} from "@wprdc/api";
import { type ReactNode } from "react";
import { type VisualizationSpec } from "react-vega";
import {
  type CityViolation,
  type DatastoreRecord,
  type FieldRecord,
} from "@wprdc/types";
import { Tab, TabList, TabPanel, Tabs } from "@wprdc/ui";
import { type QuestionRecord } from "@wprdc/api/src";
import { Chart } from "@/components/chart";

function groupByParcel<T extends DatastoreRecord>(
  records?: (DatastoreRecord & {
    parcel_id: string;
  })[],
): Record<string, T[]> {
  if (!records) {
    return {};
  }

  return records.reduce<Record<string, T[]>>((acc, curr) => {
    const pid = curr.parcel_id;
    if (!Object.prototype.hasOwnProperty.call(acc, pid)) {
      acc[pid] = [];
    }
    // @ts-expect-error -- fixme please
    acc[pid].push(curr);
    return acc;
  }, {});
}

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
  parcel_class: {
    mode: string | number;
    n: number;
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
  const assessment = await fetchAssessmentRecord(searchParams?.parcel ?? "");

  const ownerSearch = assessment.records?.length
    ? `${(assessment.records[0].CHANGENOTICEADDRESS1 ?? "").replace(
        /\s+/g,
        " ",
      )}%`
    : "";

  const response: QueryResponse = await fetchSpaceratQuery<QueriedStats>({
    question: ["fairmarkettotal", "classdesc"],
    region: ["county.42003"],
    filter: "by_owner",
    filterArg: ownerSearch,
    queryRecords: true,
  });

  // todo: have spacerat give us the parcel addresses in the records
  const { records, stats } = response.results;

  const parcelIDs = records.map((r) => r.region);

  const pliViolations = await fetchCityViolationsRecords(parcelIDs);
  const violationsByParcel = groupByParcel<CityViolation>(
    pliViolations.records,
  );

  // group by parcel ID and then
  const ownerName = fetchOwnerName(records[0].region);

  const mainStats = stats["county.42003"];

  return (
    <div className="w-full overflow-auto px-6">
      <h2>
        <div className="text-2xl">Real Estate Portfolio for</div>{" "}
        <div className="text-5xl font-bold">{ownerName}</div>
      </h2>
      <ValueDisplay
        label="Number of Parcels"
        value={mainStats.fairmarkettotal.n}
      />
      <ValueDisplay
        label="Total Assessed Value"
        value={mainStats.fairmarkettotal.sum.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      />
      <div className="w-fit max-w-full overflow-x-auto border-2 border-stone-800">
        <Chart
          title="Properties by Fair-market Assessed Value"
          spec={parcelPriceSpec}
          data={{ table: records }}
        />
      </div>

      <h2 className="mb-4 mt-12 text-5xl font-bold">Code Violations</h2>
      <ValueDisplay
        label="Total Number of Violations"
        value={
          pliViolations.records?.filter(
            (r: CityViolation) => r.investigation_outcome === "VIOLATION FOUND",
          ).length
        }
      />

      <h3 className="mt-4">Breakdown by Parcel</h3>
      <Tabs orientation="vertical">
        <TabList className="min-w-">
          {Object.entries(violationsByParcel).map(([pid, violations]) => (
            <Tab
              key={pid}
              id={pid}
              className="selected:border-transparent text-xs"
            >
              <div className="text-sm">
                {cleanAddress(violations[0].address) ?? "No Address"}
              </div>
              <div>{pid}</div>
            </Tab>
          ))}
        </TabList>
        {Object.entries(violationsByParcel).map(([pid, violations]) => (
          <TabPanel key={pid} id={pid} className="w-full">
            <ViolationsDisplay
              violations={violations}
              fields={pliViolations.fields}
            />
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
}

interface ValueDisplayProps {
  label: string;
  value: ReactNode;
}

function ValueDisplay({ label, value }: ValueDisplayProps): React.ReactElement {
  return (
    <dl className="py-2 ">
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
          <dl className=" mb-2">
            <dt className="text-xs font-semibold text-stone-700">
              Case File #
            </dt>
            <dd className="font-mono font-semibold">{cfn}</dd>
          </dl>

          <dl>
            <dt className="text-xs font-semibold text-stone-700">
              Code Section
            </dt>
            <dd className="font-mono ">
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
          <dd className="font-mono  text-xs">
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
