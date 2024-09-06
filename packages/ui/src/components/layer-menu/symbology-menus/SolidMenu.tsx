import * as React from "react";
import { GeoType } from "@wprdc/types";
import { type SolidMenuProps } from "../LayerMenu.types";
import { ColorPicker } from "../../color-picker";

export function SolidMenu({
  value,
  geoType,
}: SolidMenuProps): React.ReactElement {
  const { color, opacity, borderColor, borderWidth, borderOpacity } = value;

  const inLineMode = geoType === GeoType.Line;

  // todo: add

  return (
    <div className="space-y-3">
      <ColorPicker
        label={`${inLineMode ? "" : "Fill "}Color`}
        variant="labelled"
      />
      {!inLineMode ? (
        <ColorPicker label="Stroke Color" variant="labelled" />
      ) : null}
    </div>
  );
}
