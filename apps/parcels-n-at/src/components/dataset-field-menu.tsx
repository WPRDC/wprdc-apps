"use client";

import { A, Chip, Heading } from "@wprdc/ui";
import type { ConnectedFieldPickerProps } from "@/components/connected-field-picker";
import { ConnectedFieldPicker } from "@/components/connected-field-picker";

export interface DataSetFieldMenuProps extends ConnectedFieldPickerProps {
  title: string;
  datasetURL: string;
  pghOnly?: boolean;
}

export function DatasetFieldMenu({
  title,
  datasetURL,
  pghOnly = false,
  ...pickerProps
}: DataSetFieldMenuProps): React.ReactElement {
  return (
    <div className="flex h-96 w-full flex-col">
      <div className="mb-2">
        <Heading className="m-0 border-none text-xl leading-none" level={2}>
          {title}
        </Heading>
        <A
          className="cursor-pointer text-sm text-stone-600"
          href={datasetURL}
          rel="noopener noreferrer"
          target="_blank"
        >
          Dataset
        </A>
        {pghOnly ? (
          <Chip label="City of Pittsburgh Only" variant="warning" />
        ) : null}
      </div>
      <div className="relative flex w-full items-center gap-x-2 overflow-hidden">
        <ConnectedFieldPicker {...pickerProps} />
      </div>
    </div>
  );
}
