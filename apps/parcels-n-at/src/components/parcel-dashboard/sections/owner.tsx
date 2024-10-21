import {
  fetchOwnerName,
  fetchSpaceratQuery,
  QuestionRecord,
  SpaceRATResponse,
} from "@wprdc/api";
import type { PropertyAssessment } from "@wprdc/types";
import { A, formatDollars, SingleValueVizCollection } from "@wprdc/ui";
import React from "react";
import { SectionProps } from "@/components/parcel-dashboard/types.ts";
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
          <h3 className="mb-1 text-2xl font-bold">Portfolio Summary</h3>
          <SingleValueVizCollection
            items={[
              {
                id: "size",
                label: "Number of Parcels",
                value: mainStats?.fairmarkettotal.n,
              },
              {
                id: "size",
                label: "Total Assessed Value",
                value: mainStats?.fairmarkettotal.sum,
                format: formatDollars,
              },
            ]}
          />
          <div className="flex flex-col space-y-4">
            <A
              variant="button"
              buttonVariant="primary"
              href={`/explore?parcel=${parcelID}&ownerAddr=${ownerAddr}`}
            >
              Highlight owner's properties on the map
            </A>
          </div>
          <details className="group mt-4">
            <summary className="group/summary flex w-fit cursor-pointer list-none items-center decoration-2 hover:text-stone-800">
              <TbCaretRight className="block size-5 group-open:hidden"></TbCaretRight>
              <TbCaretDown className="hidden size-5 group-open:block"></TbCaretDown>
              <h4 className="group-hover/summary:bg-primary -ml-1 px-1 text-xl font-bold">
                Other Properties
              </h4>
            </summary>
            <div className="ml-2 box-content border-l-4 border-stone-600 p-3.5 pr-0">
              <ul className="max-h-64 w-fit overflow-auto rounded-sm border border-black bg-white p-2">
                {records
                  .filter((r) => r.parcel_id !== parcelID)
                  .map(({ region: pid, address }) => (
                    <li key={pid}>
                      <A
                        className="font-mono"
                        href={`/explore?parcel=${pid}&zoompan=1`}
                      >
                        {address} ({pid})
                      </A>
                    </li>
                  ))}
              </ul>
            </div>
          </details>
        </section>
      </div>
    </div>
  );
}