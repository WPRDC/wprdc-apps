"use client";

import { TextField, Typography, Upload } from "@wprdc/ui";
import { useState } from "react";

export function OldSelectionForm(): React.ReactElement {
  const [value, setValue] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  async function handleFileChange(f: File): Promise<void> {
    const text = await f.text();
    setValue(text);
  }

  function handleValidation(): void {
    try {
      JSON.parse(value ?? "[]");
      setError(undefined);
    } catch (err) {
      console.warn("JSON validation error:", err);
      setError("not valid json");
    }
  }

  return (
    <div className="flex space-x-7">
      <div className="w-1/2">
        <Typography.Label>Upload a previous selection</Typography.Label>
        <Upload
          onFileChange={() => void handleFileChange}
          dropLabel="Drag & Drop to Load List from File"
        />
      </div>

      <div className="w-1/2">
        <TextField
          label="Review or Modify Your Selection"
          textarea
          type="text"
          rows={5}
          placeholder="{}"
          value={value}
          onChange={setValue}
          onBlur={handleValidation}
        />
        <div className="h-3 text-xs text-red-800">{error}</div>
      </div>
    </div>
  );
}
