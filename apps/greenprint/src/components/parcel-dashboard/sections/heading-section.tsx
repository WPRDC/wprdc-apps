import React from "react";
import { twMerge } from "tailwind-merge";
import { Bone, makeAssessmentAddress, tw } from "@wprdc/ui";
import { APIResult, fetchAssessmentRecord } from "@wprdc/api";
import { PropertyAssessment } from "@wprdc/types";
import { GeocodeResponseBody } from "@/app/api/parcels/geocode/route";
import { Hero } from "@/components/parcel-dashboard/sections/hero";
import { MapControls } from "@/components/parcel-dashboard/components/map-controls";
import { ClassChip } from "@/components/parcel-dashboard/components/class-chip";

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

  const baseTextStyle = tw`w-fit rounded-sm leading-none font-black text-white`;

  const [addressLine, cityLine] = makeAssessmentAddress(assessmentRecord);

  // geocode
  const geocodeResponse = await fetch(
    `${BASE_URL}/api/parcels/geocode?pid=${parcelID}`,
  );
  const { centroid, bbox } =
    (await geocodeResponse.json()) as GeocodeResponseBody;

  return (
    <div>
      <div className="relative h-64 w-full" id="dashboard-top">
        <Hero parcelID={parcelID} />
        <div className="absolute top-2 right-0">
          <MapControls
            address={`${addressLine} ${cityLine}`}
            bbox={bbox}
            centroid={centroid}
            parcelID={parcelID}
          />
        </div>
        <div className="absolute bottom-0 left-0 z-40 h-fit w-full bg-black/40 px-4 pt-3 pb-2 backdrop-blur-md">
          <div className="grow">
            <h1 className="">
              <div
                className={twMerge(
                  baseTextStyle,
                  "mb-1 text-xl leading-6.5 md:text-2xl lg:text-4xl",
                )}
              >
                {addressLine}
              </div>
              <div
                className={twMerge(
                  baseTextStyle,
                  "text-base leading-5 lg:text-lg",
                )}
              >
                {cityLine}
              </div>
              <div className="flex items-end justify-between">
                <div className="mono font-mono text-xs leading-3 font-semibold text-white">
                  <span className="font-sans">ID </span>
                  <span>#{parcelID}</span>
                </div>
                <div className="flex space-x-2">
                  <ClassChip
                    size="S"
                    parcelClass={assessmentRecord?.CLASSDESC}
                  />
                  <ClassChip size="S" parcelClass={assessmentRecord?.USEDESC} />
                </div>
              </div>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeadingSkeleton(): React.ReactElement {
  return (
    <div className="relative flex h-64 w-full bg-stone-400">
      <div className="absolute bottom-0 h-fit w-full bg-black/40 px-4 py-2 backdrop-blur-md">
        <Bone className="mt-1.5 mb-1 h-7 w-72" />
        <Bone className="mb-1.5 h-4 w-48" />
        <Bone className="h-3 w-24" />
      </div>
    </div>
  );
}
