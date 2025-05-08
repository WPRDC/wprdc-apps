import {
  fetchSpaceratQuery,
  QuestionRecord,
  SpaceRATResponse,
} from "@wprdc/api";
import { fetchOwnerName } from "@/actions";

import type { PropertyAssessment } from "@wprdc/types";
import {
  A,
  formatDollars,
  SingleValueVizCollection,
  Typography,
} from "@wprdc/ui";
import React from "react";
import { SectionProps } from "@/components/parcel-dashboard/types";
import { TbCaretDown, TbCaretRight } from "react-icons/tb";

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

interface QueriedStats extends QuestionRecord {
  fairmarkettotal: {
    first_quartile: number;
    max: number;
    mean: number;
    median: number;
    min: number;
    mode: number;
    n: number;
    stddev: number;
    sum: number;
    third_quartile: number;
  };
}

type QueryResponse = SpaceRATResponse<QueriedStats>;

export async function OwnerInfo({
  parcelID,
  assessmentRecord,
}: OwnerInfoProps): Promise<React.ReactElement> {
  const owner = await fetchOwnerName(parcelID);
  const ownerSearch = `${(assessmentRecord.CHANGENOTICEADDRESS1 ?? "").replace(
    /\s+/g,
    " ",
  )}%`;

  const response: QueryResponse = await fetchSpaceratQuery<QueriedStats>({
    question: ["fairmarkettotal"],
    region: ["county.42003"],
    filter: "by_owner",
    filterArg: ownerSearch,
    queryRecords: true,
  });

  const { records, stats } = response.results;
  const mainStats = stats["county.42003"];

  const ownerAddr = [
    assessmentRecord.CHANGENOTICEADDRESS1,
    assessmentRecord.CHANGENOTICEADDRESS2,
    assessmentRecord.CHANGENOTICEADDRESS3,
    assessmentRecord.CHANGENOTICEADDRESS4,
  ]
    .join("")
    .replace(/\s+/g, " ");

  const otherPropertyRecords = records.filter((r) => r.region !== parcelID);

  return (
    <div>
      <div>
        <address className="w-fit border border-black bg-white p-2 font-mono not-italic">
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
        <section className="mt-4">
          <h3 className="mb-1 text-2xl font-bold">Summary of Holdings</h3>
          <SingleValueVizCollection
            items={[
              {
                id: "parcel-count",
                label: "Number of Parcels",
                value: mainStats?.fairmarkettotal.n,
              },
              {
                id: "total-parcel-value",
                label: "Total Assessed Value",
                value: mainStats?.fairmarkettotal.sum,
                format: formatDollars,
              },
            ]}
          />
          <div className="mt-4">
            <h4 className="-ml-1 px-1 text-xl font-bold">Other Properties</h4>
            <div className="box-content border-stone-600 py-3.5 pr-0">
              {!!otherPropertyRecords.length ? (
                <ul className="max-h-64 w-fit overflow-auto rounded-sm border border-black bg-white">
                  {otherPropertyRecords.map(({ region: pid, address }, i) => (
                    <li
                      key={`${pid}-${i}`}
                      className="border-t px-2 py-0.5 first:border-t-0 even:bg-gray-100"
                    >
                      <A
                        className="font-mono"
                        href={`/explore?parcel=${pid}&zoomPan=1`}
                      >
                        {address} ({pid})
                      </A>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography.Note>No other properties</Typography.Note>
              )}
            </div>
            <div className="flex flex-col space-y-4">
              <A
                variant="button"
                buttonVariant="primary"
                href={`/explore?parcel=${parcelID}&ownerAddr=${ownerAddr}`}
              >
                Highlight owner's properties on the map
              </A>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
