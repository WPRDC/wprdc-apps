import type { PropertyAssessment } from "@wprdc/types";
import { DataListViz, SingleValueVizCollection } from "@wprdc/ui";
import type { SectionProps } from "../types.ts";

export function TaxContextSection({
  fields,
  records,
}: SectionProps<PropertyAssessment>): React.ReactElement {
  const record = records[0];

  return (
    <div>
      <SingleValueVizCollection
        items={[
          {
            id: "tax-status",
            label: "Tax Status",
            value: record.TAXDESC,
            info:
              "Tax Status indicates whether or not real estate taxes apply to a parcel's assessment. " +
              "Parcels may be Taxable (must pay local taxes), Exempt (pay no taxes), " +
              "or PURTA [Public Utility Realty Tax Act (if taxes are paid, " +
              "they are paid into a state fund rather than to local taxing bodies)].",
          },
          {
            id: "class",
            label: "Class",
            value: record.CLASSDESC,
            info: "Broad self-explanatory categories for describing the general use of a parcel.",
          },
        ]}
      />
      <div className="max-w-md">
        <DataListViz
          items={[
            {
              id: "tax-municipality",
              label: "Municipality (Tax District)",
              value: `${record.MUNIDESC} (${record.MUNICODE})`,
            },
            {
              id: "tax-schooldesc",
              label: "School District",
              value: `${record.SCHOOLDESC} (${record.SCHOOLCODE})`,
            },
            {
              id: "val-neighborhood",
              label: "Valuation Neighborhood",
              value: `${record.NEIGHDESC} (${record.NEIGHCODE})`,
              info:
                "The ID number for the valuation neighborhood containing this parcel. " +
                "Valuation neighborhoods were delineated as part of the 2013 reassessment. " +
                "A valuation neighborhood is a geographic area exhibiting a " +
                "high degree of homogeneity in economic amenities, land use, economic trends, " +
                "and property characteristics such as quality, age, and condition.",
            },
            {
              id: "tax-subcode",
              label: "Tax Sub Code",
              value: record.TAXSUBCODE_DESC ?? "N/A",
              info: fields.TAXSUBCODE.info?.notes,
            },

            {
              id: "use",
              label: "Use",
              value: record.USEDESC,
              info:
                "More detailed than class, these categories further describe the primary use of the parcel. " +
                "There are about 200 self-explanatory categories.",
            },
          ]}
          variant="dense"
        />
      </div>
    </div>
  );
}
