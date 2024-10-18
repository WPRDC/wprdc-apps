import { fetchOwnerName } from "@wprdc/api";
import type { PropertyAssessment } from "@wprdc/types";
import { A, Bone } from "@wprdc/ui";
import React from "react";
import { SectionProps } from "@/components/parcel-dashboard/types.ts";

export function OwnerSection({
  records,
  fields,
}: SectionProps<PropertyAssessment>): React.ReactElement {
  const record = records[0];

  return (
    <div>
      <OwnerInfo parcelID={record["PARID"]} assessmentRecord={record} />
    </div>
  );
}

export interface OwnerInfoProps {
  parcelID: string;
  assessmentRecord: PropertyAssessment;
}

export async function OwnerInfo({
  parcelID,
  assessmentRecord,
}: OwnerInfoProps): Promise<React.ReactElement> {
  const owner = await fetchOwnerName(parcelID);

  return (
    <div>
      <address className="font-mono not-italic">
        <strong>{owner}</strong>
        <div>
          <p>{assessmentRecord.CHANGENOTICEADDRESS1}</p>
          <p>{assessmentRecord.CHANGENOTICEADDRESS2}</p>
          <p>
            {assessmentRecord.CHANGENOTICEADDRESS3}{" "}
            {assessmentRecord.CHANGENOTICEADDRESS4}
          </p>
        </div>
      </address>
      <p className="mt-4">
        <A variant="button" href={`/landlord?parcel=${parcelID}`}>
          Explore Owner's Portfolio
        </A>
      </p>
    </div>
  );
}

export function OwnerSectionSkeleton(): React.ReactElement {
  return (
    <div>
      <div className="space-y-1.5 pt-2">
        <div className="flex space-x-1.5">
          <Bone />
          <Bone className="w-48" />
        </div>
        <div className="flex space-x-1.5">
          <Bone />
          <Bone className="h-8 w-36" />
        </div>
      </div>
    </div>
  );
}
