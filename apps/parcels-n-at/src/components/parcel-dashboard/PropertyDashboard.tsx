import {
  fetchAssessmentAppealsRecords,
  fetchAssessmentRecord,
  fetchCityViolationsRecords,
  fetchFiledAssessmentAppealsRecord,
  fetchPLIPermitRecords,
  fetchPropertySaleTransactionsRecords,
  fetchTaxLiensWithCurrentStatusRecords,
  fetchForeclosureFilingsRecords,
  fetchConservatorshipRecordRecords,
} from "@wprdc/api";
import type {
  ArchiveAssessmentAppeal,
  CityViolation,
  FiledAssessmentAppeal,
  PLIPermit,
  PropertyAssessment,
  TaxLienWithCurrentStatus,
  ForeclosureFiling,
  ConservatorshipRecord,
} from "@wprdc/types";
import { PropertySaleTransaction } from "@wprdc/types";
import React, { Suspense } from "react";
import {
  ConnectedSection,
  MultiConnectedSection,
} from "./components/ConnectedSection";
import { DwellingSection } from "./sections/dwelling";
import { Hero } from "./sections/hero";
import { AssessedValuesSection } from "./sections/assessed-value";
import { OwnerSection } from "./sections/owner";
import { AssessmentAppealsSection } from "./sections/assessment-appeals";
import { ConditionSection } from "./sections/condition";
import { SalesSection } from "@/components/parcel-dashboard/sections/sales";
import { CodeViolationsSection } from "./sections/code-violations";
import { PLIPermitsSection } from "./sections/pli-permits";
import { TaxContextSection } from "./sections/tax-context";
import { TaxLiensSection } from "./sections/tax-liens";
import { ForeclosureFilingSection } from "./sections/foreclosure";
import { ConservatorshipRecordSection } from "./sections/conservatoriship";
import { MapControlsSection } from "./sections/map-controls";
import { HeadingSection, HeadingSkeleton } from "./sections/headingSection";
import { Section } from "./components/Section";
import { PopupImage } from "@wprdc/ui";

export interface PropertyDashboardProps {
  parcelID?: string;
}

export function PropertyDashboard({
  parcelID: _parcelID,
}: PropertyDashboardProps): null | React.ReactElement {
  const parcelID = _parcelID ?? "0027S00125000000";

  return (
    <article className="mx-auto mb-24">
      <div className="h-64 w-full">
        <Hero parcelID={parcelID} />
      </div>
      <div className="sticky top-0 z-40 -mt-24 bg-black/40 px-4 py-2 backdrop-blur-md">
        <div className="flex-grow">
          <Suspense fallback={<HeadingSkeleton />} key={parcelID}>
            <HeadingSection parcelID={parcelID} />
          </Suspense>
        </div>
      </div>

      <div className="p-4">
        <Suspense fallback="Loading..." key={parcelID}>
          <MapControlsSection parcelID={parcelID} />
        </Suspense>
      </div>

      {/* Owner */}
      <ConnectedSection<PropertyAssessment>
        label="Owner"
        description="Information about the owner of this parcel and their other holdings in Allegheny County."
        getter={fetchAssessmentRecord}
        defaultOpen={true}
        parcelID={parcelID}
        section={OwnerSection}
        datasetLinks={["https://data.wprdc.org/dataset/property-assessments"]}
      />

      {/* Assessed Values */}
      <ConnectedSection<PropertyAssessment>
        description="Comparison of this parcel's monetary value as assessed by various jurisdictions."
        label="Assessesd Values"
        getter={fetchAssessmentRecord}
        parcelID={parcelID}
        section={AssessedValuesSection}
        datasetLinks={["https://data.wprdc.org/dataset/property-assessments"]}
      />

      {/* Dwelling Characteristics*/}
      <ConnectedSection<PropertyAssessment>
        label="Dwelling Characteristics"
        description="Information about the primary residential building on this parcel (if there is one)."
        getter={fetchAssessmentRecord}
        parcelID={parcelID}
        section={DwellingSection}
        datasetLinks={["https://data.wprdc.org/dataset/property-assessments"]}
      />

      {/* Condition */}
      <ConnectedSection<PropertyAssessment>
        label="Condition"
        description="Ratings of the  about the primary residential building on this parcel (if there is one)."
        getter={fetchAssessmentRecord}
        parcelID={parcelID}
        section={ConditionSection}
        datasetLinks={["https://data.wprdc.org/dataset/property-assessments"]}
      />

      {/* Tax Context */}
      <ConnectedSection<PropertyAssessment>
        className="col-span-6 row-span-2"
        getter={fetchAssessmentRecord}
        label="Tax Context"
        parcelID={parcelID}
        section={TaxContextSection}
        datasetLinks={["https://data.wprdc.org/dataset/property-assessments"]}
      />

      <Section label="Images">
        <div className="flex space-x-8">
          <PopupImage
            alt="Photo of property"
            src={`https://iasworld.alleghenycounty.us/iasworld/iDoc2/Services/GetPhoto.ashx?parid=${parcelID}&jur=002&Rank=1`}
            className="relative h-44 w-44"
          />
          <PopupImage
            alt="Sketch of parcel plot"
            src={`https://iasworld.alleghenycounty.us/iasworld/maintain/services/GetSketchImage.ashx?&parid=${parcelID}&jur=002&&Taxyr=2024&mode=detailed&gridunits=0`}
            className="relative h-44 w-44"
          />
        </div>
      </Section>

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
        datasetLinks={[
          "https://data.wprdc.org/dataset/property-assessments",
          "https://data.wprdc.org/dataset/real-estate-sales",
        ]}
      />

      {/* Assessment Appeals */}
      <MultiConnectedSection<{
        filed: FiledAssessmentAppeal;
        archive: ArchiveAssessmentAppeal;
      }>
        getters={{
          filed: fetchFiledAssessmentAppealsRecord,
          archive: fetchAssessmentAppealsRecords,
        }}
        label="Assessment Appeals"
        parcelID={parcelID}
        section={AssessmentAppealsSection}
        datasetLinks={[
          "https://data.wprdc.org/dataset/filed-property-assessment-appeals",
          "https://data.wprdc.org/dataset/allegheny-county-property-assessment-appeals",
        ]}
      />

      {/* PLI Permits */}
      <ConnectedSection<PLIPermit>
        className="col-span-4 row-span-1"
        getter={fetchPLIPermitRecords}
        label="PLI Permits"
        parcelID={parcelID}
        section={PLIPermitsSection}
        datasetLinks={["https://data.wprdc.org/dataset/pli-permits"]}
      />

      {/* Code Violations*/}
      <ConnectedSection<CityViolation>
        className="col-span-4 row-span-1"
        getter={fetchCityViolationsRecords}
        label="Pittsburgh Code Violations"
        parcelID={parcelID}
        section={CodeViolationsSection}
        datasetLinks={[
          "https://data.wprdc.org/dataset/pittsburgh-pli-violations-report",
        ]}
      />

      {/* Liens */}
      <ConnectedSection<TaxLienWithCurrentStatus>
        className="col-span-6 row-span-1"
        getter={fetchTaxLiensWithCurrentStatusRecords}
        label="Tax Liens"
        parcelID={parcelID}
        section={TaxLiensSection}
        datasetLinks={[
          "https://data.wprdc.org/dataset/allegheny-county-tax-liens-filed-and-satisfied",
        ]}
      />

      {/* Foreclosures */}
      <ConnectedSection<ForeclosureFiling>
        className="col-span-6 row-span-1"
        getter={fetchForeclosureFilingsRecords}
        label="Foreclosure"
        parcelID={parcelID}
        section={ForeclosureFilingSection}
        datasetLinks={[
          "https://data.wprdc.org/dataset/allegheny-county-mortgage-foreclosure-records",
        ]}
      />

      {/* Conservatorship */}
      <ConnectedSection<ConservatorshipRecord>
        className="col-span-6 row-span-1"
        getter={fetchConservatorshipRecordRecords}
        label="Conservatorship"
        parcelID={parcelID}
        section={ConservatorshipRecordSection}
        datasetLinks={[
          "https://data.wprdc.org/dataset/allegheny-county-conservatorship-filings",
        ]}
      />
    </article>
  );
}
