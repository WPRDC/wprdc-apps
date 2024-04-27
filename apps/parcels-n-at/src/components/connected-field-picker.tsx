"use client";

import { FieldPicker } from "@wprdc/ui";
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
    fetch(`/api/fields/${table}`)
      .then((res) => res.json())
      .then((data: { fields: DatastoreField<T>[] }) => {
        setFields(
          data.fields.filter(fieldFilter<T>([...ignoredFields, parcelIDField])),
        );
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        // eslint-disable-next-line no-console -- nothing else we can really do here
        console.error(err);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;
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
