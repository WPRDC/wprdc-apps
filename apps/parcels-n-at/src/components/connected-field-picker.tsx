"use client";

import { FieldPicker } from "@wprdc/ui";
import type { DatastoreField, DatastoreRecord } from "@wprdc/types";
import type { ParcelTable } from "@wprdc/api";
import type { Selection } from "react-aria-components";
import { useEffect, useState } from "react";

export interface ConnectedFieldPickerProps {
  table: ParcelTable;
  ignoredFields?: string[];
  onSelectionChange?: (selection: Selection) => void;
  selection?: Selection;
}

const COMMON_SKIPPED_FIELDS = ["_id", "_geom", "_geom_webmercator"];

const fieldFilter =
  <T extends DatastoreRecord>(skippedFields: string[]) =>
  (field: DatastoreField<T>) =>
    ![...COMMON_SKIPPED_FIELDS, ...skippedFields].includes(String(field.id));

export function ConnectedFieldPicker<
  T extends DatastoreRecord = DatastoreRecord,
>({
  table,
  onSelectionChange,
  selection,
  ignoredFields = [],
}: ConnectedFieldPickerProps): React.ReactElement {
  const [isLoading, setIsLoading] = useState(true);
  const [fields, setFields] = useState<DatastoreField<T>[]>();

  useEffect(() => {
    fetch(`/api/fields/${table}`)
      .then((res) => res.json())
      .then((data: { fields: DatastoreField<T>[] }) => {
        setFields(data.fields.filter(fieldFilter<T>(ignoredFields)));
        setIsLoading(false);
      })
      .catch((err) => {
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
