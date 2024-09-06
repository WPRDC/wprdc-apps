"use client";

import { ComboBox, ComboBoxItem } from "@wprdc/ui";
import type { SpaceRATObject } from "@wprdc/api";
import { usePathname, useRouter } from "next/navigation";
import type { Key } from "react-aria-components";

export interface NavSelectProps {
  items: SpaceRATObject[];
}

export function NavSelect({ items }: NavSelectProps): React.ReactElement {
  const pathname = usePathname();
  const router = useRouter();

  function handleSelection(key: Key | null): void {
    if (key) {
      router.push(`${pathname}/?set=${key.toString()}`);
    }
  }

  return (
    <ComboBox onSelectionChange={handleSelection}>
      {items.map((config: SpaceRATObject) => (
        <ComboBoxItem key={config.id} id={config.id}>
          {config.name}
        </ComboBoxItem>
      ))}
    </ComboBox>
  );
}
