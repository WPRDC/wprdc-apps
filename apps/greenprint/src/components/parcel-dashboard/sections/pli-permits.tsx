import type { PLIPermit } from "@wprdc/types";
import {
  Chip,
  DataListViz,
  formatDate,
  formatDollars,
  Typography,
} from "@wprdc/ui";
import type { SectionProps } from "../types";
import {
  DetailList,
  DetailListItem,
} from "@/components/parcel-dashboard/components/detail-list.tsx";

export const STATUS_VARIANT_MAP: Record<
  string,
  "default" | "info" | "success" | "warning" | "danger"
> = {
  "in review": "info",
  "stop work": "danger",
  "ready for issue": "info",
  "amendment application incomplete": "warning",
  "amendment review": "info",
  "amendment requested": "warning",
  issued: "success",
  expired: "info",
  "applicant revisions": "warning",
  revoked: "danger",
  "amendment applicant revisions": "warning",
  "application finalization": "info",
  completed: "success",
};

export function getStatusVariant(
  status: string,
): "default" | "info" | "success" | "warning" | "danger" {
  return STATUS_VARIANT_MAP[status.toLowerCase()] ?? "default";
}

export function PLIPermitsSection({
  fields,
  records,
}: SectionProps<PLIPermit>): React.ReactElement {
  if (!records.length)
    return <Typography.Note>Not permits found</Typography.Note>;

  const items: DetailListItem[] = records
    .sort(
      (a, b) =>
        new Date(b.issue_date).getTime() - new Date(a.issue_date).getTime(),
    )
    .map((record) => ({
      title: record.permit_id,
      topLeft: formatDate(record.issue_date),
      topRight: (
        <Chip
          variant={getStatusVariant(record.status)}
          label={record.status.toUpperCase()}
        />
      ),

      details: (
        <DataListViz
          fields={fields}
          items={[
            {
              id: "issue_date",
              label: "Issue date",
              info: fields.issue_date.info?.notes,
              value: record.issue_date,
              format: formatDate,
            },
            "permit_type",
            "work_type",
            {
              id: "total_project_value",
              label: "Total Project Value",
              info: fields.total_project_value.info?.notes,
              value: record.total_project_value,
              format: formatDollars,
            },
            "contractor_name",
            "work_description",
          ]}
          record={record}
          variant="dense"
        />
      ),
    }));

  return (
    <div>
      <p className="mb-2 font-medium">
        <span className="font-mono font-bold">{records.length}</span> PLI
        permits found
      </p>
      <div className="w-full">
        <DetailList items={items} />
      </div>
    </div>
  );
}
