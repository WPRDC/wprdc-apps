import {
  fetchAssessmentAppealsRecords,
  fetchAssessmentRecord,
  fetchCityViolationsRecords,
  fetchCondemnedStatusRecords,
  fetchConservatorshipRecordRecords,
  fetchFiledAssessmentAppealsRecord,
  fetchForeclosureFilingsRecords,
  fetchPLIPermitRecords,
  fetchPropertySaleTransactionsRecords,
  fetchTaxLiensWithCurrentStatusRecords,
} from "@wprdc/api";
import type {
  ArchiveAssessmentAppeal,
  CityViolation,
  ConservatorshipRecord,
  FiledAssessmentAppeal,
  ForeclosureFiling,
  PLIPermit,
  PropertyAssessment,
  TaxLienWithCurrentStatus,
} from "@wprdc/types";
import { PropertySaleTransaction } from "@wprdc/types";
import React, { Suspense } from "react";
import {
  ConnectedSection,
  MultiConnectedSection,
} from "./components/ConnectedSection";
import { DwellingSection } from "./sections/dwelling";
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
import { HeadingSection, HeadingSkeleton } from "./sections/headingSection";
import { Section } from "./components/Section";
import { PopupImage } from "@wprdc/ui";
import { CondemnedPropertiesSection } from "@/components/parcel-dashboard/sections/condemned-properties-section.tsx";

export interface PropertyDashboardProps {
  parcelID?: string;
}

export function PropertyDashboard({
  parcelID: _parcelID,
}: PropertyDashboardProps): null | React.ReactElement {
  const parcelID = _parcelID ?? "0027S00125000000";

  return (
    <article className="mx-auto mb-24" id="parcel-dashboard">
      <Suspense fallback={<HeadingSkeleton />} key={parcelID}>
        <HeadingSection parcelID={parcelID} />
      </Suspense>


      {/* Owner */}
      <ConnectedSection<PropertyAssessment>
        id="owner"
        label="Owner"
        description="Information about the owner of this parcel and their other holdings in Allegheny County"
        getter={fetchAssessmentRecord}
        defaultOpen={true}
        parcelID={parcelID}
        section={OwnerSection}
        datasetLinks={["https://data.wprdc.org/dataset/property-assessments"]}
      />


      {/* Assessed Values */}
      <ConnectedSection<PropertyAssessment>
        id="assessed-value"
        label="Assessed Values"
        description="Comparison of this parcel's monetary value as assessed by various jurisdictions"
        getter={fetchAssessmentRecord}
        parcelID={parcelID}
        section={AssessedValuesSection}
        datasetLinks={["https://data.wprdc.org/dataset/property-assessments"]}
      />

      {/* Dwelling Characteristics*/}
      <ConnectedSection<PropertyAssessment>
        id="dwelling"
        label="Dwelling Characteristics"
        description="Information about the primary residential building on this parcel (if there is one)"
        getter={fetchAssessmentRecord}
        parcelID={parcelID}
        section={DwellingSection}
        datasetLinks={["https://data.wprdc.org/dataset/property-assessments"]}
      />

      {/* Condition */}
      <ConnectedSection<PropertyAssessment>
        id="condition"
        label="Condition"
        description="Ratings of the  about the primary residential building on this parcel (if there is one)"
        getter={fetchAssessmentRecord}
        parcelID={parcelID}
        section={ConditionSection}
        datasetLinks={["https://data.wprdc.org/dataset/property-assessments"]}
      />

      {/* Tax Context */}
      <ConnectedSection<PropertyAssessment>
        id="tax-context"
        label="Tax Details"
        description="Information about taxable status and taxing bodies"
        className="col-span-6 row-span-2"
        getter={fetchAssessmentRecord}
        parcelID={parcelID}
        section={TaxContextSection}
        datasetLinks={["https://data.wprdc.org/dataset/property-assessments"]}
      />

      <Section
        id="images"
        label="Images"
        description="Images of the property from the Allegheny County real estate portal"
      >
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
        id="sales"
        label="Sales History"
        description="Sales over time"
        className="col-span-8 row-span-1"
        getters={{
          sales: fetchPropertySaleTransactionsRecords,
          assessment: fetchAssessmentRecord,
        }}
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
        id="assessment-appeals"
        label="Assessment Appeals"
        description="Currently-filed and historical appeals of the assessed value."
        getters={{
          filed: fetchFiledAssessmentAppealsRecord,
          archive: fetchAssessmentAppealsRecords,
        }}
        parcelID={parcelID}
        section={AssessmentAppealsSection}
        datasetLinks={[
          "https://data.wprdc.org/dataset/filed-property-assessment-appeals",
          "https://data.wprdc.org/dataset/allegheny-county-property-assessment-appeals",
        ]}
      />

      {/* PLI Permits */}
      <ConnectedSection<PLIPermit>
        id="pli-permits"
        label="PLI Permits"
        description="City of Pittsburgh building permits"
        className="col-span-4 row-span-1"
        section={PLIPermitsSection}
        getter={fetchPLIPermitRecords}
        parcelID={parcelID}
        datasetLinks={["https://data.wprdc.org/dataset/pli-permits"]}
      />

      {/* Code Violations*/}
      <ConnectedSection<CityViolation>
        id="code-violations"
        label="Pittsburgh Code Violations"
        description="Code violations from various city departments: Permits Licensse and Inspections (PLI), Dept. of Mobility and Infrasturcture (DOMI) and Environmental Services (ES)"
        className="col-span-4 row-span-1"
        section={CodeViolationsSection}
        getter={fetchCityViolationsRecords}
        parcelID={parcelID}
        datasetLinks={[
          "https://data.wprdc.org/dataset/pittsburgh-pli-violations-report",
        ]}
      />

      {/* Condemned or Dead-end Status */}
      <ConnectedSection
        id="condemned-properties-section"
        label="Condemned Status"
        description="Details about the parcel's possible condemned or dead-end status by the City of Pittsburgh."
        section={CondemnedPropertiesSection}
        getter={fetchCondemnedStatusRecords}
        parcelID={parcelID}
        datasetLinks={["https://data.wprdc.org/dataset/condemned-properties"]}
      />

      {/* Liens */}
      <ConnectedSection<TaxLienWithCurrentStatus>
        id="tax-liens"
        label="Tax Liens"
        description="Filed and satisfied liens against the property"
        className="col-span-6 row-span-1"
        getter={fetchTaxLiensWithCurrentStatusRecords}
        parcelID={parcelID}
        section={TaxLiensSection}
        datasetLinks={[
          "https://data.wprdc.org/dataset/allegheny-county-tax-liens-filed-and-satisfied",
        ]}
      />

      {/* Foreclosures */}
      <ConnectedSection<ForeclosureFiling>
        id="foreclosure"
        label="Foreclosure Filings"
        description="Forecloure filing records"
        className="col-span-6 row-span-1"
        getter={fetchForeclosureFilingsRecords}
        parcelID={parcelID}
        section={ForeclosureFilingSection}
        datasetLinks={[
          "https://data.wprdc.org/dataset/allegheny-county-mortgage-foreclosure-records",
        ]}
      />

      {/* Conservatorship */}
      <ConnectedSection<ConservatorshipRecord>
        id="conservatorship"
        label="Conservatorship Filings"
        description="Petitions to put an abandoned property under coneservatorship to be brought back in productive use"
        className="col-span-6 row-span-1"
        getter={fetchConservatorshipRecordRecords}
        parcelID={parcelID}
        section={ConservatorshipRecordSection}
        datasetLinks={[
          "https://data.wprdc.org/dataset/allegheny-county-conservatorship-filings",
        ]}
      />
    </article>
  );
}
