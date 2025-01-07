import type { PropertyAssessment } from "@wprdc/types";
import { useMemo } from "react";
import {
  ChartViz,
  Chip,
  formatDollars,
  SingleValueVizCollection,
  SingleValueVizProps,
  Table,
} from "@wprdc/ui";
import type { SectionProps } from "../types";
import { VisualizationSpec } from "@wprdc/types";
import {
  TbBuilding,
  TbHomeHeart,
  TbLeaf,
  TbPigMoney,
  TbReportMoney,
  TbTrees,
  TbX,
} from "react-icons/tb";
import { GiFarmTractor } from "react-icons/gi";
import { Value } from "maplibre-gl";

export function AssessedValuesSection({
  records,
  fields,
}: SectionProps<PropertyAssessment>): React.ReactElement {
  const record = records[0];

  const notation: Intl.NumberFormatOptions["notation"] = useMemo(
    () =>
      record.FAIRMARKETTOTAL && record.FAIRMARKETTOTAL >= 10_000_000
        ? "compact"
        : "standard",
    [record.FAIRMARKETTOTAL],
  );

  const vegaData = [
    {
      group: "Local",
      category: "Land",
      value: record.LOCALLAND,
    },
    {
      group: "Local",
      category: "Building",
      value: record.LOCALBUILDING,
    },

    {
      group: "County",
      category: "Land",
      value: record.COUNTYLAND,
    },
    {
      group: "County",
      category: "Building",
      value: record.COUNTYBUILDING,
    },

    {
      group: "Fair Market",
      category: "Land",
      value: record.FAIRMARKETLAND,
    },
    {
      group: "Fair Market",
      category: "Building",
      value: record.FAIRMARKETBUILDING,
    },
  ];

  const items: SingleValueVizProps<number>[] = [
    {
      id: "total-assessed-value",
      label: "Total value",
      icon: TbReportMoney,
      value: record.FAIRMARKETTOTAL,
      info: fields.FAIRMARKETTOTAL.info?.notes,
      format: formatDollars,
    },
    {
      id: "land-assessed-value",
      label: "Land value",
      icon: TbTrees,
      value: record.FAIRMARKETLAND,
      info: fields.FAIRMARKETLAND.info?.notes,
      format: formatDollars,
    },
    {
      id: "building-assessed-value",
      label: "Building value",
      icon: TbBuilding,
      value: record.FAIRMARKETBUILDING,
      info: fields.FAIRMARKETBUILDING.info?.notes,
      format: formatDollars,
    },
  ];

  return (
    <div className="">
      <div>
        <SingleValueVizCollection<number> items={items} />
      </div>

      <section>
        <h3 className="mb-1 mt-3.5 text-lg font-bold">Subsidies</h3>
        <Chip
          className="ml-1 inline-flex first:ml-0"
          icon={record.HOMESTEADFLAG === "HOM" ? TbHomeHeart : TbX}
          info={fields.HOMESTEADFLAG.info?.notes}
          label="Homestead"
          color={record.HOMESTEADFLAG === "HOM" ? "#fdcdac" : "#CCC"}
          textColor={record.HOMESTEADFLAG === "HOM" ? "#000" : "#999"}
        />

        <Chip
          className="ml-1 inline-flex first:ml-0"
          icon={record.FARMSTEADFLAG === "FRM" ? GiFarmTractor : TbX}
          info={fields.FARMSTEADFLAG.info?.notes}
          label="Farmstead"
          color={record.FARMSTEADFLAG === "FRM" ? "#cbd5e8" : "#CCC"}
          textColor={record.HOMESTEADFLAG === "FRM" ? "#000" : "#999"}
        />
        <Chip
          className="ml-1 inline-flex first:ml-0"
          icon={record.HOMESTEADFLAG === "Y" ? TbLeaf : TbX}
          info={fields.CLEANGREEN.info?.notes}
          label="Clean & Green"
          color={record.HOMESTEADFLAG === "Y" ? "#b3e2cd" : "#CCC"}
          textColor={record.HOMESTEADFLAG === "Y" ? "#000" : "#999"}
        />
        <Chip
          className="ml-1 inline-flex first:ml-0"
          icon={record.HOMESTEADFLAG === "Y" ? TbPigMoney : TbX}
          info={fields.ABATEMENTFLAG.info?.notes}
          label="Receives Abatement"
          color={record.HOMESTEADFLAG === "Y" ? "#f4cae4" : "#CCC"}
          textColor={record.HOMESTEADFLAG === "Y" ? "#000" : "#999"}
        />
      </section>

      <section className="max-w-lg">
        <h3 className="mb-1 mt-3.5 text-lg font-bold">
          Comparison of Assessment Values
        </h3>
        <Table<number>
          totalCol
          columns={["Building", "Land", "Total"]}
          data={[
            [record.LOCALBUILDING, record.LOCALLAND, record.LOCALTOTAL],
            [record.COUNTYBUILDING, record.COUNTYLAND, record.COUNTYTOTAL],
            [
              record.FAIRMARKETBUILDING,
              record.FAIRMARKETLAND,
              record.FAIRMARKETTOTAL,
            ],
          ]}
          format={(v?: Value) =>
            formatDollars(v as string, { notation, compactDisplay: "long" })
          }
          rows={["Local", "County", "Fair Market"]}
        />
        <ChartViz
          className="w-full border-t-0 pt-3.5"
          spec={spec}
          data={{ table: vegaData }}
        />
      </section>
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
  layer: [
    {
      mark: "bar",
      encoding: {
        y: {
          field: "group",
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
        color: {
          field: "category",
          title: null,
          // scale: { range: ["#222", "#AAA"] },
          scale: { scheme: "darkgold" },
        },
      },
    },
  ],
};
