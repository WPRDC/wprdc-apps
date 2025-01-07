import type { ArchiveAssessmentAppeal } from "@wprdc/types";
import { FiledAssessmentAppeal } from "@wprdc/types";
import {
  ChartViz,
  DataListViz,
  formatDollars,
  SingleValueVizProps,
  Table,
  Typography,
} from "@wprdc/ui";
import {
  type MultiSourceSectionProps,
  SectionProps,
} from "@/components/parcel-dashboard/types";
import { VisualizationSpec } from "@wprdc/types";
import { CardList } from "@/components/parcel-dashboard/components/card-list";
import { Card } from "../components/card";

export function AssessmentAppealsSection({
  filed,
  archive,
}: MultiSourceSectionProps<{
  filed: FiledAssessmentAppeal;
  archive: ArchiveAssessmentAppeal;
}>): React.ReactElement {
  return (
    <div>
      <section className="mb-4 border-b pb-4 lg:mr-4">
        <h3 className="mb-1 mt-3.5 text-2xl font-bold">Active Appeal</h3>
        <FiledAssessmentAppealsSection {...filed} />
      </section>
      <section>
        <h3 className="mb-1 mt-3.5 text-2xl font-bold">Finished Appeals</h3>
        <ArchiveSection {...archive} />
      </section>
    </div>
  );
}

function ArchiveSection({
  records,
  fields,
}: SectionProps<ArchiveAssessmentAppeal>) {
  return (
    <div className="mt-4">
      {!records.length && <Typography.Note>No Records Found</Typography.Note>}
      {!!records.length && (
        <CardList>
          {records
            .filter((r: ArchiveAssessmentAppeal) => r.HEARING_TYPE === "ANNUAL")
            .map((record: ArchiveAssessmentAppeal) => (
              <Card key={record["TAX YEAR"]}>
                <article>
                  <h4 className="mb-1 text-2xl font-bold">
                    <span>Tax Year:</span>{" "}
                    <span className="font-mono">{record["TAX YEAR"]}</span>
                  </h4>

                  <DataListViz
                    items={
                      [
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
                      ] as SingleValueVizProps[]
                    }
                  />
                  <Table
                    label="Pre vs Post Appeal"
                    columns={["Land", "Building", "Total"]}
                    rows={["Pre", "Post", "Difference"]}
                    format={formatDollars}
                    totalRow
                    totalCol
                    data={[
                      [
                        record["PRE APPEAL LAND"],
                        record["PRE APPEAL BLDG"],
                        record["PRE APPEAL TOTAL"],
                      ],
                      [
                        record["POST APPEAL LAND"],
                        record["POST APPEAL BLDG"],
                        record["POST APPEAL TOTAL"],
                      ],
                      [
                        record["PRE APPEAL LAND"] - record["POST APPEAL LAND"],
                        record["PRE APPEAL BLDG"] - record["POST APPEAL BLDG"],
                        record["PRE APPEAL TOTAL"] -
                          record["POST APPEAL TOTAL"],
                      ],
                    ]}
                  />

                  <Table
                    label="Pre Appeal vs Current Value"
                    columns={["Land", "Building", "Total"]}
                    rows={["Pre", "Current", "Difference"]}
                    format={formatDollars}
                    totalRow
                    totalCol
                    data={[
                      [
                        record["PRE APPEAL LAND"],
                        record["PRE APPEAL BLDG"],
                        record["PRE APPEAL TOTAL"],
                      ],
                      [
                        record["CURRENT LAND VALUE"],
                        record["CURRENT BLDG VALUE"],
                        record["CURRENT TOTAL VALUE"],
                      ],
                      [
                        record["PRE APPEAL LAND"] -
                          record["CURRENT LAND VALUE"],
                        record["PRE APPEAL BLDG"] -
                          record["CURRENT BLDG VALUE"],
                        record["PRE APPEAL TOTAL"] -
                          record["CURRENT TOTAL VALUE"],
                      ],
                    ]}
                  />
                </article>
              </Card>
            ))}
        </CardList>
      )}
    </div>
  );
}

export function FiledAssessmentAppealsSection({
  fields,
  records,
}: SectionProps<FiledAssessmentAppeal>): React.ReactElement {
  if (!records.length)
    return <Typography.Note>No Records Found</Typography.Note>;
  const record = records[0];

  return (
    <div className="max-w-md space-y-4">
      <DataListViz
        items={[
          {
            id: "on_behalf_of",
            label: "On Behalf Of",
            info: fields.on_behalf_of.info?.notes,
            value: record.on_behalf_of,
          },
          {
            id: "hearing_status",
            label: "Hearing Status",
            info: fields.hearing_status.info?.notes,
            value: record.hearing_status,
          },
        ]}
      />
      <div>
        <Table
          columns={["Price"]}
          rows={["Last Year", "Current"]}
          format={formatDollars}
          data={[[record.prev_taxyr_mkt_value], [record.cur_mkt_value]]}
        />
        <ChartViz
          className="w-full border-t-0 pt-3.5"
          spec={spec}
          data={{
            table: [
              { category: "Last Year", value: record.prev_taxyr_mkt_value },
              { category: "Current", value: record.cur_mkt_value },
            ],
          }}
        />
      </div>
    </div>
  );
}

const spec: VisualizationSpec = {
  $schema: "https://vega.github.io/schema/vega-lite/v5.json",
  data: { name: "table" },
  width: "container",
  background: "white",
  view: {
    stroke: null,
  },
  config: {
    font: "JetBrains Mono",
  },

  mark: { type: "bar", color: "rgba(230,185,24)", strokeWidth: 0 },
  encoding: {
    y: {
      field: "category",
      axis: {
        labelAngle: 0,
        title: null,
        domainWidth: 2,
        domainColor: "#000",
        zindex: 10,
        tickWidth: 2,
        tickColor: "#000",
      },
    },
    x: {
      field: "value",
      type: "quantitative",
      axis: {
        format: "$.2s",
        grid: false,
        domainWidth: 2,
        domainColor: "#000",
        title: null,
        tickWidth: 2,
        tickColor: "#000",
      },
    },
  },
};
