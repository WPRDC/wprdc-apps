import type { PropertyAssessment } from "@wprdc/types";
import { fetchOwnerName } from "@wprdc/api";
import { FieldValues } from "../../../components";

export interface OwnerInfoProps {
  parcelID: string;
  assessmentRecord: PropertyAssessment;
}

export async function OwnerInfo({
  parcelID,
  assessmentRecord,
}: OwnerInfoProps): Promise<React.ReactElement> {
  const owner = await fetchOwnerName(parcelID);

  const address = [
    assessmentRecord.CHANGENOTICEADDRESS1,
    assessmentRecord.CHANGENOTICEADDRESS2,
    assessmentRecord.CHANGENOTICEADDRESS3,
    assessmentRecord.CHANGENOTICEADDRESS4,
  ].join(" ");

  return (
    <FieldValues
      colorBand={false}
      fullWidth={false}
      items={[
        {
          id: "owner-name",
          label: "Owner Name",
          value: owner,
          info: "Not in open data, but published on the Allegheny County Real Estate portal.",
        },
        {
          id: "owner-addr",
          label: "Owner Address",
          value: (
            <div>
              <p>{assessmentRecord.CHANGENOTICEADDRESS1}</p>
              <p>{assessmentRecord.CHANGENOTICEADDRESS2}</p>
              <p>
                {assessmentRecord.CHANGENOTICEADDRESS3}{" "}
                {assessmentRecord.CHANGENOTICEADDRESS4}
              </p>
            </div>
          ),
        },
      ]}
      variant="dense"
    />
  );
}
