import { ZoomSymbologyMenuProps } from "../LayerMenu.types.ts";
import { ZoomMenuItem } from "./ZoomMenuItem.tsx";
import { useCallback } from "react";

export function ZoomMenu({ options, field, units }: ZoomSymbologyMenuProps) {
  const handleChange = useCallback(() => {}, [options.value, field]);

  return (
    <div>
      {options.value.map(([zoom, value]) => (
        <ZoomMenuItem
          zoom={zoom}
          value={value}
          field={field}
          onChange={handleChange}
        />
      ))}
    </div>
  );
}
