import React from "react";
import { twMerge } from "tailwind-merge";
import { Bone, makeAssessmentAddress, tw } from "@wprdc/ui";
import { APIResult, fetchAssessmentRecord } from "@wprdc/api";
import { PropertyAssessment } from "@wprdc/types";

interface HeadingSectionProps {
  parcelID: string;
}

export async function HeadingSection({
  parcelID,
}: HeadingSectionProps): Promise<React.ReactElement | null> {
  const assessment: APIResult<PropertyAssessment> =
    await fetchAssessmentRecord(parcelID);
  const assessmentRecord = assessment.records?.[0];

  const baseTextStyle = tw`w-fit rounded-sm font-black leading-none text-white`;

  const [addressLine, cityLine] = makeAssessmentAddress(assessmentRecord);

  return (
    <h1 className="">
      <div className={twMerge(baseTextStyle, "mb-1 text-5xl")}>
        {addressLine}
      </div>
      <div className={twMerge(baseTextStyle, "text-xl")}>{cityLine}</div>
    </h1>
  );
}

export async function HeadingSkeleton(): Promise<React.ReactElement> {
  return (
    <div className="relative flex h-full w-full items-center overflow-hidden">
      <div className="absolute z-20 flex h-full w-full flex-col justify-end bg-gradient-to-t from-black/80 to-transparent p-2 text-white">
        <div>
          <Bone className="mb-3 h-10 w-full max-w-96 bg-white/80 text-5xl xl:max-w-[26rem]" />
          <Bone className="mb-1 h-5 w-60 bg-white/80 text-xl" />
        </div>
      </div>
    </div>
  );
}
