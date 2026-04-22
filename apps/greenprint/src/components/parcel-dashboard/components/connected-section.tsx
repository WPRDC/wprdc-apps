import type { APIResult } from "@wprdc/api";
import type { DatastoreRecord } from "@wprdc/types";
import { Suspense } from "react";
import { LoadingMessage, Typography } from "@wprdc/ui";
import type {
  ConnectedSectionProps,
  DatastoreRecordSet,
  MultiConnectedSectionProps,
  MultiSourceSectionProps,
} from "../types";
import { Section } from "./Section";

export function ConnectedSection<T extends DatastoreRecord>({
  id,
  label,
  description,
  datasetLinks,
  className,
  defaultOpen = true,
  ...props
}: ConnectedSectionProps<T>): React.ReactElement {
  return (
    <Suspense
      fallback={<Loader label={label} description={description} />}
      key={props.parcelID}
    >
      <div className={className}>
        <Section
          id={id}
          label={label}
          description={description}
          datasetLinks={datasetLinks}
          defaultOpen={defaultOpen}
        >
          <ConnectedSectionContent {...props} />
        </Section>
      </div>
    </Suspense>
  );
}

export async function ConnectedSectionContent<T extends DatastoreRecord>({
  getter,
  parcelID,
  section: Section,
  sectionProps,
}: Omit<ConnectedSectionProps<T>, "label">): Promise<React.ReactElement> {
  const { fields, records } = await getter(parcelID);
  if (!records || !fields || !records.length)
    return <Typography.Note>No records found for {parcelID}</Typography.Note>;
  return <Section fields={fields} records={records} {...sectionProps} />;
}

export function MultiConnectedSection<T extends DatastoreRecordSet>({
  id,
  label,
  description,
  datasetLinks,
  className,
  ...props
}: MultiConnectedSectionProps<T>): React.ReactElement {
  return (
    <Suspense
      fallback={<Loader label={label} description={description} />}
      key={props.parcelID}
    >
      <Section
        id={id}
        className={className}
        label={label}
        description={description}
        datasetLinks={datasetLinks}
      >
        <MultiConnectedSectionContent {...props} />
      </Section>
    </Suspense>
  );
}

export async function MultiConnectedSectionContent<
  T extends DatastoreRecordSet,
>({
  getters,
  parcelID,
  section: Section,
  sectionProps,
}: Omit<MultiConnectedSectionProps<T>, "label">): Promise<React.ReactElement> {
  const keys: (keyof T)[] = Object.keys(getters);
  const results: APIResult<T[keyof T]>[] = await Promise.all(
    keys.map((k) => getters[k](parcelID)),
  );

  const childProps: MultiSourceSectionProps<T> = keys.reduce<
    Partial<MultiSourceSectionProps<T>>
  >(
    (acc, curr, i) => Object.assign(acc, { [curr]: results[i] }),
    {},
  ) as MultiSourceSectionProps<T>;

  return <Section {...childProps} {...sectionProps} />;
}

type LabelProps = Pick<
  ConnectedSectionProps<DatastoreRecord>,
  "label" | "description"
>;

function Loader(props: LabelProps) {
  return (
    <div className="group/section mt-3 rounded border border-stone-200 bg-white p-3">
      <div className="list-none decoration-2 hover:text-stone-800">
        <div className="flex w-full items-center justify-between">
          {!!props.label && (
            <h2 className="text-2xl font-bold">{props.label}</h2>
          )}
        </div>
        {!!props.description && (
          <p className="mt-2 mb-1 text-sm">{props.description}</p>
        )}
      </div>

      <div className="py-4">
        <LoadingMessage message="Loading..." size="M" />
      </div>
    </div>
  );
}
