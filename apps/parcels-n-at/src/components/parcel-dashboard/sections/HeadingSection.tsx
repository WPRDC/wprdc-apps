import {
  fetchAssessmentRecord,
  fetchParcelBoundariesRecord,
  type APIResult,
} from "@wprdc/api";
import type { ParcelBoundary, PropertyAssessment } from "@wprdc/types";
import { Suspense } from "react";
import { A, Bone, FieldValues } from "../../../components";
import { makeAssessmentAddress } from "../../../util";
import { ClassChip } from "../components/ClassChip";
import { HeroImage } from "../components/HeroImage";
import { OwnerInfo } from "./OwnerInfo";

interface HeadingSectionProps {
  parcelID: string;
}

export function HeadingSectionSkeleton(): React.ReactElement {
  return (
    <div className="flex justify-between pb-4">
      <div className="w-2/3">
        <div className="mb-1 flex space-x-1">
          <Bone className="mb-1 h-5" />
          <Bone className="mb-1 h-5" />
        </div>

        <div>
          <Bone className="mb-1.5 mt-2 h-10 w-9/12" />
          <Bone className="h-6 w-60" />
          <div className="space-y-1.5 pt-2">
            <div className="flex space-x-1.5">
              <Bone />
              <Bone className="w-40" />
            </div>
            <div className="flex space-x-1.5">
              <Bone />
              <Bone className="w-32" />
            </div>
          </div>
          <OwnerSectionSkeleton />
        </div>
      </div>
      <Bone className="relative aspect-video h-full w-1/3" />
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

export async function HeadingSection({
  parcelID,
}: HeadingSectionProps): Promise<React.ReactElement | null> {
  const imgURL = `https://iasworld.alleghenycounty.us/iasworld/iDoc2/Services/GetPhoto.ashx?parid=${parcelID}&jur=002`;
  const assessment: APIResult<PropertyAssessment> =
    await fetchAssessmentRecord(parcelID);
  const boundary: APIResult<ParcelBoundary> =
    await fetchParcelBoundariesRecord(parcelID);

  const assessmentRecord = assessment.records?.[0];
  const [addressLine, cityLine] = makeAssessmentAddress(assessmentRecord);
  return (
    <div className="flex justify-between pb-4">
      <div className="w-2/3">
        <div className="mb-1 flex space-x-1">
          <ClassChip parcelClass={assessmentRecord?.CLASSDESC} />
          <ClassChip parcelClass={assessmentRecord?.USEDESC} />
        </div>

        <div>
          <div className="pb-0.5 text-5xl font-bold leading-none">
            {addressLine}
          </div>
          <div className="text-xl font-bold leading-none">{cityLine}</div>
          <div className="pt-2">
            <FieldValues
              colorBand={false}
              fullWidth={false}
              items={[
                {
                  id: "parid",
                  value: assessmentRecord?.PARID,
                  label: "Parcel ID #",
                  info: assessment.fields?.PARID.info?.notes,
                },
                {
                  id: "lot-block-no",
                  value: boundary.records?.[0].MAPBLOCKLO,
                  label: "Block Lot #",
                  info: "",
                },
              ]}
              variant="dense"
            />
          </div>
        </div>

        <div>
          {assessmentRecord ? (
            <Suspense fallback={<OwnerSectionSkeleton />} key={parcelID}>
              {/* @ts-expect-error Server-side */}
              <OwnerInfo
                assessmentRecord={assessmentRecord}
                parcelID={parcelID}
              />
            </Suspense>
          ) : null}
        </div>
        <div>
          <A href={`/landlord/?parcel=${parcelID}`}>See Owner Portfolio</A>
        </div>
      </div>

      <div className="relative aspect-video w-1/3 overflow-hidden rounded-md border border-stone-600 shadow-sm">
        <HeroImage src={imgURL} />
      </div>
    </div>
  );
}
