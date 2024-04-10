"use client";

import type { ParcelSelectionOptions } from "@wprdc/ui";
import { Button, ParcelPicker } from "@wprdc/ui";
import { useRef, useState } from "react";
import type { Key } from "react-stately";
import { FieldMenu } from "@/components/field-menu";
import { datasets } from "@/datasets";

const API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;

export default function Page(): React.ReactElement {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const [parcelSelection, setParcelSelection] =
    useState<ParcelSelectionOptions>({});

  const [fieldSelection, setFieldSelection] = useState<
    Record<string, "all" | Key[]>
  >({});

  function handleDownload(): void {
    const params = new URLSearchParams({
      selectedFeatures: JSON.stringify(parcelSelection.selectedFeatures ?? {}),
      drawnAreas: JSON.stringify(parcelSelection.drawnAreas ?? {}),
      fieldSelection: JSON.stringify(fieldSelection),
    });

    fetch(`/api/parcels/?${params.toString()}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = linkRef.current;
        if (!link) {
          return;
        }

        link.href = url;
        link.download = "parcels-n-at.zip"; // Any name you want to download the file as
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console -- for debugging
        console.error(err);
      });
  }

  return (
    <div className="w-full overflow-auto">
      <div>
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content,jsx-a11y/anchor-is-valid -- used for download triggered by button*/}
        <a aria-hidden className="hidden" ref={linkRef} />
        <Button onPress={handleDownload}>Press me</Button>
      </div>
      <ParcelPicker
        mapTilerAPIKey={API_KEY}
        onSelectionChange={setParcelSelection}
      />
      <FieldMenu datasets={datasets} onSelectionChange={setFieldSelection} />
    </div>
  );
}
