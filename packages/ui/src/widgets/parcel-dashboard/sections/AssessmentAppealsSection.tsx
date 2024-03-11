import type { ArchiveAssessmentAppeal } from "@wprdc/types";
import { FieldValues, Typography } from "../../../components";
import { RecordSection } from "../components/RecordSection";
import type { SectionProps } from "../types";
import { formatDollars } from "../../../util";

export function AssessmentAppealsSection({
  fields,
  records,
}: SectionProps<ArchiveAssessmentAppeal>): React.ReactElement {
  return (
    <div>
      {!records.length && <Typography.Note>No Records Found</Typography.Note>}
      {!!records.length &&
        records
          .filter((r: ArchiveAssessmentAppeal) => r.HEARING_TYPE === "ANNUAL")
          .map((record: ArchiveAssessmentAppeal) => (
            <RecordSection key={record["TAX YEAR"]}>
              <FieldValues
                items={[
                  {
                    id: "tax-year",
                    label: "Tax Year",
                    info: fields["TAX YEAR"].info?.notes,
                    value: record["TAX YEAR"],
                  },
                  {
                    id: "HEARING_TYPE",
                    label: "Hearing Type",
                    info: fields.HEARING_TYPE.info?.notes,
                    value: record.HEARING_TYPE,
                  },
                  {
                    id: "LAST UPDATE REASON",
                    label: "Last Update Reason",
                    info: fields["LAST UPDATE REASON"].info?.notes,
                    value: record["LAST UPDATE REASON"],
                  },
                  {
                    id: "COMPLAINANT",
                    label: "Complainant",
                    info: fields.COMPLAINANT.info?.notes,
                    value: record.COMPLAINANT,
                  },
                  {
                    id: "HEARING_STATUS",
                    label: "Hearing Status",
                    info: fields.HEARING_STATUS.info?.notes,
                    value: record.HEARING_STATUS,
                  },
                  {
                    id: "STATUS",
                    label: "Inspection Status",
                    info: fields.STATUS.info?.notes,
                    value: record.STATUS,
                  },
                ]}
                variant="dense"
              />
              <div className="mt-4 font-sans text-sm font-bold">
                Pre vs Post Appeal
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <td />
                    <th>Land</th>
                    <th>Building</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-sm">
                  <tr>
                    <th className="text-left font-sans">Pre</th>
                    <td className="text-right">
                      {formatDollars(record["PRE APPEAL LAND"])}
                    </td>
                    <td className="text-right">
                      {formatDollars(record["PRE APPEAL BLDG"])}
                    </td>
                    <td className="text-right">
                      {formatDollars(record["PRE APPEAL TOTAL"])}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left font-sans">Post</th>
                    <td className="text-right">
                      {formatDollars(record["POST APPEAL LAND"])}
                    </td>
                    <td className="text-right">
                      {formatDollars(record["POST APPEAL BLDG"])}
                    </td>
                    <td className="text-right">
                      {formatDollars(record["POST APPEAL TOTAL"])}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left font-sans">Difference</th>
                    <td className="border-t border-black text-right">
                      {formatDollars(
                        record["PRE APPEAL LAND"] - record["POST APPEAL LAND"],
                      )}
                    </td>
                    <td className="border-t border-black text-right">
                      {formatDollars(
                        record["PRE APPEAL BLDG"] - record["POST APPEAL BLDG"],
                      )}
                    </td>
                    <td className="border-t border-black text-right">
                      {formatDollars(
                        record["PRE APPEAL TOTAL"] -
                          record["POST APPEAL TOTAL"],
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 font-sans text-sm font-bold">
                Pre Appeal vs Current Value
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <td />
                    <th>Land</th>
                    <th>Building</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody className="font-mono text-sm">
                  <tr>
                    <th className="text-left font-sans">Pre</th>
                    <td className="text-right">
                      {formatDollars(record["PRE APPEAL LAND"])}
                    </td>
                    <td className="text-right">
                      {formatDollars(record["PRE APPEAL BLDG"])}
                    </td>
                    <td className="text-right">
                      {formatDollars(record["PRE APPEAL TOTAL"])}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left font-sans">Current</th>
                    <td className="text-right">
                      {formatDollars(record["CURRENT LAND VALUE"])}
                    </td>
                    <td className="text-right">
                      {formatDollars(record["CURRENT BLDG VALUE"])}
                    </td>
                    <td className="text-right">
                      {formatDollars(record["CURRENT TOTAL VALUE"])}
                    </td>
                  </tr>
                  <tr>
                    <th className="text-left font-sans">Difference</th>
                    <td className="border-t border-black text-right">
                      {formatDollars(
                        record["PRE APPEAL LAND"] -
                          record["CURRENT LAND VALUE"],
                      )}
                    </td>
                    <td className="border-t border-black text-right">
                      {formatDollars(
                        record["PRE APPEAL BLDG"] -
                          record["CURRENT BLDG VALUE"],
                      )}
                    </td>
                    <td className="border-t border-black text-right">
                      {formatDollars(
                        record["PRE APPEAL TOTAL"] -
                          record["CURRENT TOTAL VALUE"],
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </RecordSection>
          ))}
    </div>
  );
}
