import { ParcelTable } from "@wprdc/api";
import type { DataSetFieldMenuProps } from "@/components/dataset-field-menu";

export type Dataset = Omit<
  DataSetFieldMenuProps,
  "onSelectionChange" | "selection"
> & {
  slug: string;
  parcelIDField: string;
};

export const datasets: Record<string, Dataset[]> = {
  Assessment: [
    {
      title: "Property Assessments",
      slug: "property-assessments",
      table: ParcelTable.Assessment,
      datasetURL: "https://data.wprdc.org/dataset/property-assessments",
      ignoredFields: ["ASOFDATE"],
      parcelIDField: "PARID",
    },
    {
      title: "Filed Assessment Appeals",
      slug: "filed-assessment-appeals",
      table: ParcelTable.FiledAssessmentAppeals,
      datasetURL:
        "https://data.wprdc.org/dataset/filed-property-assessment-appeals",
      parcelIDField: "parcel_id",
    },
    {
      title: "Historical Assessment Appeals",
      slug: "historical-assessment-appeals",
      table: ParcelTable.AssessmentAppeals,
      datasetURL:
        "https://data.wprdc.org/dataset/allegheny-county-property-assessment-appeals",
      parcelIDField: "Parcel ID",
    },
  ],

  Sales: [
    {
      title: "Property Sales Transactions",
      slug: "property-sales-transactions",
      table: ParcelTable.PropertySaleTransactions,
      datasetURL: "https://data.wprdc.org/dataset/real-estate-sales",
      parcelIDField: "PARID",
    },
  ],

  "Risks and Remediation": [
    {
      title: "Mortgage Foreclosure Records",
      slug: "mortgage-foreclosure-records",
      table: ParcelTable.ForeclosureFilings,
      datasetURL:
        "https://data.wprdc.org/dataset/allegheny-county-mortgage-foreclosure-records",
      parcelIDField: "pin",
    },
    {
      title: "Tax Liens",
      slug: "tax-liens",
      table: ParcelTable.TaxLiensWithCurrentStatus,
      datasetURL:
        "https://data.wprdc.org/dataset/allegheny-county-tax-liens-filed-and-satisfied",
      parcelIDField: "pin",
    },
    {
      title: "Conservatorship Filings",
      slug: "conservatorship-filings",
      table: ParcelTable.ConservatorshipRecord,
      datasetURL:
        "https://data.wprdc.org/dataset/allegheny-county-conservatorship-filings",
      parcelIDField: "pin",
    },
  ],

  "Permits and Violations": [
    {
      title: "PLI Permits",
      slug: "pli-permits",
      table: ParcelTable.PLIPermit,
      datasetURL: "https://data.wprdc.org/dataset/pli-permits",
      pghOnly: true,
      parcelIDField: "parcel_num",
    },
    {
      title: "PLI/DOMI/ES Violations",
      slug: "pli-domi-es-violations",
      table: ParcelTable.CityViolations,
      datasetURL:
        "https://data.wprdc.org/dataset/pittsburgh-pli-violations-report",
      pghOnly: true,
      parcelIDField: "parcel_id",
    },
  ],
};

/**
 * Datasets from able but without the hierarchy and keyed by datastore table name
 */
export const datasetsByTable: Record<string, Dataset> = Object.values(datasets)
  .flat() // array of all datasets
  .reduce<Record<string, Dataset>>((acc, curr) => {
    return { ...acc, [curr.table]: curr };
  }, {});
