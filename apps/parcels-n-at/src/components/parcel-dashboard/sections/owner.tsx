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
import { TbAlertTriangle } from "react-icons/tb";
import { ClassChip } from "@/components/parcel-dashboard/components/class-chip.tsx";
import Link from "next/link";

const BASE_URL = process.env.BASE_URL ?? "";

// list of addresses that should not be used in owner aggregation for legal reasons only (i.e. legislated privacy requirements)
const OWNER_AGG_BLACKLIST = (
  process.env.NEXT_PUBLIC_OWNER_AGG_BLACKLIST ?? ""
).split(",");

export function OwnerSection({
  records,
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

export interface OwnerPropertyRecord {
  owner: string | null;
  parcels: {
    id: string;
    address: string;
    useClass: string;
    assessmentValue: number;
    yearBuilt: string;
  }[];
}

export async function OwnerInfo({
  parcelID,
  assessmentRecord,
}: OwnerInfoProps): Promise<React.ReactElement> {
  const owner = await fetchOwnerName(parcelID);

  // get owned parcel details
  const ownerAddr = [
    assessmentRecord.CHANGENOTICEADDRESS1,
    assessmentRecord.CHANGENOTICEADDRESS2,
    assessmentRecord.CHANGENOTICEADDRESS3,
    assessmentRecord.CHANGENOTICEADDRESS4,
  ]
    .join("")
    .replace(/\s+/g, " ");
  const ownerSearch = ownerAddr + "%";

  const parcelResponse = await fetch(
    `${BASE_URL}/api/parcels/owner/parcels/?ownerAddress=${ownerSearch}`,
  );
  const { parcels }: OwnerPropertyRecord = await parcelResponse.json();

  const otherPropertyRecords = parcels
    .filter((p) => p.id !== parcelID)
    .sort((a, b) => b.assessmentValue - a.assessmentValue);

  const inBlackList = OWNER_AGG_BLACKLIST.includes(ownerAddr);

  const totalValue = parcels.reduce(
    (sum, parcel) => sum + parcel.assessmentValue,
    0,
  );

  return (
    <div>
      <div>
        <div className="mb-4">
          <div className="flex space-x-1 text-xs font-bold text-orange-400">
            <TbAlertTriangle className="mt-0.5 mr-1 size-3" />
            <span className="uppercase">Warning</span>
          </div>
          <div>
            <Typography.Note>
              A parcel&apos;s owner is determined by the owner address and not
              the name of the owning party. This due an Allegheny County
              ordinance (48-07) which places limitations on searching for parcel
              data by owner address.
            </Typography.Note>
          </div>
        </div>
        <address className="w-fit border border-black bg-white p-2 font-mono not-italic">
          <strong className="text-sm">{owner}</strong>
          <div className="text-sm">
            <p>{assessmentRecord.CHANGENOTICEADDRESS1}</p>
            <p>{assessmentRecord.CHANGENOTICEADDRESS2}</p>
            <p>
              {assessmentRecord.CHANGENOTICEADDRESS3}{" "}
              {assessmentRecord.CHANGENOTICEADDRESS4}
            </p>
          </div>
        </address>
        <section className="mt-4">
          <h3 className="mb-1 text-lg font-bold">
            Summary of Holdings in Allegheny County
          </h3>
          {inBlackList ? (
            <Typography.Note>
              There was an error getting aggregate statistics. If this error
              persists{" "}
              <A href="mailto:wprdc@pitt.edu?subject=Parcels N'at Issue">
                let us know
              </A>
              .
            </Typography.Note>
          ) : (
            <div>
              <SingleValueVizCollection
                items={[
                  {
                    id: "parcel-count",
                    label: "Number of Parcels",
                    value: parcels.length,
                  },
                  {
                    id: "total-parcel-value",
                    label: "Total Assessed Value",
                    value: totalValue,
                    format: formatDollars,
                  },
                ]}
              />

              <div className="mt-4">
                <h4 className="-ml-1 px-1 text-lg font-bold">
                  Other Properties in Allegheny County
                </h4>
                <div className="mb-3 box-content max-h-96 w-fit min-w-2/3 overflow-auto rounded-xs border border-stone-400 p-3 text-sm">
                  {otherPropertyRecords.length ? (
                    <ul className="w-fill space-y-2 bg-white">
                      {otherPropertyRecords.map(
                        (
                          { id: pid, address, assessmentValue, useClass },
                          i,
                        ) => (
                          <li
                            key={`${pid}-${i}`}
                            className="group hover:bg-wprdc-200 rounded-sm border px-2 py-1 even:bg-gray-100"
                          >
                            <Link href={`/explore?parcel=${pid}&zoomPan=1`}>
                              <ClassChip
                                className="text-[.6rem] leading-2.5"
                                parcelClass={useClass}
                              />
                              <div className="font-bold group-hover:underline">
                                {address}
                              </div>
                              <div className="font-mono text-xs font-semibold">
                                {pid}
                              </div>

                              <div className="text-xs font-semibold">
                                <span>Assessed Value: </span>
                                <span className="font-mono">
                                  {formatDollars(assessmentValue)}
                                </span>
                              </div>
                            </Link>
                          </li>
                        ),
                      )}
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
                    Highlight owner&apos;s properties on the map
                  </A>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
