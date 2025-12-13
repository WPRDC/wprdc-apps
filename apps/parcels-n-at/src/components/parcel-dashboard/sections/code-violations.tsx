import type { CityViolation } from "@wprdc/types";
import { Chip, DataListViz, formatLongDate, Typography } from "@wprdc/ui";
import { SectionProps } from "@/components/parcel-dashboard/types";
import {
  DetailList,
  DetailListItem,
} from "@/components/parcel-dashboard/components/detail-list.tsx";

/** Groups set of PLI violations by Casefile */
export function groupByCasefile(
  records: CityViolation[],
): Record<string, Record<string, CityViolation[]>> {
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

  const casefilesInDateOrder = Object.fromEntries(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(byCasefile).sort(([_, a], [__, b]) => {
      const aStart = a.sort((c, d) =>
        c.investigation_date.localeCompare(d.investigation_date),
      )[0].investigation_date;
      const bStart = b.sort((c, d) =>
        c.investigation_date.localeCompare(d.investigation_date),
      )[0].investigation_date;
      return new Date(aStart).getTime() - new Date(bStart).getTime();
    }),
  );

  // further reduce to be keyed by date
  return Object.entries(casefilesInDateOrder).reduce(
    (byCasefileByDate, [dateStr, rawRecords]) => {
      byCasefileByDate[dateStr] = rawRecords.reduce(
        (byDate, v) => {
          const date = v.investigation_date;
          if (!Object.prototype.hasOwnProperty.call(byDate, date)) {
            byDate[date] = [];
          }
          byDate[date].push(v);
          return byDate;
        },
        {} as Record<string, CityViolation[]>,
      );
      return byCasefileByDate;
    },
    {} as Record<string, Record<string, CityViolation[]>>,
  );
}

export function CodeViolationsSection({
  records,
}: SectionProps<CityViolation>): React.ReactElement {
  if (!records.length)
    return <Typography.Note>No violations found</Typography.Note>;

  const byCasefile = groupByCasefile(records);

  /** Get last record for casefile to use for top-level details */
  function getCasefileDetails(
    record: Record<string, CityViolation[]>,
  ): CityViolation {
    const flatRecords = Object.values(record).reduce(
      (acc, cur) => acc.concat(cur),
      [],
    );
    // return latest entry
    return flatRecords.sort((a, b) => b._id - a._id)[0];
  }

  /** Get dates of investigation for a casefile in ascending order */
  function getCasefileDates(record: Record<string, CityViolation[]>): string[] {
    const flatRecords = Object.values(record).reduce(
      (acc, cur) => acc.concat(cur),
      [],
    );
    return flatRecords
      .map((r) => r.investigation_date)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  }

  const items: DetailListItem[] = Object.entries(byCasefile)
    .reverse()
    .map(([casefile, casefileRecord]) => {
      const details = getCasefileDetails(casefileRecord);
      const dates = getCasefileDates(casefileRecord);
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
            variant={details.status === "CLOSED" ? "success" : "warning"}
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
              {[...Object.entries(casefileRecord)]
                .sort(
                  (a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime(),
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
