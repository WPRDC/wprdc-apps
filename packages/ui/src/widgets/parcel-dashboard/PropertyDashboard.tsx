import type {
  ArchiveAssessmentAppeal,
  CityViolation,
  FiledAssessmentAppeal,
  ForeclosureFiling,
  ParcelBoundary,
  PLIPermit,
  PropertyAssessment,
  PropertySaleTransaction,
  TaxLienWithCurrentStatus,
} from "@wprdc/types";
import type { APIResult } from "@wprdc/api";
import {
  fetchAssessmentAppealsRecords,
  fetchAssessmentRecord,
  fetchCityViolationsRecords,
  fetchFiledAssessmentAppealsRecord,
  fetchForeclosureFilingsRecords,
  fetchParcelBoundariesRecord,
  fetchPLIPermitRecords,
  fetchPropertySaleTransactionsRecords,
  fetchTaxLiensWithCurrentStatusRecords,
} from "@wprdc/api";
import type { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { Heading } from "../../components";
import {
  ConnectedSection,
  MultiConnectedSection,
} from "./components/ConnectedSection";
import { FiledAssessmentAppealsSection } from "./sections/FiledAssessmentAppealsSection";
import { SalesSection } from "./sections/SalesSection";
import { AssessmentAppealsSection } from "./sections/AssessmentAppealsSection";
import { AssessedValuesSection } from "./sections/AssessedValuesSection";
import { SubsidiesSection } from "./sections/SubsidiesSection";
import { TaxContextSection } from "./sections/TaxContextSection";
import { DwellingSection } from "./sections/DwellingSection";
import { LotAreaSection } from "./sections/LotAreaSection";
import { CityViolationsSection } from "./sections/CityViolationsSection";
import { PLIPermitsSection } from "./sections/PLIPermitsSection";
import { TaxLiensSection } from "./sections/TaxLIensSection";
import { ForeclosureFilingSection } from "./sections/ForeclosureFilingsSection";
import { HeadingSection } from "./sections/HeadingSection";
import type { SectionProps } from "./types";

export interface PropertyDashboardProps {
  parcelID: string;
}

export async function PropertyDashboard({
  parcelID,
}: PropertyDashboardProps): Promise<null | React.ReactElement> {
  const assessment: APIResult<PropertyAssessment> =
    await fetchAssessmentRecord(parcelID);
  const boundary: APIResult<ParcelBoundary> =
    await fetchParcelBoundariesRecord(parcelID);

  return (
    <div className="bg-stone-200 p-2 pb-4">
      <div className="mx-auto max-w-screen-lg">
        <div>
          <HeadingSection
            assessment={assessment as SectionProps<PropertyAssessment>}
            boundary={boundary as SectionProps<ParcelBoundary>}
            parcelID={parcelID}
          />
        </div>
        <Heading level={2}>Assessment</Heading>
        <Section>
          {/* Assessment*/}
          <ConnectedSection<PropertyAssessment>
            className="col-span-6 row-span-3"
            getter={fetchAssessmentRecord}
            label="Dwelling Characteristics"
            parcelID={parcelID}
            section={DwellingSection}
          />
          <ConnectedSection<PropertyAssessment>
            className="col-span-6 row-span-1"
            getter={fetchAssessmentRecord}
            label="Assessesd Values"
            parcelID={parcelID}
            section={AssessedValuesSection}
          />
          <ConnectedSection<PropertyAssessment>
            className="col-span-6 row-span-2"
            getter={fetchAssessmentRecord}
            label="Tax Context"
            parcelID={parcelID}
            section={TaxContextSection}
          />
          <ConnectedSection<PropertyAssessment>
            className="col-span-2 row-span-1"
            getter={fetchAssessmentRecord}
            label="Lot Area"
            parcelID={parcelID}
            section={LotAreaSection}
          />
          <ConnectedSection<PropertyAssessment>
            className="col-span-4 row-span-1"
            getter={fetchAssessmentRecord}
            label="Subsidies"
            parcelID={parcelID}
            section={SubsidiesSection}
          />
        </Section>

        <Heading level={2}>Sales</Heading>
        <Section>
          {/* Sales */}
          <MultiConnectedSection<{
            sales: PropertySaleTransaction;
            assessment: PropertyAssessment;
          }>
            className="col-span-8 row-span-1"
            getters={{
              sales: fetchPropertySaleTransactionsRecords,
              assessment: fetchAssessmentRecord,
            }}
            label="Sales History"
            parcelID={parcelID}
            section={SalesSection}
          />
        </Section>

        <Heading level={2}>Permits and Violations</Heading>
        <Section>
          {/* Building Permits */}
          <ConnectedSection<PLIPermit>
            className="col-span-4 row-span-1"
            getter={fetchPLIPermitRecords}
            label="PLI Permits"
            parcelID={parcelID}
            section={PLIPermitsSection}
          />
          {/* Code Violations*/}
          <ConnectedSection<CityViolation>
            className="col-span-4 row-span-1"
            getter={fetchCityViolationsRecords}
            label="Pittsburgh Code Violations"
            parcelID={parcelID}
            section={CityViolationsSection}
          />
        </Section>

        <Heading level={2}>Assessment Appeals</Heading>
        <Section>
          {/* Appeals */}
          <ConnectedSection<FiledAssessmentAppeal>
            className="col-span-6 row-span-1"
            getter={fetchFiledAssessmentAppealsRecord}
            label="Filed Assessment Appeal"
            parcelID={parcelID}
            section={FiledAssessmentAppealsSection}
          />
          <ConnectedSection<ArchiveAssessmentAppeal>
            className="col-span-6 row-span-1"
            getter={fetchAssessmentAppealsRecords}
            label="Assessment Appeals History"
            parcelID={parcelID}
            section={AssessmentAppealsSection}
          />
        </Section>

        <Heading level={2}>Delinquencies</Heading>
        <Section>
          {/* Foreclosure */}
          <ConnectedSection<ForeclosureFiling>
            className="col-span-6 row-span-1"
            getter={fetchForeclosureFilingsRecords}
            label="Foreclosure Filings"
            parcelID={parcelID}
            section={ForeclosureFilingSection}
          />
          {/* Liens */}
          <ConnectedSection<TaxLienWithCurrentStatus>
            className="col-span-6 row-span-1"
            getter={fetchTaxLiensWithCurrentStatusRecords}
            label="Tax Liens"
            parcelID={parcelID}
            section={TaxLiensSection}
          />
        </Section>
      </div>
    </div>
  );
}

function Section({
  children,
  className,
}: PropsWithChildren<{ className?: string }>): React.ReactElement {
  return (
    <section className={twMerge("mb-12 grid grid-cols-12 gap-2", className)}>
      {children}
    </section>
  );
}
