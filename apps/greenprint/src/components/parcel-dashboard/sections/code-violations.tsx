import type { CityViolation } from "@wprdc/types";
import { Chip, DataListViz, formatLongDate, Typography } from "@wprdc/ui";
import { SectionProps } from "@/components/parcel-dashboard/types";
import {
  DetailList,
  DetailListItem,
} from "@/components/parcel-dashboard/components/detail-list.tsx";

export interface CasefileGroup {
  /** The row containing violation/code details — should be one per casefile */
  violation: CityViolation | undefined;
  /** All other rows (investigation activity), newest first */
  investigations: CityViolation[];
}

const parseDate = (d: string): Date => {
  // M/D/YY -> M/D/20YY to avoid JS interpreting as 1900s
  return new Date(d.replace(/\/(\d{2})$/, "/20$1"));
};

export function groupByCaseFile(
  records: CityViolation[],
): Record<string, CasefileGroup> {
  const byCasefile = records.reduce<Record<string, CityViolation[]>>(
    (acc, curr) => {
      const cfn = curr.casefile_number;
      if (!Object.prototype.hasOwnProperty.call(acc, cfn)) {
        acc[cfn] = [];
      }
      acc[cfn].push(curr);
      return acc;
    },
    {},
  );

  return Object.fromEntries(
    Object.entries(byCasefile).map(([cfn, cfRecords]) => {
      const violation = cfRecords.find((r) => !!r.violation_code_section);

      const investigations = cfRecords
        .filter((r) => !r.violation_code_section)
        .sort((a, b) => {
          if (!a.investigation_date && !b.investigation_date) return 0;
          if (!a.investigation_date) return 1;
          if (!b.investigation_date) return -1;
          return (
            parseDate(b.investigation_date).getTime() -
            parseDate(a.investigation_date).getTime()
          );
        });

      return [cfn, { violation, investigations }];
    }),
  );
}

/** Get the last record for a casefile to use for top-level details */
function getCasefileDetails(records: CityViolation[]): CityViolation {
  const flatRecords = records.reduce<CityViolation[]>(
    (acc, cur) => acc.concat(cur),
    [],
  );
  // return latest entry
  return flatRecords.sort((a, b) => b._id - a._id)[0];
}

/** Get dates of investigation for a casefile in ascending order */
function getCasefileDates(records: CityViolation[]): string[] {
  return records
    .map((r) => r.investigation_date ?? "")
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
}

export function CodeViolationsSection({
  records,
}: SectionProps<CityViolation>): React.ReactElement {
  if (!records.length)
    return <Typography.Note>No violations found</Typography.Note>;

  const byCasefile = groupByCaseFile(records);

  const items: DetailListItem[] = Object.entries(byCasefile)
    .filter(([, caseFileGroup]) => caseFileGroup.violation)
    .reverse()
    .map(([casefile, caseFileGroup]) => {
      const details = getCasefileDetails([
        caseFileGroup.violation as CityViolation,
        ...caseFileGroup.investigations,
      ]);
      const dates = getCasefileDates([
        caseFileGroup.violation as CityViolation,
        ...caseFileGroup.investigations,
      ]);
      const dataList = [
        {
          id: "violation",
          label: "Violation",
          value: details.violation_description,
        },
        {
          id: "start",
          label: "Date Opened",
          value: dates[0],
          format: formatLongDate,
        },
        {
          id: "last-updated",
          label: "Last Investigation",
          value: dates[dates.length - 1],
          format: formatLongDate,
        },
        {
          id: "code-section",
          label: "Code Section",
          value: details.violation_code_section,
        },
        {
          id: "instructions",
          label: "Instructions",
          value: details.violation_spec_instructions,
        },
      ];

      return {
        title: casefile,
        topLeft: details.investigation_date,
        topRight: (
          <Chip
            variant={
              details.status.toLowerCase() === "closed" ? "success" : "warning"
            }
            label={details.status}
          />
        ),
        details: (
          <div>
            <div>
              <DataListViz items={dataList} />
            </div>
            <h4 className="mt-4 text-lg font-bold">Investigation History</h4>
            <div className=" ">
              {caseFileGroup.investigations
                .sort(
                  (a, b) =>
                    new Date(a.investdigation_date as string).getTime() -
                    new Date(b.investigation_date as string).getTime(),
                )
                .map(([date, investigationRecords]) => (
                  <section key={date}>
                    <h5 className="mt-4 mb-2 font-bold">
                      {new Date(date).toLocaleDateString("en-US", {
                        timeZone: "UTC",
                        dateStyle: "long",
                      })}
                    </h5>
                    <div
                      key={`${investigationRecords[0].investigation_findings}`}
                      className="mt-2"
                    >
                      <DataListViz
                        items={[
                          {
                            id: "findings",
                            label: "Findings",
                            value:
                              investigationRecords[0].investigation_findings,
                          },
                          {
                            id: "outcome",
                            label: "Outcome",
                            value:
                              investigationRecords[0].investigation_outcome,
                          },
                        ]}
                      />
                    </div>
                  </section>
                ))}
            </div>
          </div>
        ),
      };
    });

  return (
    <div>
      <p className="mb-2 font-medium">
        <span className="font-mono font-bold">
          {Object.keys(byCasefile).length}
        </span>{" "}
        Code violations found
      </p>
      <div className="w-full">
        <DetailList items={items} />
      </div>
    </div>
  );
}
