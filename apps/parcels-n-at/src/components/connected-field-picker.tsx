"use client";

import { FieldPicker, Spinner } from "@wprdc/ui";
import type { DatastoreField, DatastoreRecord } from "@wprdc/types";
import type { ParcelTable } from "@wprdc/api";
import type { Selection } from "react-aria-components";
import { useEffect, useState } from "react";
import { fieldFilter } from "@/util";

export interface ConnectedFieldPickerProps {
  table: ParcelTable;
  ignoredFields?: string[];
  parcelIDField: string;
  onSelectionChange?: (selection: Selection) => void;
  selection?: Selection;
}

export function ConnectedFieldPicker<
  T extends DatastoreRecord = DatastoreRecord,
>({
  table,
  onSelectionChange,
  selection,
  parcelIDField,
  ignoredFields = [],
}: ConnectedFieldPickerProps): React.ReactElement {
  const [isLoading, setIsLoading] = useState(true);
  const [fields, setFields] = useState<DatastoreField<T>[]>();

  useEffect(() => {
    if (!fields?.length)
      fetch(`/api/fields/${table}`)
        .then((res) => res.json())
        .then((data: { fields: DatastoreField<T>[] }) => {
          setFields(
            data.fields.filter(
              fieldFilter<T>([...ignoredFields, parcelIDField]),
            ),
          );
          setIsLoading(false);
        })
        .catch((err: unknown) => {
          console.error(err);
        });
  }, [fields?.length, ignoredFields, parcelIDField, table]);

  if (isLoading)
    return (
      <div>
        <div>
          <Spinner size="L" />
        </div>
        <div>Loading...</div>
      </div>
    );
  if (fields) {
    return (
      <FieldPicker
        fields={fields}
        onSelectionChange={onSelectionChange}
        selection={selection}
      />
    );
  }
  return <div />;
}
