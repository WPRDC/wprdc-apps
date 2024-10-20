import { fetchOwnerName, QuestionRecord, SpaceRATResponse } from "@wprdc/api";
import type { PropertyAssessment } from "@wprdc/types";
import { A, Bone, formatDollars, SingleValueVizCollection } from "@wprdc/ui";
import React from "react";
import { SectionProps } from "@/components/parcel-dashboard/types.ts";
import { fetchSpaceratQuery } from "@wprdc/api";
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
  const parcelIDs = records.map((r) => r.region);
  const mainStats = stats["county.42003"];

  return (
    <div>
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
          <A
            variant="button"
            buttonVariant="primary"
            href={`/landlord?parcel=${parcelID}`}
          >
            Explore Owner's Portfolio in Detail
          </A>

          <details className="group mt-4">
            <summary className="group/summary flex w-fit cursor-pointer list-none items-center decoration-2 hover:text-stone-800">
              <TbCaretRight className="block size-5 group-open:hidden"></TbCaretRight>
              <TbCaretDown className="hidden size-5 group-open:block"></TbCaretDown>
              <h4 className="group-hover/summary:bg-primary -ml-1 px-1 text-xl font-bold">
                Other Properties
              </h4>
            </summary>
            <div className="ml-2 box-content border-l-4 border-stone-600 p-3.5 pr-0">
              <ul className="max-h-64 w-fit overflow-auto rounded-sm border border-black p-2">
                {records
                  .filter((r) => r.pid !== parcelID)
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
