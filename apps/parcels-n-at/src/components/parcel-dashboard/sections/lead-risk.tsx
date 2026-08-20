import type { MultiSourceSectionProps } from "../types";
import {
  CityViolation,
  EBLL,
  EBLL_YEARS,
  LeadLine,
  PropertyAssessment,
  WaterProvider,
} from "@wprdc/types";
import { A, Chip, SingleValueViz, Table, Typography } from "@wprdc/ui";
import { CodeViolationsSection } from "@/components/parcel-dashboard/sections/code-violations.tsx";
import {
  TbAlertCircle,
  TbAlertTriangle,
  TbAlertTriangleFilled,
} from "react-icons/tb";
import React from "react";

export function LeadRiskSection({
  lead,
  violations,
  assessment,
  provider,
  ebll,
}: MultiSourceSectionProps<{
  lead: LeadLine;
  assessment: PropertyAssessment;
  violations: CityViolation;
  provider: WaterProvider;
  ebll: EBLL;
}>): React.ReactElement {
  if (!lead.records.length || !assessment.records.length) return <></>;

  const year_built = assessment.records[0].YEARBLT;

  const lead_violations = violations.records.filter(
    (r) =>
      !!r.violation_code_section &&
      (r.violation_code_section.includes("782.01") ||
        r.violation_code_section.includes("620B.01")),
  );

  const ebllRecord: EBLL | undefined = ebll.records[0];

  // most recent year first
  const ebllYears = [...EBLL_YEARS].reverse();

  return (
    <div className="">
      <section className="mb-6 w-full">
        <div className="flex items-center space-x-1 text-xs font-black text-green-500">
          <TbAlertCircle className="mt-0.5 mr-1 size-4" />
          <span className="uppercase">Resource</span>
        </div>
        <p className="text-sm font-bold italic">
          If your child has been tested and has an elevated blood lead level,
          help is available. Get the Lead Out Pittsburgh has a helpful guide on
          what you can do next.
        </p>
        <A
          href="https://gettheleadoutpgh.org/learn-more/help-for-lead-exposure/"
          target="_blank"
          variant="button"
          buttonVariant="primary"
          className="py-0.5 text-xs"
        >
          See the guide
        </A>
      </section>
      <section className="mb-6 w-full">
        <h3 className="mb-2 text-xl font-bold">Water Lines</h3>
        <div className="w-full text-sm">
          Lead can enter drinking water through corrosion of plumbing materials,
          especially where the water has high acidity or low mineral content
          that corrodes pipes and fixtures. Homes built before 1986 are more
          likely to have lead pipes, fixtures and solder.
          <div className="mt-1 mb-4">
            <A
              href="https://www.epa.gov/lead/protect-your-family-sources-lead#water"
              target="_blank"
              variant="button"
              buttonVariant="primary"
              className="py-0.5 text-xs"
            >
              Learn more
            </A>
          </div>
        </div>
        <div className="mt-2">
          <h4 className="text-lg font-bold">Water Line Material</h4>
          <Typography.Note>
            Data as of <time dateTime="2025-09-23">Sept. 23, 2025</time>
          </Typography.Note>
          <div className="my-2">
            <SingleValueViz
              id="water-provider"
              label="Water Provider"
              value={provider.records[0]?.PROVIDER ?? "Not Available"}
            />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <SingleValueViz
              id="private-side"
              label="Property-side"
              value={lead.records[0]?.private_status ?? "Unknown"}
            />
            <SingleValueViz
              id="public-side"
              label="Public-side"
              value={lead.records[0]?.public_status ?? "Unknown"}
            />
          </div>
        </div>
      </section>

      <section className="mb-6">
        <h3 className="mb-2 text-xl font-bold">
          Census Tract Elevated Blood Lead Level (EBLL) Rates
        </h3>
        <div className="mb-2 text-sm">
          Percent of children in this parcel&apos;s census tract who
          <em> were tested</em> and had an elevated blood lead level. Rates are
          not reported for tracts with fewer than 50 children tested.
        </div>

        {!ebllRecord ? (
          <Typography.Note>No data available for this parcel.</Typography.Note>
        ) : (
          <>
            <div className="my-2">
              <SingleValueViz
                id="ebll-2021-2024"
                label="% w/ EBLL, 2021-2024 combined"
                value={formatEBLLRate(
                  ebllRecord.percentEBLL2021_2024,
                  ebllRecord.note2021_2024,
                )}
              />
            </div>
            <div className="max-w-lg">
              <Table
                rowLabel="Year"
                columns={[{ label: "% w/ EBLL" }, { label: "Note" }]}
                rows={ebllYears.map(String)}
                data={ebllYears.map((year) => [
                  {
                    value: ebllRecord[`percentEBLL${year}`] as number | null,
                    format: (rate) =>
                      typeof rate === "number" ? (
                        `${rate}%`
                      ) : (
                        <Typography.Note>N/A</Typography.Note>
                      ),
                  },
                  {
                    value: ebllRecord[`note${year}`] as string | null,
                    format: (note) =>
                      note ? (
                        <span className="text-xs">{note}</span>
                      ) : (
                        <Typography.Note>—</Typography.Note>
                      ),
                  },
                ])}
              />
            </div>
          </>
        )}
      </section>

      <section className="mb-6">
        <h3 className="mb-2 text-xl font-bold">Property</h3>
        <div className="text-sm">
          If your home was built before 1978, it is more likely to have
          lead-based paint. In 1978, the federal government banned consumer uses
          of lead-based paint, but some states banned it even earlier.
          <div className="mt-1 mb-4">
            <A
              href="https://www.epa.gov/lead/protect-your-family-sources-lead#sl-home"
              target="_blank"
              variant="button"
              buttonVariant="primary"
              className="py-0.5 text-xs"
            >
              Learn more
            </A>
          </div>
        </div>

        <div className="my-2">
          <h4 className="text-lg font-bold">Building Age</h4>
          <YearBuiltChip year={year_built} />
        </div>

        <div className="mt-2">
          <h4 className="text-lg font-bold">Lead-related Code Violations</h4>
          {!lead_violations || !lead_violations.length ? (
            <Typography.Note>No lead-related violations found.</Typography.Note>
          ) : (
            <CodeViolationsSection
              records={lead_violations}
              fields={violations.fields}
            />
          )}
        </div>
      </section>
    </div>
  );
}

/** Show the rate when there is one, otherwise fall back to that period's note */
function formatEBLLRate(rate: number | null, note: string | null): string {
  if (typeof rate === "number") return `${rate}%`;
  if (note === "Censored") return "Censored (< 50 children tested in tract)";
  return note ?? "Not Available";
}

const YearBuiltChip = ({ year }: { year?: number }) => {
  let label = "Unknown";
  let color = "lightgray";
  if (!year) {
    label = "Unknown";
    color = "lightgray";
  } else if (year > 1977) {
    label = "Built after 1977";
    color = "#99d8c9";
  } else if (year > 1959) {
    label = "Built before 1978";
    color = "#fff7bc";
  } else if (year >= 1940) {
    label = "Built before 1960";
    color = "#fec44f";
  } else if (year < 1940) {
    label = "Built before 1940";
    color = "#d95f0e";
  }

  return <Chip size="L" label={label} color={color}></Chip>;
};
