"use client";

import type { DatastoreRecord } from "@wprdc/types";
import { ListBoxItem, Text } from "react-aria-components";
import { InfoTooltip } from "../../components";
import type { FieldPickerItemProps } from "./types";

export function FieldPickerItem<T extends DatastoreRecord = DatastoreRecord>({
  field,
  ...props
}: FieldPickerItemProps<T>): React.ReactElement {
  const { info, id, type } = field;
  const fieldName = String(id);

  return (
    <ListBoxItem
      {...props}
      className={
        "flex border cursor-default border-transparent px-1.5 py-1.5 hover:bg-stone-100 focus:border-blue-600 focus:bg-stone-100 focus:ring-1 focus:ring-blue-600 data-selected:border-gray-400 data-selected:bg-sky-300/30 data-selected:hover:bg-sky-300/50 selected:focus:border-blue-600 selected:focus:bg-sky-300/70"
      }
      textValue={fieldName}
    >
      <div className="grow overflow-hidden leading-none">
        <Text
          className="block w-full truncate text-ellipsis text-sm font-semibold leading-none"
          slot="description"
        >
          {info?.label && !!info.label.length ? info.label : fieldName}
        </Text>
        <Text className="font-mono text-xs leading-none" slot="label">
          {type}
        </Text>
      </div>
      <div className="flex items-center">
        <InfoTooltip
          info={
            <div>
              <div className="text-lg font-semibold">
                {info?.label ?? fieldName}
              </div>
              <div className="text-sm italic">{info?.notes}</div>

              <table className="mt-2 table-auto text-sm">
                <tbody>
                  <tr>
                    <th className="pr-1 text-left font-bold">Field Name:</th>
                    <td className="font-mono text-stone-700">{fieldName}</td>
                  </tr>
                  <tr>
                    <th className="text-left font-bold">Data Type:</th>
                    <td className="font-mono text-stone-700">{type}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
          size="M"
        />
      </div>
    </ListBoxItem>
  );
}
