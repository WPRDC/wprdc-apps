import { OwnerSection } from "@/components/parcel-dashboard/sections/owner.tsx";
import {
  fetchAssessmentRecord,
  fetchCityViolationsRecords,
  fetchCondemnedStatusRecords,
  fetchConservatorshipRecordRecords,
  fetchForeclosureFilingsRecords,
  fetchPLIPermitRecords,
  fetchTaxLiensWithCurrentStatusRecords,
} from "@wprdc/api";
import {
  ConnectedSectionProps,
  DatastoreRecordSet,
  MultiConnectedSectionProps,
} from "@/components/parcel-dashboard/types.ts";
import { DatastoreRecord } from "@wprdc/types";
import { AssessedValuesSection } from "@/components/parcel-dashboard/sections/assessed-value.tsx";
import { DwellingSection } from "@/components/parcel-dashboard/sections/dwelling.tsx";
import { ConditionSection } from "@/components/parcel-dashboard/sections/condition.tsx";
import { TaxContextSection } from "@/components/parcel-dashboard/sections/tax-context.tsx";
import { PLIPermitsSection } from "@/components/parcel-dashboard/sections/pli-permits.tsx";
import { CodeViolationsSection } from "@/components/parcel-dashboard/sections/code-violations.tsx";
import { CondemnedPropertiesSection } from "@/components/parcel-dashboard/sections/condemned-properties-section.tsx";
import { TaxLiensSection } from "@/components/parcel-dashboard/sections/tax-liens.tsx";
import { ForeclosureFilingSection } from "@/components/parcel-dashboard/sections/foreclosure.tsx";
import { ConservatorshipRecordSection } from "@/components/parcel-dashboard/sections/conservatoriship.tsx";

export type SectionOptions<T extends DatastoreRecord> = Omit<
  ConnectedSectionProps<T>,
  "parcelID"
> & {
  id: string;
  type: "single";
};

export type MultiSectionOptions<T extends DatastoreRecordSet> = Omit<
  MultiConnectedSectionProps<T>,
  "parcelID"
> & {
  id: string;
  type: "multi";
};

export default [
  {
    id: "owner",
    label: "Owner",
    description:
      "Information about the owner of this parcel and their other holdings in Allegheny County",
    getter: fetchAssessmentRecord,
    defaultOpen: true,
    section: OwnerSection,
    datasetLinks: ["https://data.wprdc.org/dataset/property-assessments"],
  },

  {
    label: "Assessed Values",
    description:
      "Comparison of this parcel's monetary value as assessed by various jurisdictions",
    getter: fetchAssessmentRecord,
    section: AssessedValuesSection,
    datasetLinks: ["https://data.wprdc.org/dataset/property-assessments"],
  },
  {
    label: "Dwelling Characteristics",
    description:
      "Information about the primary residential building on this parcel (if there is one)",
    getter: fetchAssessmentRecord,
    section: DwellingSection,
    datasetLinks: ["https://data.wprdc.org/dataset/property-assessments"],
  },
  {
    label: "Condition",
    description:
      "Ratings of the  about the primary residential building on this parcel (if there is one)",
    getter: fetchAssessmentRecord,
    section: ConditionSection,
    datasetLinks: ["https://data.wprdc.org/dataset/property-assessments"],
  },
  {
    label: "Tax Details",
    description: "Information about taxable status and taxing bodies",
    className: "col-span-6 row-span-2",
    getter: fetchAssessmentRecord,
    section: TaxContextSection,
    datasetLinks: ["https://data.wprdc.org/dataset/property-assessments"],
  },
  {
    label: "PLI Permits",
    description: "City of Pittsburgh building permits",
    className: "col-span-4 row-span-1",
    section: PLIPermitsSection,
    getter: fetchPLIPermitRecords,
    datasetLinks: ["https://data.wprdc.org/dataset/pli-permits"],
  },
  {
    label: "Pittsburgh Code Violations",
    description:
      "Code violations from various city departments: Permits Licensse and Inspections (PLI), Dept. of Mobility and Infrasturcture (DOMI) and Environmental Services (ES)",
    className: "col-span-4 row-span-1",
    section: CodeViolationsSection,
    getter: fetchCityViolationsRecords,
    datasetLinks: [
      "https://data.wprdc.org/dataset/pittsburgh-pli-violations-report",
    ],
  },
  {
    label: "Condemned Status",
    description:
      "Details about the parcel's possible condemned or dead-end status by the City of Pittsburgh.",
    section: CondemnedPropertiesSection,
    getter: fetchCondemnedStatusRecords,
    datasetLinks: ["https://data.wprdc.org/dataset/condemned-properties"],
  },
  {
    label: "Tax Liens",
    description: "Filed and satisfied liens against the property",
    className: "col-span-6 row-span-1",
    getter: fetchTaxLiensWithCurrentStatusRecords,
    section: TaxLiensSection,
    datasetLinks: [
      "https://data.wprdc.org/dataset/allegheny-county-tax-liens-filed-and-satisfied",
    ],
  },
  {
    label: "Foreclosure Filings",
    description: "Forecloure filing records",
    className: "col-span-6 row-span-1",
    getter: fetchForeclosureFilingsRecords,
    section: ForeclosureFilingSection,
    datasetLinks: [
      "https://data.wprdc.org/dataset/allegheny-county-mortgage-foreclosure-records",
    ],
  },
  {
    label: "Conservatorship Filings",
    description:
      "Petitions to put an abandoned property under coneservatorship to be brought back in productive use",
    className: "col-span-6 row-span-1",
    getter: fetchConservatorshipRecordRecords,
    section: ConservatorshipRecordSection,
    datasetLinks: [
      "https://data.wprdc.org/dataset/allegheny-county-conservatorship-filings",
    ],
  },
] as (SectionOptions<any> | MultiSectionOptions<any>)[];
