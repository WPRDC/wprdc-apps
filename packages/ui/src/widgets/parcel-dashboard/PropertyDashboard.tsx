import {
  fetchAssessmentAppealsRecords,
  fetchAssessmentRecord,
  fetchCityViolationsRecords,
  fetchFiledAssessmentAppealsRecord,
  fetchForeclosureFilingsRecords,
  fetchPLIPermitRecords,
  fetchPropertySaleTransactionsRecords,
  fetchTaxLiensWithCurrentStatusRecords,
} from "@wprdc/api";
import type {
  ArchiveAssessmentAppeal,
  CityViolation,
  FiledAssessmentAppeal,
  ForeclosureFiling,
  PLIPermit,
  PropertyAssessment,
  PropertySaleTransaction,
  TaxLienWithCurrentStatus,
} from "@wprdc/types";
import { Suspense, type PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import { Heading } from "../../components";
import {
  ConnectedSection,
  MultiConnectedSection,
} from "./components/ConnectedSection";
import { AssessedValuesSection } from "./sections/AssessedValuesSection";
import { AssessmentAppealsSection } from "./sections/AssessmentAppealsSection";
import { CityViolationsSection } from "./sections/CityViolationsSection";
import { DwellingSection } from "./sections/DwellingSection";
import { FiledAssessmentAppealsSection } from "./sections/FiledAssessmentAppealsSection";
import { ForeclosureFilingSection } from "./sections/ForeclosureFilingsSection";
import {
  HeadingSection,
  HeadingSectionSkeleton,
} from "./sections/HeadingSection";
import { LotAreaSection } from "./sections/LotAreaSection";
import { PLIPermitsSection } from "./sections/PLIPermitsSection";
import { SalesSection } from "./sections/SalesSection";
import { SubsidiesSection } from "./sections/SubsidiesSection";
import { TaxContextSection } from "./sections/TaxContextSection";
import { TaxLiensSection } from "./sections/TaxLIensSection";

export interface PropertyDashboardProps {
  parcelID?: string;
}

export function PropertyDashboard({
  parcelID: _parcelID,
}: PropertyDashboardProps): null | React.ReactElement {
  const parcelID = _parcelID ?? "0027S00125000000";

  // todo: pass in more data from map so we don't need to load address

  return (
    <div className="bg-stone-200 p-2 pb-4">
      <div className="mx-auto max-w-screen-lg">
        <div>
          <Suspense fallback={<HeadingSectionSkeleton />} key={parcelID}>
            {/* @ts-expect-error Server-side async component */}
            <HeadingSection parcelID={parcelID} />
          </Suspense>
        </div>

        <Heading level={2}>Assessment</Heading>
        <Section>
          {/* Assessment*/}
          <ConnectedSection<PropertyAssessment>
            className="col-span-6 row-span-1"
            getter={fetchAssessmentRecord}
            label="Assessesd Values"
            parcelID={parcelID}
            section={AssessedValuesSection}
          />
          <ConnectedSection<PropertyAssessment>
            className="col-span-6 row-span-3"
            getter={fetchAssessmentRecord}
            label="Dwelling Characteristics"
            parcelID={parcelID}
            section={DwellingSection}
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
