/**
 *
 * Upload
 *
 * File uploader
 *
 **/
"use client";

import { type DropEvent } from "@react-types/shared";
import { useState } from "react";
import {
  DropZone,
  FileTrigger,
  Text,
  type FileDropItem,
} from "react-aria-components";
import { TbUpload } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import { Button } from "../button";
import { Typography } from "../typography";
import { type UploadProps } from "./Upload.types";

export function Upload({
  buttonLabel,
  dropLabel: _dropLabel,
  onFileChange,
  className,
}: UploadProps): React.ReactElement {
  const [fileName, setFileName] = useState<string | null>(null);

  function handleFileChange(file: File): void {
    if (onFileChange) {
      onFileChange(file);
    }
  }

  function handleDrop(e: DropEvent): void {
    const droppedFile = e.items.find((f) => f.kind === "file") as
      | FileDropItem
      | undefined;
    if (droppedFile) {
      setFileName(droppedFile.name);
      // eslint-disable-next-line no-console  -- warning for now
      droppedFile.getFile().then(handleFileChange, console.warn);
    }
  }

  function handleSelection(e: FileList | null): void {
    const files = Array.from(e ?? []);
    if (files.length) {
      setFileName(files[0].name);
      handleFileChange(files[0]);
    }
  }

  const dropLabel = _dropLabel ?? "Drag & Drop to Upload File";

  const selectLabel = fileName ? "Select another file" : "Select file";

  return (
    <DropZone
      onDrop={handleDrop}
      className={twMerge(
        "flex flex-col items-center rounded border p-4",
        !!fileName && "border-stone-600",
        className,
      )}
    >
      <Text slot="label" className="">
        <div className="flex flex-col items-center">
          <TbUpload className="size-6 text-stone-500" />
          <div className="text-sm font-medium text-stone-700">
            {" "}
            {fileName ? (
              <>
                Using <Typography.Code>{fileName}</Typography.Code>
              </>
            ) : (
              dropLabel
            )}
          </div>
        </div>
      </Text>
      {!fileName && <div className="text-xs italic">or</div>}
      <FileTrigger onSelect={handleSelection}>
        <Button dense className="w-fit">
          {buttonLabel ?? selectLabel}
        </Button>
      </FileTrigger>
    </DropZone>
  );
}
