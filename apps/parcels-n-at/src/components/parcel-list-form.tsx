"use client";

import { TextField, Typography, Upload } from "@wprdc/ui";
import { useCallback, useState } from "react";
import { isValidParcelIDForm } from "@/util";

export interface ParcelListFormProps {
  onChange: (parcelIDs: string[]) => void;
}

function extractIDs(text: string): [string[], string | undefined] {
  if (!text.length) return [[], undefined];

  let validCount = 0;
  const parcelIDs: string[] = text.split(/[\r\n]+/).map((line) => line.trim());
  parcelIDs.forEach((id) => {
    if (isValidParcelIDForm(id)) validCount++;
  });

  let error: string | undefined;

  if (!validCount) {
    error = "No parcel IDs found.";
  } else if (validCount < parcelIDs.length) {
    error = `${String(parcelIDs.length - validCount)} Invalid parcel IDs found.`;
  }

  return [parcelIDs, error];
}

export function ParcelListForm({
  onChange,
}: ParcelListFormProps): React.ReactElement {
  const [value, setValue] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const handleChange = useCallback((text: string) => {
    setValue(text);
    const [ids, ] = extractIDs(text);
    onChange(ids);
  }, [onChange]);

  const handleFileChange = useCallback(
    async function handleFileChange(f: File): Promise<void> {
      const text = await f.text();
      setValue(text);
      handleChange(text);
    },
    [handleChange],
  );

  const handleValidation = useCallback(
    function handleValidation(): void {
      const [, err] = extractIDs(value ?? "");
      setError(err);
    },
    [value],
  );

  return (
    <div className="flex space-x-7">
      <div className="w-1/2">
        <TextField
          label="Enter/paste one parcel ID per line."
          textarea
          type="text"
          rows={5}
          placeholder={"PARCELID1\nPARCELID2\nPARCELID3"}
          value={value}
          onChange={handleChange}
          onBlur={handleValidation}
        />
        <div className="h-3 text-xs text-red-800">{error}</div>
      </div>
      <div className="w-1/2">
        <Typography.Label>Upload a list</Typography.Label>
        <Upload
          onFileChange={handleFileChange}
          dropLabel="Drag & Drop to Load List from File"
        />
      </div>
    </div>
  );
}
