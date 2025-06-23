import React from "react";
import { twMerge } from "tailwind-merge";
import { Bone, makeAssessmentAddress, tw } from "@wprdc/ui";
import { APIResult, fetchAssessmentRecord } from "@wprdc/api";
import { PropertyAssessment } from "@wprdc/types";
import { GeocodeResponseBody } from "@/app/api/parcels/geocode/route.ts";
import { Hero } from "@/components/parcel-dashboard/sections/hero.tsx";
import { MapControls } from "@/components/parcel-dashboard/components/map-controls.tsx";

const BASE_URL = process.env.BASE_URL ?? "";

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

  // geocode
  const geocodeResponse = await fetch(
    `${BASE_URL}/api/parcels/geocode?pid=${parcelID}`,
  );
  const { centroid, bbox } =
    (await geocodeResponse.json()) as GeocodeResponseBody;

  return (
    <div>
      <div className="h-64 w-full" id="dashboard-top">
        <Hero parcelID={parcelID} />
        <div className="sticky top-0 z-40 -mt-24 bg-black/40 px-4 py-2 backdrop-blur-md">
          <div className="flex-grow">
            <h1 className="">
              <div className={twMerge(baseTextStyle, "mb-1 text-5xl")}>
                {addressLine}
              </div>
              <div className={twMerge(baseTextStyle, "text-xl")}>
                {cityLine}
              </div>
            </h1>
          </div>
        </div>
      </div>
      <div className="py-2 px-4">
        <MapControls
          address={`${addressLine} ${cityLine}`}
          bbox={bbox}
          centroid={centroid}
          parcelID={parcelID}
        />
      </div>
    </div>
  );
}

export function HeadingSkeleton(): React.ReactElement {
  return (
    <div className="w-full">
      <Bone className="mb-3 h-12 w-full max-w-96 bg-white/80 text-5xl xl:max-w-[26rem]" />
      <Bone className="h-5 w-60 bg-white/80 text-xl" />
    </div>
  );
}
