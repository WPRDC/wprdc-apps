import type { ParcelBoundary, PropertyAssessment, Value } from "@wprdc/types";
import { Suspense } from "react";
import type { MultiSourceSectionProps } from "../types";
import { HeroImage } from "../components/HeroImage";
import { makeAssessmentAddress } from "../../../util";
import { ClassChip } from "../components/ClassChip";
import { FieldValues } from "../../../components";
import { OwnerInfo } from "./OwnerInfo";

interface ExtraProps {
  parcelID: string;
}

export function HeadingSection({
  parcelID,
  assessment,
  boundary,
}: MultiSourceSectionProps<
  {
    assessment: PropertyAssessment;
    boundary: ParcelBoundary;
  },
  ExtraProps
>): React.ReactElement {
  const imgURL = `https://iasworld.alleghenycounty.us/iasworld/iDoc2/Services/GetPhoto.ashx?parid=${parcelID}&jur=002`;

  const assessmentRecord = assessment.records[0];
  const [addressLine, cityLine] = makeAssessmentAddress(assessmentRecord);
  return (
    <div className="flex justify-between pb-4">
      <div className="w-2/3">
        <div className="mb-1 flex space-x-1">
          <ClassChip parcelClass={assessmentRecord.CLASSDESC} />
          <ClassChip parcelClass={assessmentRecord.USEDESC} />
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
                  value: assessmentRecord.PARID,
                  label: "Parcel ID #",
                  info: assessment.fields.PARID.info?.notes,
                },
                {
                  id: "lot-block-no",
                  value: boundary.records[0].MAPBLOCKLO,
                  label: "Block Lot #",
                  info: "",
                },
              ]}
              variant="dense"
            />
          </div>
        </div>

        <div>
          <Suspense fallback="Loading...">
            {/* @ts-expect-error Server-side */}
            <OwnerInfo
              assessmentRecord={assessmentRecord}
              parcelID={parcelID}
            />
          </Suspense>
        </div>
      </div>

      <div className="relative aspect-video w-1/3 overflow-hidden rounded-md border border-stone-600 shadow-sm">
        <HeroImage src={imgURL} />
      </div>
    </div>
  );
}
