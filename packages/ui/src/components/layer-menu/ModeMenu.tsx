import { ModeMenuProps } from "./LayerMenu.types";
import { ToggleButton, ToggleButtonGroup } from "react-aria-components";

export function ModeMenu({ selection, onSelectionChange }: ModeMenuProps) {
  return (
    <div>
      <ToggleButtonGroup
        selectedKeys={[selection]}
        onSelectionChange={(keys) =>
          onSelectionChange(Array.from(keys)[0] as "category" | "simple")
        }
        selectionMode="single"
        className="text-xs font-mono"
      >
        <ToggleButton
          id="simple"
          style={{
            background: selection === "simple" ? "#FCEC52" : "transparent",
          }}
          className="rounded-l-md border border-r-0 border-black selected:fill-primary px-0.5"
        >
          Solid
        </ToggleButton>
        <ToggleButton
          id="category"
          style={{
            background: selection === "category" ? "#FCEC52" : "transparent",
          }}
          className="rounded-r-md border border-l-0 border-black selected:fill-primary px-0.5"
        >
          By Value
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
