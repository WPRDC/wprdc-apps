import type { MultiSourceSectionProps } from "../types";
import {
  CityViolation,
  LeadLine,
  PropertyAssessment,
  WaterProvider,
} from "@wprdc/types";
import { A, Chip, SingleValueViz, Typography } from "@wprdc/ui";
import { CodeViolationsSection } from "@/components/parcel-dashboard/sections/code-violations.tsx";

export function LeadRiskSection({
  lead,
  violations,
  assessment,
  provider,
}: MultiSourceSectionProps<{
  lead: LeadLine;
  assessment: PropertyAssessment;
  violations: CityViolation;
  provider: WaterProvider;
}>): React.ReactElement {
  const year_built = assessment.records[0].YEARBLT;

  const lead_violations = violations.records.filter(
    (r) =>
      r.violation_code_section.includes("782.01") ||
      r.violation_code_section.includes("620B.01"),
  );

  console.log(provider)

  return (
    <div className="">
      <section className="mb-6 w-full">
        <h3 className="mb-2 text-xl font-bold">Water Lines</h3>
        <div className="w-full text-sm">
          Lead can enter drinking water through corrosion of plumbing materials,
          especially where the water has high acidity or low mineral content
          that corrodes pipes and fixtures. Homes built before 1986 are more
          likely to have lead pipes, fixtures and solder.
          <div className="mb-4 mt-1">
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
              value={lead.records[0].private_status ?? "Unknown"}
            />
            <SingleValueViz
              id="public-side"
              label="Public-side"
              value={lead.records[0].public_status ?? "Unknown"}
            />
          </div>
        </div>
      </section>
      <section className="mb-6">
        <h3 className="mb-2 text-xl font-bold">Property</h3>
        <div className="text-sm">
          If your home was built before 1978, it is more likely to have
          lead-based paint. In 1978, the federal government banned consumer uses
          of lead-based paint, but some states banned it even earlier.
          <div className="mb-4 mt-1">
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
              minimal
            />
          )}
        </div>
      </section>
    </div>
  );
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

  return <Chip label={label} color={color}></Chip>;
};
